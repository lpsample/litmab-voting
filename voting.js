// ============================================
// ALBUM VOTING APPLICATION
// ============================================

let db = null;
let userVotes = {};

// Initialize Firebase
function initFirebase() {
    try {
        firebase.initializeApp(CONFIG.firebase);
        db = firebase.database();
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// Initialize the application
function init() {
    const firebaseInitialized = initFirebase();
    
    if (!firebaseInitialized) {
        console.warn('Running in demo mode without Firebase');
    }
    
    // Set album art if configured
    const albumArtEl = document.getElementById('albumArt');
    if (albumArtEl && CONFIG.albumArtPath) {
        albumArtEl.src = CONFIG.albumArtPath;
    }
    
    loadUserVotes();
    renderSongs();
    updateVotingPeriodDisplay();
    
    if (CONFIG.display.showCountdown) {
        startCountdown();
    }
    
    if (firebaseInitialized) {
        listenToVoteUpdates();
    }
    
    // Set up submit button
    const submitButton = document.getElementById('submitVoteButton');
    if (submitButton) {
        submitButton.addEventListener('click', handleSubmitVote);
        
        // Check if user has already voted
        const hasVoted = Object.keys(userVotes).some(key => userVotes[key] === true);
        if (hasVoted && !CONFIG.display.allowMultipleVotes) {
            submitButton.disabled = true;
            submitButton.textContent = 'Vote Submitted! ✓';
        }
    }
    
    // Set up mailing list form
    setupMailingListForm();
}

// Load user's previous votes from localStorage
function loadUserVotes() {
    const stored = localStorage.getItem('albumVotes');
    if (stored) {
        try {
            userVotes = JSON.parse(stored);
        } catch (e) {
            userVotes = {};
        }
    }
}

// Save user's vote to localStorage
function saveUserVote(songNumber) {
    userVotes[songNumber] = true;
    localStorage.setItem('albumVotes', JSON.stringify(userVotes));
}

// Check if user has already voted for a song
function hasUserVoted(songNumber) {
    return userVotes[songNumber] === true;
}

// Render all songs
function renderSongs() {
    const tracklist = document.getElementById('tracklist');
    tracklist.innerHTML = '';
    
    CONFIG.songs.forEach(song => {
        const songElement = createSongElement(song);
        tracklist.appendChild(songElement);
    });
    
    // Add mobile tap handlers for lyric previews
    addMobileLyricHandlers();
    
    // Load vote counts if Firebase is available
    if (db && CONFIG.display.showVoteCounts) {
        loadVoteCounts();
    }
}

// Add tap handlers for mobile lyric previews and genre scale
function addMobileLyricHandlers() {
    // Only add for touch devices
    if ('ontouchstart' in window) {
        const songItems = document.querySelectorAll('.song-item');
        
        songItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't trigger if clicking radio button or label
                if (e.target.classList.contains('song-radio') ||
                    e.target.classList.contains('radio-label')) {
                    return;
                }
                
                // Toggle lyric and genre display
                const wasShowing = this.classList.contains('show-lyric');
                
                // Hide all other lyrics and genre scales
                document.querySelectorAll('.song-item').forEach(s => {
                    s.classList.remove('show-lyric');
                    s.classList.remove('show-genre');
                });
                
                // Toggle this one - show both lyric and genre
                if (!wasShowing) {
                    this.classList.add('show-lyric');
                    this.classList.add('show-genre');
                }
            });
        });
        
        // Close lyric and genre when tapping outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.song-item')) {
                document.querySelectorAll('.song-item').forEach(s => {
                    s.classList.remove('show-lyric');
                    s.classList.remove('show-genre');
                });
            }
        });
    }
}

