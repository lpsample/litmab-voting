/**
 * Automated Testing Script for litmab-voting
 * 
 * Usage:
 * 1. Open index.html in a browser
 * 2. Open browser console (F12)
 * 3. Copy and paste this entire script
 * 4. Press Enter to run
 * 5. Review the test results in console
 * 
 * The script will automatically test all features and report results.
 */

(function() {
    'use strict';
    
    console.log('%c🧪 Starting Automated Tests...', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('═'.repeat(80));
    
    const results = {
        passed: 0,
        failed: 0,
        warnings: 0,
        tests: []
    };
    
    function pass(testName, message = '') {
        results.passed++;
        results.tests.push({ name: testName, status: 'PASS', message });
        console.log(`%c✓ PASS: ${testName}`, 'color: #10b981; font-weight: bold;', message);
    }
    
    function fail(testName, message = '') {
        results.failed++;
        results.tests.push({ name: testName, status: 'FAIL', message });
        console.error(`%c✗ FAIL: ${testName}`, 'color: #ef4444; font-weight: bold;', message);
    }
    
    function warn(testName, message = '') {
        results.warnings++;
        results.tests.push({ name: testName, status: 'WARN', message });
        console.warn(`%c⚠ WARN: ${testName}`, 'color: #f59e0b; font-weight: bold;', message);
    }
    
    // Test 1: Page Title
    console.log('\n%c📋 Testing Page Elements...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent.includes("Vote on Sam's Next Release")) {
            pass('Page Title', 'Correct title found');
        } else {
            fail('Page Title', `Expected "Vote on Sam's Next Release", got "${h1?.textContent}"`);
        }
    } catch (e) {
        fail('Page Title', e.message);
    }
    
    // Test 2: Genre Scale Legend
    try {
        const legend = document.querySelector('.genre-scale-legend');
        if (legend) {
            pass('Genre Scale Legend', 'Legend element exists');
        } else {
            fail('Genre Scale Legend', 'Legend element not found');
        }
    } catch (e) {
        fail('Genre Scale Legend', e.message);
    }
    
    // Test 3: Genre Scale Dots
    try {
        const dots = document.querySelectorAll('.scale-dot-clickable');
        if (dots.length === 3) {
            pass('Genre Scale Dots', `Found ${dots.length} dots`);
        } else {
            fail('Genre Scale Dots', `Expected 3 dots, found ${dots.length}`);
        }
    } catch (e) {
        fail('Genre Scale Dots', e.message);
    }
    
    // Test 4: Song Items
    try {
        const songs = document.querySelectorAll('.song-item');
        if (songs.length === 12) {
            pass('Song Items', `Found all 12 songs`);
        } else {
            fail('Song Items', `Expected 12 songs, found ${songs.length}`);
        }
    } catch (e) {
        fail('Song Items', e.message);
    }
    
    // Test 5: Button Order (CLUE on top, SELECT below)
    console.log('\n%c🔘 Testing Button Layout...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        const votableSong = document.querySelector('.song-item.votable');
        if (votableSong) {
            const buttons = votableSong.querySelectorAll('.vote-button, .radio-container');
            if (buttons.length >= 2) {
                const firstButton = buttons[0];
                const secondButton = buttons[1];
                
                if (firstButton.classList.contains('vote-button') && 
                    firstButton.textContent.includes('CLUE')) {
                    pass('CLUE Button Position', 'CLUE button is first');
                } else {
                    fail('CLUE Button Position', 'CLUE button should be first');
                }
                
                if (secondButton.classList.contains('radio-container')) {
                    pass('SELECT Button Position', 'SELECT button is second');
                } else {
                    fail('SELECT Button Position', 'SELECT button should be second');
                }
                
                const label = secondButton.querySelector('.radio-label');
                if (label && label.textContent === 'SELECT') {
                    pass('SELECT Button Text', 'Text is "SELECT" in caps');
                } else {
                    fail('SELECT Button Text', `Expected "SELECT", got "${label?.textContent}"`);
                }
            } else {
                fail('Button Layout', `Expected 2 buttons, found ${buttons.length}`);
            }
        } else {
            warn('Button Layout', 'No votable songs found to test');
        }
    } catch (e) {
        fail('Button Layout', e.message);
    }
    
    // Test 6: Vote Results Container
    console.log('\n%c📊 Testing Vote Results Preview...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        const resultsContainer = document.getElementById('voteResultsContainer');
        if (resultsContainer) {
            pass('Vote Results Container', 'Container exists');
            
            // Check if blurred initially
            if (resultsContainer.classList.contains('blurred')) {
                pass('Initial Blur State', 'Container is blurred before voting');
            } else {
                warn('Initial Blur State', 'Container should be blurred initially');
            }
            
            // Check for unlock overlay
            const overlay = document.getElementById('unlockOverlay');
            if (overlay) {
                pass('Unlock Overlay', 'Overlay element exists');
                
                const message = overlay.querySelector('.unlock-message');
                if (message && message.textContent.includes('VOTE TO UNLOCK')) {
                    pass('Unlock Message', 'Message text is correct');
                } else {
                    fail('Unlock Message', 'Message text incorrect or missing');
                }
            } else {
                fail('Unlock Overlay', 'Overlay element not found');
            }
        } else {
            fail('Vote Results Container', 'Container not found');
        }
    } catch (e) {
        fail('Vote Results', e.message);
    }
    
    // Test 7: CSS Grid Layout
    console.log('\n%c📐 Testing Responsive Layout...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        const songsContainer = document.getElementById('tracklist');
        if (songsContainer) {
            const computedStyle = window.getComputedStyle(songsContainer);
            const display = computedStyle.display;
            
            if (display === 'grid') {
                pass('CSS Grid', 'Grid layout is active');
                
                const columns = computedStyle.gridTemplateColumns;
                const columnCount = columns.split(' ').length;
                
                if (window.innerWidth >= 1400 && columnCount === 3) {
                    pass('Desktop Grid (1400px+)', '3 columns detected');
                } else if (window.innerWidth >= 1024 && columnCount === 2) {
                    pass('Desktop Grid (1024px+)', '2 columns detected');
                } else if (window.innerWidth < 1024 && columnCount === 1) {
                    pass('Mobile Grid (<1024px)', '1 column detected');
                } else {
                    warn('Grid Columns', `Unexpected column count: ${columnCount} at width ${window.innerWidth}px`);
                }
            } else {
                fail('CSS Grid', `Expected grid, got ${display}`);
            }
        } else {
            fail('Songs Container', 'Container not found');
        }
    } catch (e) {
        fail('Responsive Layout', e.message);
    }
    
    // Test 8: Dot Click Functionality
    console.log('\n%c🖱️ Testing Interactive Elements...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        const leftDot = document.querySelector('.scale-dot-clickable[data-position="left"]');
        if (leftDot) {
            // Simulate click
            leftDot.click();
            
            // Check if artist examples appear
            setTimeout(() => {
                const leftLabel = document.querySelector('.scale-left');
                if (leftLabel && leftLabel.classList.contains('show-artists')) {
                    pass('Dot Click Toggle', 'Artist examples appear on click');
                    
                    // Click again to toggle off
                    leftDot.click();
                    setTimeout(() => {
                        if (!leftLabel.classList.contains('show-artists')) {
                            pass('Dot Click Toggle Off', 'Artist examples disappear on second click');
                        } else {
                            fail('Dot Click Toggle Off', 'Artist examples should disappear');
                        }
                    }, 100);
                } else {
                    fail('Dot Click Toggle', 'Artist examples do not appear');
                }
            }, 100);
        } else {
            fail('Dot Click', 'Left dot not found');
        }
    } catch (e) {
        fail('Dot Click', e.message);
    }
    
    // Test 9: Mobile Artist Examples Positioning
    try {
        const artistExamples = document.querySelectorAll('.scale-artists');
        let allProperlyPositioned = true;
        let positioningDetails = [];
        
        artistExamples.forEach((example, index) => {
            const computedStyle = window.getComputedStyle(example);
            const position = computedStyle.position;
            const left = computedStyle.left;
            const transform = computedStyle.transform;
            const maxWidth = computedStyle.maxWidth;
            
            // On mobile, should use fixed positioning with centering
            if (window.innerWidth <= 768) {
                // Check for fixed positioning
                const hasFixedPosition = position === 'fixed';
                
                // Check for centering (left: 50% and translateX in transform)
                const hasCentering = left === '50%' || transform.includes('translateX');
                
                // Check for width constraint to prevent overflow
                const hasWidthConstraint = maxWidth && maxWidth !== 'none';
                
                if (!hasFixedPosition || !hasCentering || !hasWidthConstraint) {
                    allProperlyPositioned = false;
                    positioningDetails.push(`Example ${index}: position=${position}, left=${left}, maxWidth=${maxWidth}`);
                }
            }
        });
        
        if (window.innerWidth <= 768) {
            if (allProperlyPositioned) {
                pass('Mobile Artist Positioning', 'All artist examples properly positioned (fixed, centered, constrained)');
            } else {
                fail('Mobile Artist Positioning', `Some artist examples not properly positioned: ${positioningDetails.join('; ')}`);
            }
        } else {
            pass('Mobile Artist Positioning', 'Skipped (not on mobile viewport)');
        }
    } catch (e) {
        fail('Mobile Artist Positioning', e.message);
    }
    
    // Test 10: Browser Compatibility
    console.log('\n%c🌐 Testing Browser Compatibility...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        // Check for :has() support
        if (CSS.supports('selector(:has(*))')) {
            pass('CSS :has() Support', 'Browser supports :has() selector');
        } else {
            warn('CSS :has() Support', 'Browser does not support :has() - hover effects may not work');
        }
        
        // Check for grid support
        if (CSS.supports('display', 'grid')) {
            pass('CSS Grid Support', 'Browser supports CSS Grid');
        } else {
            fail('CSS Grid Support', 'Browser does not support CSS Grid');
        }
        
        // Check for Firebase
        if (typeof firebase !== 'undefined') {
            pass('Firebase Loaded', 'Firebase SDK is loaded');
        } else {
            warn('Firebase Loaded', 'Firebase SDK not loaded - may be expected if not configured');
        }
    } catch (e) {
        fail('Browser Compatibility', e.message);
    }
    
    // Test 11: Console Errors
    console.log('\n%c🐛 Checking for Errors...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        // Store original console.error
        const originalError = console.error;
        let errorCount = 0;
        
        console.error = function(...args) {
            errorCount++;
            originalError.apply(console, args);
        };
        
        // Wait a bit to catch any async errors
        setTimeout(() => {
            console.error = originalError;
            
            if (errorCount === 0) {
                pass('Console Errors', 'No JavaScript errors detected');
            } else {
                warn('Console Errors', `${errorCount} error(s) detected - check console`);
            }
        }, 1000);
    } catch (e) {
        fail('Error Detection', e.message);
    }
    
    // Test 12: Accessibility
    console.log('\n%c♿ Testing Accessibility...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        // Check for alt text on images
        const images = document.querySelectorAll('img');
        let missingAlt = 0;
        images.forEach(img => {
            if (!img.alt) missingAlt++;
        });
        
        if (missingAlt === 0) {
            pass('Image Alt Text', 'All images have alt text');
        } else {
            warn('Image Alt Text', `${missingAlt} image(s) missing alt text`);
        }
        
        // Check for button labels
        const buttons = document.querySelectorAll('button');
        let unlabeledButtons = 0;
        buttons.forEach(btn => {
            if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                unlabeledButtons++;
            }
        });
        
        if (unlabeledButtons === 0) {
            pass('Button Labels', 'All buttons have labels');
        } else {
            warn('Button Labels', `${unlabeledButtons} button(s) missing labels`);
        }
    } catch (e) {
        fail('Accessibility', e.message);
    }
    
    // Test 13: Performance
    console.log('\n%c⚡ Testing Performance...', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    try {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            if (loadTime < 3000) {
                pass('Page Load Time', `${loadTime}ms (< 3s)`);
            } else if (loadTime < 5000) {
                warn('Page Load Time', `${loadTime}ms (3-5s, could be faster)`);
            } else {
                fail('Page Load Time', `${loadTime}ms (> 5s, too slow)`);
            }
        } else {
            warn('Performance API', 'Performance API not available');
        }
    } catch (e) {
        fail('Performance', e.message);
    }
    
    // Final Summary
    setTimeout(() => {
        console.log('\n' + '═'.repeat(80));
        console.log('%c📊 Test Results Summary', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
        console.log('═'.repeat(80));
        console.log(`%c✓ Passed: ${results.passed}`, 'color: #10b981; font-size: 16px; font-weight: bold;');
        console.log(`%c✗ Failed: ${results.failed}`, 'color: #ef4444; font-size: 16px; font-weight: bold;');
        console.log(`%c⚠ Warnings: ${results.warnings}`, 'color: #f59e0b; font-size: 16px; font-weight: bold;');
        console.log('═'.repeat(80));
        
        const total = results.passed + results.failed + results.warnings;
        const passRate = ((results.passed / total) * 100).toFixed(1);
        
        console.log(`\n%cPass Rate: ${passRate}%`, 'font-size: 18px; font-weight: bold;');
        
        if (results.failed === 0) {
            console.log('%c🎉 All critical tests passed!', 'color: #10b981; font-size: 18px; font-weight: bold;');
        } else {
            console.log('%c⚠️ Some tests failed - review errors above', 'color: #ef4444; font-size: 18px; font-weight: bold;');
        }
        
        console.log('\n%cDetailed Results:', 'font-size: 14px; font-weight: bold;');
        console.table(results.tests);
        
        // Return results for programmatic access
        window.testResults = results;
        console.log('\n%cResults saved to window.testResults', 'color: #8b5cf6; font-style: italic;');
    }, 2000);
    
})();

// Made with Bob
