# Mobile Artist Examples Overflow - Root Cause Analysis

## Problem Statement
Artist examples are getting cut off on the sides on mobile devices despite multiple fix attempts.

## Root Cause Analysis

### Issue #1: Parent Container Constraints
**Location**: `.scale-labels` (line 249-256)
**Problem**: The parent container uses `display: flex` with `justify-content: space-between`
- This forces the three label spans (`.scale-left`, `.scale-middle`, `.scale-right`) to the edges
- The `.scale-artists` elements are positioned `absolute` relative to these edge-positioned parents
- Even with `left: 50%` and `translateX(-50%)`, they're centering relative to their parent, not the viewport

### Issue #2: Conflicting Positioning
**Location**: Lines 269-284
**Problem**: Desktop styles set different text-align for each label:
```css
.scale-left { text-align: left; flex: 1; }
.scale-middle { text-align: center; flex: 1; }
.scale-right { text-align: right; flex: 1; }
```
- These create three equal-width columns
- `.scale-artists` inside `.scale-left` starts from left edge
- `.scale-artists` inside `.scale-right` starts from right edge
- On mobile, even with centering, the parent's position affects the child

### Issue #3: Width Calculation
**Location**: Line 350-351
**Problem**: Using both `max-width: 90vw` and `width: max-content`
```css
max-width: 90vw !important;
width: max-content !important;
```
- `max-content` tries to fit all content without wrapping
- If artist names are long, `max-content` can exceed 90vw
- The element tries to be wider than allowed, causing overflow

### Issue #4: Transform Origin
**Location**: Line 358
**Problem**: `transform: translateX(-50%)` centers based on element's own width
- If element is 95vw wide, it extends 47.5vw in each direction from center
- This can push content off-screen on narrow devices

## Why Previous Fixes Failed

### Attempt 1: `max-width: 200px`
- Too restrictive, caused text wrapping issues
- Didn't account for viewport width

### Attempt 2: `max-width: 90vw`
- Better, but `width: max-content` overrode it
- Parent positioning still caused issues

### Attempt 3: Centering overrides
- Added `left: 50%` and `transform: translateX(-50%)`
- But parent containers (`.scale-left`, `.scale-right`) are still at edges
- Absolute positioning is relative to parent, not viewport

## The Real Solution

We need to:
1. **Change positioning context** - Use `fixed` instead of `absolute` on mobile
2. **Remove width: max-content** - Let it be auto with max-width
3. **Add viewport-relative positioning** - Position relative to viewport, not parent
4. **Add padding buffer** - Account for screen edges

## Recommended Fix

```css
@media (max-width: 768px) {
    /* Ensure parent doesn't constrain */
    .genre-scale-legend {
        overflow: visible !important;
        position: relative !important;
    }
    
    .scale-labels {
        overflow: visible !important;
    }
    
    .scale-artists {
        /* Change to fixed positioning */
        position: fixed !important;
        
        /* Center in viewport */
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
        
        /* Constrain width with buffer */
        max-width: calc(100vw - 30px) !important;
        width: auto !important;
        
        /* Position below parent */
        top: auto !important;
        bottom: 20px !important;
        
        /* Text wrapping */
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        text-align: center !important;
        line-height: 1.4 !important;
        
        /* Ensure visibility */
        z-index: 9999 !important;
        box-sizing: border-box !important;
        
        /* Add padding inside */
        padding: 12px 15px !important;
    }
    
    /* Override all parent positioning */
    .scale-left .scale-artists,
    .scale-middle .scale-artists,
    .scale-right .scale-artists {
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
        position: fixed !important;
    }
}
```

## Why This Works

1. **`position: fixed`** - Positions relative to viewport, not parent
2. **`left: 50%` + `translateX(-50%)`** - True viewport centering
3. **`max-width: calc(100vw - 30px)`** - Guarantees 15px padding on each side
4. **`width: auto`** - Lets content determine width up to max-width
5. **`bottom: 20px`** - Fixed position at bottom of screen (easy to see)
6. **`z-index: 9999`** - Ensures it's above everything

## Alternative Solution (If Fixed Position Not Desired)

If you want to keep it near the dots instead of fixed at bottom:

```css
@media (max-width: 768px) {
    .scale-artists {
        position: absolute !important;
        left: 15px !important;
        right: 15px !important;
        transform: none !important;
        margin-left: auto !important;
        margin-right: auto !important;
        max-width: none !important;
        width: calc(100% - 30px) !important;
    }
}
```

This constrains it to parent width minus padding.

## Testing Checklist

After applying fix, test on:
- [ ] iPhone SE (375px) - narrowest common phone
- [ ] iPhone 12 Pro (390px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] Pixel 5 (393px)
- [ ] Very narrow (320px) - edge case

For each device:
- [ ] Click left dot - no overflow
- [ ] Click middle dot - no overflow
- [ ] Click right dot - no overflow
- [ ] Text wraps properly
- [ ] Readable and centered

## Implementation Priority

**CRITICAL** - This is a user-facing bug that affects mobile users (majority of traffic)

Recommended approach:
1. Apply fixed positioning solution (most reliable)
2. Test on real device or Chrome DevTools mobile emulation
3. If fixed position feels wrong, try alternative solution
4. Verify with automated test script

## Related Files
- `styles.css` lines 299-369 (artist examples CSS)
- `index.html` lines 48-61 (HTML structure)
- `voting.js` lines 68-99 (click handlers)