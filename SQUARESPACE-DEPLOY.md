# Squarespace Deployment Guide

This guide will walk you through deploying your album voting website to Squarespace.

## Prerequisites

- A Squarespace website (any plan that supports Code Blocks)
- Firebase setup completed (see FIREBASE-SETUP.md)
- Your config.js file updated with Firebase credentials and lyric previews

## Deployment Method

Squarespace doesn't allow you to upload multiple files directly, so we'll use a **Code Block** with all the code embedded in a single HTML file.

## Step 1: Create the All-in-One HTML File

We need to combine all files (HTML, CSS, JS) into one file for Squarespace.

1. Create a new file called `album-voting-complete.html`
2. Copy the template below and save it

### Complete HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Album Release Voting</title>
    <style>
        /* Paste the ENTIRE contents of styles.css here */
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Vote for the Next Release</h1>
            <div class="voting-period" id="votingPeriod">
                <p>Voting Period: <span id="periodDates">June 17 - July 1, 2026</span></p>
                <p>Next Release: <span id="nextRelease">July 17, 2026</span></p>
            </div>
            <div class="countdown" id="countdown"></div>
        </header>

        <main>
            <div class="tracklist" id="tracklist">
                <!-- Songs will be dynamically generated here -->
            </div>
        </main>

        <footer>
            <p>Click on any votable song to cast your vote. Hover over songs to preview lyrics.</p>
        </footer>
    </div>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js"></script>
    
    <script>
        // Paste the ENTIRE contents of config.js here (including the CONFIG object)
    </script>
    
    <script>
        // Paste the ENTIRE contents of voting.js here
    </script>
</body>
</html>
```

## Step 2: Combine Your Files

1. Open `styles.css` and copy ALL the content
2. Paste it between the `<style>` tags in the template above
3. Open `config.js` and copy ALL the content
4. Paste it in the first `<script>` section (after the Firebase SDK scripts)
5. Open `voting.js` and copy ALL the content
6. Paste it in the second `<script>` section
7. Save the file as `album-voting-complete.html`

## Step 3: Add to Squarespace

### Option A: Using Code Block (Recommended)

1. Log in to your Squarespace website
2. Navigate to the page where you want the voting to appear
3. Click **Edit** on that page
4. Click the **+** button to add a new block
5. Search for and select **Code**
6. In the code block settings:
   - Set **Display Source** to **HTML**
   - Paste your complete HTML file content
7. Click **Apply**
8. Save and publish your page

### Option B: Using Embed Block

1. Follow steps 1-4 from Option A
2. Search for and select **Embed**
3. Paste your complete HTML file content
4. Click **Set**
5. Save and publish your page

## Step 4: Test Your Deployment

1. Visit your Squarespace page in a browser
2. Open browser console (F12) to check for errors
3. Verify:
   - All 12 songs appear
   - Go Go Go shows as "Out Now"
   - In Loving Memory and Glass show as "Locked 🔒"
   - Other songs show as "Vote"
   - Hover tooltips work
   - Countdown timer is running
   - Voting works (click a vote button)
4. Check Firebase Console to see if votes are recorded

## Step 5: Mobile Testing

Test on mobile devices:
1. Visit the page on your phone
2. Check that layout is responsive
3. Test voting functionality
4. Verify tooltips work on mobile (tap to see)

## Updating Between Voting Periods

When you need to update the site (e.g., after a voting period ends):

1. Edit your local `config.js` file:
   - Change the winning song's state to "released"
   - Update voting period dates
   - Update next release date
2. Recreate the combined HTML file (Steps 1-2)
3. In Squarespace, edit the Code Block
4. Replace the old code with your new combined HTML
5. Save and publish

### Quick Update Example

After "Let's Get Away" wins the first vote:

```javascript
// In config.js, change:
{
    number: 2,
    title: "Let's Get Away",
    state: "released",  // Changed from "votable"
    lyricPreview: "..."
}

// And update dates:
votingPeriod: {
    start: "2026-07-17T00:00:00-04:00",
    end: "2026-07-31T23:59:59-04:00",
    nextRelease: "2026-08-17T00:00:00-04:00"
}
```

## Troubleshooting

### Styles not appearing
- Make sure you copied ALL of styles.css including the opening `*` selector
- Check that styles are between `<style>` tags, not `<script>` tags

### Voting not working
- Check browser console for Firebase errors
- Verify Firebase config is correct in config.js
- Make sure Firebase database rules are set correctly

### Layout issues on Squarespace
- Try adjusting the Code Block width settings
- Use "Full Width" section if available
- Check Squarespace's custom CSS if needed

### Songs not displaying
- Check browser console for JavaScript errors
- Verify config.js is properly included
- Make sure all 12 songs are in the CONFIG.songs array

## Advanced: Custom Domain Considerations

If you're using a custom domain with Squarespace:
- Firebase will work fine with any domain
- No additional configuration needed
- HTTPS is automatically handled by Squarespace

## Performance Tips

1. **Minimize Code Block Size**: The combined file should be under 100KB
2. **Cache Firebase Data**: The app already does this automatically
3. **Test Load Times**: Use browser dev tools to check performance

## Getting Help

If you encounter issues:
1. Check browser console for error messages
2. Verify all files were copied completely
3. Test the standalone HTML file outside Squarespace first
4. Contact Squarespace support for Code Block issues
5. Check Firebase Console for database/connection issues

## Alternative: External Hosting

If Code Blocks don't work well, you can:
1. Host the files on GitHub Pages (free)
2. Embed using an iframe in Squarespace
3. See GITHUB-PAGES-DEPLOY.md for instructions (if needed)

## Security Notes

- The Firebase rules allow public voting (no authentication required)
- Votes are tracked by localStorage to prevent duplicate votes from same browser
- For production, consider adding rate limiting in Firebase rules
- Monitor Firebase usage in the Firebase Console

## Maintenance Schedule

**Before each voting period:**
1. Reset votes in Firebase (delete votes node)
2. Update config.js with new dates
3. Update song states (mark winner as "released")
4. Redeploy to Squarespace

**Monthly tasks:**
1. Check Firebase usage (should be well within free tier)
2. Backup vote data if needed
3. Update lyric previews if desired

## Support

For Squarespace-specific issues:
- [Squarespace Help Center](https://support.squarespace.com/)
- [Code Block Documentation](https://support.squarespace.com/hc/en-us/articles/206543167)

For Firebase issues:
- See FIREBASE-SETUP.md
- [Firebase Documentation](https://firebase.google.com/docs)