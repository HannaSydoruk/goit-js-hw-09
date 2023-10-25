import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

let startDate = 0;

startBtn.addEventListener('click', onStartBtnClick);

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        startBtn.disabled = true;

        if (selectedDates[0] < options.defaultDate) {
            window.alert("Please choose a date in the future");
            return;
        }

        startBtn.disabled = false;
        startDate = selectedDates[0];
    },
};

function onStartBtnClick() {
    startBtn.disabled = true;
    const id = setInterval(() => {
        let counter = startDate - new Date();

        if (counter <= 0) {
            clearInterval(id);
            startBtn.disabled = false;
            return;
        }

        let res = convertMs(counter);

        daysLeft.textContent = addLeadingZero(res.days);
        hoursLeft.textContent = addLeadingZero(res.hours);
        minutesLeft.textContent = addLeadingZero(res.minutes);
        secondsLeft.textContent = addLeadingZero(res.seconds);

    }, 1000)
}

flatpickr(dateTimePicker, options);

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
