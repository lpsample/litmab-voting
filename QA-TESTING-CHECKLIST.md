# QA Testing Checklist for litmab-voting

## Pre-Deployment Testing (Before Push to GitHub)

### 1. Visual/Layout Testing

#### Desktop (1920x1080)
- [ ] **Grid Layout**: Songs display in 3 columns
- [ ] **Spacing**: Adequate white space between songs
- [ ] **Status Badges**: "ELIGIBLE", "Locked 🔒", "Out July 17" visible in top right
- [ ] **Album Art**: Displays correctly at top
- [ ] **Genre Scale Legend**: Gradient bar with 3 white dots visible
- [ ] **Text Readability**: All text is legible, proper line-height

#### Tablet (768x1024)
- [ ] **Grid Layout**: Songs display in 2 columns
- [ ] **All elements**: Properly sized and readable
- [ ] **Touch targets**: Buttons/dots large enough to tap

#### Mobile (375x667 - iPhone SE)
- [ ] **Single Column**: Songs stack vertically
- [ ] **Scrolling**: Smooth scroll through all 12 songs
- [ ] **Mailing List Popup**: Scrollable, doesn't overflow screen
- [ ] **Text Size**: Readable without zooming
- [ ] **Touch Targets**: Easy to tap radio buttons, CLUE button, dots

### 2. Functionality Testing

#### Genre Scale Dots
- [ ] **Left Dot Click**: Shows "Zach Bryan, Noah Kahan, Mumford & Sons"
- [ ] **Middle Dot Click**: Shows "Sam Fender, Rainbow Kitten Surprise, Fleetwood Mac"
- [ ] **Right Dot Click**: Shows "Catfish and the Bottlemen, The Killers, Wunderhorse"
- [ ] **Click Outside**: Artist examples disappear
- [ ] **Dot Hover**: Dots scale up slightly (desktop only)

#### Song Interaction
- [ ] **CLUE Button**: Shows lyric preview + genre scale indicator
- [ ] **CLUE Button Again**: Hides lyric preview + genre scale
- [ ] **Radio Button**: Selects song (only one at a time)
- [ ] **Radio Label "Vote"**: Clicking label also selects radio button
- [ ] **Genre Scale Position**: Marker appears at correct position (0-10 scale)
- [ ] **Lyric Text**: No quotation marks around lyrics

#### Voting Flow
- [ ] **Select Song**: Radio button checks
- [ ] **Submit Vote**: Button works, shows success message
- [ ] **Vote Results Chart**: Appears after voting with horizontal bars
- [ ] **Mailing List Popup**: Appears after voting
- [ ] **Prevent Double Vote**: Can't vote again (button disabled, says "Vote Submitted! ✓")
- [ ] **localStorage**: Vote persists after page refresh

#### Mailing List Form
- [ ] **Name Field**: Accepts text input
- [ ] **Email Field**: Validates email format
- [ ] **Tour Location Field**: Accepts multi-line text
- [ ] **Submit**: Saves to Firebase
- [ ] **Success Message**: Shows confirmation
- [ ] **Close Button**: Closes popup
- [ ] **Mobile Scroll**: Form scrollable on small screens

### 3. Firebase Integration Testing

#### Database Writes
- [ ] **Vote Submission**: Creates entry in `/votes/[songNumber]`
- [ ] **Vote Count**: Increments correctly
- [ ] **Mailing List**: Creates entry in `/mailingList/[timestamp]`
- [ ] **Tour Location**: Saves in mailing list entry

#### Real-time Updates
- [ ] **Vote Count Updates**: Changes when someone else votes (open in 2 browsers)
- [ ] **Vote Bar Updates**: Visual bars update in real-time
- [ ] **No Errors**: Console shows no Firebase errors

### 4. Error Handling

#### Network Issues
- [ ] **Offline**: Shows appropriate error message
- [ ] **Firebase Down**: Graceful degradation, doesn't crash
- [ ] **Slow Connection**: Loading states work

#### User Errors
- [ ] **No Song Selected**: Shows "Please select a song" error
- [ ] **Invalid Email**: Shows validation error
- [ ] **Empty Name**: Shows validation error

### 5. Browser Compatibility

Test in these browsers:
- [ ] **Chrome** (latest)
- [ ] **Safari** (latest) - especially iOS Safari
- [ ] **Firefox** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

### 6. Performance Testing