// Create a song element
function createSongElement(song) {
    const div = document.createElement('div');
    div.className = `song-item ${song.state}`;
    div.dataset.songNumber = song.number;
    
    // Check if user has voted
    if (hasUserVoted(song.number) && song.state === 'votable') {
        div.classList.add('voted');
    }
    
    // Song header
    const header = document.createElement('div');
    header.className = 'song-header';
    
    const number = document.createElement('div');
    number.className = 'song-number';
    number.textContent = song.number;
    
    const title = document.createElement('div');
    title.className = 'song-title';
    title.textContent = song.title;
    
    const status = document.createElement('div');
    status.className = `song-status status-${song.state}`;
    
    if (song.state === 'released') {
        status.textContent = 'Out Now';
    } else if (song.state === 'votable') {
        status.textContent = hasUserVoted(song.number) ? 'Voted' : 'Vote';
    } else if (song.state === 'locked') {
        status.innerHTML = 'Locked 🔒';
    }
    
    header.appendChild(number);
    header.appendChild(title);
    header.appendChild(status);
    div.appendChild(header);
    
    // Combined lyric and genre scale tooltip
    if (song.lyricPreview || song.ameriRockScale !== undefined) {
        const tooltip = document.createElement('div');
        tooltip.className = 'lyric-tooltip';
        
        let tooltipContent = '';
        
        // Add lyric preview
        if (song.lyricPreview) {
            tooltipContent += `<div class="tooltip-lyric">"${song.lyricPreview}"</div>`;
        }
        
        // Add genre scale (without softer/harder labels)
        if (song.ameriRockScale !== undefined) {
            const position = (song.ameriRockScale / 10) * 100;
            tooltipContent += `
                <div class="tooltip-genre-scale">
                    <div class="genre-scale-bar">
                        <div class="genre-scale-marker" style="left: ${position}%"></div>
                    </div>
                    <div class="genre-scale-labels">
                        <span>Folk/Americana</span>
                        <span>Indie/Alternative Rock</span>
                    </div>
                </div>
            `;
        }
        
        tooltip.innerHTML = tooltipContent;
        div.appendChild(tooltip);
    }
    
    // Vote count (if enabled and votable)
    if (CONFIG.display.showVoteCounts && song.state === 'votable') {
        const voteCount = document.createElement('div');
        voteCount.className = 'vote-count';
        voteCount.innerHTML = `
            <span class="vote-number" data-song="${song.number}">0 votes</span>
            <div class="vote-bar">
                <div class="vote-bar-fill" data-song="${song.number}" style="width: 0%"></div>
            </div>
        `;
        div.appendChild(voteCount);
    }
    
    // Radio button (for votable songs only)
    if (song.state === 'votable') {
        const radioContainer = document.createElement('div');
        radioContainer.className = 'radio-container';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'songVote';
        radio.id = `song-${song.number}`;
        radio.value = song.number;
        radio.className = 'song-radio';
        radio.disabled = hasUserVoted(song.number) && !CONFIG.display.allowMultipleVotes;
        
        const label = document.createElement('label');
        label.htmlFor = `song-${song.number}`;
        label.className = 'radio-label';
        label.textContent = hasUserVoted(song.number) ? 'You Voted for This!' : 'Select This Song';
        
        radioContainer.appendChild(radio);
        radioContainer.appendChild(label);
        div.appendChild(radioContainer);
    }
    
    return div;
}

// Handle vote submission with confirmation
async function handleVote(songNumber) {
    // Check if already voted and multiple votes not allowed
    if (hasUserVoted(songNumber) && !CONFIG.display.allowMultipleVotes) {
        return;
    }
    
    // Check if voting period is active
    if (!isVotingPeriodActive()) {
        alert('Voting period is not currently active.');
        return;
    }
    
    // Get song details
    const song = CONFIG.songs.find(s => s.number === songNumber);
    if (!song) return;
    
    // Show confirmation dialog
    const confirmed = confirm(`Are you sure you want to vote for "${song.title}"?\n\nYou can only vote once per voting period.`);
    
    if (!confirmed) {
        return; // User cancelled
    }
    
    try {
        // Get song title for Firebase key
        const songKey = song.title.replace(/[.#$[\]]/g, '_').replace(/\s+/g, '_');
        
        // Save vote to Firebase
        if (db) {
            const voteRef = db.ref(`votes/${songKey}`);
            await voteRef.transaction((currentVotes) => {
                return (currentVotes || 0) + 1;
            });
        }
        
        // Save to localStorage
        saveUserVote(songNumber);
        
        // Update UI
        const songElement = document.querySelector(`[data-song-number="${songNumber}"]`);
        if (songElement) {
            songElement.classList.add('voted', 'vote-success');
            
            const radio = songElement.querySelector('.song-radio');
            const label = songElement.querySelector('.radio-label');
            if (radio) {
                radio.disabled = !CONFIG.display.allowMultipleVotes;
                radio.checked = true;
            }
            if (label) {
                label.textContent = 'You Voted for This!';
            }
            
            const status = songElement.querySelector('.song-status');
            if (status) {
                status.textContent = 'Voted';
                status.className = 'song-status status-voted';
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                songElement.classList.remove('vote-success');
            }, 500);
        }
        
        // Disable submit button and show success message
        const submitButton = document.getElementById('submitVoteButton');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Vote Submitted! ✓';
        }
        
        console.log(`Vote recorded for ${song.title}`);
        alert(`Thank you! Your vote for "${song.title}" has been recorded.\n\nThe next release will be on the 17th!`);
        
        // Show vote results chart
        showVoteResultsChart();
        
        // Show mailing list signup popup
        showMailingListPopup();
    } catch (error) {
        console.error('Error recording vote:', error);
        alert('There was an error recording your vote. Please try again.');
    }
}

