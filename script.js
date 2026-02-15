document.addEventListener('DOMContentLoaded', () => {
    // 1. OBSŁUGA AUDIO W KARTACH MUZEUM
    const items = document.querySelectorAll('.img-item');

    items.forEach(item => {
        const audio = item.querySelector('.audio-element');
        const playBtn = item.querySelector('.play-btn');
        const progressBar = item.querySelector('.progress-bar');
        const progressArea = item.querySelector('.progress-area');
        const currentTimeEl = item.querySelector('.current-time');
        const durationEl = item.querySelector('.duration');

        if (!audio || !playBtn) return; // Zabezpieczenie przed brakiem elementów

        // Formatowanie czasu (np. 125s -> 2:05)
        const formatTime = (time) => {
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            return `${min}:${sec < 10 ? '0' + sec : sec}`;
        };

        // Ustawienie czasu trwania po załadowaniu pliku
        audio.addEventListener('loadedmetadata', () => {
            durationEl.innerText = formatTime(audio.duration);
        });

        // Kliknięcie przycisku Play
        playBtn.addEventListener('click', () => {
            // Zatrzymujemy inne Piotrki, żeby nie grały na raz
            document.querySelectorAll('.audio-element').forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    const otherBtn = otherAudio.closest('.img-item').querySelector('.play-btn');
                    if (otherBtn) otherBtn.innerText = '▶';
                }
            });

            if (audio.paused) {
                audio.play().catch(e => console.log("Błąd odtwarzania:", e));
                playBtn.innerText = '⏸';
            } else {
                audio.pause();
                playBtn.innerText = '▶';
            }
        });

        // Aktualizacja paska postępu w czasie rzeczywistym
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (currentTimeEl) currentTimeEl.innerText = formatTime(audio.currentTime);
        });

        // Przewijanie po kliknięciu w pasek
        if (progressArea) {
            progressArea.addEventListener('click', (e) => {
                const width = progressArea.clientWidth;
                const clickX = e.offsetX;
                audio.currentTime = (clickX / width) * audio.duration;
            });
        }

        // Reset po zakończeniu
        audio.addEventListener('ended', () => {
            playBtn.innerText = '▶';
            if (progressBar) progressBar.style.width = '0%';
        });
    });

    // 2. INICJALIZACJA AOS (Animacje przy skrolowaniu)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    console.log("System Piotrków zainicjalizowany pomyślnie!");
});

