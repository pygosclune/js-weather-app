document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-bar');

    form.onsubmit = async function(event) {
        event.preventDefault();
        const input = document.querySelector('.search').value;
        await displayWeather(input);
    };
});

async function getWeatherData(input) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2687ead3672a4610a94234943231411&q=${input}`, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
    } catch {
        console.error("Something gone wrong");
    }
}

async function displayWeather(input) {
    let weatherData = await getWeatherData(input);
    console.log(weatherData);
    const weatherBox = document.querySelector('.weather-box');

    const cityP = document.createElement('p');
    cityP.innerHTML = weatherData.location.name;
    const temperature = document.createElement('p');
    temperature.innerHTML = `Celsius: ${weatherData.current.temp_c}\nFahrenheit: ${weatherData.current.temp_f}`
    weatherBox.appendChild(temperature);
    weatherBox.appendChild(cityP);
    weatherBox.classList.add('visible');
}