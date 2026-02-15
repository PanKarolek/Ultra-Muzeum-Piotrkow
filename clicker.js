let gameData = JSON.parse(localStorage.getItem('piotrClickerData')) || {
    points: parseInt(localStorage.getItem('piotrPoints')) || 0,
    clickPower: 1,
    autoClick: 0,
    upgrades: { chrupki: 0, palec: 0, malyPiotr: 0, basia: 0 }
};

const upgradesConfig = {
    chrupki: { name: "Zjedz Chrupka", type: "click", baseCost: 50, basePower: 1, desc: "+1 do Mocy Klikania", icon: "fa-cookie-bite" },
    palec: { name: "Kajakowa Siłka", type: "click", baseCost: 300, basePower: 5, desc: "+5 do Mocy Klikania", icon: "fa-dumbbell" },
    malyPiotr: { name: "Zatrudnij Piotrka", type: "auto", baseCost: 150, basePower: 1, desc: "+1 Piotr-Punkt / sek", icon: "fa-child" },
    basia: { name: "Basia Davinci", type: "auto", baseCost: 1000, basePower: 10, desc: "+10 Piotr-Punktów / sek", icon: "fa-palette" }
};

const pointsDisplay = document.getElementById('points-val');
const powerDisplay = document.getElementById('click-power-val');
const autoDisplay = document.getElementById('auto-click-val');
const target = document.getElementById('piotr-target');
const snd = document.getElementById('snd-piotr');
const sndBuy = document.getElementById('snd-buy');
const shopContainer = document.getElementById('shop-items');

function saveGame() {
    localStorage.setItem('piotrClickerData', JSON.stringify(gameData));
    localStorage.setItem('piotrPoints', Math.floor(gameData.points));
}

function getCost(id) {
    return Math.floor(upgradesConfig[id].baseCost * Math.pow(1.15, gameData.upgrades[id] || 0));
}

function updateUI() {
    pointsDisplay.innerText = Math.floor(gameData.points);
    if(powerDisplay) powerDisplay.innerText = gameData.clickPower;
    if(autoDisplay) autoDisplay.innerText = gameData.autoClick;
    renderShop();
}

function renderShop() {
    if(!shopContainer) return;
    shopContainer.innerHTML = "";
    for (const [id, item] of Object.entries(upgradesConfig)) {
        const cost = getCost(id);
        const canAfford = gameData.points >= cost;
        const div = document.createElement('div');
        div.className = 'upgrade-item';
        div.innerHTML = `
            <div class="upgrade-header">
                <span><i class="fa-solid ${item.icon}"></i> ${item.name}</span>
                <span style="color: #f1c40f">Lvl: ${gameData.upgrades[id]}</span>
            </div>
            <div class="upgrade-desc">${item.desc}</div>
            <button class="buy-btn" ${canAfford ? '' : 'disabled'} onclick="window.buyUpgrade('${id}')">
                Kup: ${cost} pkt
            </button>
        `;
        shopContainer.appendChild(div);
    }
}

window.buyUpgrade = function(id) {
    const cost = getCost(id);
    if (gameData.points >= cost) {
        gameData.points -= cost;
        gameData.upgrades[id]++;
        if (upgradesConfig[id].type === 'click') gameData.clickPower += upgradesConfig[id].basePower;
        else gameData.autoClick += upgradesConfig[id].basePower;
        if(sndBuy) { sndBuy.volume = 0.5; sndBuy.currentTime = 0; sndBuy.play().catch(()=>{}); }
        saveGame();
        updateUI();
    }
};

function triggerEffects(amount, isAuto, x = null, y = null) {
    if(snd) {
        snd.volume = isAuto ? 0.1 : 1.0;
        snd.currentTime = 0;
        snd.play().catch(()=>{});
    }
    target.style.transform = "scale(0.85)";
    setTimeout(() => target.style.transform = "", 50);
    const el = document.createElement('div');
    el.className = 'pop-text';
    el.innerText = '+' + amount;
    if (x === null) {
        const r = target.getBoundingClientRect();
        x = r.left + r.width / 2 + (Math.random()-0.5)*100;
        y = r.top + r.height / 2 + (Math.random()-0.5)*50;
    }
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    if(isAuto) el.style.color = "#00ff88";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
}

target.addEventListener('mousedown', (e) => {
    gameData.points += gameData.clickPower;
    saveGame();
    updateUI();
    triggerEffects(gameData.clickPower, false, e.clientX, e.clientY);
});

setInterval(() => {
    if (gameData.autoClick > 0) {
        const gain = gameData.autoClick * 5;
        gameData.points += gain;
        saveGame();
        updateUI();
        triggerEffects(gain, true);
    }
}, 5000);

updateUI();