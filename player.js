const loadingText = document.getElementById("loadingText");
const equalizer = document.getElementById("equalizer");
const btn = document.getElementById("playBtn");

const sound = new Howl({
  src: ['https://centova.gr-net.gr/proxy/mustardseed/stream'],
  html5: true,
  volume: 1.0
});

btn.addEventListener("click", () => {
  if (sound.playing()) {
    sound.pause();
    btn.textContent = "▶ Play Live Radio";
    equalizer.style.visibility = "hidden";
    loadingText.style.display = "none";
  } else {
    loadingText.style.display = "block";
    btn.textContent = "⏸ Connecting...";
    sound.play();
  }
});

sound.on('play', () => {
  loadingText.style.display = "none";
  equalizer.style.visibility = "visible";
  btn.textContent = "⏸ Pause";
});

sound.on('loaderror', () => {
  loadingText.textContent = "⚠ Stream error. Try again.";
  btn.textContent = "▶ Retry";
});

sound.on('end', () => {
  equalizer.style.visibility = "hidden";
  btn.textContent = "▶ Play Live Radio";
});