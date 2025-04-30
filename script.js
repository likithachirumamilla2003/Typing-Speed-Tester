// Step 1: Get all required elements
const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

// Step 2: Quotes array (feel free to add your own)
const quotes = [
  "Start typing this line to know your speed(Type Me).",
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "JavaScript adds life to your website."
];

let currentQuote = "";      // To store current sentence
let timer = 0;              // Tracks seconds
let timerInterval = null;   // Stores setInterval ID

// Step 3: Load a random quote
function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerText = currentQuote;
  quoteInput.value = "";
  timer = 0;
  clearInterval(timerInterval); // stop any running timer
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
}

// Step 4: Start the timer only once
quoteInput.addEventListener("input", () => {
  if (quoteInput.value.length === 1 && !timerInterval) {
    // Start timer
    timerInterval = setInterval(() => {
      timer++;
      timerEl.textContent = timer;
    }, 1000);
  }

  // When typing matches the sentence
  if (quoteInput.value === currentQuote) {
    clearInterval(timerInterval); // Stop the timer
    showResults(); // Show WPM and accuracy
  }
});

// Step 5: Show Results
function showResults() {
  const typed = quoteInput.value;
  const timeTaken = timer;

  // Count words
  const wordCount = typed.trim().split(/\s+/).length;
  const wpm = Math.round((wordCount / timeTaken) * 60);

  // Accuracy
  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentQuote[i]) {
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars / currentQuote.length) * 100);

  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyEl.textContent = `${accuracy}%`;
}

// Step 6: Restart button logic
restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  loadQuote();
});

// Step 7: Load the first quote when page loads
loadQuote();
