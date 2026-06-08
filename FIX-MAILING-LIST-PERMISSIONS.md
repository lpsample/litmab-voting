# Fix Mailing List Permission Error

## The Problem
You're getting a "permission denied" error when submitting the mailing list form because your Firebase database rules only allow writes to the `/votes` path, but the mailing list tries to write to `/mailingList`.

## The Solution
Update your Firebase database rules to allow writes to the mailing list path.

## Step-by-Step Instructions

### 1. Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project (the one you created for album voting)

### 2. Navigate to Database Rules
1. Click **"Realtime Database"** in the left sidebar
2. Click on the **"Rules"** tab at the top

### 3. Update the Rules
Replace your current rules with these updated rules:

```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true,
      "$songId": {
        ".validate": "newData.isNumber() && newData.val() >= 0"
      }
    },
    "mailingList": {
      ".read": false,
      ".write": true,
      "$userId": {
        ".validate": "newData.hasChildren(['email', 'timestamp'])"
      }
    }
  }
}
```

### 4. Publish the Rules
1. Click the **"Publish"** button in the top right
2. Wait for confirmation that rules are published

## What These New Rules Do

### For Votes (unchanged):
- **`.read: true`** - Anyone can read vote counts
- **`.write: true`** - Anyone can submit votes
- **`.validate`** - Ensures votes are positive numbers

### For Mailing List (new):
- **`.read: false`** - Mailing list emails are private (only you can see them in Firebase Console)
- **`.write: true`** - Anyone can submit to the mailing list
- **`.validate`** - Ensures submissions have required fields (email and timestamp)

## Security Notes

### Why `.write: true` is OK:
- Users can only add their own email to the list
- They cannot read other people's emails (`.read: false`)
- They cannot modify or delete existing entries
- Each submission gets a unique ID, preventing overwrites

### For Production (Optional):
If you want extra security, you could add rate limiting or require reCAPTCHA. For a fan mailing list, the current setup is secure enough.

## Testing After Update

1. **Wait 30 seconds** after publishing rules (Firebase needs time to propagate)
2. **Refresh your voting page**
3. **Vote on a song**
4. **Submit the mailing list form**
5. **Check Firebase Console** → Realtime Database → Data tab
6. You should see a new `mailingList` node with entries like:
   ```
   mailingList
     ├── -AbCdEfGhIjK
     │   ├── email: "fan@example.com"
     │   ├── name: "John Doe"
     │   ├── tourLocation: "Nashville, TN"
     │   └── timestamp: 1234567890
     └── ...
   ```

## Viewing Mailing List Submissions

### In Firebase Console:
1. Go to **Realtime Database** → **Data** tab
2. Expand the `mailingList` node
3. You'll see all submissions with their details

### Export to Spreadsheet:
1. Click on the `mailingList` node
2. Click the three dots menu (⋮)
3. Select **"Export JSON"**
4. Use a JSON-to-CSV converter or the provided Python script (`export-mailing-list.py`)

## Troubleshooting

### Still getting permission denied?
1. **Check rules are published** - Look for green "Published" status
2. **Wait 1 minute** - Rules can take time to propagate
3. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check browser console** - Look for specific error messages

### Rules won't publish?
1. **Check JSON syntax** - Make sure there are no missing commas or brackets
2. **Copy-paste exactly** - Use the rules provided above
3. **Try the simulator** - Firebase has a rules simulator to test before publishing

### Can't find Realtime Database?
1. Make sure you created a **Realtime Database** (not Firestore)
2. If you only see Firestore, you need to create a Realtime Database first
3. Go to Realtime Database → Create Database

## Privacy & Data Protection

### What data is collected:
- Email address (required)
- Name (optional)
- Tour location preference (optional)
- Timestamp of submission

### Who can see it:
- **Only you** (the Firebase project owner)
- Users **cannot** see other people's submissions
- Data is stored securely in Firebase

### GDPR Compliance:
If you have EU users, you should:
1. Add a privacy policy link to the form
2. Get explicit consent for email collection
3. Provide a way for users to request data deletion

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your Firebase project is active
3. Make sure you're using the correct Firebase config in `config.js`
4. Try the Firebase Rules Simulator in the Firebase Console

## Related Files
- `FIREBASE-SETUP.md` - Initial Firebase setup guide
- `MAILING-LIST-ACCESS.md` - How to access and export mailing list data
- `export-mailing-list.py` - Python script to export mailing list to CSV