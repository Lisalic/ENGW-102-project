document.addEventListener('DOMContentLoaded', () => {

  // --- 1. VISUALS: Fade Sections on Scroll ---
  const fadeSections = document.querySelectorAll('.fade-section');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Optional: Keep this if you want text to fade out when scrolling up
        entry.target.classList.remove('visible'); 
      }
    });
  }, { threshold: 0.1 });

  fadeSections.forEach(section => fadeObserver.observe(section));


  // --- 2. AUDIO: Background Music & Overlay Handling ---
  const overlay = document.getElementById('overlay');
  const startBtn = document.getElementById('start-btn');
  const bgAudio = document.getElementById('bg-audio');

  // Set the default volume for the background noise
  const defaultVolume = 0.4;
  const duckedVolume = 0.1; // Volume when talking
  
  bgAudio.volume = defaultVolume;

  // We wait for the specific "Start" button click to trigger audio
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      bgAudio.play().then(() => {
        console.log("Background audio started.");
        
        // Fade out the overlay
        overlay.style.opacity = '0';
        
        // Remove overlay from DOM after fade animation (1 second)
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 1000);
        
      }).catch(err => {
        console.error("Audio play failed:", err);
      });
    });
  }


  // --- 3. AUDIO: Individual Clips with "Ducking" ---
  const playButtons = document.querySelectorAll('.play-btn');

  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const audioId = btn.getAttribute('data-audio');
      const audioEl = document.getElementById(audioId);

      // Stop/Reset other reflection clips if they are playing
      document.querySelectorAll('audio').forEach(a => {
        if (a !== audioEl && a.id !== 'bg-audio') {
          a.pause();
          a.currentTime = 0;
        }
      });

      // Toggle Play/Pause for the selected clip
      if (audioEl.paused) {
        audioEl.play();
        btn.textContent = "⏸ Pause ";
        
        // DUCK: Lower background volume so voice is heard
        bgAudio.volume = duckedVolume; 
        
      } else {
        audioEl.pause();
        btn.textContent = "▶ Play Audio";
        
        // RESTORE: Bring background volume back up
        bgAudio.volume = defaultVolume; 
      }

      // Reset when the clip finishes automatically
      audioEl.onended = () => {
        btn.textContent = "▶ Play Audio";
        bgAudio.volume = defaultVolume; 
      };
    });
  });

});