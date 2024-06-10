document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('location').addEventListener('input', () => validationLocation());
});

function validateLocation(){
    const location = document.getElementById('location').value.trim();
    const submitError =document.getElementById('submitError');
    if(location === ''){
        submitError.classList.add('active');
        return false;
    } else {
        submitError.classList.remove('active');
        return true;
    }
}

function validateForm(){
    const isLocationValid = validateLocation();
    if(isLocationValid) {
        fetchWeatherData();
    }
}

function fetchWeatherData(){
    const location = document.getElementById('location').value;
    const apiKey = 'd1bf9ba395aa4764a92125520240606'
    const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(repsonse => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const processedData = processWeatherData(data);
            displayWeatherData(processedData);
        })
        .catch(error => displayError(error));
}

function displayWeatherData(data){
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
    <h2>${data.location}</h2>
    <p>Temperature: ${data.temperature}</p>
    <p>Weather: ${data.weather}</p>
    <p>Humidity: ${data.humidity}</p>
    <p>Wind Speed: ${data.windSpeed}</p>
    `;
}

function displayError(error){
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
}