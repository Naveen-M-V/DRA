# Email Verification & Lead Tracking Setup

## Gmail App Password Setup (Google SMTP)

To enable email verification with Google SMTP, follow these steps:

### 1. Enable 2-Factor Authentication
- Go to https://myaccount.google.com/security
- Select "2-Step Verification"
- Follow the prompts to enable it

### 2. Generate App Password
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer" (or your device)
- Google will generate a 16-character app password
- Copy this password

### 3. Update Environment Variables
Create/update your `.env.local` (development) or `.env.production` (server):

```env
GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace the spaces - the password is exactly 16 characters with no spaces in the env file.

## Features Implemented

### Email Verification Flow
1. User enters email → gets 6-digit code via email
2. User enters code to verify → if valid, proceeds to form
3. User completes form with name & phone
4. Form submission:
   - Saves to local JSON file (`data/leads.json`)
   - Also sends to Sell.do API
   - Returns confirmation

### Lead Tracking (No Database)
- **File-based storage**: `data/leads.json`
- **Automatic cleanup**: Handles file creation/updates
- **Statistics API**: `/api/stats`
- **Admin Dashboard**: `/admin/stats`

## API Endpoints

### Send Verification Code
```bash
POST /api/leads/verification
Body: { "action": "send-code", "email": "user@example.com" }
```

### Verify Code
```bash
POST /api/leads/verification
Body: { "action": "verify-code", "email": "user@example.com", "code": "123456" }
```

### Submit Form
```bash
POST /api/leads/verification
Body: {
  "action": "submit",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91XXXXXXXXXX",
  "code": "123456",
  "srd": "project_srd",
  "campaignName": "Campaign Name",
  "project": "Project Name",
  "source": "google"
}
```

### Get Statistics
```bash
GET /api/stats
Response: {
  "totalLeads": 5,
  "byProject": { "DRA Secura": 3, "DRA Inara": 2 },
  "byCampaign": { "Campaign 1": 5 },
  "byDate": { "3/3/2026": 5 },
  "recentLeads": [...]
}
```

### Filter by Project
```bash
GET /api/stats?filter=project&value=DRA%20Secura
```

### Filter by Campaign
```bash
GET /api/stats?filter=campaign&value=Campaign%20Name
```

## Verification Code Details
- **Length**: 6 digits
- **Expiration**: 10 minutes
- **Storage**: In-memory (Node.js process memory)
- **Auto-cleanup**: Expired codes removed every 5 minutes

## Admin Dashboard
- **URL**: `/admin/stats`
- **Shows**:
  - Total leads count
  - Breakdown by project
  - Breakdown by campaign
  - Breakdown by date
  - Recent 10 submissions with details
  - Full table with name, email, phone, project, date

## Local Storage File Structure
```json
[
  {
    "id": "lead_1709520000000_abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "srd": "69a5388ee114870948f05f6a",
    "project": "DRA Secura",
    "campaignName": "DRA Secura - WALK-St NRI Google",
    "submittedAt": "2026-03-03T10:00:00.000Z",
    "timestamp": 1709520000000
  }
]
```

## Development Testing

### Test Email Verification
```bash
curl -X POST http://localhost:3000/api/leads/verification \
  -H "Content-Type: application/json" \
  -d '{"action":"send-code","email":"test@example.com"}'
```

### Check Stats
```bash
curl http://localhost:3000/api/stats
```

## Production Deployment

1. Update `.env.production` on server with Gmail credentials
2. Ensure `data/` directory exists and is writable
3. Restart PM2 after env changes:
   ```bash
   pm2 reload ecosystem.config.cjs --update-env
   ```

## Notes
- All verification codes are **in-memory** - they don't persist across server restarts
- Lead data is **file-based JSON** - persists across restarts
- No database dependency = lightweight, easy to backup
- Sell.do integration still works in parallel (dual submission)
