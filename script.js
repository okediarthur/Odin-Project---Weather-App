const WEATHER_API_KEY = '__WEATHER_API_KEY__'; // Placeholder to be replaced in CI/CD

async function fetchWeatherData() {
    const location = document.getElementById('location').value;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`;

    showLoading();

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
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