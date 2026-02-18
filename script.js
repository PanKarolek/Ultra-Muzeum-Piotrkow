document.addEventListener('DOMContentLoaded', () => {
    const collection = JSON.parse(localStorage.getItem('piotrCollection')) || {};
    const items = document.querySelectorAll('.img-item');
    
    let collectedTypes = 0;
    const totalTypes = items.length;

    items.forEach(item => {
        const h2 = item.querySelector('h2');
        const piotrName = h2.innerText.trim();
        const count = collection[piotrName] || 0;

        // Licznik sztuk pod obrazkiem
        const badge = document.createElement('div');
        badge.style.background = 'rgba(255, 255, 255, 0.1)';
        badge.style.padding = '8px 15px';
        badge.style.borderRadius = '10px';
        badge.style.marginTop = '15px';
        badge.style.fontFamily = 'DynaPuff';
        badge.style.fontSize = '16px';
        badge.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        badge.style.width = '100%';
        badge.style.textAlign = 'center';
        badge.style.boxSizing = 'border-box';
        badge.innerHTML = `Sztuk: <strong>${count}</strong>`;
        item.querySelector('.item-left').appendChild(badge);

        if (count > 0) {
            collectedTypes++;
            
            // Logika odtwarzacza
            const audio = item.querySelector('.audio-element');
            const playBtn = item.querySelector('.play-btn');
            const progressBar = item.querySelector('.progress-bar');
            const progressArea = item.querySelector('.progress-area');
            const currentTimeEl = item.querySelector('.current-time');
            const durationEl = item.querySelector('.duration');

            function formatTime(time) {
                const min = Math.floor(time / 60);
                const sec = Math.floor(time % 60);
                return `${min}:${sec < 10 ? '0' + sec : sec}`;
            }

            if (audio) {
                audio.onloadedmetadata = () => { durationEl.innerText = formatTime(audio.duration); };
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
        } else {
            item.classList.add('locked');
            h2.innerText = "Zablokowany";
        }
    });

    const ratioEl = document.getElementById('progress-ratio');
    if (ratioEl) ratioEl.innerText = `${collectedTypes}/${totalTypes}`;
});