// Show mailing list signup popup
function showMailingListPopup() {
    const mailingListContainer = document.getElementById('mailingListContainer');
    if (mailingListContainer) {
        mailingListContainer.classList.add('show');
        
        // Set up close button
        const closeButton = document.getElementById('closeNewsletterButton');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                mailingListContainer.classList.remove('show');
            });
        }
        
        // Close on background click
        mailingListContainer.addEventListener('click', function(e) {
            if (e.target === mailingListContainer) {
                mailingListContainer.classList.remove('show');
            }
        });
    }
}

// Handle submit button click
function handleSubmitVote() {
    const selectedRadio = document.querySelector('input[name="songVote"]:checked');
    
    if (!selectedRadio) {
        alert('Please select a song before submitting your vote.');
        return;
    }
    
    const songNumber = parseInt(selectedRadio.value);
    handleVote(songNumber);
}

// Load vote counts from Firebase
function loadVoteCounts() {
    if (!db) return;
    
    const votesRef = db.ref('votes');
    votesRef.once('value', (snapshot) => {
        const votes = snapshot.val() || {};
        updateVoteDisplay(votes);
    });
}

// Listen to real-time vote updates
function listenToVoteUpdates() {
    if (!db) return;
    
    const votesRef = db.ref('votes');
    votesRef.on('value', (snapshot) => {
        const votes = snapshot.val() || {};
        updateVoteDisplay(votes);
    });
}

