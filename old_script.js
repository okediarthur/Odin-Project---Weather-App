document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('location').addEventListener('input', validateLocation);
});

function validateLocation() {
    const location = document.getElementById('location').value.trim();
    const submitError = document.getElementById('submitError');
    if (location === '') {
        submitError.classList.add('active');
        return false;
    } else {
        submitError.classList.remove('active');
        return true;
    }
}

function validateForm() {
    const isLocationValid = validateLocation();
    if (isLocationValid) {
        fetchWeatherData();
    }
}

async function fetchWeatherData() {
    const location = document.getElementById('location').value;
    const apiKey = 'd1bf9ba395aa4764a92125520240606'; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    showLoading();

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const processedData = processWeatherData(data);
        displayWeatherData(processedData);
    } catch (error) {
        console.error('Fetch error:', error);
        displayError(error);
    } finally {
        hideLoading();
    }
}

function processWeatherData(data) {
    return {
        location: `${data.location.name}, ${data.location.country}`,
        temperature: `${data.current.temp_c}°C`,
        weather: data.current.condition.text,
        humidity: `${data.current.humidity}%`,
        windSpeed: `${data.current.wind_kph} kph`
    };
}

function displayWeatherData(data) {
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.location}</h2>
        <p>Temperature: ${data.temperature}</p>
        <p>Weather: ${data.weather}</p>
        <p>Humidity: ${data.humidity}</p>
        <p>Wind Speed: ${data.windSpeed}</p>
    `;
}

function displayError(error) {
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
}

function clearForm() {
    document.getElementById('userInput').reset();
    const weatherInfo = document.querySelector('.weather-info');
    if (weatherInfo) {
        weatherInfo.innerHTML = '';
    }
    const submitError = document.getElementById('submitError');
    if (submitError) {
        submitError.classList.remove('active');
    }
}

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('active');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('active');
    }
}
