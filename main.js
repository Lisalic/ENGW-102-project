document.addEventListener('DOMContentLoaded', () => {

  const fadeSections = document.querySelectorAll('.fade-section');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); 
      }
    });
  }, { threshold: 0.1 });

  fadeSections.forEach(section => fadeObserver.observe(section));


  const overlay = document.getElementById('overlay');
  const startBtn = document.getElementById('start-btn');
  const bgAudio = document.getElementById('bg-audio');

  const defaultVolume = 0.2;
  const duckedVolume = 0.1; 
  
  bgAudio.volume = defaultVolume;

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      bgAudio.play().then(() => {
        console.log("Background audio started.");
        
        overlay.style.opacity = '0';
        
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 1000);
        
      }).catch(err => {
        console.error("Audio play failed:", err);
      });
    });
  }


  const playButtons = document.querySelectorAll('.play-btn');

  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const audioId = btn.getAttribute('data-audio');
      const audioEl = document.getElementById(audioId);

      document.querySelectorAll('audio').forEach(a => {
        if (a !== audioEl && a.id !== 'bg-audio') {
          a.pause();
          a.currentTime = 0;
        }
      });

      if (audioEl.paused) {
        audioEl.play();
        btn.textContent = "⏸ Pause ";
        
        bgAudio.volume = duckedVolume; 
        
      } else {
        audioEl.pause();
        btn.textContent = "▶ Play Audio";
        
        bgAudio.volume = defaultVolume; 
      }

      audioEl.onended = () => {
        btn.textContent = "▶ Play Audio";
        bgAudio.volume = defaultVolume; 
      };
    });
  });

});