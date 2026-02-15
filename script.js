document.addEventListener('DOMContentLoaded', () => {
    const unlockedCollection = JSON.parse(localStorage.getItem('piotrCollection')) || [];
    const items = document.querySelectorAll('.img-item');

    items.forEach(item => {
        const piotrName = item.querySelector('h2').innerText.trim();
        const audio = item.querySelector('.audio-element');
        const playBtn = item.querySelector('.play-btn');
        const progressBar = item.querySelector('.progress-bar');
        const progressArea = item.querySelector('.progress-area');
        const currentTimeEl = item.querySelector('.current-time');
        const durationEl = item.querySelector('.duration');

        // Blokada jeśli nie ma w kolekcji
        if (!unlockedCollection.includes(piotrName)) {
            item.classList.add('locked');
            item.querySelector('h2').innerText = "Zablokowany";
            return; 
        }

        // Logika odtwarzacza (tylko dla odblokowanych)
        function formatTime(time) {
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            return `${min}:${sec < 10 ? '0' + sec : sec}`;
        }

        if (audio) {
            audio.onloadedmetadata = () => {
                durationEl.innerText = formatTime(audio.duration);
            };

            playBtn.onclick = () => {
                if (audio.paused) {
                    audio.play();
                    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            };

            audio.ontimeupdate = () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                currentTimeEl.innerText = formatTime(audio.currentTime);
            };

            progressArea.onclick = (e) => {
                audio.currentTime = (e.offsetX / progressArea.clientWidth) * audio.duration;
            };
        }
    });
});