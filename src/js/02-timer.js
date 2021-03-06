import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
 startButton: document.querySelector("[data-start]"),
 daysField: document.querySelector("[data-days]"),
 hoursField: document.querySelector("[data-hours]"),
 minutesField: document.querySelector("[data-minutes]"),
 secondsField: document.querySelector("[data-seconds]"),
}

refs.startButton.disabled = true;
let startTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
   Report.failure(`Error!`, `Please choose a date in the future`)
      }
      startTime = selectedDates[0];
      refs.startButton.disabled = false;
  },
};

flatpickr("#datetime-picker", options);

const timer = {
    intervalId: null,
    start() {
        this.intervalId = setInterval(() => {
            refs.startButton.disabled = true;
            const currentTime = Date.now();

            if (startTime <= currentTime) {
                clearInterval(this.intervalId);
                return
            }
            const deltaTime = startTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            console.log(`${days}:${hours}:${minutes}:${seconds}`);
            updateTimer({ days, hours, minutes, seconds });
               
        }, 1000);
    }
};

function updateTimer({ days, hours, minutes, seconds }) {
    refs.daysField.textContent = `${days}`;
    refs.hoursField.textContent = `${hours}`;
    refs.minutesField.textContent = `${minutes}`;
    refs.secondsField.textContent = `${seconds}`;
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

refs.startButton.addEventListener("click", timer.start);

