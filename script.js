document.querySelectorAll('.img-item').forEach(item => {
    const audio = item.querySelector('audio');
    const playBtn = item.querySelector('.play-btn');
    const progressBar = item.querySelector('.progress-bar');
    const progressArea = item.querySelector('.progress-area');
    const currentTimeEl = item.querySelector('.current-time');
    const durationEl = item.querySelector('.duration');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    const setDuration = () => {
        durationEl.innerText = formatTime(audio.duration);
    };

    if (audio.readyState > 0) {
        setDuration();
    } else {
        audio.addEventListener('loadedmetadata', setDuration);
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            document.querySelectorAll('audio').forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.parentElement.querySelector('.play-btn').innerText = '▶';
                }
            });
            audio.play();
            playBtn.innerText = '❚❚';
        } else {
            audio.pause();
            playBtn.innerText = '▶';
        }
    });

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.innerText = formatTime(audio.currentTime);
    });

    progressArea.addEventListener('click', (e) => {
        const width = progressArea.clientWidth;
        const clickX = e.offsetX;
        audio.currentTime = (clickX / width) * audio.duration;
    });

    audio.addEventListener('ended', () => {
        playBtn.innerText = '▶';
        progressBar.style.width = '0%';
        currentTimeEl.innerText = '0:00';
    });
});