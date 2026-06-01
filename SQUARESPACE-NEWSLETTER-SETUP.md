# Squarespace Newsletter Block Setup

## Overview
After a user votes, a popup appears prompting them to join the mailing list. This popup contains a placeholder for Squarespace's native Newsletter Block.

## How to Add the Newsletter Block in Squarespace

### Step 1: Get the Newsletter Block Code
1. In Squarespace, go to your site editor
2. Add a **Newsletter Block** to any page (temporarily)
3. Configure the newsletter block with your desired settings:
   - Email field
   - Submit button text
   - Success message
   - Connected to your Squarespace mailing list

### Step 2: Copy the Newsletter Block HTML
1. Right-click on the newsletter block
2. Inspect element
3. Copy the entire newsletter block HTML (usually a `<div>` with class `sqs-block-newsletter`)

### Step 3: Add to squarespace-complete.html
1. Open `squarespace-complete.html`
2. Find this section:
```html
<div class="squarespace-newsletter-block" id="newsletterBlock">
    <!-- This will be replaced with Squarespace's newsletter block code -->
    <p class="newsletter-placeholder">📧 Newsletter signup form will appear here when deployed to Squarespace</p>
</div>
```

3. Replace the placeholder paragraph with your copied newsletter block HTML:
```html
<div class="squarespace-newsletter-block" id="newsletterBlock">
    <!-- Paste your Squarespace newsletter block HTML here -->
    <div class="sqs-block-newsletter">
        <!-- Your newsletter block content -->
    </div>
</div>
```

### Step 4: Style Adjustments (if needed)
The newsletter block should inherit the popup's styling. If you need to adjust:

```css
.squarespace-newsletter-block .sqs-block-newsletter {
    /* Add custom styles here */
}

.squarespace-newsletter-block input[type="email"] {
    /* Style email input */
}

.squarespace-newsletter-block button {
    /* Style submit button */
}
```

## How It Works

### User Flow:
1. User selects a song and clicks "Submit My Vote"
2. Vote is recorded to Firebase
3. Success alert appears
4. **Mailing list popup appears** with newsletter signup
5. User can:
   - Sign up for the mailing list
   - Click "Maybe Later" to close
   - Click outside the popup to close

### Features:
- ✅ Full-screen overlay (dark background)
- ✅ Centered popup with gradient styling
- ✅ Native Squarespace newsletter integration
- ✅ "Maybe Later" button to dismiss
- ✅ Click outside to close
- ✅ Mobile responsive

## Testing

### On GitHub Pages:
- The placeholder text will show
- You can test the popup appearance and close functionality
- Newsletter block won't be functional (Squarespace-only)

### On Squarespace:
- Full newsletter functionality
- Email collection goes to your Squarespace mailing list
- Success/error messages from Squarespace

## Customization Options

### Change Popup Text:
Edit in `index.html`:
```html
<h2>🎉 Thanks for Voting!</h2>
<p>Want to stay updated on new releases and exclusive content?</p>
<p><strong>Join the mailing list!</strong></p>
```

### Change Button Text:
```html
<button class="close-newsletter-button" id="closeNewsletterButton">Maybe Later</button>
```

### Disable Popup:
To disable the mailing list popup, comment out this line in `voting.js`:
```javascript
// showMailingListPopup();
```

## Troubleshooting

### Popup doesn't appear:
- Check browser console for errors
- Verify `mailingListContainer` element exists
- Ensure JavaScript is loading correctly

### Newsletter block not working:
- Verify you copied the complete Squarespace newsletter block HTML
- Check that the newsletter block is connected to your mailing list in Squarespace settings
- Test the newsletter block on a regular Squarespace page first

### Styling issues:
- All styles use `!important` to override Squarespace defaults
- Check for conflicting CSS in Squarespace theme
- Use browser dev tools to inspect and adjust

## Example Newsletter Block Structure

```html
<div class="squarespace-newsletter-block" id="newsletterBlock">
    <div class="sqs-block-newsletter">
        <div class="newsletter-form-wrapper">
            <form class="newsletter-form">
                <input type="email" 
                       placeholder="Enter your email" 
                       required>
                <button type="submit">Subscribe</button>
            </form>
            <div class="newsletter-form-success-message">
                Thanks for subscribing!
            </div>
        </div>
    </div>
</div>
```

---

**Note**: The exact HTML structure will depend on your Squarespace template and newsletter block configuration. Always copy the actual HTML from your Squarespace site for best results.