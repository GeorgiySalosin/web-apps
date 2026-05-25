let map;
let currentMarker = null; // текущий маркер
let activeButtonIndex = 1;

// Координаты центров континентов
const continents = {
    europe:  { lat: 50.0, lon: 10.0,  btnIndex: 1, name: 'Европа' },
    asia:    { lat: 40.0, lon: 100.0, btnIndex: 2, name: 'Азия' },
    america: { lat: 20.0, lon: -95.0, btnIndex: 3, name: 'Америка' },
    africa:  { lat: 5.0,  lon: 20.0,  btnIndex: 4, name: 'Африка' }
};

function setActiveButton(idx) {
    const btns = document.querySelectorAll('#contacts button');
    btns.forEach((btn, i) => {
        if (i+1 === idx) btn.classList.add('active-button');
        else btn.classList.remove('active-button');
    });
    activeButtonIndex = idx;
}

function addMarker(lat, lon, name) {
    if (currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${name}</b><br>Центр континента`)
        .openPopup();
    map.setView([lat, lon], 3);
}

function showContinent(key) {
    const c = continents[key];
    if (c) {
        addMarker(c.lat, c.lon, c.name);
        setActiveButton(c.btnIndex);
    }
}

function initMap() {
    const container = document.getElementById('map-container');
    if (!container || map) return;
    
    map = L.map(container).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Принудительное обновление размеров
    setTimeout(() => map.invalidateSize(), 100);
    
    // Кнопки
    const btn1 = document.querySelector('#contacts button:nth-of-type(1)');
    const btn2 = document.querySelector('#contacts button:nth-of-type(2)');
    const btn3 = document.querySelector('#contacts button:nth-of-type(3)');
    const btn4 = document.querySelector('#contacts button:nth-of-type(4)');
    
    if (btn1) btn1.addEventListener('click', () => showContinent('europe'));
    if (btn2) btn2.addEventListener('click', () => showContinent('asia'));
    if (btn3) btn3.addEventListener('click', () => showContinent('america'));
    if (btn4) btn4.addEventListener('click', () => showContinent('africa'));
    
    // По умолчанию показываем Европу
    showContinent('europe');
}

window.addEventListener('load', initMap);