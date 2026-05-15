# Album Art Setup Guide

Your voting website includes a space for your album art at the top. Here's how to add it:

## Option 1: Add Album Art File to Project (Recommended for Local Testing)

1. Copy your album art image file to the `litmab-voting` folder
2. Rename it to `album-art.jpg` (or update the path in `config.js`)
3. The image will automatically display when you open `index.html`

**Supported formats:** JPG, PNG, WebP

## Option 2: Use a URL (Recommended for Squarespace)

When deploying to Squarespace, it's easier to use a direct URL to your album art:

1. Upload your album art to Squarespace:
   - Go to **Design → Custom CSS**
   - Click **Manage Custom Files**
   - Upload your album art image
   - Copy the URL Squarespace provides

2. Update `config.js`:
```javascript
albumArtPath: "https://your-squarespace-site.com/path-to-album-art.jpg",
```

## Option 3: Use Existing Album Art from Another Project

If you already have the album art in your `album-preview-invite` folder:

```bash
cd /Users/lindseysample/Documents/GitHub/litmab-voting
cp ../album-preview-invite/assets/album-art.jpg .
```

## Image Specifications

**Recommended:**
- **Size:** 1000x1000 pixels (square)
- **Format:** JPG or PNG
- **File size:** Under 500KB for fast loading

**The CSS will automatically:**
- Display it at 300x300px on desktop
- Scale to 250x250px on tablets
- Scale to 200x200px on mobile
- Add a blue border and shadow effect
- Crop to square if not already square

## Testing

After adding your album art:

1. Open `index.html` in a browser
2. Check that the image displays correctly
3. Test on mobile (or use browser dev tools)
4. Verify the image loads quickly

## Troubleshooting

### Image not showing
- Check the file path in `config.js` matches your actual file
- Verify the image file is in the correct location
- Check browser console for 404 errors

### Image looks stretched or distorted
- Use a square image (1:1 aspect ratio)
- The CSS uses `object-fit: cover` to handle non-square images

### Image too large/slow to load
- Compress your image using tools like:
  - [TinyPNG](https://tinypng.com/)
  - [Squoosh](https://squoosh.app/)
  - Photoshop "Save for Web"

## For Squarespace Deployment

When creating your combined HTML file for Squarespace:

1. **If using a URL:** Just make sure `config.js` has the correct URL
2. **If using a file:** You'll need to either:
   - Convert the image to base64 and embed it in the HTML (not recommended for large images)
   - Upload to Squarespace and use that URL (recommended)

### Converting to Base64 (Advanced)

If you want to embed the image directly in your HTML:

```bash
# On Mac/Linux
base64 -i album-art.jpg
```

Then in your HTML:
```html
<img src="data:image/jpeg;base64,YOUR_BASE64_STRING_HERE" alt="Album Art" class="album-art">
```

**Note:** This makes your HTML file much larger and is only recommended for small images.

## Current Configuration

Your `config.js` is currently set to:
```javascript
albumArtPath: "album-art.jpg"
```

This means it's looking for a file named `album-art.jpg` in the same folder as `index.html`.