# Plan: Nov 17 + Dec 17 Release Schedule Update

## Overview

All changes are in `config.js` only — no changes to `voting.js` or `index.html`.

**The full release sequence being configured:**
- **Nov 17**: Violence releases. Voting opens (Nov 17 – Dec 1) for the Jan 17 pick.
- **Dec 17**: Straight Talk releases (already confirmed winner — no vote needed).

**Changes needed:**
1. Mark **Straight Talk** (song #6) as `won` with `releaseDate: "OUT DEC 17"` so it shows "OUT DEC 17" instead of "ELIGIBLE".
2. Add a **Nov 17 schedule entry** (Violence / song #3) so voting opens automatically on Nov 17 and the "Next Release" countdown counts down to Violence on Nov 17.
3. Add a **Dec 17 schedule entry** (Straight Talk / song #6) so it auto-promotes to `released` on Dec 17.
4. Update the fallback `votingPeriod` and `nextReleaseSongTitle` to reflect the Nov 17 window.
5. Add the **Violence Spotify embed URL** once provided on Nov 17 (deferred).

---

## Sub-Task 1: Mark Straight Talk as "OUT DEC 17"

**Intent:** Straight Talk (song #6) is the confirmed Dec 17 release. Change its state so the badge shows "OUT DEC 17" instead of "ELIGIBLE" and it is no longer a votable option.

**Expected Outcomes:**
- Song #6 displays "OUT DEC 17" in the status badge.
- Straight Talk is removed from the selectable vote options.

**Todo List:**
- [x] In `config.js` song #6, change `state: "votable"` → `state: "won"`
- [x] Add `releaseDate: "OUT DEC 17"` to song #6

**Relevant Context:**
- [`config.js` song #6 (line 101–107)](config.js)
- [`voting.js` `createSongElement`](voting.js) — `state: "won"` renders `song.releaseDate || 'Coming Soon'`; `state: "votable"` renders `'ELIGIBLE'`

**Status:** `[x] done`

---

## Sub-Task 2: Add Nov 17 and Dec 17 Entries to Release Schedule

**Intent:** The `releaseSchedule` drives all automatic state changes and voting windows via `applySchedule()` in `voting.js`. Two new entries are needed:

- **Nov 17 entry** — tied to Violence (song #3). When Nov 17 arrives: Violence auto-promotes to `released`, voting opens, and the "Next Release" countdown shows Violence / Nov 17.
- **Dec 17 entry** — tied to Straight Talk (song #6). When Dec 17 arrives: Straight Talk auto-promotes to `released`.

Note: November and December use EST = **UTC-5** (not UTC-4 EDT which ends in early November).

**Expected Outcomes:**
- On Nov 17 at midnight EST, the app automatically shows voting as open with period "Nov 17 – Dec 1".
- Violence shows as "OUT NOV 17" (auto-applied by `applySchedule`).
- The "Next Release" section shows Violence / countdown to Nov 17 (while we're pre-Nov 17).
- On Dec 17, Straight Talk auto-promotes from `won` → `released`.

**Todo List:**
- [x] Add Nov 17 entry to `releaseSchedule`
- [x] Add Dec 17 entry to `releaseSchedule`
- [x] Update fallback `votingPeriod` to Nov 17 window
- [x] Update fallback `nextReleaseSongTitle` to `"Violence"`

**Relevant Context:**
- [`config.js` `releaseSchedule` array (line 35–48)](config.js)
- [`config.js` `votingPeriod` (line 21–25)](config.js)
- [`config.js` `nextReleaseSongTitle` (line 29)](config.js)
- [`voting.js` `applySchedule()`](voting.js) — when `now >= entry.releaseDate`, the song is promoted to `released`; the active/next entry sets `CONFIG.votingPeriod.*` and `CONFIG.nextReleaseSongTitle`

**Status:** `[x] done`

---

## Sub-Task 3: Add Violence Spotify Embed (Deferred)

**Intent:** Song #3 (Violence) currently has no `spotifyEmbed`. Once the link is provided on Nov 17, add it so the Spotify player appears on the Violence card.

**Expected Outcomes:**
- The Spotify embed player appears on the Violence song card.

**Todo List:**
- [ ] Receive the Spotify embed URL from user on Nov 17
- [ ] Add `spotifyEmbed: "<URL>"` to song #3 in `config.js`

**Relevant Context:**
- [`config.js` song #3 (line 75–83)](config.js)
- [`voting.js` `createSongElement`](voting.js) — renders the embed iframe when `song.spotifyEmbed` is present

**Status:** `[ ] pending — waiting for URL on Nov 17`
