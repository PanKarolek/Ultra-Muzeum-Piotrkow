const piotrowie = [
    { name: "Piotrek GIF-owy", rarity: "Pospolity", weight: 40, img: "https://media1.tenor.com/m/xdLLarY6NmAAAAAd/piotrek-ma%C5%82pa.gif", desc: "Tak naprawdę jest MAŁPKĄ!" },
    { name: "NoFotos Piotr", rarity: "Rzadki", weight: 25, img: "nofotos.png", desc: "Bardzo ciężki do sfotografowania." },
    { name: "Piotrek 096", rarity: "Epicki", weight: 12, img: "piotrek096.jpg", desc: "Patrzenie mu w oczy grozi śmiercią." },
    { name: "PiotrkoLiza", rarity: "Mityczny", weight: 5, img: "piotrkoliza.png", desc: "Dzieło Basi Davinci." }
];

const colors = { "Pospolity": "#95a5a6", "Rzadki": "#3498db", "Epicki": "#9b59b6", "Mityczny": "#f1c40f" };

let pts = parseInt(localStorage.getItem('piotrPoints')) || 0;
const scoreDisplay = document.getElementById('score');
const btn = document.getElementById('spin-btn');
const display = document.getElementById('result-display');
const wrapper = document.getElementById('spin-main-box');

scoreDisplay.innerText = pts;

btn.addEventListener('click', () => {
    if (pts < 100) {
        alert("Brakuje Ci punktów! Klikaj w Clickerze!");
        return;
    }

    // Pobranie opłaty
    pts -= 100;
    localStorage.setItem('piotrPoints', pts);
    scoreDisplay.innerText = pts;

    // Reset i efekty
    btn.disabled = true;
    display.style.display = "none";
    wrapper.classList.add('shaking-intense');
    
    const sndSpin = document.getElementById('sound-spin');
    sndSpin.currentTime = 0;
    sndSpin.play().catch(() => {});

    setTimeout(() => {
        // Losowanie wagowe
        const total = piotrowie.reduce((acc, p) => acc + p.weight, 0);
        let r = Math.random() * total;
        let s = piotrowie[0];
        for (let p of piotrowie) {
            if (r < p.weight) { s = p; break; }
            r -= p.weight;
        }

        // Wstawianie danych
        document.getElementById('p-name').innerText = s.name;
        document.getElementById('p-desc').innerText = s.desc;
        document.getElementById('p-img').src = s.img;
        
        const badge = document.getElementById('rarity-badge');
        badge.innerText = s.rarity.toUpperCase();
        badge.style.backgroundColor = colors[s.rarity];

        // Finał
        wrapper.classList.remove('shaking-intense');
        document.body.classList.add('white-flash');
        display.style.display = "flex";
        document.getElementById('sound-win').play().catch(() => {});

        setTimeout(() => document.body.classList.remove('white-flash'), 300);
        btn.disabled = false;
    }, 5800);
});