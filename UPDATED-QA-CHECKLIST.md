# Updated QA Testing Checklist - Recent Changes

## New Features to Test (Added in Latest Updates)

### 1. Button Layout Changes
- [ ] **CLUE Button Position**: Appears ABOVE SELECT button
- [ ] **SELECT Button Position**: Appears BELOW CLUE button
- [ ] **SELECT Button Text**: Displays "SELECT" in all caps
- [ ] **SELECT Button Centering**: Text is centered in button
- [ ] **Button Styling**: Both buttons have matching blue gradient
- [ ] **Button Hover**: Both buttons scale slightly on hover

### 2. Page Title
- [ ] **Main Heading**: Says "Vote on Sam's Next Release" (not "Vote for the Next Release")

### 3. Genre Scale Dots - Desktop Hover
- [ ] **Left Dot Hover**: Artist examples appear on hover (desktop only)
- [ ] **Middle Dot Hover**: Artist examples appear on hover (desktop only)
- [ ] **Right Dot Hover**: Artist examples appear on hover (desktop only)
- [ ] **Hover Smooth**: No lag or flicker when hovering
- [ ] **CSS :has() Support**: Works in modern browsers (Chrome 105+, Safari 15.4+, Firefox 103+)

### 4. Genre Scale Dots - Mobile Click Toggle
- [ ] **Click Dot Once**: Artist examples appear
- [ ] **Click Same Dot Again**: Artist examples disappear (toggle off)
- [ ] **Click Different Dot**: Switches to new artist examples
- [ ] **Click Outside**: All artist examples close
- [ ] **No Stuck State**: Examples never get stuck open

### 5. Mobile Artist Examples Positioning
- [ ] **Left Dot (Mobile)**: Artist examples centered, not off left edge
- [ ] **Middle Dot (Mobile)**: Artist examples centered
- [ ] **Right Dot (Mobile)**: Artist examples centered, not off right edge
- [ ] **Text Wrapping**: Long artist names wrap properly
- [ ] **Max Width**: Examples never exceed 90vw (90% of screen width)
- [ ] **No Horizontal Scroll**: Page doesn't scroll horizontally

### 6. Blurred Vote Results Preview
- [ ] **Chart Visible Before Vote**: Vote results chart is visible but blurred
- [ ] **Unlock Overlay Visible**: "🔒 VOTE TO UNLOCK STANDINGS" message is clear (not blurred)
- [ ] **Overlay Centered**: Unlock message centered over blurred chart
- [ ] **Overlay Styling**: Blue-purple gradient pill with white text
- [ ] **Subtitle Before Vote**: Says "Vote to see how your fellow Sammy Whammies are voting!"
- [ ] **Chart Loads**: Chart data loads even when blurred
- [ ] **After Voting - Blur Removed**: Chart becomes clear with smooth transition (0.5s)
- [ ] **After Voting - Overlay Hidden**: Unlock message disappears
- [ ] **After Voting - Subtitle Updated**: Says "See how your fellow Sammy Whammies are voting"
- [ ] **Transition Smooth**: No jarring jumps or flashes

## Critical Bug Checks

### Potential Issues to Verify

#### 1. CSS Specificity Conflicts
- [ ] **Squarespace Override**: All `!important` declarations working on Squarespace
- [ ] **Button Centering**: SELECT button text actually centered (not left-aligned)
- [ ] **Mobile Centering**: Artist examples actually centered on mobile (check with dev tools)

#### 2. JavaScript Errors
- [ ] **Console Clean**: No JavaScript errors in browser console
- [ ] **Toggle Logic**: Dot toggle doesn't break after multiple clicks
- [ ] **Blur Removal**: showVoteResultsChart() successfully removes blur class
- [ ] **Overlay Hiding**: Unlock overlay successfully hides after vote

#### 3. Firebase Integration
- [ ] **Mailing List Writes**: Check Firebase rules allow writes to `/mailingList`
- [ ] **Vote Writes**: Votes still save correctly to `/votes/[songNumber]`
- [ ] **Real-time Updates**: Chart updates when new votes come in
- [ ] **Permission Errors**: No "permission denied" errors in console

#### 4. Mobile Responsiveness
- [ ] **iPhone SE (375px)**: All features work, nothing off-screen
- [ ] **iPhone 12 Pro (390px)**: All features work
- [ ] **iPhone 14 Pro Max (430px)**: All features work
- [ ] **Samsung Galaxy S21 (360px)**: All features work
- [ ] **Landscape Mode**: Works in landscape orientation

#### 5. Browser Compatibility
- [ ] **Safari iOS**: `:has()` selector works (iOS 15.4+)
- [ ] **Chrome Mobile**: All features work
- [ ] **Firefox Mobile**: All features work
- [ ] **Older Browsers**: Graceful degradation if `:has()` not supported

## Stress Testing Scenarios

### 1. Rapid Clicking
- [ ] **Rapid Dot Clicks**: Click dots rapidly 10+ times - no errors
- [ ] **Rapid CLUE Clicks**: Click CLUE button rapidly - no errors
- [ ] **Rapid SELECT Clicks**: Click SELECT button rapidly - no errors
- [ ] **Mixed Rapid Clicks**: Click everything rapidly - no crashes

### 2. Edge Cases
- [ ] **Vote Without Selection**: Try to vote without selecting song - shows error
- [ ] **Vote Twice**: Try to vote again after voting - prevented
- [ ] **Refresh After Vote**: Page refresh preserves vote state
- [ ] **Clear localStorage**: Clear localStorage and vote again - works
- [ ] **Offline Vote**: Try to vote offline - shows appropriate error

