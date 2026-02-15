let points = parseInt(localStorage.getItem('piotrPoints')) || 0;
const pointsDisplay = document.getElementById('points-val');
const target = document.getElementById('piotr-target');
const snd = document.getElementById('snd-piotr');

pointsDisplay.innerText = points;

target.addEventListener('mousedown', (e) => {
    points++;
    localStorage.setItem('piotrPoints', points);
    pointsDisplay.innerText = points;
    snd.currentTime = 0;
    snd.play().catch(() => {});
    
    const el = document.createElement('div');
    el.innerText = '+1';
    el.className = 'pop-text';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
});