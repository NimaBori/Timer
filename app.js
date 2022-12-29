const sec = document.querySelector(".secound");
const min = document.querySelector(".minute");
const hrs = document.querySelector(".hour");
const time = document.querySelectorAll(".time-container input");
const startBtn = document.querySelector(".start-btn");
const switchBtn = document.querySelector(".switch-btn");
const resetBtn = document.querySelector(".reset-btn");
const alertEl = document.querySelector(".alert");
let countdown;
let run = false;

startBtn.addEventListener("click", () => {
  getTimeRemaining();
  if (run) {
    startBtn.classList.add("start-btn-hide");
    switchBtn.classList.add("switch-btn-show");
    resetBtn.classList.add("reset-btn-show");
  }
});

switchBtn.addEventListener("click", () => {
  if (countdown !== 0) {
    clearTimeout(countdown);
    countdown = 0;
    switchBtn.textContent = "Resume";
  } else {
    getTimeRemaining();
    switchBtn.textContent = "Pause";
  }
});

resetBtn.addEventListener("click", () => {
  startBtn.classList.remove("start-btn-hide");
  switchBtn.classList.remove("switch-btn-show");
  resetBtn.classList.remove("reset-btn-show");
  time.forEach((t) => {
    t.value = "0";
  });
  run = false;
  clearTimeout(countdown);
  countdown = 0;
});

const getTimeRemaining = () => {
  const total =
    parseInt(sec.value) + parseInt(min.value * 60) + parseInt(hrs.value * 3600);
  const newTime = total - 1;

  time.forEach((t) => {
    if (isNaN(t.value) || parseInt(t.value) < 0) {
      displayAlert(
        "Invalid input! Please enter positive numbers to set timer. "
      );
      run = false;
    }
  });

  if (newTime < 0 && run) {
    clearTimeout(countdown);
    countdown = 0;
    startBtn.classList.remove("start-btn-hide");
    switchBtn.classList.remove("switch-btn-show");
    resetBtn.classList.remove("reset-btn-show");
    run = false;
  } else if (newTime >= 0) {
    run = true;
    const secound = Math.floor(newTime % 60);
    const minute = Math.floor((newTime / 60) % 60);
    const hour = Math.floor((newTime / (60 * 60)) % 24);
    const values = [hour, minute, secound];

    const format = (item) => {
      if (item < 10) {
        return (item = `0${item}`);
      } else {
        return item;
      }
    };

    time.forEach((t, index) => {
      t.value = format(values[index]);
    });
    countdown = setTimeout(getTimeRemaining, 1000);
  }
};

function displayAlert(text) {
  run = false;
  alertEl.textContent = text;
  alertEl.classList.add("alert-show");
  time.forEach((t) => {
    t.value = "0";
  });
  setTimeout(function () {
    alertEl.textContent = "";
    alertEl.classList.remove("alert-show");
  }, 5000);
}
