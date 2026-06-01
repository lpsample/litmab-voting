# Desktop Improvements & AmeriRock Genre Scale - Implementation Plan

## Overview
Enhance the litmab-voting application with a desktop-optimized grid layout and add an AmeriRock genre scale feature to help users understand each song's musical style.

## Goals
1. **Desktop Grid Layout**: Display songs in 2-3 columns on desktop for easier comparison and less scrolling
2. **AmeriRock Genre Scale**: Visual indicator showing where each song falls on the Folk/Americana (0) to Hard Rock (10) spectrum
3. **Preserve Mobile Experience**: Keep current mobile-optimized single-column layout unchanged
4. **Deployment Path**: Test on GitHub Pages → Deploy to Squarespace when ready

---

## Current State Analysis

### What Works Well (Mobile)
- ✅ Single column vertical layout optimized for mobile scrolling
- ✅ Lyric tooltips on tap
- ✅ Radio button selection system
- ✅ Vote counting and Firebase integration
- ✅ Responsive design for small screens

### What Needs Improvement (Desktop)
- ❌ Single column layout wastes horizontal space
- ❌ Requires excessive scrolling to see all 12 songs
- ❌ Difficult to compare songs side-by-side
- ❌ Max-width: 800px too narrow for large screens
- ❌ No genre/style information for songs

---

## Proposed Solution

### 1. AmeriRock Genre Scale System

**Scale Definition:**
- **0-3**: Folk/Americana (acoustic, mellow, storytelling vibes)
- **4-6**: Indie/Alternative Rock (balanced, moderate energy)
- **7-10**: Hard Rock (electric, high energy, intense)

**Song Ratings (Provided by User):**
```
1.  Go Go Go                          → 5  (Indie/Alt)
2.  Let's Get Away                    → 1  (Folk/Americana)
3.  Violence                          → 4  (Indie/Alt)
4.  Roles                             → 3  (Folk/Americana)
5.  In Loving Memory                  → 2  (Folk/Americana)
6.  Straight Talk                     → 3  (Folk/Americana)
7.  XACTO                             → 7  (Hard Rock)
8.  You're Not Really From Manchester → 8  (Hard Rock)
9.  Tax                               → 9  (Hard Rock)
10. Shattered                         → 9  (Hard Rock)
11. Think of Calling                  → 3  (Folk/Americana)
12. Glass                             → 10 (Hard Rock)
```

### 2. Desktop Grid Layout Specifications

**Responsive Breakpoints:**
- **Mobile**: < 768px → Single column (current design)
- **Tablet**: 768px - 1023px → Single column, slightly wider
- **Desktop**: 1024px - 1399px → 2-column grid
- **Large Desktop**: ≥ 1400px → 3-column grid

**Grid Benefits:**
- View 4-6 songs simultaneously (vs 1-2 currently)
- Reduce scrolling by ~60%
- Enable visual comparison of songs
- Better utilize screen real estate

### 3. Visual Components

#### A. Genre Scale Legend (Top of Page)
Displays once at the top to explain the scale:
```
┌─────────────────────────────────────────────────────┐
│  🎸 AmeriRock Genre Scale                           │
│  ◄─────────────────────────────────────────────►   │
│  Folk/Americana                        Hard Rock    │
│  (Acoustic, Mellow)              (Electric, Intense)│
└─────────────────────────────────────────────────────┘
```

#### B. Per-Song Genre Indicator (On Hover)
Each song shows its position on the scale when hovered:
```
┌─────────────────────────────────────────┐
│  7. XACTO                               │
│  "You broke me deep to my core..."      │
│                                         │
│  Genre: ◄──────────●──────►            │
│         Folk/Americana  Hard Rock       │
│         (Rating: 7 - Hard Rock)         │
└─────────────────────────────────────────┘
```

---

## Implementation Details

### Phase 1: Add Genre Scale Data
**File**: [`config.js`](litmab-voting/config.js)

Add `ameriRockScale` property to each song:
```javascript
songs: [
    {
        number: 1,
        title: "Go Go Go",
        state: "released",
        lyricPreview: "Neurons lost their firing pins...",
        ameriRockScale: 5  // NEW PROPERTY
    },
    // ... etc for all 12 songs
]
```

### Phase 2: Create Genre Scale Legend
**File**: [`index.html`](litmab-voting/index.html)

Add legend component after voting instructions:
```html
<div class="genre-scale-legend">
    <h3>🎸 AmeriRock Genre Scale</h3>
    <div class="scale-bar">
        <div class="scale-gradient"></div>
        <div class="scale-labels">
            <span class="scale-left">Folk/Americana (0)</span>
            <span class="scale-right">Hard Rock (10)</span>
        </div>
    </div>
</div>
```

### Phase 3: Add Genre Scale to Songs
**File**: [`voting.js`](litmab-voting/voting.js)

