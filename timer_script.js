let timer;
let timeLeft = 480; 
let isRunning = false;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timer);
                playSound();
            }
        }, 1000);
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 480;
    isRunning = false;
    updateTimer();
}

function playSound() {
    let timerSound = document.getElementById("timerSound");
    if (timerSound) {
        timerSound.play();
    }
}

function downloadText() {
    let text = document.getElementById("textbox").value;
    if (text.trim() === "") {
        alert("There is no text to download.");
        return;
    }

    let blob = new Blob([text], { type: "text/plain" });
    let anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "writing.txt";
    anchor.click();
}

function adjustHeight(textarea) {
    textarea.style.height = "10vh";
    textarea.style.height = Math.min(textarea.scrollHeight, 25 * window.innerHeight / 100) + "px";
}

updateTimer();
