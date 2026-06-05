# How to Rebuild squarespace-complete.html

## The Problem
The current `squarespace-complete.html` is outdated and missing:
- CSS fixes for Squarespace overrides
- Desktop grid layout
- Genre scale features
- Vote results chart
- Radio button clickability fixes

## Manual Rebuild Steps

Since the file is too large to rebuild automatically, follow these steps:

### 1. Start with index.html structure
Copy the entire `index.html` file as your base.

### 2. Inline the CSS
Replace the `<link rel="stylesheet" href="styles.css">` line with:
```html
<style>
/* Paste ENTIRE contents of styles.css here */
</style>
```

### 3. Inline the JavaScript files
Replace the script tags at the bottom with:
```html
<script>
// Paste ENTIRE contents of config.js here

// Paste ENTIRE contents of voting.js here

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
</script>
```

### 4. Add Firebase SDK
Keep the Firebase script tags before your inline JavaScript:
```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
```

### 5. Critical: Wrap everything in a container div
Add this wrapper to isolate from Squarespace:
```html
<div id="voting-app-container" style="all: initial; display: block;">
    <!-- All your content here -->
</div>
```

### 6. Add aggressive CSS resets at the TOP of <style>
```css
#voting-app-container,
#voting-app-container * {
    all: revert !important;
    box-sizing: border-box !important;
}

#voting-app-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
    background: linear-gradient(135deg, #000000 0%, #1e3a8a 100%) !important;
    color: #ffffff !important;
    min-height: 100vh !important;
    padding: 20px !important;
}
```

## Quick Rebuild Command (if you have the files)

```bash
cd litmab-voting

# Create new squarespace-complete.html
cat > squarespace-complete-new.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Album Release Voting</title>
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
    
    <style>
EOF

# Append styles.css
cat styles.css >> squarespace-complete-new.html

cat >> squarespace-complete-new.html << 'EOF'
    </style>
</head>
<body>
EOF

# Append body content from index.html (extract body content)
sed -n '/<body>/,/<\/body>/p' index.html | sed '1d;$d' >> squarespace-complete-new.html

cat >> squarespace-complete-new.html << 'EOF'
    
    <script>
EOF

# Append config.js
cat config.js >> squarespace-complete-new.html

echo "" >> squarespace-complete-new.html

# Append voting.js
cat voting.js >> squarespace-complete-new.html

cat >> squarespace-complete-new.html << 'EOF'
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
EOF

echo "New file created: squarespace-complete-new.html"
```

## Testing the New File

1. Open `squarespace-complete-new.html` in a browser
2. Verify:
   - Desktop shows grid layout (2-3 columns)
   - Radio buttons are clickable
   - Text is NOT all caps
   - Genre scale legend shows
   - Vote results chart appears after voting

## Deploy to Squarespace

1. Copy ENTIRE contents of `squarespace-complete-new.html`
2. In Squarespace, add a **Code Block**
3. Paste the entire HTML
4. Set to "Display Source" mode (not Preview)
5. Save and publish

## Troubleshooting

If Squarespace still overrides:
- Add `!important` to MORE CSS rules
- Wrap in additional isolation div
- Use inline styles on critical elements
- Check browser console for CSS conflicts