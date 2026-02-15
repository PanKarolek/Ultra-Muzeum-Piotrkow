const piotrowie = [
    { name: "Piotrek GIF-owy", rarity: "Pospolity", weight: 40, img: "https://media1.tenor.com/m/xdLLarY6NmAAAAAd/piotrek-ma%C5%82pa.gif", desc: "Tak naprawdę jest MAŁPKĄ!" },
    { name: "NoFotos Piotr", rarity: "Rzadki", weight: 25, img: "nofotos.png", desc: "Bardzo ciężki do sfotografowania." },
    { name: "Piotrek 096", rarity: "Epicki", weight: 12, img: "piotrek096.jpg", desc: "Patrzenie mu w oczy grozi śmiercią." },
    { name: "PiotrkoLiza", rarity: "Mityczny", weight: 5, img: "piotrkoliza.png", desc: "Dzieło Basi Davinci." },
    { name: "Piotrek Szwarceneger", rarity: "Epicki", weight: 12, img: "arnold.png", desc: "Kajakowa siłownia." }
];

const rarityColors = { "Pospolity": "#95a5a6", "Rzadki": "#3498db", "Epicki": "#9b59b6", "Mityczny": "#f1c40f" };

// Synchronizacja z clickerem (pobieranie punktów)
function updatePoints() {
    let points = localStorage.getItem('piotrPoints') || 0;
    document.getElementById('score').innerText = points;
}
updatePoints();

const btn = document.getElementById('spin-btn');
const display = document.getElementById('result-display');
const wrapper = document.getElementById('spin-main-box');

btn.addEventListener('click', () => {
    btn.disabled = true;
    display.style.display = 'none';
    wrapper.classList.add('shaking-intense');
    document.getElementById('sound-spin').play();

    setTimeout(() => {
        // Losowanie
        const totalWeight = piotrowie.reduce((acc, p) => acc + p.weight, 0);
        let random = Math.random() * totalWeight;
        let selected = piotrowie[0];

        for (let p of piotrowie) {
            if (random < p.weight) { selected = p; break; }
            random -= p.weight;
        }

        // Wyświetlanie
        document.getElementById('p-name').innerText = selected.name;
        document.getElementById('p-desc').innerText = selected.desc;
        document.getElementById('p-img').src = selected.img;
        
        const badge = document.getElementById('rarity-badge');
        badge.innerText = selected.rarity.toUpperCase();
        badge.style.backgroundColor = rarityColors[selected.rarity];

        wrapper.classList.remove('shaking-intense');
        display.style.display = 'flex';
        document.getElementById('sound-win').play();
        btn.disabled = false;
        
        // Odśwież punkty (na wypadek gdybyś kliknął w innej karcie)
        updatePoints();
    }, 5800);
});