#### Load Time
- [ ] **Initial Load**: < 3 seconds on 4G
- [ ] **Images**: Album art loads quickly
- [ ] **Firebase**: Connects within 1 second
- [ ] **No Layout Shift**: Content doesn't jump around while loading

#### Interactions
- [ ] **Button Clicks**: Instant response
- [ ] **Radio Selection**: Immediate visual feedback
- [ ] **Scroll**: Smooth, no lag
- [ ] **Animations**: Smooth transitions (hover effects, tooltips)

### 7. Content Verification

#### Song Data
- [ ] **12 Songs Total**: All present
- [ ] **Song Titles**: Correct spelling
- [ ] **Lyric Previews**: Accurate, no typos
- [ ] **Genre Scale Values**: Match your intended ratings (0-10)
- [ ] **Status States**: Correct (released/votable/locked)

#### Text Content
- [ ] **Instructions**: Clear and accurate
- [ ] **"Sammy Whammies"**: Appears correctly
- [ ] **"Sam's mailing list"**: Correct phrasing
- [ ] **No Emojis**: 🎉 and 👆 removed from appropriate places
- [ ] **"Out July 17"**: Shows on Go Go Go

### 8. Accessibility Testing

- [ ] **Keyboard Navigation**: Can tab through all interactive elements
- [ ] **Radio Buttons**: Keyboard selectable (Space/Enter)
- [ ] **CLUE Button**: Keyboard accessible
- [ ] **Color Contrast**: Text readable against backgrounds
- [ ] **Focus Indicators**: Visible when tabbing

### 9. Security/Privacy

- [ ] **No Sensitive Data**: No API keys exposed in client code (Firebase keys are OK)
- [ ] **HTTPS**: Site loads over HTTPS (GitHub Pages default)
- [ ] **No Console Errors**: No security warnings in browser console

### 10. Edge Cases

- [ ] **Rapid Clicking**: Can't submit multiple votes by clicking fast
- [ ] **Browser Back Button**: Doesn't break state
- [ ] **Page Refresh**: State persists (voted status)
- [ ] **Multiple Tabs**: Works correctly in multiple tabs
- [ ] **Long Names/Emails**: Form handles long input
- [ ] **Special Characters**: Form handles special characters in tour location

---

## Post-Deployment Testing (After Push to GitHub)

### Live Site Verification
- [ ] **URL Works**: vote.samsamplemusic.com loads
- [ ] **HTTPS**: Green padlock in browser
- [ ] **All Assets Load**: No 404 errors in console
- [ ] **Firebase Connects**: Real-time updates work
- [ ] **Mobile**: Test on actual phone, not just emulator

### Monitoring (First 24 Hours)
- [ ] **Firebase Console**: Check for errors
- [ ] **Vote Counts**: Verify votes are being recorded
- [ ] **Mailing List**: Check entries are saving
- [ ] **User Feedback**: Ask a friend to test and report issues

---

## Quick Smoke Test (5 Minutes)

If you're short on time, test these critical paths:

1. **Desktop**: Load page, click dot, see artists, click CLUE, see lyric, select song, vote
2. **Mobile**: Load page, tap CLUE, select song, vote, fill mailing list
3. **Firebase**: Check vote saved in Firebase Console
4. **Second Vote**: Refresh page, verify can't vote again

---

## Testing Tools

### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network Tab**: Verify all resources load (200 status)
- **Application Tab**: Check localStorage for vote data
- **Responsive Mode**: Test different screen sizes

### Firebase Console
- **Realtime Database**: Watch votes appear in real-time
- **Usage Tab**: Monitor connection count
- **Rules Tab**: Verify security rules are active

### Online Tools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **SSL Check**: https://www.ssllabs.com/ssltest/

---

## Known Issues / Limitations

✅ **All Fixed!** No known issues at this time.

---

## Emergency Rollback Plan

If something breaks after deployment:

1. **Revert to previous commit**:
   ```bash
   cd litmab-voting
   git log  # Find last working commit hash
   git revert [commit-hash]
   git push origin main
   ```

2. **Disable voting temporarily**: Change all songs to "locked" in config.js

3. **Check Firebase**: Verify database rules haven't changed

---

## Sign-Off

- [ ] **All Critical Tests Pass**: Core functionality works
- [ ] **Mobile Tested**: Works on actual phone
- [ ] **Firebase Connected**: Votes saving correctly
- [ ] **No Console Errors**: Clean browser console
- [ ] **Ready to Deploy**: Confident to push to production

**Tested By**: _______________  
**Date**: _______________  
**Notes**: _______________