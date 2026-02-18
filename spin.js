const piotrowie = [
    { name: "Piotrek GIF-owy", rarity: "Pospolity", weight: 40, points: 10, img: "https://media1.tenor.com/m/xdLLarY6NmAAAAAd/piotrek-ma%C5%82pa.gif", desc: "Tak naprawdę jest MAŁPKĄ!" },
    { name: "NoFotos Piotr", rarity: "Rzadki", weight: 25, points: 50, img: "nofotos.png", desc: "Bardzo ciężki do sfotografowania. Respi się w obszarze NoFotos." },
    { name: "Mango Piotr", rarity: "Pospolity", weight: 40, points: 10, img: "mangopiotr.png", desc: "Rzadka ewolucja 'Usuń to z kiełbasom'." },
    { name: "Poduszko Piotr", rarity: "Rzadki", weight: 25, points: 60, img: "poduszkapiotr.png", desc: "Gatunek PodusznikasusGejasus. Przerażająco brzydki." },
    { name: "Piotrek 096", rarity: "Epicki", weight: 12, points: 150, img: "piotrek096.jpg", desc: "Patrzenie mu w oczy grozi śmiercią." },
    { name: "PiotrkoLiza", rarity: "Mityczny", weight: 5, points: 500, img: "piotrkoliza.png", desc: "Dzieło Basi Davinci. Malowane przez 67 lat." },
    { name: "Rybo Piotr Noob", rarity: "Pospolity", weight: 40, points: 15, img: "rybopiotrnoob.png", desc: "Łowi ryby od 1 roku życia." },
    { name: "Rybo Piotr Pro", rarity: "Epicki", weight: 12, points: 200, img: "rybopiotrpro.png", desc: "Uczy inne gatunki łowić ryby." },
    { name: "LilBaby Piotr", rarity: "Pospolity", weight: 40, points: 10, img: "lilbabypiotr.png", desc: "Może przemienić się w LALECZKĘ CZAKI." },
    { name: "Raper Piotr", rarity: "Rzadki", weight: 25, points: 80, img: "raperpiotr.png", desc: "Śpiewa o wygiętych telefonach." },
    { name: "Piotrek Szwarceneger", rarity: "Epicki", weight: 12, points: 250, img: "arnold.png", desc: "Najsilniejszy i najgłupszy. Kajakowa siłownia." },
    { name: "Najmłodszy Piotr", rarity: "Mityczny", weight: 5, points: 1000, img: "najmlodszypiotreknaswiecie.png", desc: "Wygrał 'Mam Piotrrek' przez wiek." },
    { name: "Seweryn", rarity: "Epicki", weight: 12, points: 126, img: "Seweryn.png", desc: "CO ON TU W OGÓLE ROBI!?!?!?!" },
    { name: "Nonszalancki Piotr", rarity: "Mityczny", weight: 6, points: 998, img: "nonszalantpiotr.png", desc: "Uważa się za sigmę, taką jak Thomas Shelby." },
    { name: "Szambonurek Piotr", rarity: "Rzadki", weight: 25, points: 70, img: "szambonurekpiotr.png", desc: "Od rana do wieczora nurkował w szambie." },
    { name: "Piotr Smakosz", rarity: "Rzadki", weight: 30, points: 43, img: "piotrsmakosz.png", desc: "Wyczuwa dostawę jedzenia z trzech ulic." },
    { name: "Piotr PC Builder", rarity: "Epicki", weight: 13, points: 400, img: "piotrpcbuilder.png", desc: "Sprzedał wszystko, by złożyć komputer z RTX 4090." },
    { name: "Małpi Król Piotr", rarity: "Mityczny", weight: 3, points: 1500, img: "malpikrolpiotr.png", desc: "Otoczony armią małpek siedzących na głowie." },
    { name: "Żyrafowy Piotr", rarity: "Mityczny", weight: 3, points: 1222, img: "zyrafowypiotr.png", desc: "Jedna ze śmieszniejszych wersji Piotra." },
    { name: "Śpiący Piotr", rarity: "Pospolity", weight: 35, points: 15, img: "spiacypiotr.png", desc: "Forma przejściowa. Śni o małpkach bijących się kijami." },
    { name: "Nieśpiący Piotr", rarity: "Rzadki", weight: 20, points: 45, img: "niespiacypiotr.png", desc: "Udaje sen przed mamą, by grać w CS-a do 4 rano." },
    { name: "Piotr Pospolity", rarity: "Pospolity", weight: 50, points: 5, img: "piotrekpospolity.jpg", desc: "Baza wszystkich ewolucji. Spotykany w Płocku i na Litwie." },
    { name: "Gangster Piotr", rarity: "Epicki", weight: 10, points: 350, img: "gangsterpiotr.png", desc: "Przejął władzę w mafii. Jego twarz jest zawsze zamazana." },
    { name: "Laleczka CZAAKIIIIII", rarity: "Epicki", weight: 8, points: 450, img: "laleczkaczaki.png", desc: "Niepokonana mała bestia spragniona rozlewu krwi." },
    { name: "Dan Smoll Tanko", rarity: "Epicki", weight: 15, points: 280, img: "dansmolltanko.png", desc: "Towarzysz akcji w Afryce i kradzieży piramid." }
];