// Update vote count display
function updateVoteDisplay(votes) {
    // Calculate total votes for percentage
    let totalVotes = 0;
    CONFIG.songs.forEach(song => {
        if (song.state === 'votable') {
            const songKey = song.title.replace(/[.#$[\]]/g, '_').replace(/\s+/g, '_');
            totalVotes += votes[songKey] || 0;
        }
    });
    
    // Update each song's vote display
    CONFIG.songs.forEach(song => {
        if (song.state === 'votable') {
            const songKey = song.title.replace(/[.#$[\]]/g, '_').replace(/\s+/g, '_');
            const voteCount = votes[songKey] || 0;
            const percentage = totalVotes > 0 ? (voteCount / totalVotes * 100) : 0;
            
            const voteNumberEl = document.querySelector(`.vote-number[data-song="${song.number}"]`);
            if (voteNumberEl) {
                voteNumberEl.textContent = `${voteCount} vote${voteCount !== 1 ? 's' : ''}`;
            }
            
            const voteBarEl = document.querySelector(`.vote-bar-fill[data-song="${song.number}"]`);
            if (voteBarEl) {
                voteBarEl.style.width = `${percentage}%`;
            }
        }
    });
}

// Update voting period display
function updateVotingPeriodDisplay() {
    const periodDates = document.getElementById('periodDates');
    const nextReleaseSong = document.getElementById('nextReleaseSong');
    const nextReleaseDate = document.getElementById('nextReleaseDate');
    
    const startDate = new Date(CONFIG.votingPeriod.start);
    const endDate = new Date(CONFIG.votingPeriod.end);
    const releaseDate = new Date(CONFIG.votingPeriod.nextRelease);
    
    const formatOptions = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' };
    
    periodDates.textContent = `${startDate.toLocaleDateString('en-US', formatOptions)} - ${endDate.toLocaleDateString('en-US', formatOptions)}`;
    
    // Update next release info
    if (nextReleaseSong) {
        nextReleaseSong.textContent = CONFIG.nextReleaseSongTitle || 'Go Go Go';
    }
    if (nextReleaseDate) {
        nextReleaseDate.textContent = `${releaseDate.toLocaleDateString('en-US', formatOptions)} at Midnight EST`;
    }
    
    // Start release countdown
    startReleaseCountdown();
}

// Start countdown to next release (midnight EST)
function startReleaseCountdown() {
    updateReleaseCountdown();
    setInterval(updateReleaseCountdown, 1000);
}

// Update release countdown display
function updateReleaseCountdown() {
    const countdownEl = document.getElementById('releaseCountdown');
    if (!countdownEl) return;
    
    const releaseDate = new Date(CONFIG.votingPeriod.nextRelease);
    const now = new Date();
    const diff = releaseDate - now;
    
    if (diff <= 0) {
        countdownEl.textContent = '🎉 OUT NOW! 🎉';
        countdownEl.style.fontSize = '1.8rem';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    let timeString = '';
    if (days > 0) timeString += `${days}d `;
    if (hours > 0 || days > 0) timeString += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
    timeString += `${seconds}s`;
    
    countdownEl.textContent = timeString;
}

// Check if voting period is active
function isVotingPeriodActive() {
    const now = new Date();
    const start = new Date(CONFIG.votingPeriod.start);
    const end = new Date(CONFIG.votingPeriod.end);
    
    return now >= start && now <= end;
}

// Start countdown timer
function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    const now = new Date();
    const start = new Date(CONFIG.votingPeriod.start);
    const end = new Date(CONFIG.votingPeriod.end);
    const release = new Date(CONFIG.votingPeriod.nextRelease);
    
    let targetDate, message;
    
    if (now < start) {
        targetDate = start;
        message = 'Voting starts in: ';
    } else if (now >= start && now <= end) {
        targetDate = end;
        message = 'Voting ends in: ';
    } else {
        targetDate = release;
        message = 'Next release in: ';
    }
    
    const diff = targetDate - now;
    
    if (diff <= 0) {
        countdownEl.textContent = 'Voting period has ended. Check back soon!';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    let timeString = '';
    if (days > 0) timeString += `${days}d `;
    if (hours > 0 || days > 0) timeString += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
    timeString += `${seconds}s`;
    
    countdownEl.textContent = message + timeString;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Made with Bob

// Show vote results chart
function showVoteResultsChart() {
    const resultsContainer = document.getElementById('voteResultsContainer');
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        
        // Load and display vote data
        if (db) {
            loadAndDisplayVoteResults();
        }
    }
}

// Load and display vote results in chart
async function loadAndDisplayVoteResults() {
    if (!db) return;
    
    try {
        const votesRef = db.ref('votes');
        const snapshot = await votesRef.once('value');
        const votes = snapshot.val() || {};
        
        // Get votable songs and their vote counts
        const songVotes = [];
        let totalVotes = 0;
        
        CONFIG.songs.forEach(song => {
            if (song.state === 'votable') {
                const songKey = song.title.replace(/[.#$[\]]/g, '_').replace(/\s+/g, '_');
                const voteCount = votes[songKey] || 0;
                totalVotes += voteCount;
                
                songVotes.push({
                    number: song.number,
                    title: song.title,
                    votes: voteCount,
                    userVoted: hasUserVoted(song.number)
                });
            }
        });
        
        // Sort by vote count (descending)
        songVotes.sort((a, b) => b.votes - a.votes);
        
        // Find max votes for scaling
        const maxVotes = Math.max(...songVotes.map(s => s.votes), 1);
        
        // Render chart
        renderVoteResultsChart(songVotes, maxVotes);
    } catch (error) {
        console.error('Error loading vote results:', error);
    }
}

// Render vote results chart
function renderVoteResultsChart(songVotes, maxVotes) {
    const chartContainer = document.getElementById('voteResultsChart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '';
    
    songVotes.forEach(song => {
        const percentage = maxVotes > 0 ? (song.votes / maxVotes * 100) : 0;
        
        const barItem = document.createElement('div');
        barItem.className = 'chart-bar-item';
        if (song.userVoted) {
            barItem.classList.add('user-voted');
        }
        
        barItem.innerHTML = `
            <div class="chart-song-title">${song.title}</div>
            <div class="chart-bar-container">
                <div class="chart-bar-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        
        chartContainer.appendChild(barItem);
    });
}

// Handle mailing list form submission
async function handleMailingListSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-mailing-button');
    const messageDiv = document.getElementById('formMessage');
    
    // Get form data
    const name = document.getElementById('subscriberName').value.trim();
    const email = document.getElementById('subscriberEmail').value.trim();
    const phone = document.getElementById('subscriberPhone').value.trim();
    const tourLocation = document.getElementById('tourLocation').value.trim();
    
    // Validate
    if (!name || !email) {
        showFormMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Disable button
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    try {
        if (!db) {
            console.error('Database not initialized - db is:', db);
            throw new Error('Database connection not available. Please refresh the page and try again.');
        }
        
        // Save to Firebase
        const timestamp = new Date().toISOString();
        const subscriberRef = db.ref('mailingList').push();
        
        await subscriberRef.set({
            name: name,
            email: email,
            phone: phone || '',
            tourLocation: tourLocation || '',
            timestamp: timestamp,
            source: 'voting_app'
        });
        
        // Success
        showFormMessage('✓ Thanks for joining! You\'re on the list.', 'success');
        form.reset();
        
        // Close popup after 2 seconds
        setTimeout(() => {
            const mailingListContainer = document.getElementById('mailingListContainer');
            if (mailingListContainer) {
                mailingListContainer.classList.remove('show');
            }
        }, 2000);
        
    } catch (error) {
        console.error('Error saving to mailing list:', error);
        const errorMessage = error.message || 'Oops! Something went wrong. Please try again.';
        showFormMessage(errorMessage, 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Join Mailing List';
    }
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
    }
}

// Set up mailing list form listener
function setupMailingListForm() {
    const form = document.getElementById('mailingListForm');
    if (form) {
        form.addEventListener('submit', handleMailingListSubmit);
    }
}
