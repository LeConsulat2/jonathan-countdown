// Set the start and end date
const startDate = new Date('2024-09-23');
const endDate = new Date(startDate);
endDate.setFullYear(endDate.getFullYear() + 1); // One year later

const countdownElement = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');

// Time update every second
function updateCountdown() {
  const now = new Date();
  const totalSeconds = Math.floor((endDate - startDate) / 1000);
  const remainingSeconds = Math.floor((endDate - now) / 1000);

  if (remainingSeconds <= 0) {
    clearInterval(countdownInterval);
    countdownElement.textContent = "Time's up!";
    progressBar.style.width = '100%';
    progressBar.className = 'progress-bar red';
    return;
  }

  const days = Math.floor(remainingSeconds / (60 * 60 * 24));
  const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
  const seconds = remainingSeconds % 60;

  // Update the countdown display
  countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;

  // Calculate percentage and update progress bar width
  const progressPercentage =
    ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Change progress bar color based on time remaining
  const remainingMonths =
    (endDate.getFullYear() - now.getFullYear()) * 12 +
    (endDate.getMonth() - now.getMonth());

  if (remainingMonths >= 10) {
    progressBar.className = 'progress-bar red';
  } else if (remainingMonths >= 7) {
    progressBar.className = 'progress-bar orange';
  } else if (remainingMonths >= 4) {
    progressBar.className = 'progress-bar yellow';
  } else {
    progressBar.className = 'progress-bar green';
  }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
