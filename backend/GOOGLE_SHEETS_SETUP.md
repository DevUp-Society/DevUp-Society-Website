# Google Sheets Backup Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it: "DevUp Registration Backup"

## Step 2: Enable Google Sheets API

1. In Google Cloud Console → **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click **Enable**

## Step 3: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name: "devup-sheets-backup"
4. Role: **Editor** (or create custom role with Sheets access)
5. Click **Done**

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. **Add Key** → **Create new key** → **JSON**
4. Download the JSON file (keep it secure!)

The JSON file will look like:
```json
{
  "type": "service_account",
  "project_id": "devup-backup-xxxxx",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "devup-sheets-backup@devup-backup-xxxxx.iam.gserviceaccount.com",
  "client_id": "xxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

## Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: "DevUp Registration Backup"
4. Create two sheets:
   - **Registrations** (for main data)
   - **Team Members** (for additional members)
5. Copy the **Spreadsheet ID** from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## Step 6: Share Sheet with Service Account

1. In your Google Sheet, click **Share**
2. Add the service account email (from JSON: `client_email`)
3. Give it **Editor** access
4. Click **Done**

## Step 7: Add to Environment Variables

Add these to your `backend/.env`:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important:** The private key must keep the `\n` characters!

## Step 8: Add to Render Environment Variables

1. Go to Render dashboard → Your service → Environment
2. Add the same 3 variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
3. For the private key, copy the entire value including `-----BEGIN` and `-----END`

## Step 9: Test Connection

After setting up, the backend will automatically sync registrations to Google Sheets.

You can also manually trigger sync from the admin panel.

## Step 9: Test the Integration

After deploying to Render with the environment variables:

1. **Test Auto-Sync**: Register a new team on your website. Check the Google Sheet - a new row should appear automatically in both "Registrations" and "Team Members" sheets.

2. **Test Manual Sync**: Go to your admin panel at `/admin/payments` and click the "Sync to Sheets" button in the header. This will backup all registrations and team members from Supabase to Google Sheets.

3. **Check Render Logs**: Look for these log messages:
   ```
   [GoogleSheets] ✓ Client initialized successfully
   [GoogleSheets] Auto-syncing registration...
   [GoogleSheets] ✓ Synced registration + X team members
   ```

## Checklist

- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created with Editor role
- [ ] JSON key downloaded
- [ ] Google Sheet created with two sheets: "Registrations" and "Team Members"
- [ ] Sheet shared with service account email (Editor permission)
- [ ] GOOGLE_SHEETS_SPREADSHEET_ID added to Render env vars
- [ ] GOOGLE_SERVICE_ACCOUNT_EMAIL added to Render env vars
- [ ] GOOGLE_PRIVATE_KEY added to Render env vars (with \n escaped)
- [ ] Backend redeployed on Render
- [ ] Auto-sync tested (register new team)
- [ ] Manual sync tested (click button in admin panel)

## Backend Code Files

The following files handle Google Sheets integration:

- **backend/googleSheets.js**: Core Google Sheets API functions
  - `syncRegistrationToSheets()`: Auto-sync single registration after submit
  - `fullBackupToSheets()`: Manual sync all data to sheets
  - `isConfigured()`: Check if credentials are present

- **backend/index.js**: API endpoints
  - Auto-sync call after successful registration
  - POST `/api/sync-sheets`: Manual backup endpoint

- **src/pages/admin/payments.astro**: Admin UI
  - "Sync to Sheets" button in header
  - Calls backend sync endpoint

## Troubleshooting

- **403 Error:** Make sure the service account email is shared with the spreadsheet
- **Auth Error:** Check that private key is correctly formatted with `\n` preserved
- **API Not Enabled:** Verify Google Sheets API is enabled in Cloud Console
