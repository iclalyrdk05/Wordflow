const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
    navCircles: document.querySelectorAll(".nav-circle")
};

const texts = [
    "Set Your Intention",
    "Create a Sacred Space",
    "Ground Yourself",
    "Meditate & Open",
    "Invite the Eternal Observer",
    "Write Freely",
    "Observe Shifts",
    "Close & Reflect"
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = -1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;
let animationActive = true;

function doMorph() {
    if (!animationActive) return;

    morph -= cooldown;
    cooldown = 0;
    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = "blur(" + Math.min(8 / fraction - 8, 100) + "px)";
    elts.text2.style.opacity = Math.pow(fraction, 0.4) * 100 + "%";

    fraction = 1 - fraction;
    elts.text1.style.filter = "blur(" + Math.min(8 / fraction - 8, 100) + "px)";
    elts.text1.style.opacity = Math.pow(fraction, 0.4) * 100 + "%";

    if (textIndex < texts.length - 1) {
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    } else {
        elts.text1.textContent = "";
        elts.text2.textContent = "";
    }

    if (textIndex >= 0 && textIndex < elts.navCircles.length - 1) {
        elts.navCircles[textIndex].style.opacity = "1";
    }

    if (textIndex === texts.length - 1) {
        setTimeout(() => {
            elts.navCircles[elts.navCircles.length - 1].style.opacity = "1";
        }, 1000); 
    }

    if (textIndex >= texts.length - 1) {
        animationActive = false;
    }
}


function doCooldown() {
    if (!animationActive) return;
    morph = 0;
    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";
    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    if (!animationActive) return;
    requestAnimationFrame(animate);
    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;
    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }
        doMorph();
    } else {
        doCooldown();
    }
}

const clickTexts = [
    "Clarify your purpose, whether seeking guidance, insight, or openness to messages.",
    "Light a candle, burn incense, or play soothing music to mark the transition into a mindful practice.",
    "Sit comfortably, take deep breaths, and visualize roots anchoring you to the earth.",
    "Quiet your mind with a few minutes of meditation, letting go of distractions and inviting receptivity.",
    "Silently welcome the presence of your Eternal Observer, affirming openness to guidance.",
    "Begin writing without overthinking, allow words to flow naturally, embracing pauses and waves of inspiration.",
    "Notice any changes in tone or content, trusting the deeper messages that emerge.",
    "When the flow slows, thank your Eternal Observer, then review your writing with curiosity and openness."
];

function showText(index) {
    elts.text1.textContent = clickTexts[index];
    elts.text2.textContent = "";
    elts.text1.classList.add("small-text"); 
}

function goToTimer() {
    window.location.href = 'timer.html';
}

animate();
