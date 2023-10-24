const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
});
