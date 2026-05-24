# How to Update Album Art on Squarespace

## Quick Answer

Since you changed the album art in the `assetas` folder, here's what to do:

### Step 1: Fix the Folder Name (Safe to do!)

The typo `assetas` → `assets` won't break anything because:
- The HTML files reference `album-art.jpg` directly (not `assetas/album-art.jpg`)
- The folder is just for organization, not used in the code

**To rename:**
```bash
cd /Users/lindseysample/Documents/GitHub/litmab-voting
mv assetas assets
```

Or just rename it in Finder: Right-click `assetas` → Rename → `assets`

### Step 2: Update Squarespace with New Album Art

You have **3 options**:

---

## Option 1: Upload to Squarespace (Recommended)

This is the cleanest approach for Squarespace:

1. **Upload your new album art to Squarespace:**
   - Go to **Design → Custom CSS**
   - Click **Manage Custom Files**
   - Upload your new `album-art.jpg`
   - Copy the URL Squarespace gives you (something like: `https://static1.squarespace.com/static/...`)

2. **Update your Squarespace Code Block:**
   - Find the line with the old album art URL
   - Replace it with your new URL:
   ```html
   <img src="https://YOUR-NEW-SQUARESPACE-URL/album-art.jpg" alt="Album Art" class="album-art" id="albumArt">
   ```

3. **Save and publish**

**Pros:** Clean, fast loading, easy to update later
**Cons:** Requires uploading to Squarespace

---

## Option 2: Use Base64 Embedding (Quick but Large)

Convert your image to base64 and embed it directly in the HTML:

1. **Convert image to base64:**
   ```bash
   cd /Users/lindseysample/Documents/GitHub/litmab-voting
   base64 -i assets/album-art.jpg | pbcopy
   ```
   (This copies the base64 string to your clipboard)

2. **Update your Squarespace Code Block:**
   Find this line:
   ```html
   <img src="album-art.jpg" alt="Album Art" class="album-art" id="albumArt">
   ```
   
   Replace with:
   ```html
   <img src="data:image/jpeg;base64,PASTE_YOUR_BASE64_HERE" alt="Album Art" class="album-art" id="albumArt">
   ```

3. **Save and publish**

**Pros:** No separate file needed, works immediately
**Cons:** Makes HTML file much larger, slower to load

---

## Option 3: Keep Using Direct Reference (If Hosting Elsewhere)

If you're hosting the files somewhere (like GitHub Pages):

1. Just make sure `album-art.jpg` is in the same folder as your HTML
2. The reference `album-art.jpg` will work automatically
3. No changes needed to Squarespace code

---

## Current Setup

Your `squarespace-complete.html` currently has:
```html
<img src="album-art.jpg" alt="Album Art" class="album-art" id="albumArt">
```

This won't work on Squarespace because the image file isn't uploaded there. You need to use **Option 1** or **Option 2** above.

---

## Recommended Steps

**For Squarespace deployment:**

1. Rename `assetas` → `assets` (safe!)
2. Upload new album art to Squarespace (Option 1)
3. Update the `<img src="">` in your Code Block with the Squarespace URL
4. Save and publish

**Time required:** 5 minutes

---

## Testing

After updating:
1. Visit your Squarespace page
2. Check that the new album art displays
3. Verify it loads quickly
4. Test on mobile

---

## Need Help?

If you want me to:
- Generate the base64 string for you
- Update the squarespace-complete.html file
- Create a new combined file with the updated image

Just let me know!