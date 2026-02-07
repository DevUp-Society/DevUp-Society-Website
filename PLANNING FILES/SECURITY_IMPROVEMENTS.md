# 🛡️ Security Improvements - Implementation Guide

## Implementation Status: Ready to Apply

### 1. Add Security Headers (Helmet)

**File:** `backend/index.js`

**Install:**
```powershell
cd backend
npm install helmet
```
    
**Add after line 11 (after express imports):**
```javascript
const helmet = require('helmet');
```

**Add after line 22 (after CORS setup):**
```javascript
// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Trust proxy for Render.com
app.set('trust proxy', 1);
```

---

### 2. Add Request Logging

**File:** `backend/index.js`

**Add after security headers setup:**
```javascript
// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('user-agent') || 'Unknown';
  
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  console.log(`  IP: ${ip}`);
  console.log(`  User-Agent: ${userAgent}`);
  
  // Log body for POST requests (sanitized)
  if (req.method === 'POST' && req.body) {
    const sanitizedBody = { ...req.body };
    // Remove sensitive fields from logs
    delete sanitizedBody.transaction_id;
    delete sanitizedBody.lead_phone;
    delete sanitizedBody.lead_email;
    console.log(`  Body: ${JSON.stringify(sanitizedBody).substring(0, 200)}`);
  }
  
  next();
});
```

---

### 3. Add Request Size Limits

**File:** `backend/index.js`

**Replace existing express.json() line (around line 20):**
```javascript
// Before:
app.use(express.json());

// After:
app.use(express.json({ limit: '5mb' })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
```

---

### 4. Improve Admin Authentication

**File:** `src/lib/auth.ts`

**Current implementation hardcodes admin emails. Recommended improvement:**

**Option A: Create Supabase Admin Table**
```sql
-- Run in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only service role can read
CREATE POLICY "Service role can read admin_users"
  ON admin_users FOR SELECT
  TO service_role
  USING (true);

-- Insert yourself as admin
INSERT INTO admin_users (email, role)
VALUES ('your-admin-email@example.com', 'super_admin');
```

**Then update `src/lib/auth.ts`:**
```typescript
import { supabaseAdmin } from './supabaseAdmin';

export async function isAdmin(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('email, role')
      .eq('email', email.toLowerCase().trim())
      .single();
    
    if (error || !data) {
      console.log('Admin check failed:', email);
      return false;
    }
    
    // Update last login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('email', email);
    
    return true;
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
}
```

---

### 5. Add Session Timeout

**File:** `src/pages/admin/payments.astro` (and login.astro)

**Add at the top of `<script>` section:**
```javascript
// Session timeout management
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
let sessionTimer;

function resetSessionTimer() {
  if (sessionTimer) clearTimeout(sessionTimer);
  
  sessionTimer = setTimeout(() => {
    alert('Your session has expired. Please log in again.');
    localStorage.removeItem('supabase_token');
    window.location.href = '/admin/login';
  }, SESSION_TIMEOUT);
}

// Reset timer on user activity
['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
  document.addEventListener(event, resetSessionTimer, true);
});

// Start timer
resetSessionTimer();
```

---

### 6. Improve CORS Configuration

**File:** `backend/index.js`

**Update CORS setup (around line 20):**
```javascript
// Remove localhost in production
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://www.devupvjit.in',
      'https://devupvjit.in'
    ]
  : [
      'https://www.devupvjit.in',
      'https://devupvjit.in',
      'http://localhost:4321',
      'http://localhost:3000'
    ];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 7. Add Email Domain Validation

**File:** `backend/index.js`

**Add after validatePhone function (around line 60):**
```javascript
// Validate college email domains (optional - for stricter verification)
function validateEmailDomain(email) {
  const allowedDomains = [
    '@vjit.ac.in',
    '@gmail.com',
    '@outlook.com',
    '@yahoo.com',
    // Add more allowed domains
  ];
  
  return allowedDomains.some(domain => email.toLowerCase().endsWith(domain));
}
```

**Then in registration route, add check:**
```javascript
// After: if (!validateEmail(lead_email)) { ... }
// Add:
if (!validateEmailDomain(sanitizedData.lead_email)) {
  return res.status(400).json({ 
    error: 'Invalid email domain. Please use your college email or a valid personal email.' 
  });
}
```

---

### 8. Add Honeypot Field (Anti-Bot)

**File:** `src/pages/events/[slug]/register.astro`

**Add hidden honeypot field in form (bots will fill it, humans won't see it):**
```html
<!-- Add after team_number hidden field -->
<input 
  type="text" 
  name="website" 
  value="" 
  style="position: absolute; left: -9999px; width: 1px; height: 1px;"
  tabindex="-1"
  autocomplete="off"
