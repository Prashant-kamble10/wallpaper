function calculateAge() {
  const birthdateInput = "1999-04-10";

  const birthdate = new Date(birthdateInput);
  const today = new Date();

  if (!birthdateInput) {
    document.getElementById("age").innerText =
      "Please enter a valid birthdate.";
    return;
  }

  // Calculate age in years, months, days
  let ageYears = today.getFullYear() - birthdate.getFullYear();
  let ageMonths = today.getMonth() - birthdate.getMonth();
  let ageDays = today.getDate() - birthdate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  const ageTime = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  document.getElementById(
    "age"
  ).innerText = `${ageYears} years, ${ageMonths} months, ${ageDays} days old as of ${ageTime}.`;

  // Calculate days left until the end of the year
  // Calculate days left until the end of the current year
  const currentYear = today.getFullYear();
  const endOfYear = new Date(currentYear + 1, 0, 1);
  const timeDiff = endOfYear - today;
  const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30);
  const remainingDays = daysLeft % 30;

  document.getElementById("daysLeft").innerText =
    `${daysLeft} days (${monthsLeft} months and ${remainingDays} days) left until the end of ${currentYear}.`;

  // --- Day progress (hours-based percentage) ---
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  // Exact percentage of the day completed (accurate)
  const secondsSinceMidnight = hours * 3600 + minutes * 60 + seconds;
  const percentExact = (secondsSinceMidnight / (24 * 3600)) * 100;

  // User's requested approximation: 1 hour ~= 4% (use partial hours too)
  const percentByHourApprox = (hours + minutes / 60 + seconds / 3600) * 4;
  const approxToShow = Math.min(percentByHourApprox, 100);

  // Round the approximation to a whole percent (user requested no decimal exact value)
  const approxRounded = Math.round(approxToShow);

  // Update progress text and bar using the rounded approx
  const progressText = `Day completed: ${approxRounded}%`;
  const progressBar = document.getElementById("progressBar");
  const progressTextEl = document.getElementById("progressText");
  if (progressTextEl) progressTextEl.innerText = progressText;
  if (progressBar) progressBar.style.width = `${approxRounded}%`;
}

// Update once immediately and then every second so progress is live
calculateAge();
setInterval(calculateAge, 1000);
