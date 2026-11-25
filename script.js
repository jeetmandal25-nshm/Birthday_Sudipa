/* ==========================================
   KHEPUU BIRTHDAY SURPRISE
   FULL FIXED JAVASCRIPT
   ========================================== */


/* ==========================================
   1. STEP NAVIGATION
   ========================================== */

let currentStep = 1;
let isTransitioning = false;

function nextStep(stepNumber) {
    if (isTransitioning) return;
    if (stepNumber === currentStep) return;

    const current = document.getElementById(`step${currentStep}`);
    const next = document.getElementById(`step${stepNumber}`);

    if (!next || !current) {
        console.warn("Invalid step:", stepNumber);
        return;
    }

    isTransitioning = true;

    current.classList.remove("active");
    currentStep = stepNumber;

    setTimeout(() => {
        next.classList.add("active");
        next.scrollTop = 0;
        isTransitioning = false;
    }, 250);
}


/* ==========================================
   2. BACKGROUND MUSIC (FULLY FIXED)
   ========================================== */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let musicPlaying = false;
let musicInitialized = false;

function updateMusicButton() {
    if (!musicButton) return;
    musicButton.innerHTML = musicPlaying ? "♫ Music On" : "♫ Music Off";
}

async function playMusic() {
    if (!backgroundMusic) {
        console.warn("❌ Audio element not found!");
        return;
    }

    try {
        backgroundMusic.volume = 0.6;
        await backgroundMusic.play();
        musicPlaying = true;
        musicInitialized = true;
        console.log("✅ Music playing");
    } catch (err) {
        musicPlaying = false;
        console.error("❌ Music play failed:", err.name, "-", err.message);

        if (err.name === "NotAllowedError") {
            console.warn("👉 Browser ne block kiya. User ko phir click karna hoga.");
        } else if (err.name === "NotSupportedError") {
            console.warn("👉 Song2.mp3 file nahi mili ya corrupt hai. Path check karo.");
        }
    }

    updateMusicButton();
}

function toggleMusic() {
    if (!backgroundMusic) return;

    if (musicPlaying) {
        backgroundMusic.pause();
        musicPlaying = false;
        updateMusicButton();
        console.log("⏸️ Music paused");
    } else {
        playMusic();
    }
}

if (musicButton) {
    musicButton.addEventListener("click", toggleMusic);
}

// First click anywhere → try to start music
document.addEventListener("click", function firstClick() {
    if (!musicInitialized && !musicPlaying) {
        playMusic();
    }
}, { once: true });

updateMusicButton();


/* ==========================================
   3. FLOATING HEARTS
   ========================================== */

const heartContainer = document.getElementById("backgroundHearts");
let heartInterval = null;

function createFloatingHeart() {
    if (!heartContainer) return;

    const heart = document.createElement("div");
    heart.classList.add("floating-heart");

    const hearts = ["♡", "♥", "❤", "💕", "💗"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";
    heart.style.animationDuration = (7 + Math.random() * 8) + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.2;

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 15000);
}

heartInterval = setInterval(createFloatingHeart, 700);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(heartInterval);
        heartInterval = null;
    } else if (!heartInterval) {
        heartInterval = setInterval(createFloatingHeart, 700);
    }
});


/* ==========================================
   4. BLOW THE CANDLES
   ========================================== */

let candlesBlown = false;

function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    const flames = document.querySelectorAll(".flame");
    flames.forEach((flame, index) => {
        setTimeout(() => flame.classList.add("blown"), index * 250);
    });

    const blowButton = document.getElementById("blowButton");
    const cakeMessage = document.getElementById("cakeMessage");
    const cakeNextButton = document.getElementById("cakeNextButton");

    if (blowButton) {
        blowButton.disabled = true;
        blowButton.style.opacity = "0.6";
        blowButton.innerText = "Candles Blown ✨";
    }

    setTimeout(() => {
        if (cakeMessage) {
            cakeMessage.innerHTML = "May all your wishes come true... ❤️";
        }
        createConfetti();
        if (cakeNextButton) cakeNextButton.classList.remove("hidden");
    }, 1200);
}


