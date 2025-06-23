/* script.js */
// Set up dates
const startDate = new Date('2024-09-23');
const endDate = new Date(startDate);
endDate.setFullYear(endDate.getFullYear() + 1);

const countdownEl = document.getElementById('countdown');
const radialBar = document.querySelector('.radial-bar');
const CIRCUM = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue(
    '--circumference',
  ),
);

function update() {
  const now = new Date();
  let remSec = Math.floor((endDate - now) / 1000);
  const totSec = Math.floor((endDate - startDate) / 1000);

  if (remSec <= 0) {
    clearInterval(interval);
    countdownEl.textContent = "Time's up!";
    radialBar.style.strokeDashoffset = 0;
    radialBar.style.filter = 'drop-shadow(0 0 20px rgba(194,91,91,0.8))';
    return;
  }

  // calculate days, hours, minutes, seconds
  const d = Math.floor(remSec / 86400);
  remSec %= 86400;
  const h = Math.floor(remSec / 3600);
  remSec %= 3600;
  const m = Math.floor(remSec / 60);
  const s = remSec % 60;
  countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;

  // update radial progress
  const elapsed = totSec - remSec;
  const ratio = Math.min(1, elapsed / totSec);
  const offset = CIRCUM * (1 - ratio);
  radialBar.style.strokeDashoffset = offset;

  // change glow color by months left
  const monthsLeft =
    (endDate.getFullYear() - now.getFullYear()) * 12 +
    (endDate.getMonth() - now.getMonth());
  let glow;
  if (monthsLeft >= 10) glow = 'rgba(194,91,91,0.8)';
  else if (monthsLeft >= 7) glow = 'rgba(217,154,78,0.8)';
  else if (monthsLeft >= 4) glow = 'rgba(230,203,111,0.8)';
  else glow = 'rgba(125,174,141,0.8)';
  radialBar.style.filter = `drop-shadow(0 0 15px ${glow})`;
}

// start interval
const interval = setInterval(update, 1000);
update();