/>
```

**In backend/index.js registration route, check honeypot:**
```javascript
// Add at the start of POST /api/register
if (req.body.website && req.body.website.trim() !== '') {
  console.log('[SECURITY] Bot detected - honeypot filled');
  return res.status(400).json({ error: 'Invalid request' });
}
```

---

### 9. Add IP-Based Duplicate Detection

**File:** `backend/index.js`

**In registration route, add IP tracking:**
```javascript
// After sanitizing data, before duplicate checks
const clientIp = req.ip || req.connection.remoteAddress;

// Check if same IP registered too many times (prevent spam)
const { data: ipRegistrations } = await supabase
  .from('registrations')
  .select('id')
  .eq('event_slug', sanitizedData.event_slug)
  .eq('ip_address', clientIp);

if (ipRegistrations && ipRegistrations.length >= 3) {
  console.log(`[SECURITY] IP ${clientIp} exceeded registration limit`);
  return res.status(429).json({ 
    error: 'Too many registrations from this IP address. Please contact support.' 
  });
}
```

**Add ip_address field to registration insert:**
```javascript
// In registration insert
{
  // ... existing fields ...
  ip_address: clientIp
}
```

**Update Supabase schema:**
```sql
-- Run in Supabase SQL Editor
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS ip_address TEXT;

CREATE INDEX IF NOT EXISTS idx_registrations_ip 
ON registrations(ip_address);
```

---

### 10. Add Environment Variable Validation

**File:** `backend/index.js`

**Add at the very start (after imports, before creating supabase client):**
```javascript
// Environment variable validation
function validateEnvironment() {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];
  
  const optional = [
    'GOOGLE_SHEETS_SPREADSHEET_ID',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ CRITICAL: Missing required environment variables:', missing);
    process.exit(1);
  }
  
  const missingOptional = optional.filter(key => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn('⚠️ WARNING: Missing optional environment variables:', missingOptional);
    console.warn('Google Sheets backup will be disabled');
  }
  
  console.log('✅ Environment variables validated successfully');
}

// Call it immediately
validateEnvironment();
```

---

## 📦 Installation Steps

```powershell
# Navigate to backend
cd backend

# Install new security packages
npm install helmet

# Commit changes
cd ..
git add .
git commit -m "feat: add security improvements (helmet, logging, validation)"
git push

# Deploy will happen automatically on Render
```

---

## 🔍 Testing Security Improvements

### 1. Test Rate Limiting
```powershell
# Try to register 6 times quickly (should be blocked after 5)
# Use Postman or curl
```

### 2. Test CORS
```javascript
// Try to make request from unauthorized origin
fetch('https://your-backend.onrender.com/api/get-team-number?slug=test', {
  method: 'GET',
  headers: { 'Origin': 'https://evil-site.com' }
})
// Should be blocked
```

### 3. Test Honeypot
```javascript
// Try to submit form with honeypot filled
formData.append('website', 'spam');
// Should be rejected
```

### 4. Test Session Timeout
```javascript
// Log in to admin panel, wait 30 minutes
// Should auto-logout
```

---

## ✅ After Implementation Checklist

- [ ] Helmet installed and configured
- [ ] Request logging working (check Render logs)
- [ ] Request size limits applied
- [ ] Admin table created in Supabase (if using Option A)
- [ ] Session timeout implemented
- [ ] CORS updated for production
- [ ] Email domain validation working
- [ ] Honeypot field added and tested
- [ ] IP-based duplicate detection working
- [ ] Environment validation on startup
- [ ] All tests passing
- [ ] Deployed to production
- [ ] Monitoring in place

---

## 📊 Monitoring Commands

**Check Render logs:**
```bash
# In Render Dashboard → Logs
# Filter for: [SECURITY], [ERROR], [WARNING]
```

**Check Supabase logs:**
```sql
-- Recent registrations
SELECT created_at, team_number, lead_email, ip_address 
FROM registrations 
ORDER BY created_at DESC 
LIMIT 20;

-- Find duplicate IPs
SELECT ip_address, COUNT(*) as count 
FROM registrations 
GROUP BY ip_address 
HAVING COUNT(*) > 2
ORDER BY count DESC;
```

---

**Priority Order:**
1. 🔴 Environment validation (#10)
2. 🔴 Security headers (#1)
3. 🔴 Request logging (#2)
4. 🟡 Session timeout (#5)
5. 🟡 Honeypot (#8)
6. 🟢 Others as needed
