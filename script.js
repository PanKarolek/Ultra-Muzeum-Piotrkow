document.addEventListener('DOMContentLoaded', () => {
    let collection = JSON.parse(localStorage.getItem('piotrCollection')) || {};
    
    // Migracja starej kolekcji (tablicy) na obiekt, by nie stracić progresu
    if (Array.isArray(collection)) {
        let newColl = {};
        collection.forEach(name => newColl[name] = 1);
        collection = newColl;
        localStorage.setItem('piotrCollection', JSON.stringify(collection));
    }

    const items = document.querySelectorAll('.img-item');
    const totalPiotrs = items.length;
    let unlockedPiotrs = 0;

    items.forEach(item => {
        const piotrName = item.querySelector('h2').innerText.trim();
        const dropCount = collection[piotrName] || 0;
        
        // Tworzenie elementu licznika
        const dropInfo = document.createElement('div');
        dropInfo.className = 'drop-counter';
        dropInfo.style.marginTop = '10px';
        dropInfo.style.fontWeight = 'bold';
        dropInfo.style.color = '#ffcc00';
        
        // Logika wyświetlania: "1 raz" vs "X razy"
        let suffix = dropCount === 1 ? "raz" : "razy";
        dropInfo.innerHTML = `<i class="fa-solid fa-box-open"></i> Wydropiono: ${dropCount} ${suffix}`;
        
        // Dodanie licznika pod opisem w item-right
        item.querySelector('.item-right').appendChild(dropInfo);

        if (dropCount === 0) {
            item.classList.add('locked');
            item.querySelector('h2').innerText = "Zablokowany";
            dropInfo.style.visibility = 'hidden'; // Ukryj licznik dla nieodblokowanych
        } else {
            unlockedPiotrs++;
            
            // Logika audio (tylko dla odblokowanych)
            const audio = item.querySelector('.audio-element');
            const playBtn = item.querySelector('.play-btn');
            const progressBar = item.querySelector('.progress-bar');
            const progressArea = item.querySelector('.progress-area');
            const currentTimeEl = item.querySelector('.current-time');
            const durationEl = item.querySelector('.duration');

            if (audio) {
                audio.onloadedmetadata = () => { durationEl.innerText = formatTime(audio.duration); };
                playBtn.onclick = () => {
                    if (audio.paused) { audio.play(); playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; } 
                    else { audio.pause(); playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; }
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
        }
    });

    // Aktualizacja ogólnego licznika na górze strony
    const counterDisplay = document.getElementById('unlocked-count');
    const totalDisplay = document.getElementById('total-count');
    if(counterDisplay) counterDisplay.innerText = unlockedPiotrs;
    if(totalDisplay) totalDisplay.innerText = totalPiotrs;

    function formatTime(time) {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }
});