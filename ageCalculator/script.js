const input = document.querySelector("#dob");
const calculate = document.querySelector("#calculate");
const msg = document.querySelector("#msg");

calculate.addEventListener("click", () => {
  const dob = input.value;

  let today = new Date();
  let birthDate = new Date(dob);

  if (!dob) {
    // alert("Please enter your birth date.");
    msg.innerText = "Please enter your birth date.";
    return;
  }

  if (birthDate > today) {
    // alert("Cannot enter future dates.");
    msg.innerText = "Cannot enter future dates.";
    return;
  }

  year = today.getFullYear() - birthDate.getFullYear();
  month = today.getMonth() - birthDate.getMonth();

  msg.innerHTML = `You are <b>${year} years ${month} months</b> old.`;
});