Update `createSongElement()` function to include genre scale tooltip:
```javascript
// Add genre scale indicator (similar to lyric tooltip)
if (song.ameriRockScale !== undefined) {
    const genreScale = document.createElement('div');
    genreScale.className = 'genre-scale-tooltip';
    
    const position = (song.ameriRockScale / 10) * 100;
    genreScale.innerHTML = `
        <div class="genre-scale-bar">
            <div class="genre-scale-marker" style="left: ${position}%"></div>
        </div>
        <div class="genre-scale-labels">
            <span>Folk/Americana</span>
            <span>Hard Rock</span>
        </div>
        <div class="genre-scale-value">Rating: ${song.ameriRockScale}/10</div>
    `;
    
    div.appendChild(genreScale);
}
```

### Phase 4: Desktop Grid Layout CSS
**File**: [`styles.css`](litmab-voting/styles.css)

Add desktop grid styles:
```css
/* Desktop Grid Layout */
@media (min-width: 1024px) {
    .container {
        max-width: 1400px;
    }
    
    .tracklist {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
    
    .song-item {
        height: 100%;
    }
}

@media (min-width: 1400px) {
    .tracklist {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }
}

/* Genre Scale Legend Styles */
.genre-scale-legend {
    margin: 25px 0;
    padding: 20px;
    background: rgba(139, 92, 246, 0.1);
    border: 2px solid #8b5cf6;
    border-radius: 10px;
}

.scale-bar {
    position: relative;
    height: 40px;
    margin: 15px 0;
}

.scale-gradient {
    height: 12px;
    background: linear-gradient(90deg, 
        #60a5fa 0%,    /* Folk/Americana - light blue */
        #8b5cf6 50%,   /* Indie/Alt - purple */
        #ef4444 100%   /* Hard Rock - red */
    );
    border-radius: 6px;
}

/* Genre Scale Tooltip (per song) */
.genre-scale-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    background: rgba(0, 0, 0, 0.95);
    border: 2px solid #8b5cf6;
    border-radius: 8px;
    padding: 15px 20px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    min-width: 280px;
}

@media (hover: hover) and (pointer: fine) {
    .song-item:hover .genre-scale-tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(-15px);
    }
}
```

### Phase 5: Update Squarespace File
**File**: [`squarespace-complete.html`](litmab-voting/squarespace-complete.html)

After testing on GitHub Pages, integrate all changes into the Squarespace deployment file with inline CSS and JS.

---

## Layout Comparison

### Before (Desktop - Current)
```
┌────────────────────────┐
│  Header & Album Art    │
├────────────────────────┤
│  Song 1                │
├────────────────────────┤
│  Song 2                │
├────────────────────────┤
│  Song 3                │
├────────────────────────┤
│  Song 4                │
│  ...                   │
│  (scroll required)     │
└────────────────────────┘
```

### After (Desktop - 2 Column Grid)
```
┌──────────────────────────────────────┐
│     Header & Album Art               │
│  Genre Scale Legend: Folk ◄──► Rock  │
├──────────────────┬───────────────────┤
│  Song 1          │  Song 2           │
│  [Genre: ●─────] │  [Genre: ●────]   │
├──────────────────┼───────────────────┤
│  Song 3          │  Song 4           │
├──────────────────┼───────────────────┤
│  Song 5          │  Song 6           │
│  ...             │  ...              │
└──────────────────┴───────────────────┘
```

---

## Files to Modify

1. ✅ [`config.js`](litmab-voting/config.js) - Add ameriRockScale to each song
2. ✅ [`index.html`](litmab-voting/index.html) - Add genre scale legend HTML
3. ✅ [`styles.css`](litmab-voting/styles.css) - Add desktop grid + genre scale styles
4. ✅ [`voting.js`](litmab-voting/voting.js) - Add genre scale rendering logic
5. ✅ [`squarespace-complete.html`](litmab-voting/squarespace-complete.html) - Final integration

---

## Testing Plan

### GitHub Pages Testing
1. Test desktop grid layout at 1024px, 1400px, 1920px
2. Verify mobile layout unchanged at 375px, 768px
3. Test genre scale hover interactions
4. Verify all voting functionality works
5. Check lyric tooltips still work correctly
6. Test on Chrome, Firefox, Safari

### Squarespace Deployment
1. Copy tested code to squarespace-complete.html
2. Deploy to Squarespace code block
3. Final verification on live site

---

## Success Criteria

✅ Desktop displays 2-3 column grid layout
✅ Mobile remains single column (unchanged)
✅ Genre scale legend visible at top
✅ Each song shows genre scale on hover
✅ All voting functionality preserved
✅ Lyric tooltips still work
✅ Responsive breakpoints smooth
✅ No visual regressions
✅ Improved desktop UX with less scrolling

---

## Next Steps

Ready to proceed with implementation! I'll:
1. Start with adding genre scale data to config.js
2. Build the genre scale legend component
3. Implement per-song genre indicators
4. Add desktop grid layout
5. Test thoroughly on GitHub Pages
6. Update squarespace-complete.html when ready

**Would you like me to proceed with this implementation plan?**