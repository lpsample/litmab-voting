# How to Access Your Mailing List

## Overview
The mailing list form now saves directly to Firebase. You can access the data in multiple ways.

## What Gets Saved
Each submission includes:
- **Name**: Full name
- **Email**: Email address
- **Phone**: Phone number (optional)
- **Timestamp**: When they signed up
- **Source**: "voting_app"

## Method 1: Firebase Console (Easiest)

### Access the Data
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **litmab-voting**
3. Click **Realtime Database** in the left menu
4. Navigate to `/mailingList`
5. You'll see all submissions with their details

### Export to CSV
1. In Firebase Console → Realtime Database
2. Click the three dots (⋮) next to `/mailingList`
3. Select **Export JSON**
4. Save the file
5. Use an online JSON to CSV converter, or:

```bash
# Using Python
python3 -c "
import json
import csv

with open('mailingList.json') as f:
    data = json.load(f)

with open('mailingList.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Email', 'Phone', 'Timestamp'])
    
    for key, entry in data.items():
        writer.writerow([
            entry.get('name', ''),
            entry.get('email', ''),
            entry.get('phone', ''),
            entry.get('timestamp', '')
        ])

print('Exported to mailingList.csv')
"
```

## Method 2: Create an Admin Page

I can create a simple admin page that displays all mailing list entries in a table with export functionality.

Would you like me to create this?

## Method 3: Email Notifications (Optional)

Set up Firebase Cloud Functions to email you when someone joins:

```javascript
// This would require Firebase Cloud Functions (paid plan)
exports.notifyNewSubscriber = functions.database
    .ref('/mailingList/{pushId}')
    .onCreate((snapshot, context) => {
        const subscriber = snapshot.val();
        // Send email notification
    });
```

## Current Firebase Structure

```
litmab-voting (database)
├── votes/
│   ├── Go_Go_Go: 5
│   ├── XACTO: 3
│   └── ...
└── mailingList/
    ├── -NxAbCdEfGh123456/
    │   ├── name: "John Doe"
    │   ├── email: "john@example.com"
    │   ├── phone: "(555) 123-4567"
    │   ├── timestamp: "2026-06-05T20:15:30.000Z"
    │   └── source: "voting_app"
    ├── -NxAbCdEfGh123457/
    │   └── ...
    └── ...
```

## Quick Access Steps

1. **Visit**: https://console.firebase.google.com/
2. **Select**: litmab-voting project
3. **Click**: Realtime Database
4. **View**: /mailingList node
5. **Export**: Click ⋮ → Export JSON

## Security Note

The mailing list data is stored in Firebase with the same security rules as votes. Only you (as the Firebase project owner) can access this data through the console.

## Need an Admin Dashboard?

Let me know if you'd like me to create a simple admin page at `/admin.html` that shows:
- All mailing list entries in a table
- Search/filter functionality
- Export to CSV button
- Total subscriber count
- Recent signups

This would be password-protected and only accessible to you.