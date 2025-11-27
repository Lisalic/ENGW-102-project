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
window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = Math.min(68,(winScroll / height) * 100);
  
  document.getElementById("myBar").style.width = scrolled + "%";
  document.getElementById("progress-text").innerText = Math.round(scrolled) + "%";
};
const bgAudio = document.getElementById('bg-audio');
const muteBtn = document.getElementById('bg-mute-btn');

if (muteBtn) {
    muteBtn.addEventListener('click', () => { 
        bgAudio.muted = true;
        muteBtn.style.display = 'none'; 
    });
}