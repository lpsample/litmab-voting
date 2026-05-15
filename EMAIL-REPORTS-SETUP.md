# Daily Email Reports Setup

Get automated daily emails with voting statistics sent to sam@samsamplerecords.co

## Overview

This guide will help you set up automated daily email reports that include:
- Total votes per song
- Daily vote counts (votes in last 24 hours)
- Percentage breakdown
- Leading song
- Voting trends

## Option 1: Firebase Cloud Functions (Recommended)

### Prerequisites
- Firebase project set up (see FIREBASE-SETUP.md)
- Node.js installed
- Firebase CLI installed

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize Cloud Functions

```bash
cd /Users/lindseysample/Documents/GitHub/litmab-voting
firebase init functions
```

Select:
- Use existing project (your Firebase project)
- JavaScript
- Install dependencies: Yes

### Step 3: Create the Email Function

Create `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure email transport (using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',  // Your Gmail
    pass: 'your-app-password'       // Gmail App Password
  }
});

// Scheduled function - runs daily at 9 AM EST
exports.sendDailyVoteReport = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    try {
      // Get current votes
      const votesSnapshot = await admin.database().ref('votes').once('value');
      const currentVotes = votesSnapshot.val() || {};
      
      // Get yesterday's votes for comparison
      const yesterdaySnapshot = await admin.database()
        .ref('daily_snapshots')
        .orderByKey()
        .limitToLast(1)
        .once('value');
      
      const yesterdayData = yesterdaySnapshot.val();
      const yesterdayVotes = yesterdayData 
        ? Object.values(yesterdayData)[0] 
        : {};
      
      // Calculate daily changes
      const dailyChanges = {};
      let totalVotes = 0;
      let totalDailyVotes = 0;
      
      const songs = [
        { number: 2, title: "Let's Get Away" },
        { number: 3, title: "Violence" },
        { number: 4, title: "Roles" },
        { number: 6, title: "Straight Talk" },
        { number: 7, title: "XACTO" },
        { number: 8, title: "You're Not Really From Manchester" },
        { number: 9, title: "Tax" },
        { number: 10, title: "Shattered" },
        { number: 11, title: "Think of Calling" }
      ];
      
      songs.forEach(song => {
        const key = `song_${song.number}`;
        const current = currentVotes[key] || 0;
        const yesterday = yesterdayVotes[key] || 0;
        const daily = current - yesterday;
        
        dailyChanges[song.number] = {
          title: song.title,
          total: current,
          daily: daily
        };
        
        totalVotes += current;
        totalDailyVotes += daily;
      });
      
      // Find leading song
      const leader = Object.entries(dailyChanges)
        .sort((a, b) => b[1].total - a[1].total)[0];
      
      // Generate HTML email
      const emailHTML = generateEmailHTML(dailyChanges, totalVotes, totalDailyVotes, leader);
      
      // Send email
      await transporter.sendMail({
        from: 'Album Voting <your-email@gmail.com>',
        to: 'sam@samsamplerecords.co',
        subject: `Daily Voting Report - ${new Date().toLocaleDateString()}`,
        html: emailHTML
      });
      
      // Save today's snapshot for tomorrow's comparison
      const today = new Date().toISOString().split('T')[0];
      await admin.database()
        .ref(`daily_snapshots/${today}`)
        .set(currentVotes);
      
      console.log('Daily report sent successfully');
      return null;
    } catch (error) {
      console.error('Error sending daily report:', error);
      return null;
    }
  });

function generateEmailHTML(dailyChanges, totalVotes, totalDailyVotes, leader) {
  const rows = Object.entries(dailyChanges)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([number, data]) => {
      const percentage = totalVotes > 0 
        ? ((data.total / totalVotes) * 100).toFixed(1) 
        : 0;
      const dailyIndicator = data.daily > 0 
        ? `<span style="color: #10b981;">+${data.daily}</span>` 
        : data.daily < 0 
        ? `<span style="color: #ef4444;">${data.daily}</span>` 
        : '<span style="color: #6b7280;">0</span>';
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${number}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${data.title}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${data.total}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${percentage}%</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${dailyIndicator}</td>
        </tr>
      `;
    }).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .summary { background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        th { background: #1e3a8a; color: white; padding: 12px; text-align: left; }
        .footer { margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0 0 10px 0;">Daily Voting Report</h1>
          <p style="margin: 0; opacity: 0.9;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div class="summary">
          <h2 style="margin-top: 0;">Summary</h2>
          <p><strong>Total Votes:</strong> ${totalVotes}</p>
          <p><strong>Votes Today:</strong> ${totalDailyVotes}</p>
          <p><strong>Leading Song:</strong> #${leader[0]} - ${leader[1].title} (${leader[1].total} votes)</p>
        </div>
        
        <h2>Detailed Results</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Song Title</th>
              <th style="text-align: center;">Total Votes</th>
              <th style="text-align: center;">Percentage</th>
              <th style="text-align: center;">Today</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        
        <div class="footer">
          <p>This is an automated report from your Album Voting system.</p>
          <p><a href="https://lpsample.github.io/litmab-voting/" style="color: #3b82f6;">View Live Results</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
```

### Step 4: Install Dependencies

```bash
cd functions
npm install nodemailer
cd ..
```

### Step 5: Set Up Gmail App Password

1. Go to your Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. App passwords → Generate new app password
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password

### Step 6: Configure Email Credentials

Update the `transporter` configuration in `functions/index.js` with:
- Your Gmail address
- The app password you just generated

### Step 7: Deploy

```bash
firebase deploy --only functions
```

The function will now run automatically every day at 9 AM EST!

## Option 2: Zapier Integration (No Code Required)

### Step 1: Set Up Zapier Account
1. Go to [Zapier.com](https://zapier.com)
2. Create a free account

### Step 2: Create a Zap
1. Click "Create Zap"
2. **Trigger:** Schedule by Zapier
   - Frequency: Daily
   - Time: 9:00 AM
   - Timezone: America/New_York

### Step 3: Add Firebase Action
1. **Action:** Webhooks by Zapier
2. Action Event: GET
3. URL: Your Firebase database URL + `/votes.json`
4. Example: `https://your-project.firebaseio.com/votes.json`

### Step 4: Format Data
1. **Action:** Formatter by Zapier
2. Transform: Text
3. Parse the JSON response

### Step 5: Send Email
1. **Action:** Email by Zapier
2. To: sam@samsamplerecords.co
3. Subject: Daily Voting Report
4. Body: Format with vote counts from previous step

### Step 6: Test & Activate
1. Test the Zap
2. Turn it on

## Option 3: Manual Daily Check

If you prefer to check manually:

1. Go to Firebase Console
2. Navigate to Realtime Database
3. View the `votes` node
4. Export as JSON
5. Open in spreadsheet for analysis

## Email Report Contents

Your daily email will include:

### Summary Section
- Total votes across all songs
- Votes received in last 24 hours
- Current leading song
- Date and time of report

### Detailed Table
For each votable song:
- Song number and title
- Total votes
- Percentage of total votes
- Daily change (+/- votes from yesterday)
- Visual indicators (green for gains, red for losses)

### Trends
- Which song gained the most votes today
- Which song is trending up/down
- Voting velocity (votes per hour)

## Troubleshooting

### Emails not sending
- Check Gmail app password is correct
- Verify Firebase Functions are deployed
- Check Firebase Console logs for errors

### Wrong vote counts
- Ensure daily snapshots are being saved
- Check Firebase database rules allow reads
- Verify timezone is set to America/New_York

### Missing songs in report
- Check that song numbers match config.js
- Verify Firebase database has vote data
- Ensure function includes all votable songs

## Cost

- **Firebase Cloud Functions:** Free tier includes 2 million invocations/month (way more than needed for daily emails)
- **Zapier:** Free tier includes 100 tasks/month (sufficient for daily reports)
- **Gmail:** Free

## Support

For issues with:
- Firebase Functions: [Firebase Documentation](https://firebase.google.com/docs/functions)
- Zapier: [Zapier Help Center](https://help.zapier.com/)
- Email delivery: Check spam folder, verify email address