// ============================================
// ALBUM VOTING CONFIGURATION
// ============================================
// Update this file to manage voting periods and song states

const CONFIG = {
    // Firebase Configuration
    // Replace these with your Firebase project credentials
    firebase: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    },

    // Voting Period Configuration
    // TESTING MODE: Active NOW for testing
    votingPeriod: {
        start: "2026-05-15T14:00:00-04:00",  // Testing: Active now (2pm EST)
        end: "2026-05-20T23:59:59-04:00",     // Testing: Ends May 20
        nextRelease: "2026-05-21T00:00:00-04:00"  // Testing: May 21 at midnight EST
    },
    
    // PRODUCTION DATES (uncomment these and comment out testing dates above when ready):
    // votingPeriod: {
    //     start: "2026-06-17T00:00:00-04:00",  // June 17, 2026 (Eastern Time)
    //     end: "2026-07-01T23:59:59-04:00",     // July 1, 2026 (Eastern Time)
    //     nextRelease: "2026-07-17T00:00:00-04:00"  // July 17, 2026 at Midnight EST
    // },
    
    // Next Release Song Title (shown at top)
    nextReleaseSongTitle: "Go Go Go",
    
    // Album Art Path (relative to HTML file or full URL)
    albumArtPath: "assets/album-art.jpg",

    // Song Configuration
    // Track list in order with their states and lyric previews
    songs: [
        {
            number: 1,
            title: "Go Go Go",
            state: "released",  // Options: "released", "votable", "locked"
            lyricPreview: "Neurons lost their firing pins… my skin breaks out and I get high and overeat"
        },
        {
            number: 2,
            title: "Let's Get Away",
            state: "votable",
            lyricPreview: "Cruel girls they play for winners… Some overfit the model, some plain don't make it out"
        },
        {
            number: 3,
            title: "Violence",
            state: "votable",
            lyricPreview: "You held my wrists up above my head, now I'm wandering through the drug store, I'm full of regret"
        },
        {
            number: 4,
            title: "Roles",
            state: "votable",
            lyricPreview: "Every waking thought, wanna hear it come from your lips. When your mind is wrought, want you to seek my solace"
        },
        {
            number: 5,
            title: "In Loving Memory",
            state: "locked",  // Permanently locked
            lyricPreview: "Your mother used to worry but she's tired"
        },
        {
            number: 6,
            title: "Straight Talk",
            state: "votable",
            lyricPreview: "Sisyphus was talking shit, but carries on unblind"
        },
        {
            number: 7,
            title: "XACTO",
            state: "votable",
            lyricPreview: "You broke me deep to my core knowing' you're better for, not knowing me anymore"
        },
        {
            number: 8,
            title: "You're Not Really From Manchester",
            state: "votable",
            lyricPreview: "You're workin' the stick shift on the M6"
        },
        {
            number: 9,
            title: "Tax",
            state: "votable",
            lyricPreview: "I guess it's a tax of the times, payment to get out of line, didn't mean to leave behind, your prime just wasn't mine"
        },
        {
            number: 10,
            title: "Shattered",
            state: "votable",
            lyricPreview: "I try to run what I don't understand but it never gets through to me"
        },
        {
            number: 11,
            title: "Think of Calling",
            state: "votable",
            lyricPreview: "Wherever you are I hope you're okay, if you ever come back I hope I have grace"
        },
        {
            number: 12,
            title: "Glass",
            state: "locked",  // Permanently locked (final song)
            lyricPreview: "Try to find a way to get it out, make it better feel less consumed. Guess the lows are part of livin'"
        }
    ],

    // Display Options
    display: {
        showVoteCounts: true,        // Show real-time vote counts
        allowMultipleVotes: false,   // Allow users to vote multiple times (uses localStorage to track)
        showCountdown: true          // Show countdown to next voting period/release
    }
};

// ============================================
// INSTRUCTIONS FOR UPDATING BETWEEN PERIODS
// ============================================
/*
1. After each voting period ends:
   - Change the winning song's state from "votable" to "released"
   - Update votingPeriod.start to the new period start date
   - Update votingPeriod.end to the new period end date
   - Update votingPeriod.nextRelease to the next release date

2. Example for July voting period (after Go Go Go is released):
   votingPeriod: {
       start: "2026-07-17T00:00:00-04:00",
       end: "2026-07-31T23:59:59-04:00",
       nextRelease: "2026-08-17T00:00:00-04:00"
   }

3. To add lyric previews:
   - Replace "Add your lyric preview here..." with actual lyrics
   - Keep them short (1-2 lines max for best display)

4. Firebase Setup:
   - Create a free Firebase project at https://console.firebase.google.com
   - Enable Realtime Database
   - Copy your config values into the firebase object above
   - Set database rules to allow read/write (see FIREBASE-SETUP.md)
*/

// Made with Bob
