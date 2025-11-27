/* =========================================
   1. Fade-in Sections on Scroll
   ========================================= */
   const fadeSections = document.querySelectorAll('.fade-section');

   const fadeObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if(entry.isIntersecting){
         entry.target.classList.add('visible');
       } else {
         entry.target.classList.remove('visible'); 
       }
     });
   }, { threshold: 0.1 });
   
   fadeSections.forEach(section => fadeObserver.observe(section));
   
   
   /* =========================================
      2. Background Audio Autoplay Handling
      ========================================= */
   const bgAudio = document.getElementById('bg-audio');
   
   // Set a reasonable volume for background so it doesn't overpower voice
   bgAudio.volume = 0.4; 
   
   function tryPlayBackgroundAudio() {
     // Attempt to play immediately
     const playPromise = bgAudio.play();
   
     if (playPromise !== undefined) {
       playPromise.then(() => {
         console.log("Background audio playing automatically.");
       }).catch(error => {
         // Browser blocked it; wait for user interaction
         console.log("Autoplay blocked. Waiting for interaction...");
         addInteractionListeners();
       });
     }
   }
   
   function addInteractionListeners() {
     const startAudioOnInteraction = () => {
       bgAudio.play();
       // Once played, remove these listeners so they don't fire again
       document.removeEventListener('click', startAudioOnInteraction);
       document.removeEventListener('keydown', startAudioOnInteraction);
       document.removeEventListener('scroll', startAudioOnInteraction);
     };
   
     document.addEventListener('click', startAudioOnInteraction);
     document.addEventListener('keydown', startAudioOnInteraction);
     document.addEventListener('scroll', startAudioOnInteraction);
   }
   
   // Initialize Autoplay attempt
   tryPlayBackgroundAudio();
   
   
   /* =========================================
      3. Content Play/Pause Buttons
      ========================================= */
   const playButtons = document.querySelectorAll('.play-btn');
   
   playButtons.forEach(btn => {
     btn.addEventListener('click', () => {
       const audioId = btn.getAttribute('data-audio');
       const audioEl = document.getElementById(audioId);
   
       // Pause all OTHER audios, but IGNORE the background music
       document.querySelectorAll('audio').forEach(a => {
         if(a !== audioEl && a.id !== 'bg-audio'){
           a.pause();
           a.currentTime = 0;
         }
       });
   
       // Toggle Play/Pause for the clicked audio
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