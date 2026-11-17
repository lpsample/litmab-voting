# Plan: Top Banner — Show Voting Open + Fix Next Release to Straight Talk

## Overview

Two problems to fix:

1. **Top banner** — when voting is open, there is no prominent "Voting Open" indicator at the top of the page. The existing `#votingInactiveBanner` only shows when voting is *closed*. A matching "Voting Open" banner needs to be added that shows when voting is active, with a countdown to the close date (Dec 1).

2. **"Next Release" section** — currently shows Violence / "🎉 OUT NOW! 🎉" because `applySchedule()` sets `nextRelease` from the *active* schedule entry (Nov 17 / Violence). It should show the *next upcoming* release: **Straight Talk / Dec 17**.

All changes touch `index.html`, `voting.js`, and `config.js`.

---

## Sub-Task 1: Add "Voting Open" Banner to index.html

**Intent:** Add a "Voting Open" banner element (sibling to `#votingInactiveBanner`) that is shown when voting is active. It should display a "🗳️ Voting is Open!" message and the live countdown to Dec 1. The existing `#countdown` div and `#votingPeriod` line can remain for now — the banner sits at the very top of the page.

**Expected Outcomes:**
- A prominent "🗳️ Voting is Open!" banner appears at the very top of the page when voting is active.
- The banner includes the live "Voting ends in: X" countdown (can reuse the existing `#countdown` div by moving it into the banner, or add a new element).
- The banner is hidden when voting is closed (the inactive banner shows instead).

**Todo List:**
- [ ] In `index.html`, add a new `<div id="votingActiveBanner">` immediately after `#votingInactiveBanner` (line 16), styled similar to the inactive banner, with a "🗳️ Voting is Open!" heading and the `#countdown` div moved inside it (or a new countdown span)
- [ ] Default `style="display: none;"` on the new banner (JS will show it when active)

**Relevant Context:**
- [`index.html` lines 11–16](index.html) — `#votingInactiveBanner` for reference on structure/style
- [`index.html` lines 81–85](index.html) — existing `#votingPeriod` and `#countdown` elements
- [`styles.css`](styles.css) — `.voting-inactive-banner` styles to mirror/reuse for the active banner

**Status:** `[ ] pending`

---

## Sub-Task 2: Wire the Active Banner in voting.js

**Intent:** Update `checkVotingPeriodStatus()` to show `#votingActiveBanner` when voting is active and hide it otherwise. The existing `#countdown` / `updateCountdown()` already ticks down to `votingPeriod.end` with message "Voting ends in: X" — no countdown logic changes needed.

**Expected Outcomes:**
- When `now >= start && now <= end`: `#votingActiveBanner` is visible, `#votingInactiveBanner` is hidden.
- When outside voting window: `#votingActiveBanner` is hidden, `#votingInactiveBanner` is visible (existing behaviour preserved).

**Todo List:**
- [ ] In `checkVotingPeriodStatus()`, add a reference to `document.getElementById('votingActiveBanner')`
- [ ] In the active branch (`else` / voting is active), set `votingActiveBanner.style.display = 'block'` and ensure `banner.style.display = 'none'`
- [ ] In the inactive branches (before start / after end), set `votingActiveBanner.style.display = 'none'`

**Relevant Context:**
- [`voting.js` `checkVotingPeriodStatus` (lines 130–170)](voting.js)
- [`voting.js` `updateCountdown` (lines 784–823)](voting.js) — already outputs "Voting ends in: X" to `#countdown`

**Status:** `[ ] pending`

---

## Sub-Task 3: Fix "Next Release" to Show Straight Talk / Dec 17

**Intent:** `applySchedule()` currently sets `CONFIG.votingPeriod.nextRelease` and `CONFIG.nextReleaseSongTitle` from the *active* entry (Nov 17 / Violence). The "Next Release" banner uses these values, so it shows Violence / "🎉 OUT NOW! 🎉". It should show the *next* scheduled entry: Straight Talk / Dec 17.

Fix: after finding `activeEntry`, also find `nextEntry` (the first entry whose `releaseAt` is *after* the active entry's `releaseAt`), and use `nextEntry` for `nextRelease` and `nextReleaseSongTitle`.

Also update the `config.js` fallback values so the correct song/date appears even before `applySchedule()` runs (or if no schedule is present).

**Expected Outcomes:**
- "Next Release" section shows "Straight Talk" and "December 17, 2026 at Midnight EST".
- The release countdown in that section counts down to Dec 17.
- `votingPeriod.start` / `end` remain correctly set to the Nov 17–Dec 1 window (unchanged).

**Todo List:**
- [ ] In `applySchedule()` in `voting.js`, after setting `CONFIG.votingPeriod.start/end` from `activeEntry`, find `nextEntry` = first entry in `schedule` where `releaseAt > activeEntry.releaseAt`
- [ ] Set `CONFIG.votingPeriod.nextRelease` and `CONFIG.nextReleaseSongTitle` from `nextEntry` (fall back to `activeEntry` if no next entry exists)
- [ ] In `config.js`, update fallback `votingPeriod.nextRelease` to `"2026-12-17T00:00:00-05:00"`
- [ ] In `config.js`, update fallback `nextReleaseSongTitle` to `"Straight Talk"`

**Relevant Context:**
- [`voting.js` `applySchedule` (lines 25–77)](voting.js) — lines 73–76 set `nextRelease` and `nextReleaseSongTitle`
- [`voting.js` `updateVotingPeriodDisplay` (lines 708–731)](voting.js) — reads `CONFIG.votingPeriod.nextRelease` and `CONFIG.nextReleaseSongTitle` to populate the Next Release section
- [`config.js` lines 20–27](config.js) — fallback `votingPeriod` and `nextReleaseSongTitle`

**Status:** `[ ] pending`