### 3. Long Content Testing
- [ ] **Long Artist Names**: Artist examples with long names wrap properly
- [ ] **Long Song Titles**: Song titles don't break layout
- [ ] **Long Lyrics**: Long lyric previews display correctly
- [ ] **Long Tour Location**: Long tour location text in mailing list form wraps

### 4. Multiple Users Simultaneously
- [ ] **Open 2 Browsers**: Vote in one, see update in other
- [ ] **Vote Results Update**: Chart updates in real-time across browsers
- [ ] **No Race Conditions**: Multiple simultaneous votes don't cause errors
- [ ] **Firebase Handles Load**: Database doesn't slow down with multiple users

### 5. Memory Leaks
- [ ] **Leave Page Open 30 Min**: No memory leaks or slowdown
- [ ] **Click Dots 100 Times**: No memory buildup
- [ ] **Toggle CLUE 100 Times**: No performance degradation

## Accessibility Testing

### 1. Keyboard Navigation
- [ ] **Tab Through Form**: Can tab through all interactive elements
- [ ] **Enter to Submit**: Enter key submits vote
- [ ] **Escape to Close**: Escape closes mailing list popup
- [ ] **Focus Visible**: Clear focus indicators on all elements

### 2. Screen Reader
- [ ] **Buttons Announced**: Screen reader announces button labels correctly
- [ ] **Status Updates**: Vote confirmation announced
- [ ] **Error Messages**: Errors announced to screen reader
- [ ] **Alt Text**: Album art has descriptive alt text

### 3. Color Contrast
- [ ] **Text Readable**: All text meets WCAG AA contrast ratio (4.5:1)
- [ ] **Buttons Visible**: Button text clearly visible on gradient backgrounds
- [ ] **Status Badges**: Badge text readable on colored backgrounds

## Performance Testing

### 1. Load Time
- [ ] **Initial Load**: Page loads in < 3 seconds on 4G
- [ ] **Firebase Init**: Firebase initializes quickly
- [ ] **Chart Render**: Vote results chart renders quickly
- [ ] **No Layout Shift**: Minimal cumulative layout shift (CLS)

### 2. Animation Performance
- [ ] **Blur Transition**: Smooth 0.5s transition, no jank
- [ ] **Button Hover**: Smooth scale animation
- [ ] **Dot Hover**: Smooth scale animation
- [ ] **60 FPS**: All animations run at 60fps

### 3. Network Conditions
- [ ] **Slow 3G**: Page still usable on slow connection
- [ ] **Fast 3G**: Good experience
- [ ] **4G**: Excellent experience
- [ ] **Offline**: Appropriate error messages

## Security Testing

### 1. Input Validation
- [ ] **Email Validation**: Invalid emails rejected
- [ ] **XSS Prevention**: Can't inject scripts via form fields
- [ ] **SQL Injection**: N/A (using Firebase, but test anyway)
- [ ] **Long Inputs**: Very long inputs handled gracefully

### 2. Firebase Security
- [ ] **Read Rules**: Anyone can read votes (expected)
- [ ] **Write Rules**: Anyone can write votes (expected)
- [ ] **Mailing List Privacy**: Users can't read other emails
- [ ] **Rate Limiting**: Consider adding rate limiting for production

## Final Checklist Before Deployment

- [ ] **All Tests Pass**: Every item above checked
- [ ] **No Console Errors**: Clean console on all browsers
- [ ] **Firebase Rules Updated**: Mailing list rules deployed
- [ ] **DNS Configured**: Custom domain pointing to GitHub Pages
- [ ] **HTTPS Enabled**: SSL certificate active
- [ ] **Backup Created**: Firebase data backed up
- [ ] **Rollback Plan**: Know how to revert if issues arise
- [ ] **Monitoring Setup**: Can track errors in production
- [ ] **User Testing**: At least 3 people tested successfully

## Known Issues / Limitations

### Browser Support
- **:has() selector**: Not supported in older browsers (pre-2022)
  - Fallback: Dots still clickable, just no hover on desktop
  - Affects: Safari < 15.4, Chrome < 105, Firefox < 103

### Mobile Considerations
- **Small Screens**: On very small screens (< 320px), layout may be cramped
- **Landscape**: Some elements may require scrolling in landscape mode
- **Old iOS**: iOS < 15.4 won't have hover effects on dots

### Performance
- **Many Simultaneous Users**: Firebase free tier has limits
  - 100 simultaneous connections
  - 10 GB/month bandwidth
  - Monitor usage if expecting high traffic

## Post-Deployment Monitoring

### First 24 Hours
- [ ] **Check Firebase Usage**: Monitor connection count
- [ ] **Check Error Logs**: Look for JavaScript errors
- [ ] **User Feedback**: Collect feedback from early users
- [ ] **Vote Counts**: Verify votes are being recorded correctly
- [ ] **Mailing List**: Verify email signups working

### First Week
- [ ] **Performance Metrics**: Check page load times
- [ ] **Browser Analytics**: See which browsers users are using
- [ ] **Mobile vs Desktop**: Track usage split
- [ ] **Bounce Rate**: Monitor if users are leaving quickly
- [ ] **Conversion Rate**: Track voting completion rate

## Emergency Contacts

- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Pages**: https://github.com/[username]/[repo]/settings/pages
- **DNS Provider**: [Your DNS provider dashboard]

## Rollback Procedure

If critical issues found:
1. Revert to previous commit: `git revert HEAD`
2. Push to GitHub: `git push origin main`
3. Wait 1-2 minutes for GitHub Pages to rebuild
4. Verify old version is live
5. Fix issues locally before redeploying