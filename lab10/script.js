// fallback
const NSK_LAT = 54.846539;
const NSK_LON = 83.058035;
const API_BASE = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 7;



function getWeatherInfo(code) {
    const weatherMap = {
        0: { desc: "Ясно", icon: "☀️" },
        1: { desc: "Преимущественно ясно", icon: "🌤️" },
        2: { desc: "Переменная облачность", icon: "⛅" },
        3: { desc: "Пасмурно", icon: "☁️" },
        45: { desc: "Туман", icon: "🌫️" },
        48: { desc: "Туман с изморозью", icon: "🌫️❄️" },
        51: { desc: "Морось слабая", icon: "🌦️" },
        53: { desc: "Морось умеренная", icon: "🌧️" },
        55: { desc: "Морось густая", icon: "🌧️💧" },
        56: { desc: "Ледяная морось", icon: "❄️🌧️" },
        57: { desc: "Ледяная морось сильная", icon: "❄️🌧️" },
        61: { desc: "Небольшой дождь", icon: "🌦️" },
        63: { desc: "Дождь", icon: "🌧️" },
        65: { desc: "Сильный дождь", icon: "🌧️💦" },
        66: { desc: "Ледяной дождь", icon: "❄️🧊" },
        67: { desc: "Сильный ледяной дождь", icon: "❄️🧊" },
        71: { desc: "Небольшой снег", icon: "🌨️" },
        73: { desc: "Снег", icon: "❄️🌨️" },
        75: { desc: "Сильный снегопад", icon: "❄️❄️" },
        77: { desc: "Снежные зерна", icon: "❄️" },
        80: { desc: "Ливень", icon: "☔" },
        81: { desc: "Сильный ливень", icon: "☔💧" },
        82: { desc: "Очень сильный ливень", icon: "⛈️💧" },
        85: { desc: "Снегопад", icon: "❄️🌨️" },
        86: { desc: "Сильный снегопад", icon: "❄️❄️" },
        95: { desc: "Гроза", icon: "⛈️" },
        96: { desc: "Гроза с градом", icon: "⛈️🌨️" },
        99: { desc: "Сильная гроза с градом", icon: "⛈️🧊" }
    };
    if (weatherMap[code]) return weatherMap[code];
    if (code >= 200 && code <= 202) return { desc: "Гроза", icon: "⛈️" };
    return { desc: "Разное", icon: "🌡️" };
}

function getWeekday(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { weekday: 'short' }).replace('.', '').toUpperCase();
}

function getFormattedDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

/** отправляет запрос с итоговыми к-тами, получает json на n дней*/ 
async function fetchForecast(lat, lon) {
    const url = `${API_BASE}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,precipitation_sum&timezone=auto&forecast_days=${FORECAST_DAYS}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
        throw new Error("Нет данных о погоде");
    }
    return data;
}

function renderForecastCards(dailyData) {
    const container = document.getElementById('carouselItems');
    if (!container) return;
    container.innerHTML = '';

    const times = dailyData.time;
    const tempMaxArr = dailyData.temperature_2m_max;
    const tempMinArr = dailyData.temperature_2m_min;
    const weatherCodes = dailyData.weathercode;
    const windSpeeds = dailyData.windspeed_10m_max;
    const precipitations = dailyData.precipitation_sum;

    for (let i = 0; i < times.length; i++) {
        const dateStr = times[i];
        const weekday = getWeekday(dateStr);
        const formattedDate = getFormattedDate(dateStr);
        const tempMax = Math.round(tempMaxArr[i]);
        const tempMin = Math.round(tempMinArr[i]);
        const weatherCode = weatherCodes[i];
        const windSpeed = Math.round(windSpeeds[i]);
        const precip = precipitations[i] ? precipitations[i].toFixed(1) : '0.0';
        const weatherInfo = getWeatherInfo(weatherCode);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="weekday">${weekday}</div>
            <div class="date">${formattedDate}</div>
            <div class="weather-icon">${weatherInfo.icon}</div>
            <div class="temp-range">
                <span class="temp-max">${tempMax}°</span> / 
                <span class="temp-min">${tempMin}°</span>
            </div>
            <div class="weather-desc">${weatherInfo.desc}</div>
            <div class="extra-info">
                <div class="wind">💨 ${windSpeed} км/ч</div>
                <div class="precip">💧 ${precip} мм</div>
            </div>
        `;
        container.appendChild(card);
    }
}

