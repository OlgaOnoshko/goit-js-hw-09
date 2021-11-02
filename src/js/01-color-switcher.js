const body = document.querySelector("body")
const startButton = document.querySelector("[data-start]")
const stopButton = document.querySelector("[data-stop]")

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    onStartButtonClick();
});

stopButton.addEventListener("click", onStopButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartButtonClick() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
};

function onStopButtonClick() {
    startButton.disabled = false
    clearInterval(intervalId)
};