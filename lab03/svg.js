let map;
let currentMarker = null;
let activeButtonIndex = 1;

// Fallback
const fallbackCoords = {
    europe:  { lat: 50.0, lon: 10.0,  name: 'Европа', btnIndex: 1 },
    asia:    { lat: 40.0, lon: 100.0, name: 'Азия',   btnIndex: 2 },
    america: { lat: 20.0, lon: -95.0, name: 'Америка', btnIndex: 3 },
    africa:  { lat: 5.0,  lon: 20.0,  name: 'Африка',  btnIndex: 4 }
};

function setActiveButton(idx) {
    const btns = document.querySelectorAll('#contacts button');
    btns.forEach((btn, i) => {
        if (i+1 === idx) btn.classList.add('active-button');
        else btn.classList.remove('active-button');
    });
    activeButtonIndex = idx;
}

function addMarker(lat, lon, name, source) {
    if (currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${name}</b><br>Координаты: ${source}`)
        .openPopup();
    map.setView([lat, lon], 3);
}

// get crds thru API , show marker
function showContinent(continentKey, apiQuery) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(apiQuery)}&format=json&limit=1`;
    fetch(url, { headers: { 'User-Agent': 'TravelWorld-App/1.0' } })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data && data[0] && data[0].lat && data[0].lon) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                addMarker(lat, lon, fallbackCoords[continentKey].name, 'OpenStreetMap API');
            } else {
                const fb = fallbackCoords[continentKey];
                addMarker(fb.lat, fb.lon, fb.name, 'Fallback');
            }
            setActiveButton(fallbackCoords[continentKey].btnIndex); // подсветка после успеха
        });
}

function initMap() {
    const container = document.getElementById('map-container');
    if (!container || map) return;
    
    map = L.map(container).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    
    
    // assign buttons to corresponding methods
    const btnEurope = document.querySelector('#contacts button:nth-of-type(1)');
    const btnAsia   = document.querySelector('#contacts button:nth-of-type(2)');
    const btnAmerica= document.querySelector('#contacts button:nth-of-type(3)');
    const btnAfrica = document.querySelector('#contacts button:nth-of-type(4)');
    
    if (btnEurope) btnEurope.addEventListener('click', () => showContinent('europe', 'Europe'));
    if (btnAsia)   btnAsia.addEventListener('click',   () => showContinent('asia', 'Asia'));
    if (btnAmerica)btnAmerica.addEventListener('click',() => showContinent('america', 'Americas'));
    if (btnAfrica) btnAfrica.addEventListener('click', () => showContinent('africa', 'Africa'));
    
    //         fallback key - URL substr
    showContinent('europe', 'Europe');
}

window.addEventListener('load', initMap);