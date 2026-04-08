// ===== FIREBASE + CHAT + PLAYER =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { Howl } from "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js";

// ===== FIREBASE =====
const firebaseConfig = {
    apiKey: "AIzaSyCR2jYJEqYIA7XW3r4aOaRxEtbZAS4bNQw",
    authDomain: "mustard-seed-gr.firebaseapp.com",
    databaseURL: "https://mustard-seed-gr-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mustard-seed-gr",
    storageBucket: "mustard-seed-gr.firebasestorage.app",
    messagingSenderId: "147197767959",
    appId: "1:147197767959:web:6d27cb7d746a8139090752"
  };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'chat');

// ===== CHAT =====
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');

function displayMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  if (!chatInput.value.trim()) return;
  push(messagesRef, { text: chatInput.value });
  chatInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

onChildAdded(messagesRef, snapshot => {
  const data = snapshot.val();
  displayMessage(data.text);
});

// ===== PLAYER =====
const loadingText = document.getElementById("loadingText");
const equalizer = document.getElementById("equalizer");
const btn = document.getElementById("playBtn");
const toggleDescBtn = document.getElementById("toggleDesc");
const description = document.querySelector(".description");

if (toggleDescBtn && description) {
  toggleDescBtn.addEventListener("click", () => {
    description.classList.toggle("open");
    toggleDescBtn.textContent = description.classList.contains("open")
      ? "❌ Κλείσε την περιγραφή"
      : "ℹ️ Τι είναι το Mustard Seed Radio;";
  });
}

const sound = new Howl({
  src: ['https://centova.gr-net.gr/proxy/mustardseed/stream'],
  html5: true,
  volume: 1.0
});

btn.addEventListener("click", () => {
  if (sound.playing()) {
    sound.pause();
    btn.textContent = "▶ Πάτα να γίνει χαμός!";
    equalizer.style.visibility = "hidden";
    loadingText.style.display = "none";
  } else {
    loadingText.style.display = "block";
    btn.textContent = "⏸ Παύση";
    sound.play();
  }
});

sound.on('play', () => {
  loadingText.style.display = "none";
  equalizer.style.visibility = "visible";
  btn.textContent = "⏸ Παύση";
});

sound.on('loaderror', () => {
  loadingText.textContent = "⚠ «Δεν ήταν γραφτό. Πάτα ξανά.»";
  btn.textContent = "▶ «Δεν ήταν γραφτό. Πάτα ξανά.»";
});

sound.on('end', () => {
  equalizer.style.visibility = "hidden";
  btn.textContent = "▶ Πάτα να γίνει χαμός!";
});