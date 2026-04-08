const loadingText = document.getElementById("loadingText");
const equalizer = document.getElementById("equalizer");
const btn = document.getElementById("playBtn");
const toggleDescBtn = document.getElementById("toggleDesc");
const description = document.querySelector(".description");

if (toggleDescBtn && description) {
  toggleDescBtn.addEventListener("click", () => {
    description.classList.toggle("open");
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

// ===== CHAT =====
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');

let toggle = false; // alternates sides

function sendMessage() {
  if (!chatInput.value.trim()) return;

  const msgContainer = document.createElement('div');
  msgContainer.className = 'container';
  if (toggle) msgContainer.classList.add('darker');
  toggle = !toggle;

  const avatar = document.createElement('img');
  avatar.src = toggle ? '/w3images/bandmember.jpg' : '/w3images/avatar_g2.jpg';
  avatar.alt = 'Avatar';
  if (!toggle) avatar.classList.add('right');

  const msgText = document.createElement('p');
  msgText.textContent = chatInput.value;

  const time = document.createElement('span');
  const now = new Date();
  time.textContent = now.getHours() + ':' + now.getMinutes().toString().padStart(2,'0');
  time.className = toggle ? 'time-left' : 'time-right';

  msgContainer.appendChild(avatar);
  msgContainer.appendChild(msgText);
  msgContainer.appendChild(time);

  messages.appendChild(msgContainer);
  messages.scrollTop = messages.scrollHeight;

  chatInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});