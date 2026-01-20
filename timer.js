let timerInterval;
// Start with 25 minutes (1500 seconds) for a Pomodoro
const POMODORO_DURATION_MS = 25 * 60 * 1000; 
let remainingTimeMs = POMODORO_DURATION_MS;
let isRunning = false;
let lastUpdateTime = 0; // To track time elapsed while paused
let studyTimesCompleted = 0; // to track how many times studied

const display = document.getElementById('timer-display');
const timer_duration = document.getElementById('duration')
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button')
const ENTER_KEY_CODE = 13;

// Function to format the time (e.g., 01:30:05)
function formatTime(ms) {
    // Ensure we never display negative time
    const totalSeconds = Math.max(0, Math.floor(ms / 1000)); 
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(t => String(t).padStart(2, '0'))
        .join(':');
}

// Function to update the timer display
function updateTimer() {
    const now = Date.now();
    // Calculate the time passed since the last update/start
    const timePassed = now - lastUpdateTime; 
    lastUpdateTime = now;
    remainingTimeMs -= timePassed;
    document.title = formatTime(remainingTimeMs)
    
    // Stop the timer when the time runs out
    if (remainingTimeMs <= 0) {
        remainingTimeMs = 0;
        clearInterval(timerInterval);
        isRunning = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        alert("00:00:00 - Time's Up!");
        studyTimesCompleted += 1
        alert(studyTimesCompleted)
        // Optional: Play a sound or trigger a notification here
        return;
    }

    display.textContent = formatTime(remainingTimeMs);
}

// --- Control Functions ---

function startTimer() {
    if (isRunning) return; 

    // Set the initial lastUpdateTime to the current moment
    lastUpdateTime = Date.now(); 
    isRunning = true;

    // Start the interval to update the display frequently (e.g., every 50ms)
    // 50ms is better than 1000ms for accurate countdown visuals
    timerInterval = setInterval(updateTimer, 50); 

    // Update button states
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}

function stopTimer() {
    if (!isRunning) return;

    clearInterval(timerInterval);
    isRunning = false;

    // Update button states
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    
    // Reset time variables
    remainingTimeMs = POMODORO_DURATION_MS;
    lastUpdateTime = 0;

    // Reset button states
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;

    // Set display to initial Pomodoro time
    display.textContent = formatTime(remainingTimeMs);
}

function clickToEdit() {
    if (isRunning) {
        console.log("Cannot edit while timer is running.");
        alert("Cannot edit while timer is running.")
        return;
    }

    // 2. Make the span editable and focus on it
    display.contentEditable = "true";
    display.focus();
    
    // 3. Set up a listener to handle saving the time (when 'Enter' is pressed)
    display.addEventListener('keydown', handleInputKey);
    
    // 4. Disable buttons while editing to prevent conflicts
    startButton.disabled = true;
    resetButton.disabled = true;
}

function handleInputKey(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
        event.preventDefault(); // Prevent the default 'Enter' behavior (like newline)
        saveNewTime();
    }
    // Optional: Add logic to save when the element loses focus (on blur)
    // display.addEventListener('blur', saveNewTime);
}

function saveNewTime() {
    // 1. Clean up the event listener
    display.removeEventListener('keydown', handleInputKey);
    
    // 2. Get the new time string (e.g., "00:15:30")
    let newTimeString = display.textContent;
    
    // 3. Validate and parse the input
    const parts = newTimeString.split(':').map(p => parseInt(p, 10));
    let newHours = parts[0] || 0;
    let newMinutes = parts[1] || 0;
    let newSeconds = parts[2] || 0;

    // Convert everything to total milliseconds
    const newTotalSeconds = (newHours * 3600) + (newMinutes * 60) + newSeconds;
    const newTotalMs = newTotalSeconds * 1000;

    // 4. Update the timer state
    if (newTotalMs > 0) {
        // Stop any running timer first (though should be stopped by handleClickToEdit)
        clearInterval(timerInterval);
        isRunning = false;
        
        // Update the global state variables
        remainingTimeMs = newTotalMs;
        currentDurationMinutes = Math.ceil(newTotalMs / 60000); // Set new duration for reset
        lastUpdateTime = 0;
        
        // Re-format and display the cleaned-up time
        display.textContent = formatTime(remainingTimeMs); 
    } else {
        // Handle invalid/zero time input
        alert("Please enter a valid time greater than 0.");
        display.textContent = formatTime(remainingTimeMs); // Revert to previous time
    }
    
    // 5. Restore display properties and button states
    display.contentEditable = "false";
    startButton.disabled = false;
    resetButton.disabled = false;
}

// --- Initial Setup ---
// Set the display to 00:25:00 when the script loads
document.addEventListener('DOMContentLoaded', () => {
    display.textContent = formatTime(remainingTimeMs);
});


// --- Event Listeners ---
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
display.addEventListener('click', clickToEdit);