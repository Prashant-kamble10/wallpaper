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
  const endOfYear = new Date(today.getFullYear() + 1, 0, 1);
  const timeDiff = endOfYear - today;
  const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30);
  const remainingDays = daysLeft % 30;

  document.getElementById(
    "daysLeft"
  ).innerText = ` ${daysLeft} days (${monthsLeft} months and ${remainingDays} days) left until the end of the 2024 year.`;
}

calculateAge();
