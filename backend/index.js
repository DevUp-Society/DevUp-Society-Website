import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
  syncRegistrationToSheets,
  fullBackupToSheets,
  isConfigured,
} from "./googleSheets.js";
import rateLimit from "express-rate-limit";
import validator from "validator";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase with service role key (bypasses RLS for backend operations)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
);

// Rate limiting
const teamNumberLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const registrationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 registrations per 5 minutes per IP
  message: { error: "Too many registration attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Input sanitization helper
function sanitizeInput(str) {
  if (typeof str !== "string") return str;
  return validator.escape(validator.trim(str));
}

function validateEmail(email) {
  return validator.isEmail(email);
}

function validatePhone(phone) {
  // Indian phone number: 10 digits
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));
}

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "DevUp Backend API" });
});

// GET /api/get-team-number?slug=event-slug
app.get("/api/get-team-number", teamNumberLimiter, async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: "Event slug is required" });
    }

    // Get all team numbers for this event
    const { data, error } = await supabase
      .from("registrations")
      .select("team_number")
      .eq("event_slug", slug);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // Find highest sequence number
    const maxSeq = (data || []).reduce((max, row) => {
      const match = row.team_number?.match(/DEV2026-(\d{3,})/);
      const num = match ? parseInt(match[1], 10) : 0;
      return Math.max(max, num);
    }, 0);

    // Format next team number
    const nextSeq = maxSeq + 1;
    const teamNumber = `DEV2026-${String(nextSeq).padStart(3, "0")}`;

    res.json({ teamNumber });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/register
