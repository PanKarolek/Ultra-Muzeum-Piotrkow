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
            { name: "Najmłodszy Piotr", rarity: "Mityczny", weight: 5, points: 1000, img: "najmlodszypiotreknaswiecie.png", desc: "Wygrał 'Mam Piotrrek' przez wiek." }
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

        sndWin.volume = 0.1;
        const SPIN_COST = 100; // Cena losowania

        btn.addEventListener('click', () => {
            // --- PAYWALL: Sprawdzamy czy stać użytkownika ---
            if (points < SPIN_COST) {
                alert(`BIEDA! Potrzebujesz ${SPIN_COST} Piotr-Punktów. Idź do Clickera zarobić!`);
                return; // Przerywamy funkcję, nic się nie dzieje
            }

            // Zabieramy punkty
            points -= SPIN_COST;
            localStorage.setItem('piotrPoints', points);
            document.getElementById('score').innerText = points;

            // --- START LOSOWANIA ---
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> LOSOWANIE...';
            display.style.display = 'none';
            
            sndSpin.currentTime = 0;
            sndSpin.play().catch(e => console.log("Kliknij ekran najpierw!"));
            wrapper.classList.add('shaking-intense');

            setTimeout(() => {
                const totalWeight = piotrowie.reduce((acc, p) => acc + p.weight, 0);
                let random = Math.random() * totalWeight;
                let selected = piotrowie[0];

                for (let p of piotrowie) {
                    if (random < p.weight) { selected = p; break; }
                    random -= p.weight;
                }

                // Dodajemy punkty za wylosowanie (zwrot z nagrody)
                points += selected.points;
                localStorage.setItem('piotrPoints', points);
                document.getElementById('score').innerText = points;

                pName.innerText = selected.name;
                pDesc.innerText = selected.desc;
                pImg.src = selected.img;
                
                // Ustawianie napisu rzadkości
                pRarity.innerText = selected.rarity.toUpperCase();
                
                // --- NOWY SYSTEM WYGLĄDU RZADKOŚCI ---
                // Resetujemy klasy, zostawiamy tylko bazową
                pRarity.className = 'rarity-tag';
                // Dodajemy odpowiednią klasę z CSS (pospolity, rzadki, epicki, mityczny)
                // Konwertujemy nazwę na małe litery bez polskich znaków (proste mapowanie)
                const rarityClassMap = {
                    "Pospolity": "pospolity",
                    "Rzadki": "rzadki",
                    "Epicki": "epicki",
                    "Mityczny": "mityczny"
                };
                pRarity.classList.add(rarityClassMap[selected.rarity]);
                
                // Usuwamy stary styl inline background-color, bo teraz CSS to robi
                pRarity.style.backgroundColor = ''; 

                pEarned.innerText = `+${selected.points} PKT`;

                wrapper.classList.remove('shaking-intense');
                document.body.classList.add('white-flash');
                
                display.style.display = 'flex';
                display.classList.add('animate-mega-in');
                
                sndWin.play().catch(e => {});
                
                setTimeout(() => document.body.classList.remove('white-flash'), 200);
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-dice"></i> ZAKRĘĆ (100 PKT)';
                setTimeout(() => display.classList.remove('animate-mega-in'), 600);
            }, 5800); 
        });