# Firebase Setup Guide

This guide will help you set up Firebase for your album voting website to enable real-time vote tracking.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "album-voting")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Give your app a nickname (e.g., "Album Voting Site")
3. **Do NOT** check "Also set up Firebase Hosting" (we're using Squarespace)
4. Click "Register app"
5. You'll see your Firebase configuration object - **copy this**, you'll need it soon

The config will look like this:
```javascript
{
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
}
```

## Step 3: Enable Realtime Database

1. In the Firebase Console, click on **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose a location (select **United States** for best performance in EST)
4. Start in **"locked mode"** (we'll set up rules next)
5. Click "Enable"

## Step 4: Set Up Database Rules

1. In the Realtime Database section, click on the **"Rules"** tab
2. Replace the default rules with the following:

```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true,
      "$songId": {
        ".validate": "newData.isNumber() && newData.val() >= 0"
      }
    }
  }
}
```

3. Click **"Publish"**

### What These Rules Do:
- **`.read: true`** - Anyone can read vote counts (so they display on the website)
- **`.write: true`** - Anyone can write votes (allows voting without authentication)
- **`.validate`** - Ensures votes are positive numbers

### Security Note:
These rules allow anyone to vote. For production, you might want to add rate limiting or require authentication. For a fan voting site, this simple setup works well.

## Step 5: Update Your Config File

1. Open `config.js` in your project
2. Find the `firebase` section
3. Replace the placeholder values with your actual Firebase config:

```javascript
firebase: {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
}
```

## Step 6: Test Your Setup

1. Open `index.html` in a web browser
2. Open the browser console (F12 or right-click → Inspect → Console)
3. You should see: `Firebase initialized successfully`
4. Try voting on a song
5. Check the Firebase Console → Realtime Database → Data tab
6. You should see vote counts appearing under `votes/song_X`

## Viewing Vote Results

### In Firebase Console:
1. Go to Realtime Database → Data
2. You'll see a structure like:
```
votes
  ├── song_2: 15
  ├── song_3: 23
  ├── song_4: 8
  └── ...
```

### Export to Spreadsheet:
1. In the Data tab, click the three dots menu
2. Select "Export JSON"
3. You can convert this to a spreadsheet to analyze results

## Resetting Votes Between Periods

When starting a new voting period:

1. Go to Firebase Console → Realtime Database → Data
2. Click on the `votes` node
3. Click the three dots → Delete
4. Confirm deletion
5. Votes will start fresh at 0 for the new period

## Troubleshooting

### "Firebase initialization error"
- Check that all config values are correct
- Make sure there are no extra quotes or spaces
- Verify your Firebase project is active

### Votes not appearing
- Check browser console for errors
- Verify database rules are published
- Make sure databaseURL is correct (should end with `.firebaseio.com`)

### "Permission denied" errors
- Check that database rules allow read/write
- Verify rules are published (not just saved)

## Cost

Firebase Realtime Database has a **free tier** that includes:
- 1 GB stored data
- 10 GB/month downloaded data
- 100 simultaneous connections

For a voting website with thousands of fans, this should be more than sufficient. You'll only pay if you exceed these limits.

## Support

If you need help:
- [Firebase Documentation](https://firebase.google.com/docs/database)
- [Firebase Support](https://firebase.google.com/support)