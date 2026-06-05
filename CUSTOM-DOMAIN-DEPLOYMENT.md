# Custom Domain Deployment Guide

## Problem
Squarespace Code Block is overriding all our CSS, forcing mobile layout and ALL CAPS text. The Code Block integration is too restrictive.

## Solution: GitHub Pages + Custom Domain

Deploy to GitHub Pages and point a subdomain (like `voting.samsamplemusic.com`) to it. This gives you:
- ✅ Full control over styling
- ✅ All features working (desktop grid, genre scale, vote chart)
- ✅ On your samsamplemusic.com domain
- ✅ Mailing list integration options

## Step 1: Deploy to GitHub Pages

### 1.1 Push to GitHub
```bash
cd litmab-voting
git add .
git commit -m "Complete voting app with all features"
git push origin main
```

### 1.2 Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be at: `https://yourusername.github.io/litmab-voting/`

## Step 2: Set Up Custom Domain

### 2.1 Create Subdomain in Squarespace
1. Go to Squarespace → **Settings** → **Domains**
2. Click your domain (samsamplemusic.com)
3. Click **DNS Settings**
4. Add a **CNAME record**:
   - **Host**: `voting` (or `vote`, `album`, etc.)
   - **Data**: `yourusername.github.io`
   - **TTL**: 3600

### 2.2 Configure GitHub Pages Custom Domain
1. In GitHub repo → **Settings** → **Pages**
2. Under "Custom domain", enter: `voting.samsamplemusic.com`
3. Click **Save**
4. Check **Enforce HTTPS** (wait a few minutes for SSL)

### 2.3 Update CNAME File
Create a file named `CNAME` in your litmab-voting directory:
```
voting.samsamplemusic.com
```

Then push:
```bash
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

## Step 3: Mailing List Integration Options

### Option A: Squarespace Form Embed (Recommended)
Keep the current Squarespace newsletter form - it will work once on your custom domain.

### Option B: Mailchimp Integration
Replace Squarespace form with Mailchimp:

1. **Get Mailchimp embed code**
2. **Replace the newsletter form** in index.html with Mailchimp code
3. **Style to match** your design

### Option C: Simple Email Collection
Use a simple form that posts to a serverless function:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" placeholder="Email" required>
  <input type="text" name="name" placeholder="Name">
  <button type="submit">Join Mailing List</button>
</form>
```

## Step 4: Test Everything

Once DNS propagates (can take up to 48 hours, usually much faster):

1. Visit `https://voting.samsamplemusic.com`
2. Verify:
   - [ ] Desktop shows grid layout
   - [ ] Text is NOT all caps
   - [ ] Radio buttons clickable
   - [ ] Genre scale displays
   - [ ] Vote results chart appears
   - [ ] Mailing list form works

## Alternative: Netlify (Even Easier)

If GitHub Pages is too complex, use Netlify:

### Netlify Deployment
1. Go to [netlify.com](https://netlify.com)
2. Sign up / Log in
3. Click **Add new site** → **Import an existing project**
4. Connect to GitHub
5. Select your repository
6. Deploy!

### Netlify Custom Domain
1. In Netlify dashboard → **Domain settings**
2. Click **Add custom domain**
3. Enter: `voting.samsamplemusic.com`
4. Follow Netlify's DNS instructions
5. Add CNAME in Squarespace DNS pointing to Netlify

## Why This Works Better

| Feature | Squarespace Code Block | GitHub Pages + Custom Domain |
|---------|----------------------|------------------------------|
| Desktop Grid | ❌ Overridden | ✅ Works |
| Text Formatting | ❌ ALL CAPS | ✅ Normal |
| Vote Chart | ❌ Hidden | ✅ Displays |
| Radio Buttons | ❌ Sometimes broken | ✅ Always works |
| Custom Domain | ✅ Yes | ✅ Yes |
| Mailing List | ✅ Native | ✅ Multiple options |
| Full Control | ❌ No | ✅ Yes |

## Quick Start Commands

```bash
# 1. Commit and push
cd litmab-voting
git add .
git commit -m "Deploy voting app"
git push origin main

# 2. Create CNAME file
echo "voting.samsamplemusic.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main

# 3. Enable GitHub Pages in repo settings
# 4. Add CNAME record in Squarespace DNS
# 5. Wait for DNS propagation
# 6. Visit https://voting.samsamplemusic.com
```

## Need Help?

If you need help with:
- DNS configuration
- Mailing list integration
- Custom domain setup

Let me know and I can provide more specific guidance!