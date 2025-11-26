// Fade-in sections when scrolled
const fadeSections = document.querySelectorAll('.fade-section');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // allows fade in/out repeatedly
    }
  });
}, { threshold: 0.1 });

fadeSections.forEach(section => fadeObserver.observe(section));

// Play/Pause audio on button click
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const audioId = btn.getAttribute('data-audio');
    const audioEl = document.getElementById(audioId);

    // Pause all other audios
    document.querySelectorAll('audio').forEach(a => {
      if(a !== audioEl){
        a.pause();
        a.currentTime = 0;
      }
    });

    // Play or pause clicked audio
    if(audioEl.paused){
      audioEl.play();
      btn.textContent = "⏸";
    } else {
      audioEl.pause();
      btn.textContent = "▶";
    }

    // Reset button text when audio ends
    audioEl.onended = () => {
      btn.textContent = "▶";
    }
  });
});