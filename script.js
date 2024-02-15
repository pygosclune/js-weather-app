document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-bar');

    form.onsubmit = async function(event) {
        event.preventDefault();
        const input = document.querySelector('.search').value;
        await displayWeather(input);
    };

    displayWeather('Warsaw');
});

async function getWeatherData(input) {
    const errorText = document.getElementById("error-text");
    errorText.style.visibility = "hidden";
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2687ead3672a4610a94234943231411&q=${input}`, {mode: 'cors'});

        if (!response.ok) {
            throw new Error('Bad response from server');
        }
        const weatherData = await response.json();
        return weatherData;
    } catch {
        errorText.style.visibility = "visible";
    }
}

async function displayWeather(input) {
    try {
        const weatherData = await getWeatherData(input);

        const weatherImage = document.getElementById("weather-image");
        weatherImage.src = weatherData.current.condition.icon.replace("64x64", "128x128");

        const location = document.getElementById("location");
        location.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;

        const temperature = document.getElementById("temperature");
        temperature.textContent = `${weatherData.current.temp_c} C / ${weatherData.current.temp_f} F`;

        const weatherText = document.getElementById("weather-text");
        weatherText.textContent = weatherData.current.condition.text;
    } catch {
        const errorText = document.getElementById("error-text");
        errorText.style.visibility = "visible";
    }
}