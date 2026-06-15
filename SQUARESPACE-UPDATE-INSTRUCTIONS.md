# Quick Squarespace Update Instructions

## You've Updated Your Album Art - Here's What to Do

Since you renamed `assetas` to `assets` and have a new album art image, here's the **EASIEST** way to update Squarespace:

---

## RECOMMENDED: Upload to Squarespace

This keeps your HTML file small and loads fast.

### Step 1: Upload Your New Album Art

1. Log into your Squarespace site
2. Go to **Design → Custom CSS**
3. Click **Manage Custom Files** (at the bottom)
4. Click **Upload** and select: `/Users/lindseysample/Documents/GitHub/litmab-voting/assets/album-art.jpg`
5. After upload, **COPY THE URL** Squarespace gives you
   - It will look like: `https://static1.squarespace.com/static/xxxxx/album-art.jpg`

### Step 2: Update Your Code Block

1. Go to your voting page in Squarespace
2. Click **Edit** on the Code Block
3. Find **line 614** (search for "album-art.jpg")
4. Change this:
   ```html
   <img src="assets/album-art.jpg" alt="Album Art" class="album-art" id="albumArt">
   ```
   
   To this (paste YOUR Squarespace URL):
   ```html
   <img src="PASTE_YOUR_SQUARESPACE_URL_HERE" alt="Album Art" class="album-art" id="albumArt">
   ```

5. Click **Apply** → **Save** → **Publish**

**Done!** Your new album art will display.

---

## Notes

- The `assetas` → `assets` rename is fine - it doesn't affect Squarespace
- This method is better than base64 because:
  - Smaller HTML file
  - Faster loading
  - Easier to update later
- You can update the image anytime by uploading a new one to Squarespace

---

## Need Help?

If you have trouble uploading to Squarespace, let me know and I can help with the base64 method instead (embeds the image directly in the HTML).