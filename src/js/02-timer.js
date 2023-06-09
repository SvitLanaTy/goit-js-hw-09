import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.disabled = true;

    if (selectedDates[0].getTime() - options.defaultDate.getTime() < 1000) {
      return Notiflix.Notify.failure(`Please choose a date in the future`);
    } else {
      refs.startBtn.disabled = false;
      return (selectedDate = selectedDates[0].getTime());
    }
  },
};

const handleTimer = () => {
  timerId = setInterval(() => {
    const interval = selectedDate - Date.now();

    if (interval >= 0) {
      const timeLeft = convertMs(interval);

      refs.startBtn.disabled = true;
      refs.datetimePicker.disabled = true;
      refs.days.textContent = addLeadingZero(String(timeLeft.days));
      refs.hours.textContent = addLeadingZero(String(timeLeft.hours));
      refs.minutes.textContent = addLeadingZero(String(timeLeft.minutes));
      refs.seconds.textContent = addLeadingZero(String(timeLeft.seconds));
    } else {
      clearInterval(timerId);
      refs.datetimePicker.disabled = false;
      return;
    }
  }, 1000);
};

let selectedDate = null;
let timerId = null;
refs.startBtn.addEventListener(`click`, onStartClick);
refs.startBtn.disabled = true;

flatpickr(refs.datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function onStartClick() {
  if (selectedDate - Date.now() <= 0) {
    refs.startBtn.disabled = true;
    return Notiflix.Notify.failure(`Please choose a date in the future`);
  }
  handleTimer();
}
