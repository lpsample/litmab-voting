# GitHub Pages Deployment Guide

Deploy your voting website to GitHub Pages for free hosting and easy testing!

## Why GitHub Pages?

- ✅ **Free hosting** with HTTPS
- ✅ **No server needed** - works with Firebase
- ✅ **Easy updates** - just push to GitHub
- ✅ **Custom domain** support (optional)
- ✅ **Perfect for testing** before Squarespace deployment

## Quick Setup (5 Minutes)

### Step 1: Initialize Git Repository

Open Terminal and run:

```bash
cd /Users/lindseysample/Documents/GitHub/litmab-voting
git init
git add .
git commit -m "Initial commit - Album voting website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the **+** icon (top right) → **New repository**
3. Name it: `litmab-voting` (or any name you prefer)
4. **Don't** initialize with README (we already have files)
5. Click **Create repository**

### Step 3: Push to GitHub

GitHub will show you commands. Copy and run them, or use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/litmab-voting.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Enable GitHub Pages

1. In your GitHub repository, click **Settings**
2. Scroll down to **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 5: Get Your URL

Your site will be live at:
```
https://YOUR_USERNAME.github.io/litmab-voting/
```

GitHub will show you the exact URL in the Pages settings.

## Update Album Art Path for GitHub Pages

Since you're hosting on GitHub Pages, update `config.js`:

```javascript
// Option 1: Upload album art to the repo
albumArtPath: "album-art.jpg",

// Option 2: Use a URL from elsewhere
albumArtPath: "https://your-image-host.com/album-art.jpg",
```

## Making Updates

Whenever you make changes:

```bash
cd /Users/lindseysample/Documents/GitHub/litmab-voting
git add .
git commit -m "Description of changes"
git push
```

Changes will be live in 1-2 minutes!

## Testing Your Site

1. Visit your GitHub Pages URL
2. Open browser console (F12) to check for errors
3. Test voting functionality
4. Try on mobile devices
5. Share the URL with friends for testing

## Custom Domain (Optional)

Want to use your own domain instead of github.io?

1. In GitHub repository → Settings → Pages
2. Enter your custom domain
3. Follow GitHub's instructions to configure DNS
4. Enable "Enforce HTTPS"

## Advantages Over Local Testing

- ✅ **Real URL** - share with others for testing
- ✅ **HTTPS** - Firebase works properly
- ✅ **Mobile testing** - test on actual phones
- ✅ **No server needed** - no Terminal commands
- ✅ **Always accessible** - test anytime, anywhere

## Firebase Configuration

Your Firebase credentials in `config.js` will work fine on GitHub Pages. Just make sure:

1. Firebase database rules allow your GitHub Pages domain
2. Or use test mode rules (see FIREBASE-SETUP.md)

## Security Note

Your `config.js` file with Firebase credentials will be public on GitHub. This is okay because:
- Firebase credentials are meant to be public (they're in client-side code)
- Security is handled by Firebase database rules
- Just don't commit any private API keys or secrets

## Transitioning to Squarespace

Once you've tested on GitHub Pages:

1. Everything works the same way
2. Follow SQUARESPACE-DEPLOY.md to move to Squarespace
3. Keep GitHub Pages as a backup/testing site
4. Or delete the GitHub repo if you prefer

## Troubleshooting

### Site not loading
- Wait 2-3 minutes after enabling Pages
- Check that you selected the correct branch
- Verify files are in the root directory

### 404 Error
- Make sure `index.html` is in the root folder
- Check that you pushed all files to GitHub
- Verify the repository is public

### Firebase not working
- Check browser console for errors
- Verify Firebase credentials in `config.js`
- Ensure Firebase database rules allow access

### Album art not showing
- Make sure `album-art.jpg` is in the repository
- Or use a full URL to an image hosted elsewhere
- Check the path in `config.js`

## Quick Commands Reference

```bash
# Initial setup
cd /Users/lindseysample/Documents/GitHub/litmab-voting
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/litmab-voting.git
git push -u origin main

# Making updates
git add .
git commit -m "Update voting dates"
git push

# Check status
git status

# View commit history
git log --oneline
```

## Next Steps

1. ✅ Deploy to GitHub Pages (follow steps above)
2. ✅ Test the live site
3. ✅ Set up Firebase (see FIREBASE-SETUP.md)
4. ✅ Share URL with friends for testing
5. ✅ When ready, deploy to Squarespace (see SQUARESPACE-DEPLOY.md)

## Support

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)