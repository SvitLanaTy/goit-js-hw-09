const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector(`body`);

let timer;

function changeBgColor() {
  let bgColor = getRandomHexColor();
  body.style.backgroundColor = bgColor;
}

function onStartClick() {
  timer = setInterval(changeBgColor, 1000);
  startBtn.disabled = true;
}
function onStopClick() {
  clearInterval(timer);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener(`click`, onStartClick);
stopBtn.addEventListener(`click`, onStopClick);
