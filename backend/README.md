# DevUp Society Backend API

Simple Express backend for registration system.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```bash
cp .env.example .env
```

3. **Add your Supabase credentials to `.env`:**
```
SUPABASE_URL=https://xdxkmxzkbpwbukfkxphw.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3001
```

4. **Run locally:**
```bash
npm run dev
```

Server runs on `http://localhost:3001`

## Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this backend folder
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Railway will auto-deploy!

Your API will be at: `https://your-app.up.railway.app`

## API Endpoints

### GET /api/get-team-number
Get next team number for an event.

**Query Params:**
- `slug` (required) - Event slug

**Response:**
```json
{
  "teamNumber": "DEV2026-001"
}
```

### POST /api/register
Register a team.

**Body:**
```json
{
  "event_slug": "devthon-2026",
  "team_name": "Code Warriors",
  "lead_name": "John Doe",
  "lead_email": "john@example.com",
  "lead_phone": "1234567890",
  "lead_college": "VJIT",
  "team_number": "DEV2026-001",
  "payment_amount": 400,
  "transaction_id": "TXN123",
  "team_size": 2,
  "members": [
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "0987654321"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "registrationId": "uuid",
  "teamNumber": "DEV2026-001",
  "teamName": "Code Warriors",
  "leadName": "John Doe",
  "leadEmail": "john@example.com",
  "teamSize": 2,
  "paymentAmount": 400,
  "transactionId": "TXN123"
}
```

## Update Frontend

After deploying, update your frontend fetch calls:

```javascript
// OLD: /api/events/get-team-number
// NEW: https://your-app.up.railway.app/api/get-team-number

// OLD: /api/events/register  
// NEW: https://your-app.up.railway.app/api/register
```
