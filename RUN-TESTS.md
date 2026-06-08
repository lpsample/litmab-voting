# How to Run Automated Tests

## Quick Start (30 seconds)

1. **Open the site** in your browser:
   - Local: Open `index.html` in Chrome, Firefox, or Safari
   - Live: Visit your deployed site URL

2. **Open Browser Console**:
   - Windows/Linux: Press `F12` or `Ctrl+Shift+J`
   - Mac: Press `Cmd+Option+J`

3. **Run the test script**:
   ```bash
   # Option 1: Load from file
   # Copy the contents of automated-test.js and paste into console
   
   # Option 2: Load via script tag (if testing locally)
   # Add this to index.html before </body>:
   # <script src="automated-test.js"></script>
   ```

4. **View Results**:
   - Tests run automatically
   - Results appear in console with color coding:
     - ✓ Green = Passed
     - ✗ Red = Failed
     - ⚠ Yellow = Warning
   - Final summary shows pass rate and detailed table

## What Gets Tested

### ✅ Page Elements (5 tests)
- Page title says "Vote on Sam's Next Release"
- Genre scale legend exists
- 3 clickable dots present
- All 12 songs displayed
- Vote results container exists

### ✅ Button Layout (3 tests)
- CLUE button appears first (on top)
- SELECT button appears second (below)
- SELECT button text is "SELECT" in caps

### ✅ Vote Results Preview (3 tests)
- Container is blurred initially
- Unlock overlay exists
- Unlock message says "VOTE TO UNLOCK STANDINGS"

### ✅ Responsive Layout (2 tests)
- CSS Grid is active
- Correct number of columns for viewport width:
  - 3 columns at 1400px+
  - 2 columns at 1024px+
  - 1 column below 1024px

### ✅ Interactive Elements (2 tests)
- Dots toggle artist examples on click
- Artist examples disappear on second click

### ✅ Mobile Positioning (1 test)
- Artist examples centered on mobile (not off-screen)

### ✅ Browser Compatibility (3 tests)
- CSS `:has()` selector support
- CSS Grid support
- Firebase SDK loaded

### ✅ Accessibility (2 tests)
- All images have alt text
- All buttons have labels

### ✅ Performance (1 test)
- Page loads in < 3 seconds

**Total: 22 automated tests**

## Expected Results

### Perfect Score
```
✓ Passed: 22
✗ Failed: 0
⚠ Warnings: 0
Pass Rate: 100%
🎉 All critical tests passed!
```

### Acceptable Score
```
✓ Passed: 18-21
✗ Failed: 0-1
⚠ Warnings: 1-3
Pass Rate: 85-95%
```

### Needs Attention
```
✓ Passed: < 18
✗ Failed: 2+
⚠ Warnings: 4+
Pass Rate: < 85%
```

## Common Issues & Fixes

### Issue: "Firebase SDK not loaded"
**Cause**: Firebase not configured
**Fix**: This is expected if testing locally without Firebase setup
**Action**: Warning only, not critical for UI testing

### Issue: "Browser does not support :has()"
**Cause**: Older browser version
**Fix**: Update browser or test in modern browser
**Action**: Hover effects won't work, but clicks still work

### Issue: "Some artist examples not centered"
**Cause**: CSS not loading properly
**Fix**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
**Action**: Check styles.css is loaded

### Issue: "Page load time > 3s"
**Cause**: Slow connection or large images
**Fix**: Optimize images, check network tab
**Action**: Warning only if < 5s

## Testing on Different Devices

### Desktop Testing
```bash
# Test at different widths
1. Resize browser to 1920px wide (3 columns)
2. Resize to 1200px wide (2 columns)
3. Resize to 800px wide (1 column)
4. Run tests at each size
```

### Mobile Testing
```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
4. Run tests
```

### Browser Testing
Test in multiple browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Safari iOS (15.4+)
- ⚠️ Chrome Mobile

## Advanced Testing

### Test Specific Features

```javascript
// Test only button layout
window.testResults.tests.filter(t => t.name.includes('Button'));

// Test only mobile features
window.testResults.tests.filter(t => t.name.includes('Mobile'));

// Get all failures
window.testResults.tests.filter(t => t.status === 'FAIL');
```

### Stress Testing

```javascript
// Rapid click test (run in console)
const dot = document.querySelector('.scale-dot-clickable');
for (let i = 0; i < 50; i++) {
    setTimeout(() => dot.click(), i * 50);
}
console.log('Rapid click test complete - check for errors');
```

### Memory Leak Test

```javascript
// Leave page open and run this every 5 minutes
console.log('Memory:', performance.memory?.usedJSHeapSize / 1048576, 'MB');
```

## Continuous Testing

### Before Each Commit
```bash
1. Run automated tests
2. Check pass rate > 90%
3. Fix any failures
4. Commit changes
```

### Before Deployment
```bash
1. Run tests on all browsers
2. Run tests on mobile devices
3. Check Firebase connection
4. Verify no console errors
5. Deploy
```

### After Deployment
```bash
1. Run tests on live site
2. Monitor for 24 hours
3. Check Firebase usage
4. Review user feedback
```

## Troubleshooting

### Tests Won't Run
1. Check console for syntax errors
2. Verify JavaScript is enabled
3. Try in different browser
4. Clear cache and reload

### Tests Fail Unexpectedly
1. Hard refresh page (Ctrl+Shift+R)
2. Check if files are loaded (Network tab)
3. Verify no ad blockers interfering
4. Check browser version

### Tests Pass But Site Broken
1. Tests may not catch all issues
2. Manually test critical paths
3. Test on real devices
4. Get user feedback

## Getting Help

If tests fail and you can't fix:

1. **Check the error message** - It usually tells you what's wrong
2. **Review CODE-REVIEW-FINDINGS.md** - Known issues documented
3. **Check browser console** - Look for JavaScript errors
4. **Test in different browser** - Isolate browser-specific issues
5. **Share test results** - Copy console output for debugging

## Test Results Storage

Results are saved to `window.testResults`:

```javascript
// Access results programmatically
console.log(window.testResults.passed);    // Number of passed tests
console.log(window.testResults.failed);    // Number of failed tests
console.log(window.testResults.warnings);  // Number of warnings
console.log(window.testResults.tests);     // Array of all test results

// Export results
JSON.stringify(window.testResults, null, 2);
```

## Next Steps

After running tests:

1. ✅ **All Pass**: Ready to deploy!
2. ⚠️ **Some Warnings**: Review warnings, deploy if acceptable
3. ✗ **Any Failures**: Fix issues before deploying

Good luck! 🚀