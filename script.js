// ================================
// ANNIVERSARY 2 TAHUN
// ================================

// GANTI tanggal ini sesuai tanggal jadian kalian.
// Format: TAHUN-BULAN-TANGGAL
const anniversaryDate = new Date("2024-09-30T00:00:00");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const letterBtn = document.getElementById("letterBtn");
const typedText = document.getElementById("typedText");

let musicPlaying = false;

function playMusic() {
  bgMusic.volume = 0.38;
  bgMusic.play().then(() => {
    musicPlaying = true;
    musicBtn.innerHTML = "♫ <span>Playing</span>";
  }).catch(() => {
    // Browser bisa memblokir autoplay; user tinggal klik tombol musik.
  });
}

function pauseMusic() {
  bgMusic.pause();
  musicPlaying = false;
  musicBtn.innerHTML = "♪ <span>Music</span>";
}

musicBtn.addEventListener("click", () => {
  if (musicPlaying) pauseMusic();
  else playMusic();
});

startBtn.addEventListener("click", () => {
  playMusic();
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});

replayBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  playMusic();
});

// ================================
// COUNTER
// ================================
function updateCounter() {
  const now = new Date();
  let diff = now - anniversaryDate;

  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days.toLocaleString("id-ID");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

// ================================
// SCROLL REVEAL
// ================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ================================
// TYPING LETTER
// ================================
const message = `Hai kamu.

Nggak terasa kita sudah sampai di dua tahun.

Selama dua tahun ini, kita pasti pernah ketawa sampai lupa waktu, pernah beda pendapat, pernah saling bikin kesal, dan pernah melewati hari-hari yang nggak mudah.

Tapi dari semua itu, ada satu hal yang masih sama:
aku masih senang punya kamu di samping aku.

Terima kasih sudah bertahan.
Terima kasih sudah menjadi rumah di banyak hari.
Dan terima kasih untuk semua kenangan yang sekarang menjadi bagian dari cerita kita.

Aku nggak tahu perjalanan kita nanti akan seperti apa.
Tapi untuk hari ini, aku cuma ingin bilang:

Happy 2nd Anniversary, sayang.
Semoga cerita kita masih punya banyak halaman yang belum kita tulis bersama.

❤️`;

let typingStarted = false;

function typeLetter() {
  if (typingStarted) return;
  typingStarted = true;

  typedText.textContent = "";
  let i = 0;

  function type() {
    if (i < message.length) {
      typedText.textContent += message.charAt(i);
      i++;
      setTimeout(type, 25);
    }
  }

  type();
}

letterBtn.addEventListener("click", () => {
  typeLetter();
  letterBtn.textContent = "Pesannya sudah dibuka ❤️";
});

// ================================
// LIGHTBOX FOTO
// ================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".memory-card img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeViewer() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

closeLightbox.addEventListener("click", closeViewer);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeViewer();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeViewer();
});

// ================================
// FLOATING HEARTS
// ================================
const hearts = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 18}px`;
  heart.style.animationDuration = `${7 + Math.random() * 8}s`;

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 16000);
}

setInterval(createHeart, 1400);

// Jangan langsung memaksa musik berjalan.
// Browser HP biasanya membutuhkan interaksi user terlebih dahulu.
