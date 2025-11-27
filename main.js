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
   
   
   const bgAudio = document.getElementById('bg-audio');
   bgAudio.volume = 0.4; 
   
   function tryPlayBackgroundAudio() {
     bgAudio.play().then(() => {
       console.log("Audio started automatically.");
     }).catch(error => {
       console.log("Autoplay blocked (normal browser behavior). Waiting for click...");
       addInteractionListeners();
     });
   }
   
   function addInteractionListeners() {
     const startAudioOnInteraction = () => {
       bgAudio.play().then(() => {
         document.removeEventListener('click', startAudioOnInteraction);
         document.removeEventListener('keydown', startAudioOnInteraction);
         document.removeEventListener('scroll', startAudioOnInteraction);
       }).catch(err => {
         console.log("Audio still blocked, waiting for next interaction.");
       });
     };
   
     document.addEventListener('click', startAudioOnInteraction);
     document.addEventListener('keydown', startAudioOnInteraction);
     document.addEventListener('scroll', startAudioOnInteraction);
   }
   
   tryPlayBackgroundAudio();
   
   
   const playButtons = document.querySelectorAll('.play-btn');
   
   playButtons.forEach(btn => {
     btn.addEventListener('click', () => {
       const audioId = btn.getAttribute('data-audio');
       const audioEl = document.getElementById(audioId);
   
       document.querySelectorAll('audio').forEach(a => {
         if(a !== audioEl && a.id !== 'bg-audio'){
           a.pause();
           a.currentTime = 0;
         }
       });
   
       if(audioEl.paused){
         audioEl.play();
         btn.textContent = "⏸";
       } else {
         audioEl.pause();
         btn.textContent = "▶";
       }
   
       audioEl.onended = () => {
         btn.textContent = "▶";
       }
     });
   });