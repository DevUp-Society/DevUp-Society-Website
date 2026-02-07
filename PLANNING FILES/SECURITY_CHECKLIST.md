# 🔒 SECURITY CHECKLIST - DevUp Registration System

## ⚠️ CRITICAL: Environment Variables Verification

### 📦 **RENDER (Backend)** - Required Environment Variables
```bash
# Supabase Connection
SUPABASE_URL=https://xdxkmxzkbpwbukfkxphw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # NOT the anon key!

# Google Sheets Backup
GOOGLE_SHEETS_SPREADSHEET_ID=1F6r56OzyTBwbPI-66r7SZ-4CZTWUP6UKZ7brbon42aE
GOOGLE_SERVICE_ACCOUNT_EMAIL=devup-sheets-backup@devup-registration-backup.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."  # Include the quotes and \n

# Optional
PORT=3001  # Render sets this automatically
```

### 🌐 **VERCEL (Frontend)** - Required Environment Variables
```bash
# Public Variables (exposed to client)
PUBLIC_SUPABASE_URL=https://xdxkmxzkbpwbukfkxphw.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # The anon key (safe to expose)
PUBLIC_BACKEND_URL=https://devup-society-website.onrender.com

# Private Variables (server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # For admin operations
RESEND_API_KEY=re_...  # Your Resend API key
```

---

## 🛡️ SECURITY MEASURES CHECKLIST

### ✅ **Already Implemented**
- [x] Rate limiting (5 registrations per 5 minutes per IP)
- [x] Email validation and sanitization
- [x] Phone number validation (10-digit Indian mobile)
- [x] HTML escaping for all text inputs
- [x] Duplicate email prevention per event
- [x] Duplicate phone prevention per event
- [x] Duplicate transaction ID prevention
- [x] Input sanitization (XSS protection)
- [x] Service role key for backend operations (bypasses RLS)
- [x] CORS configured for specific origins

### 🔐 **CRITICAL: What You MUST Verify Right Now**

#### 1. **Check if .env file is in .gitignore**
```bash
# Run this in your terminal
git ls-files backend/.env
```
**Expected:** No output (file not tracked)  
**If tracked:** CRITICAL! Your secrets are in Git history!

**Fix if exposed:**
```powershell
# Remove from Git
git rm --cached backend/.env

# Add to .gitignore
echo "backend/.env" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove .env from tracking"
git push
```

#### 2. **Rotate Compromised Keys (If .env was committed)**
If your .env was ever committed to Git:
- [ ] Generate new Supabase Service Role Key
- [ ] Create new Google Service Account
- [ ] Generate new Resend API key
- [ ] Update all deployment environments

#### 3. **Verify Supabase RLS Policies**
```sql
-- Run these queries in Supabase SQL Editor

-- Check registrations table policies
SELECT * FROM pg_policies WHERE tablename = 'registrations';

-- Check team_members table policies
SELECT * FROM pg_policies WHERE tablename = 'team_members';
```

**Expected policies:**
- `registrations`: Only authenticated users (admin) can read/update
- `team_members`: Only authenticated users (admin) can read
- Backend uses service role key to bypass RLS for inserts

#### 4. **Verify CORS Configuration**
Check `backend/index.js` line ~24:
```javascript
app.use(cors({
  origin: [
    'https://www.devupvjit.in',
    'https://devupvjit.in',
    'http://localhost:4321'
  ],
  credentials: true
}));
```
- [ ] Remove localhost before production
- [ ] Add any additional production domains

#### 5. **Check Render Environment Variables**
Go to Render Dashboard → Your Service → Environment:
- [ ] All 5 variables present
- [ ] SUPABASE_SERVICE_ROLE_KEY is the SERVICE key (not anon)
- [ ] GOOGLE_PRIVATE_KEY has quotes and \n properly formatted

#### 6. **Check Vercel Environment Variables**
Go to Vercel Dashboard → Your Project → Settings → Environment Variables:
- [ ] All 5 variables present
- [ ] PUBLIC_* variables marked as "All Environments"
- [ ] SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY marked as "Production" only
- [ ] PUBLIC_BACKEND_URL points to Render (not localhost)

---

## 🚨 **URGENT: Security Vulnerabilities to Fix**

### 1. **Admin Authentication Weakness**
**Current Issue:** Admin emails are checked by simple substring match in code.

**Location:** `src/lib/auth.ts`

**Risk Level:** 🔴 HIGH

**Recommendation:**
```typescript
// Create Supabase table: admin_users (email: text, role: text)
// Insert admin emails there
// Check against database instead of hardcoded list
```

### 2. **No Admin Session Timeout**
**Current Issue:** Admin JWT tokens stored in localStorage never expire client-side.

**Risk Level:** 🟡 MEDIUM

**Recommendation:**
- Implement session timeout (15-30 minutes)
- Add refresh token mechanism
- Clear localStorage on window close

### 3. **No Request Logging**
**Current Issue:** No audit trail of who did what.

**Risk Level:** 🟡 MEDIUM

**Recommendation:**
```javascript
// Add logging middleware in backend/index.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});
```

### 4. **No Email Verification for Registrations**
**Current Issue:** Anyone can use any email address.

