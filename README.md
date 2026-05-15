# Album Voting Website

A beautiful, interactive voting website for your album release schedule. Fans can vote on which song should be released next, with real-time vote tracking powered by Firebase.

## Features

✨ **Interactive Voting** - One-click voting with real-time results  
🎨 **Dark Blue & Black Theme** - Matches your album aesthetic  
🔒 **Song States** - Released, votable, and locked songs  
📱 **Mobile Responsive** - Works perfectly on all devices  
💬 **Lyric Previews** - Hover over songs to see lyric snippets  
⏱️ **Countdown Timer** - Shows time until next voting period/release  
📊 **Live Vote Counts** - Real-time vote tracking with visual bars  
🔥 **Firebase Powered** - Reliable, scalable, and free

## Track List

1. **Go Go Go** - Released July 17, 2026
2. Let's Get Away
3. Violence
4. Roles
5. **In Loving Memory** - Locked
6. Straight Talk
7. XACTO
8. You're Not Really From Manchester
9. Tax
10. Shattered
11. Think of Calling
12. **Glass** - Locked (Final Song)

## Voting Schedule

- **First Voting Period**: June 17 - July 1, 2026
- **First Release**: July 17, 2026 (Go Go Go)
- **Subsequent Periods**: 2 weeks of voting, release on the 17th of each month

## Quick Start

### 1. Set Up Firebase (Required)

Follow the detailed instructions in **[FIREBASE-SETUP.md](FIREBASE-SETUP.md)** to:
- Create a Firebase project
- Enable Realtime Database
- Get your configuration credentials
- Set up database rules

### 2. Configure the Website

Edit `config.js`:

```javascript
// Add your Firebase credentials
firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    // ... other config values
}

// Add lyric previews for each song
songs: [
    {
        number: 1,
        title: "Go Go Go",
        state: "released",
        lyricPreview: "Your lyric snippet here..."
    },
    // ... other songs
]
```

### 3. Deploy to Squarespace

Follow the detailed instructions in **[SQUARESPACE-DEPLOY.md](SQUARESPACE-DEPLOY.md)** to:
- Combine all files into one HTML file
- Add to Squarespace using a Code Block
- Test and publish

## File Structure

```
litmab-voting/
├── index.html              # Main HTML structure
├── styles.css              # Dark blue/black styling
├── config.js               # Configuration (Firebase, songs, dates)
├── voting.js               # Voting logic and Firebase integration
├── README.md               # This file
├── FIREBASE-SETUP.md       # Firebase setup instructions
└── SQUARESPACE-DEPLOY.md   # Squarespace deployment guide
```

## Configuration Options

In `config.js`, you can customize:

### Display Options
```javascript
display: {
    showVoteCounts: true,        // Show real-time vote counts
    allowMultipleVotes: false,   // Allow users to vote multiple times
    showCountdown: true          // Show countdown timer
}
```

### Song States
- **`released`** - Song is out, shows "Out Now"
- **`votable`** - Fans can vote for this song
- **`locked`** - Song is locked, shows lock icon

### Voting Periods
```javascript
votingPeriod: {
    start: "2026-06-17T00:00:00-04:00",  // Eastern Time
    end: "2026-07-01T23:59:59-04:00",
    nextRelease: "2026-07-17T00:00:00-04:00"
}
```

## Updating Between Voting Periods

After each voting period:

1. **Determine the Winner** - Check Firebase Console for vote counts
2. **Update config.js**:
   - Change winner's state from `"votable"` to `"released"`
   - Update voting period dates
   - Update next release date
3. **Reset Votes** - Delete the `votes` node in Firebase
4. **Redeploy** - Update the Code Block in Squarespace

### Example Update

```javascript
// After "Let's Get Away" wins
{
    number: 2,
    title: "Let's Get Away",
    state: "released",  // Changed from "votable"
    lyricPreview: "..."
}

// Update dates for next period
votingPeriod: {
    start: "2026-07-17T00:00:00-04:00",
    end: "2026-07-31T23:59:59-04:00",
    nextRelease: "2026-08-17T00:00:00-04:00"
}
```

## Testing Locally

1. Open `index.html` in a web browser
2. Open browser console (F12) to check for errors
3. Test voting functionality
4. Verify Firebase connection
5. Check that all songs display correctly

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Firebase Not Connecting
- Check that config values are correct
- Verify database rules are published
- Check browser console for errors

### Votes Not Saving
- Verify Firebase database rules allow write access
- Check that databaseURL is correct
- Ensure Firebase project is active

### Styles Not Showing
- Clear browser cache
- Check that styles.css is properly linked
- Verify CSS is included in combined HTML for Squarespace

### Mobile Issues
- Test on actual devices, not just browser emulation
- Check that viewport meta tag is present
- Verify touch events work for voting

## Security & Privacy

- **No Personal Data Collected** - Only vote counts are stored
- **Browser-Based Tracking** - localStorage prevents duplicate votes per browser
- **Public Voting** - No authentication required (by design)
- **Firebase Free Tier** - More than sufficient for thousands of votes

## Cost

**$0** - Everything uses free tiers:
- Firebase Realtime Database (free tier: 1GB storage, 10GB/month bandwidth)
- Squarespace (your existing plan)
- No additional services required

## Support & Documentation

- **Firebase Setup**: See [FIREBASE-SETUP.md](FIREBASE-SETUP.md)
- **Squarespace Deploy**: See [SQUARESPACE-DEPLOY.md](SQUARESPACE-DEPLOY.md)
- **Firebase Docs**: https://firebase.google.com/docs/database
- **Squarespace Help**: https://support.squarespace.com/

## Customization Ideas

Want to customize further? You can:
- Change colors in `styles.css`
- Add album art as a background
- Include audio previews for released songs
- Add social sharing buttons
- Display winner announcements
- Add animations for vote confirmations

## Credits

Built with:
- Vanilla JavaScript (no frameworks needed!)
- Firebase Realtime Database
- Modern CSS with gradients and animations
- Responsive design principles

## License

This is your project - use it however you like for your album release!

---

**Questions?** Check the documentation files or open the browser console to see detailed error messages.

**Ready to launch?** Follow FIREBASE-SETUP.md, then SQUARESPACE-DEPLOY.md!