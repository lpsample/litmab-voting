# Plan: Violence Release + Straight Talk Dec 17 Update

## Overview

It is Nov 17, 2026. Violence is out today and voting is now open (Nov 17 – Dec 1).
Straight Talk is the confirmed Dec 17 release — it should show "OUT DEC 17" and no longer be a voting option.

All changes are in `config.js` only. No changes to `voting.js` or `index.html`.

---

## Sub-Task 1: Mark Violence as Released

**Intent:** Violence released today (Nov 17). Change its state from `votable` to `released` and add the release date label so the badge shows "OUT NOV 17" and the Spotify embed is visible on the card.

**Expected Outcomes:**
- Violence card shows "OUT NOV 17" status badge.
- Violence is no longer a vote option.
- The Spotify embed player appears (the URL was already added).

**Todo List:**
- [ ] In `config.js` song #3, change `state: "votable"` → `state: "released"`
- [ ] Add `releaseDate: "OUT NOV 17"` to song #3

**Relevant Context:**
- [`config.js` song #3 (lines 54–62)](config.js) — Violence entry
- [`voting.js` `createSongElement` (line 336)](voting.js) — `state: "released"` renders `song.releaseDate || 'Out Now'`

**Status:** `[x] done`

---

## Sub-Task 2: Mark Straight Talk as "OUT DEC 17"

**Intent:** Straight Talk (song #6) is the confirmed Dec 17 release — it won a prior vote. Change its state so the badge shows "OUT DEC 17" and it is removed from votable options.

**Expected Outcomes:**
- Straight Talk card shows "OUT DEC 17" status badge.
- Straight Talk no longer appears as a vote option.

**Todo List:**
- [ ] In `config.js` song #6, change `state: "votable"` → `state: "won"`
- [ ] Add `releaseDate: "OUT DEC 17"` to song #6

**Relevant Context:**
- [`config.js` song #6 (lines 79–86)](config.js) — Straight Talk entry
- [`voting.js` `createSongElement` (line 338)](voting.js) — `state: "won"` renders `song.releaseDate || 'Coming Soon'`; excluded from vote buttons

**Status:** `[x] done`

---

## Sub-Task 3: Update votingPeriod + Fallback Config

**Intent:** Set the active voting window to Nov 17–Dec 1 so the countdown shows "Voting ends in: X" and the "Next Release" section shows Violence / Nov 17.

**Expected Outcomes:**
- The voting countdown shows "Voting ends in: X" counting down to Dec 1.
- The "Next Release" section displays "Violence" and "November 17, 2026 at Midnight EST".

**Todo List:**
- [ ] Set `votingPeriod.start` to `"2026-11-17T00:00:00-05:00"` (Nov 17 midnight EST = UTC-5)
- [ ] Set `votingPeriod.end` to `"2026-12-01T00:00:00-05:00"` (Dec 1 midnight EST)
- [ ] Set `votingPeriod.nextRelease` to `"2026-11-17T00:00:00-05:00"`
- [ ] Set `nextReleaseSongTitle` to `"Violence"`
- [ ] Update the comment on the `votingPeriod` block to reflect the Nov 17 window

**Relevant Context:**
- [`config.js` `votingPeriod` (lines 20–24)](config.js)
- [`config.js` `nextReleaseSongTitle` (line 27)](config.js)
- [`voting.js` `updateCountdown` (line 784)](voting.js) — `now >= start && now <= end` → "Voting ends in: X" targeting `end`

**Status:** `[x] done`

---

## Sub-Task 4: Add/Update releaseSchedule Entries

**Intent:** Add Nov 17 (Violence) and Dec 17 (Straight Talk) entries to `releaseSchedule` so `applySchedule()` can automate future state promotions and voting window switching without manual config changes.

**Expected Outcomes:**
- `releaseSchedule` array contains a Nov 17 entry for song #3 and a Dec 17 entry for song #6.
- `applySchedule()` will auto-promote Violence to `released` and open voting on Nov 17, and auto-promote Straight Talk to `released` on Dec 17.

**Todo List:**
- [ ] Add Nov 17 entry: `songNumber: 3`, `releaseAt: "2026-11-17T00:00:00-05:00"`, `votingEnd: "2026-12-01T00:00:00-05:00"`, `releaseLabel: "OUT NOV 17"`
- [ ] Add Dec 17 entry: `songNumber: 6`, `releaseAt: "2026-12-17T00:00:00-05:00"`, `votingEnd: "2027-01-01T00:00:00-05:00"`, `releaseLabel: "OUT DEC 17"`
- [ ] If `releaseSchedule` does not yet exist in `config.js`, add it as a new top-level array property

**Relevant Context:**
- [`config.js`](config.js) — `releaseSchedule` array does not currently exist and must be added
- [`voting.js` `applySchedule` (lines 25–77)](voting.js) — reads `CONFIG.releaseSchedule`, maps `releaseAt`/`votingEnd`/`releaseLabel`/`songNumber`

**Status:** `[x] done`