**Risk Level:** 🟡 MEDIUM

**Recommendation:**
- Send verification link before payment confirmation
- Or accept college emails only (@vjit.ac.in, etc.)

### 5. **Payment Screenshot Not Required**
**Current Issue:** Only transaction ID stored, no proof of payment.

**Risk Level:** 🟢 LOW (Manual verification catches this)

**Recommendation:**
- Add file upload for payment screenshot
- Store in Cloudinary or Supabase Storage

---

## 🔍 **Security Best Practices**

### **Network Security**
```javascript
// In backend/index.js - Add security headers
const helmet = require('helmet');
app.use(helmet());

// Add trust proxy setting for Render
app.set('trust proxy', 1);
```

### **Database Security**
1. **Enable Supabase RLS** on ALL tables
2. **Never expose service role key** to frontend
3. **Use row-level security** policies for fine-grained access
4. **Regular database backups** (enable in Supabase dashboard)

### **API Security**
1. **Rate limiting** ✅ (Already implemented)
2. **Input validation** ✅ (Already implemented)
3. **Request size limits**:
```javascript
app.use(express.json({ limit: '10mb' }));
```

### **Frontend Security**
1. **Never log sensitive data** to console
2. **Clear forms after submission**
3. **Validate on client AND server**
4. **Use HTTPS only** (check Vercel settings)

---

## 📋 **Pre-Launch Security Checklist**

### Before Opening Registrations:
- [ ] All environment variables verified on Render
- [ ] All environment variables verified on Vercel
- [ ] `.env` file NOT in Git repository
- [ ] CORS configured for production domains only
- [ ] Rate limiting tested and working
- [ ] Duplicate email/phone checks tested
- [ ] Admin login tested with correct credentials
- [ ] Payment verification flow tested end-to-end
- [ ] Google Sheets sync tested
- [ ] Email delivery tested (pending + verified)
- [ ] Error handling tested (invalid inputs)
- [ ] Mobile responsiveness verified
- [ ] WhatsApp group link tested and valid
- [ ] UPI payment QR code tested
- [ ] Supabase RLS policies enabled
- [ ] Helmet security headers added
- [ ] Request logging enabled
- [ ] Backup strategy in place
- [ ] Emergency contacts documented
- [ ] Rollback plan prepared

---

## 🆘 **Emergency Procedures**

### If Service Goes Down:
1. Check Render logs: Dashboard → Logs
2. Check Vercel logs: Dashboard → Deployments → Logs
3. Check Supabase status: status.supabase.com
4. Verify environment variables still present

### If Duplicate Registrations Occur:
```sql
-- Find duplicates in Supabase SQL Editor
SELECT lead_email, COUNT(*) 
FROM registrations 
WHERE event_slug = 'devthon-2026' 
GROUP BY lead_email 
HAVING COUNT(*) > 1;

-- Delete duplicates (keep oldest)
DELETE FROM registrations 
WHERE id NOT IN (
  SELECT MIN(id) 
  FROM registrations 
  GROUP BY lead_email, event_slug
);
```

### If Payment Fraud Detected:
1. Mark registration as 'rejected' in admin panel
2. Contact team lead via phone/email
3. Document in separate fraud log
4. Report to authorities if necessary

---

## 📞 **Security Contacts**

- **Backend Issues:** Check Render service logs
- **Frontend Issues:** Check Vercel deployment logs
- **Database Issues:** Check Supabase dashboard
- **Email Issues:** Check Resend dashboard (resend.com/emails)

---

## 🔄 **Regular Maintenance**

### Weekly:
- [ ] Review Render logs for errors
- [ ] Check Supabase storage usage
- [ ] Verify Google Sheets sync working

### Monthly:
- [ ] Review all environment variables
- [ ] Check for npm package updates
- [ ] Review admin access logs
- [ ] Backup spreadsheet data

### After Each Event:
- [ ] Export all registrations from Supabase
- [ ] Download Google Sheets backup
- [ ] Archive event data
- [ ] Clear test data if any

---

## ✅ **Final Security Verification**

Send me (the AI assistant) this information so I can verify your setup:

1. **Render Environment Variables** (just the keys, NO VALUES):
```
Example:
✓ SUPABASE_URL
✓ SUPABASE_SERVICE_ROLE_KEY
✓ GOOGLE_SHEETS_SPREADSHEET_ID
✓ GOOGLE_SERVICE_ACCOUNT_EMAIL
✓ GOOGLE_PRIVATE_KEY
```

2. **Vercel Environment Variables** (just the keys, NO VALUES):
```
Example:
✓ PUBLIC_SUPABASE_URL
✓ PUBLIC_SUPABASE_ANON_KEY
✓ PUBLIC_BACKEND_URL
✓ SUPABASE_SERVICE_ROLE_KEY
✓ RESEND_API_KEY
```

3. **Confirm:**
```
[ ] backend/.env is in .gitignore
[ ] No secrets in Git history
[ ] CORS configured correctly
[ ] Rate limiting tested
[ ] Admin login working
[ ] Emails sending successfully
```

---

**🔴 CRITICAL: Never commit real API keys, service role keys, or private keys to Git!**
