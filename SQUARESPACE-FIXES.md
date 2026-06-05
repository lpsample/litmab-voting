# Squarespace CSS Override Fixes

## Problem
Squarespace's theme CSS was overriding our custom styles, causing:
- Mobile-compressed layout on desktop (single column instead of grid)
- All text transformed to uppercase
- Custom fonts being replaced with theme fonts
- Container width being restricted

## Solution
Added aggressive `!important` declarations throughout styles.css to override Squarespace's theme CSS.

## Key CSS Overrides Added

### 1. Global Text Resets
```css
.container *,
h1, h2, h3, h4, h5, h6,
.song-title,
.voting-instructions *,
.tracklist * {
    text-transform: none !important;
    letter-spacing: normal !important;
    font-family: inherit !important;
}
```

### 2. Container Width for Desktop
```css
@media (min-width: 1024px) {
    .container {
        max-width: 1400px !important;
        width: 100% !important;
    }
}
```

### 3. Tracklist Grid Layout
```css
.tracklist {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
}

@media (min-width: 1024px) {
    .tracklist {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
    }
}
```

### 4. Song Title Overrides
```css
.song-title {
    flex: 1 !important;
    font-size: 1.3rem !important;
    font-weight: 600 !important;
    text-transform: none !important;
    letter-spacing: normal !important;
    font-family: inherit !important;
}
```

## Deployment to Squarespace

### Method 1: Code Block (Recommended)
1. Go to your Squarespace page editor
2. Add a **Code Block**
3. Copy the ENTIRE content from `squarespace-complete.html`
4. Paste into the Code Block
5. Save and publish

### Method 2: Code Injection (Site-wide)
1. Go to Settings → Advanced → Code Injection
2. Paste the content in the **Header** section
3. Save

## Testing Checklist

After deploying, verify:
- [ ] Desktop shows 2-3 column grid layout (not single column)
- [ ] Song titles are NOT all caps
- [ ] Text uses correct font (not Squarespace theme font)
- [ ] Genre scale legend displays correctly
- [ ] Hover tooltips work with lyrics and genre scale
- [ ] Mobile still shows single column layout
- [ ] All voting functionality works
- [ ] Mailing list popup appears after voting

## Troubleshooting

### Still showing mobile layout on desktop?
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check browser width is > 1024px
- Verify the Code Block is in "Display Source" mode, not "Preview"

### Text still all caps?
- Make sure you copied the COMPLETE styles.css content
- Check that `!important` declarations are present
- Try adding this to the very top of your CSS:
```css
* { text-transform: none !important; }
```

### Layout still compressed?
- Verify container max-width is set to 1400px on desktop
- Check that grid-template-columns is being applied
- Use browser DevTools to inspect and see which CSS is winning

## Browser DevTools Debugging

1. Right-click on a song title → Inspect
2. Look at the "Computed" tab
3. Check which CSS rule is being applied
4. If Squarespace CSS is winning, add more `!important` declarations

## Notes
- All `!important` declarations are necessary to override Squarespace's theme CSS
- The overrides are aggressive but required for proper display
- Mobile layout is preserved through media queries
- Desktop grid activates at 1024px+ width