/* ==========================================
   5. CONFETTI EFFECT
   ========================================== */

function createConfetti() {
    const container = document.getElementById("confettiContainer");
    if (!container) return;

    const colors = ["#e88ba8", "#f6bfd4", "#d6ad68", "#ffffff", "#cc6d93", "#f4c5d7"];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (2 + Math.random() * 4) + "s";
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.width = (5 + Math.random() * 8) + "px";
        confetti.style.height = (8 + Math.random() * 12) + "px";

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 7000);
    }
}


/* ==========================================
   6. LETTER OPENING
   ========================================== */

let letterOpened = false;

const letterText = `I don't know how to put every feeling into words, but I just wanted to make this little day a bit more special for you.

I hope life gives you countless reasons to smile, beautiful moments to remember, and people who genuinely care about your happiness.

No matter how busy life gets, never forget to take care of yourself, cherish your little moments, and keep believing in your dreams.

You deserve happiness, peace, love, and every beautiful thing life has to offer.

Happy Birthday once again. ❤️`;

function openLetter() {
    if (letterOpened) return;
    letterOpened = true;

    const envelope = document.getElementById("envelope");
    const letterContent = document.getElementById("letterContent");
    const letterNextButton = document.getElementById("letterNextButton");
    const typedLetter = document.getElementById("typedLetter");

    if (envelope) envelope.classList.add("hidden");
    if (letterContent) letterContent.classList.remove("hidden");
    if (typedLetter) typedLetter.textContent = "";

    typeLetter(letterText, 0);

    setTimeout(() => {
        if (letterNextButton) letterNextButton.classList.remove("hidden");
    }, letterText.length * 25 + 1500);
}


/* ==========================================
   7. TYPEWRITER EFFECT
   ========================================== */

function typeLetter(text, index) {
    const typedLetter = document.getElementById("typedLetter");
    if (!typedLetter) return;

    if (index < text.length) {
        typedLetter.textContent += text.charAt(index);
        setTimeout(() => typeLetter(text, index + 1), 25);
    }
}


/* ==========================================
   8. FINAL SURPRISE
   ========================================== */

const finalStep = document.getElementById("step9");

if (finalStep) {
    const observer = new MutationObserver(() => {
        if (finalStep.classList.contains("active")) {
            createConfetti();
            observer.disconnect();
        }
    });

    observer.observe(finalStep, {
        attributes: true,
        attributeFilter: ["class"]
    });
}


/* ==========================================
   9. IMAGE ERROR HANDLING
   ========================================== */

document.querySelectorAll(".photo-frame img").forEach(img => {
    img.addEventListener("error", function () {
        console.warn("Photo not found:", this.src);
        this.style.display = "none";

        if (!this.parentElement.querySelector(".img-placeholder")) {
            const placeholder = document.createElement("div");
            placeholder.className = "img-placeholder";
            placeholder.textContent = "Photo missing 💔";
            this.parentElement.appendChild(placeholder);
        }
    });
});


/* ==========================================
   10. SCROLLING FIX (body block, step scroll allowed)
   ========================================== */

function preventBodyScroll(e) {
    const activeStep = document.querySelector(".step.active");
    if (!activeStep) return;

    if (activeStep.scrollHeight > activeStep.clientHeight) {
        return; // allow inner scroll
    }

    e.preventDefault();
}

document.addEventListener("wheel", preventBodyScroll, { passive: false });

document.addEventListener("touchmove", function (event) {
    const activeStep = document.querySelector(".step.active");
    if (!activeStep) return;

    if (activeStep.scrollHeight <= activeStep.clientHeight) {
        event.preventDefault();
    }
}, { passive: false });


/* ==========================================
   11. INITIALIZATION
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".step").forEach(step => {
        step.classList.remove("active");
    });

    const firstStep = document.getElementById("step1");
    if (firstStep) firstStep.classList.add("active");

    currentStep = 1;
    updateMusicButton();

    console.log("❤️ Birthday Surprise Website Loaded Successfully");
    console.log("🎵 Music file path:", backgroundMusic?.currentSrc || "(not loaded yet)");
});