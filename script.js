const playButton = document.querySelector(".play");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const vinyl = document.querySelector(".vinyl");
const songTitle = document.querySelector(".player h2");
const songArtist = document.querySelector(".player p");
const songs = document.querySelectorAll(".slider .item");
let currentIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentIndex].dataset.audio);
const loveIcon = document.querySelector(".love-icon");

// Menyimpan status love untuk setiap lagu (true = disukai, false = tidak)
let loveStatus = Array(songs.length).fill(false); 

// Fungsi untuk memperbarui tampilan love icon sesuai status lagu saat ini
function updateLoveIcon() {
    if (loveStatus[currentIndex]) {
        loveIcon.classList.add("loved");
    } else {
        loveIcon.classList.remove("loved");
    }
}

// Saat ikon love diklik, ubah statusnya hanya untuk lagu yang sedang dimainkan
loveIcon.addEventListener("click", () => {
    loveStatus[currentIndex] = !loveStatus[currentIndex];
    updateLoveIcon();
});

function updateSongInfo() {
    const currentSong = songs[currentIndex];
    songTitle.textContent = currentSong.dataset.title; 
    songArtist.textContent = currentSong.dataset.artist; 
    audio.src = currentSong.dataset.audio;
    updateLoveIcon(); // Panggil fungsi ini agar loveIcon diperbarui
}

playButton.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        vinyl.style.transform = "translateY(-150px) rotate(0deg)";
        vinyl.style.transition = "transform 0.5s ease-in-out";
        setTimeout(() => {
            vinyl.style.transition = "transform 2s linear";
            vinyl.style.animation = "spin 2s linear infinite";
        }, 500);
    } else {
        audio.pause();
        vinyl.style.animation = "";
        vinyl.style.transform = "translateY(0px)";
        vinyl.style.transition = "transform 0.5s ease-in-out";
    }
    isPlaying = !isPlaying;
});

prevButton.addEventListener("click", () => {
    audio.pause();
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    if (isPlaying) audio.play();
});

nextButton.addEventListener("click", () => {
    audio.pause();
    currentIndex = (currentIndex + 1) % songs.length;
    updateSongInfo();
    if (isPlaying) audio.play();
});

updateSongInfo();

const soundToggle = document.getElementById("soundToggle");
let isMuted = false;

// Function to toggle mute
soundToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    audio.muted = isMuted; // Mute/unmute the audio

    // Change image based on mute state
    if (isMuted) {
        soundToggle.src = "assets/muteAsset 4.png"; // Change to mute icon
    } else {
        soundToggle.src = "assets/soundAsset 3.png"; // Change back to sound icon
    }
});



// Animasi CSS untuk pemutaran vinyl
const style = document.createElement("style");
style.innerHTML = `
    @keyframes spin {
        from { transform: translateY(-150px) rotate(0deg); }
        to { transform: translateY(-150px) rotate(360deg); }
    }
`;

document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    let currentRotation = 0; // Nilai awal sesuai dengan CSS

    document.querySelector(".next").addEventListener("click", () => {
        currentRotation -= 36; // Rotasi ke kiri (next)
        slider.style.transform = `perspective(1000px) rotateX(-12deg) rotateY(${currentRotation}deg)`;
    });

    document.querySelector(".prev").addEventListener("click", () => {
        currentRotation += 36; // Rotasi ke kanan (prev)
        slider.style.transform = `perspective(1000px) rotateX(-12deg) rotateY(${currentRotation}deg)`;
    });
});