/** добавляет текст в зависимости от используемых к-т (гео/хардкод)*/ 
function updateLocationLabel(isFallback) {
    const labelSpan = document.getElementById('locationLabel');
    if (!labelSpan) return;
    if (isFallback) {
        labelSpan.innerHTML = `Новосибирск (по умолчанию)`;
    } else {
        labelSpan.innerHTML = `Местоположение`;
    }
}

function setupCarouselScroll() {
    const viewport = document.getElementById('carouselViewport');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const itemsContainer = document.getElementById('carouselItems');

    if (!viewport || !prevBtn || !nextBtn) return;

    function getCardScrollStep() {
        if (!itemsContainer) return 220;
        const cards = itemsContainer.querySelectorAll('.forecast-card');
        if (cards.length === 0) return 220;
        const cardRect = cards[0].getBoundingClientRect();
        const containerStyle = getComputedStyle(itemsContainer);
        const gap = parseFloat(containerStyle.gap) || 16;
        return cardRect.width + gap;
    }

    function scrollLeft() {
        const step = getCardScrollStep();
        const newScroll = Math.max(0, viewport.scrollLeft - step);
        viewport.scrollTo({ left: newScroll, behavior: 'smooth' });
    }

    function scrollRight() {
        const step = getCardScrollStep();
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        const newScroll = Math.min(maxScroll, viewport.scrollLeft + step);
        viewport.scrollTo({ left: newScroll, behavior: 'smooth' });
    }

    // Заменяем кнопки, чтобы сбросить старые обработчики
    const newPrev = prevBtn.cloneNode(true);
    const newNext = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrev, prevBtn);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);

    const finalPrev = document.getElementById('prevBtn');
    const finalNext = document.getElementById('nextBtn');
    if (finalPrev) finalPrev.addEventListener('click', scrollLeft);
    if (finalNext) finalNext.addEventListener('click', scrollRight);
}





 /** точка входа*/ 
async function initWeather() {
    const itemsContainer = document.getElementById('carouselItems');
    const subMsgDiv = document.getElementById('subMessage');

    if (itemsContainer) {
        itemsContainer.innerHTML = '<div class="loader"> Запрос геопозиции и погоды...</div>';
    }

    let lat, lon;

    const getPosition = () => new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Геолокация не поддерживается браузером"));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
            (error) => {
                let errorMsg = "Ошибка геолокации";
                if (error.code === error.PERMISSION_DENIED) errorMsg = "Пользователь запретил доступ";
                reject(new Error(errorMsg));
            },
            { timeout: 8000, enableHighAccuracy: false }
        );
    });

    try {
        const coords = await getPosition();
        lat = coords.lat;
        lon = coords.lon;
        updateLocationLabel(false);
        if (subMsgDiv) subMsgDiv.innerText = ` Погода • прогноз на 7 дней`;
    } catch (geoError) {
        console.warn(geoError.message);
        lat = NSK_LAT;
        lon = NSK_LON;
        updateLocationLabel(true);
        if (subMsgDiv) subMsgDiv.innerText = ` Новосибирск (геолокация не предоставлена) • прогноз на 7 дней`;
    }

    if (itemsContainer) {
        itemsContainer.innerHTML = '<div class="loader"> Загрузка прогноза из Open-Meteo...</div>';
    }

    try {
        const forecastData = await fetchForecast(lat, lon);
        renderForecastCards(forecastData.daily);
        setupCarouselScroll();
    } catch (err) {
        console.error(err);
        if (itemsContainer) {
            itemsContainer.innerHTML = `<div class="error-msg"> Ошибка: ${err.message}. Попробуйте позже.</div>`;
        }
        if (subMsgDiv) subMsgDiv.innerText = ` Не удалось загрузить прогноз`;
    }
}


 /** точка входа*/ 
document.addEventListener('DOMContentLoaded', () => {
    initWeather();
});