let points = parseInt(localStorage.getItem('piotrPoints')) || 0;
document.getElementById('score').innerText = points;

const btn = document.getElementById('spin-btn');
const wrapper = document.querySelector('.spin-wrapper');
const display = document.getElementById('result-display');
const pName = document.getElementById('p-name');
const pDesc = document.getElementById('p-desc');
const pImg = document.getElementById('p-img');
const pRarity = document.getElementById('rarity-badge');
const pEarned = document.getElementById('points-earned');
const sndSpin = document.getElementById('sound-spin');
const sndWin = document.getElementById('sound-win');

sndWin.volume = 0.1

const SPIN_COST = 100;

// Funkcja synchronizująca punkty z clickerem
function syncWithClicker(newPoints) {
    let clickerData = JSON.parse(localStorage.getItem('piotrClickerData'));
    if (clickerData) {
        clickerData.points = newPoints;
        localStorage.setItem('piotrClickerData', JSON.stringify(clickerData));
    }
    localStorage.setItem('piotrPoints', newPoints);
}

btn.addEventListener('click', () => {
    if (points < SPIN_COST) {
        alert(`BIEDA! Potrzebujesz ${SPIN_COST} Piotr-Punktów.`);
        return;
    }

    points -= SPIN_COST;
    syncWithClicker(points);
    document.getElementById('score').innerText = points;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> LOSOWANIE...';
    display.style.display = 'none';
    
    sndSpin.currentTime = 0;
    sndSpin.play().catch(e => {});
    wrapper.classList.add('shaking-intense');

    setTimeout(() => {
        const totalWeight = piotrowie.reduce((acc, p) => acc + p.weight, 0);
        let random = Math.random() * totalWeight;
        let selected = piotrowie[0];

        for (let p of piotrowie) {
            if (random < p.weight) { selected = p; break; }
            random -= p.weight;
        }

        points += selected.points;
        syncWithClicker(points);
        document.getElementById('score').innerText = points;

        // Dodawanie do kolekcji
        let collection = JSON.parse(localStorage.getItem('piotrCollection')) || {};

        // Jeśli wcześniej miałeś tam tablicę [], to poniższa linia naprawi format na obiekt {}
        if (Array.isArray(collection)) collection = {};

        // To dodaje +1 do licznika konkretnego Piotra
        collection[selected.name] = (collection[selected.name] || 0) + 1;

        localStorage.setItem('piotrCollection', JSON.stringify(collection));

        // Aktualizacja UI wynikowego
        pName.innerText = selected.name;
        pDesc.innerText = selected.desc;
        pImg.src = selected.img;
        pEarned.innerText = `+${selected.points} PKT`;
        
        pRarity.innerText = selected.rarity.toUpperCase();
        pRarity.className = 'rarity-tag ' + selected.rarity.toLowerCase().replace('ą', 'a');

        wrapper.classList.remove('shaking-intense');
        document.body.classList.add('white-flash');
        display.style.display = 'flex';
        
        sndWin.play().catch(e => {});
        
        setTimeout(() => document.body.classList.remove('white-flash'), 200);
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-dice"></i> ZAKRĘĆ (100 PKT)';
    }, 5800); 
});