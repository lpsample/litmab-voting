# How to Reset Vote Counts

Quick guide to reset votes between voting periods or clear old data.

## 🔄 Reset All Votes (Start Fresh)

### Method 1: Firebase Console (Easiest - 30 seconds)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/project/litmab-voting/database/litmab-voting-default-rtdb/data

2. **Find the "votes" node**
   - You'll see it in the left tree structure
   - Click on "votes"

3. **Delete it**
   - Click the three dots (⋮) next to "votes"
   - Select **"Delete"**
   - Confirm by clicking "Delete" again

4. **Done!**
   - All votes are now reset to 0
   - New votes will use the song name format

### Method 2: Delete Individual Songs

If you only want to reset specific songs:

1. Go to Firebase Console → Realtime Database → Data
2. Expand the "votes" node
3. Find the song you want to reset (e.g., "Violence" or "song_2")
4. Click the three dots (⋮) next to that song
5. Select "Delete"
6. Confirm

## 🧹 Clean Up Old Format (song_2, song_3, etc.)

If you see old votes like `song_2: 15`, here's how to clean them up:

### Quick Clean (Delete All Old Votes)

1. Go to Firebase Console
2. Click on "votes" node
3. Delete the entire "votes" node
4. Done! New votes will use song names

### Keep New Votes, Remove Old Ones

If you have both old (`song_2`) and new (`Violence`) format:

1. Go to Firebase Console → votes
2. Delete each `song_X` entry individually:
   - Click ⋮ next to `song_2` → Delete
   - Click ⋮ next to `song_3` → Delete
   - etc.
3. Keep the song name entries (Violence, Roles, etc.)

## 📊 Verify New Format is Working

After resetting, test that new votes use song names:

1. Go to your website
2. Vote for a song
3. Check Firebase Console
4. You should see: `Violence: 1` (not `song_3: 1`)

If you still see `song_X` format, you need to push the updated code to GitHub Pages.

## 🔄 Reset Between Voting Periods

**When to reset:**
- After announcing the winning song
- Before starting a new voting period
- When you want fresh vote counts

**Steps:**
1. Export current votes (optional - for records)
   - Firebase Console → votes → ⋮ → Export JSON
2. Delete the votes node
3. Update config.js with new dates
4. Push to GitHub
5. Announce new voting period!

## 📥 Export Votes Before Resetting (Optional)

To keep a record of votes:

1. **Export from Firebase**
   - Go to votes node
   - Click ⋮ → Export JSON
   - Save the file (e.g., `votes-june-2026.json`)

2. **Convert to Spreadsheet**
   - Open the JSON file
   - Copy the data
   - Paste into Google Sheets or Excel
   - Format as needed

3. **Now you can safely reset**
   - You have a backup of all votes
   - Delete the votes node in Firebase

## 🎯 Monthly Voting Period Routine

Here's your monthly workflow:

### End of Voting Period (e.g., July 1)

1. **Check Firebase for winner**
   - See which song has most votes
   - Take screenshot or export data

2. **Announce winner**
   - Post on social media
   - Email your fans

3. **Update config.js**
   - Change winner's state to "released"
   - Update voting period dates
   - Update next release date

4. **Reset votes**
   - Delete votes node in Firebase
   - Start fresh for next period

5. **Push to GitHub**
   - Commit changes
   - Push to GitHub
   - Site updates automatically

### Example Update

```javascript
// In config.js after "Violence" wins

// Update the winning song
{
    number: 3,
    title: "Violence",
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

## ⚠️ Important Notes

**Deleting votes is permanent!**
- Export data first if you want to keep records
- Can't undo a delete
- But it's easy to start fresh

**Users who already voted:**
- Their "already voted" status is stored in their browser
- Deleting Firebase votes doesn't reset this
- They won't be able to vote again in same browser
- This is intentional (prevents multiple votes)

**To allow users to vote again:**
- They need to clear their browser data
- Or use a different browser
- Or wait for the new voting period (you can add code to reset this)

## 🔧 Advanced: Auto-Reset for New Periods

If you want votes to automatically reset when a new period starts, you can add this to your Firebase rules, but it's easier to just manually delete the votes node between periods.

## 📞 Quick Reference

**Reset all votes:**
```
Firebase Console → votes → ⋮ → Delete
```

**Export votes:**
```
Firebase Console → votes → ⋮ → Export JSON
```

**Check current votes:**
```
https://console.firebase.google.com/project/litmab-voting/database
```

That's it! Resetting votes is super simple. 🎵