app.post("/api/register", registrationLimiter, async (req, res) => {
  try {
    const {
      event_slug,
      team_name,
      lead_name,
      lead_email,
      lead_phone,
      lead_college,
      team_number,
      payment_amount,
      transaction_id,
      team_size,
      members,
    } = req.body;

    // Basic validation
    if (
      !event_slug ||
      !team_name ||
      !lead_name ||
      !lead_email ||
      !lead_phone ||
      !lead_college ||
      !team_number
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    if (!validateEmail(lead_email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate phone format
    const cleanPhone = lead_phone.replace(/\s/g, "");
    if (!validatePhone(cleanPhone)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid phone number. Must be a 10-digit Indian mobile number.",
        });
    }

    // Sanitize text inputs
    const sanitizedData = {
      event_slug: sanitizeInput(event_slug),
      team_name: sanitizeInput(team_name),
      lead_name: sanitizeInput(lead_name),
      lead_email: lead_email.toLowerCase().trim(),
      lead_phone: cleanPhone,
      lead_college: sanitizeInput(lead_college),
      team_number: sanitizeInput(team_number),
      transaction_id: transaction_id ? sanitizeInput(transaction_id) : null,
    };

    // Check for duplicate registrations (same email or phone for this event)
    const { data: existingReg, error: checkError } = await supabase
      .from("registrations")
      .select("id, team_number")
      .eq("event_slug", sanitizedData.event_slug)
      .or(
        `lead_email.eq.${sanitizedData.lead_email},lead_phone.eq.${sanitizedData.lead_phone}`,
      )
      .limit(1);

    if (checkError) {
      console.error("Duplicate check error:", checkError);
      // Don't fail registration if check fails, just log it
    } else if (existingReg && existingReg.length > 0) {
      return res.status(409).json({
        error: "Duplicate registration detected",
        message: `This email or phone number is already registered for this event (Team: ${existingReg[0].team_number})`,
      });
    }

    // Check for duplicate transaction ID
    if (transaction_id) {
      const { data: existingTxn } = await supabase
        .from("registrations")
        .select("team_number")
        .eq("transaction_id", sanitizedData.transaction_id)
        .limit(1);

      if (existingTxn && existingTxn.length > 0) {
        return res.status(409).json({
          error: "Duplicate transaction ID",
          message:
            "This transaction ID has already been used. Please enter the correct transaction ID.",
        });
      }
    }

    // Generate registration ID
    const registrationId = crypto.randomUUID();

    // Insert registration with sanitized data
    const { error: regError } = await supabase.from("registrations").insert([
      {
        id: registrationId,
        event_slug: sanitizedData.event_slug,
        team_name: sanitizedData.team_name,
        lead_name: sanitizedData.lead_name,
        lead_email: sanitizedData.lead_email,
        lead_phone: sanitizedData.lead_phone,
        lead_college: sanitizedData.lead_college,
        team_number: sanitizedData.team_number,
        payment_amount: parseInt(payment_amount) || 0,
        transaction_id: sanitizedData.transaction_id,
        payment_status: "pending",
        team_size: parseInt(team_size) || 2,
        status: "pending",
      },
    ]);

    if (regError) {
      console.error("Registration insert error:", regError);
      return res.status(500).json({ error: "Failed to create registration" });
    }

    // Insert team members if any
    let insertedTeamMembers = [];
    if (members && Array.isArray(members) && members.length > 0) {
      const teamMembers = members.map((member) => {
        const cleanMemberPhone = member.phone
          ? member.phone.replace(/\s/g, "")
          : "";
        return {
          registration_id: registrationId,
          name: sanitizeInput(member.name),
          email: member.email ? member.email.toLowerCase().trim() : null,
          phone: cleanMemberPhone || null,
        };
      });

      const { data: memberData, error: memError } = await supabase
        .from("team_members")
        .insert(teamMembers)
        .select();

      if (memError) {
        console.error("Team members insert error:", memError);
      } else if (memberData) {
        insertedTeamMembers = memberData;
        console.log(`Inserted ${memberData.length} team members`);
      }
    }

    // Backup to Google Sheets
    if (isConfigured()) {
      console.log("[GoogleSheets] Auto-syncing registration...");
      try {
        const registrationData = {
          id: registrationId,
          team_number: sanitizedData.team_number,
          event_slug: sanitizedData.event_slug,
          team_name: sanitizedData.team_name,
          lead_name: sanitizedData.lead_name,
          lead_email: sanitizedData.lead_email,
          lead_phone: sanitizedData.lead_phone,
          lead_college: sanitizedData.lead_college,
          team_size: parseInt(team_size) || 2,
          payment_amount: parseInt(payment_amount) || 0,
          transaction_id: sanitizedData.transaction_id,
          payment_status: "pending",
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Use inserted team members with IDs from Supabase
        await syncRegistrationToSheets(registrationData, insertedTeamMembers);
      } catch (sheetsError) {
        console.error("[GoogleSheets] Auto-sync failed:", sheetsError);
        // Don't fail registration if sheets sync fails
      }
    }

    // Send pending payment email
    console.log(
      "[EMAIL] Sending pending payment email to:",
      sanitizedData.lead_email,
    );
    try {
      const teamMembersData =
        members && members.length > 0
          ? members
              .map((m) => ({
                name: sanitizeInput(m.name),
                phone: m.phone ? m.phone.replace(/\s/g, "") : undefined,
              }))
              .filter((m) => m.name)
          : [];

      const emailFormData = new URLSearchParams({
        teamNumber: sanitizedData.team_number,
        teamName: sanitizedData.team_name,
        leadName: sanitizedData.lead_name,
        leadEmail: sanitizedData.lead_email,
        teamSize: team_size.toString(),
        amount: payment_amount.toString(),
        transactionId: sanitizedData.transaction_id || "N/A",
      });

      if (teamMembersData.length > 0) {
        emailFormData.append("teamMembers", JSON.stringify(teamMembersData));
      }

      const emailResponse = await fetch(
        "https://www.devupvjit.in/api/email/pending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: emailFormData.toString(),
        },
      );

      if (emailResponse.ok) {
        console.log("[EMAIL] Pending payment email sent successfully");
      } else {
        const errorText = await emailResponse.text();
        console.error("[EMAIL] Failed to send email:", errorText);
      }
    } catch (emailError) {
      console.error("[EMAIL] Error sending email:", emailError);
      // Don't fail registration if email fails
    }

    // Return success
    res.json({
      success: true,
      registrationId,
      teamNumber: sanitizedData.team_number,
      teamName: sanitizedData.team_name,
      leadName: sanitizedData.lead_name,
      leadEmail: sanitizedData.lead_email,
      teamSize: parseInt(team_size) || 2,
      paymentAmount: parseInt(payment_amount) || 0,
      transactionId: sanitizedData.transaction_id,
      message: "Registration successful! Check your email for confirmation.",
    });
  } catch (err) {
    console.error("Registration error:", err);
    // Don't expose internal error details to users
    res.status(500).json({
      error: "Registration failed",
      message:
        "An error occurred while processing your registration. Please try again or contact support.",
    });
  }
});

// POST /api/sync-sheets - Manual full backup to Google Sheets
app.post("/api/sync-sheets", async (_req, res) => {
  try {
    if (!isConfigured()) {
      return res.status(503).json({
        error: "Google Sheets backup not configured",
        message:
          "Missing credentials: GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, or GOOGLE_PRIVATE_KEY",
      });
    }

    console.log("[GoogleSheets] Starting manual full backup...");
    const result = await fullBackupToSheets(supabase);

    if (!result.success) {
      return res.status(500).json({
        error: "Backup failed",
        message: result.error,
      });
    }

    console.log("[GoogleSheets] Manual backup completed successfully");
    res.json({
      success: true,
      message: "Full backup completed",
      stats: result.stats,
    });
  } catch (err) {
    console.error("[GoogleSheets] Manual backup error:", err);
    res.status(500).json({ error: "Backup failed", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(
    `📊 Google Sheets backup: ${isConfigured() ? "✓ Enabled" : "✗ Disabled (missing credentials)"}`,
  );
});
