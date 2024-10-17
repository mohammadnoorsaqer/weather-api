const key = 'd13aebb0f29e44cebbd63306240110';
const urlBase = 'http://api.weatherapi.com/v1/current.json?key=' + key + '&q=';

async function fetchWeather(city) {
    const url = urlBase + city + '&aqi=no';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather').innerText = 'Failed to fetch weather data: ' + error;
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.classList.add('weather')
    const temp = data.current.temp_c;
    const description = data.current.condition.text;
    const  Continent=data.location.tz_id
    const icon=data.current.condition.icon
        const iconImage = `<img src="${icon}" alt="${description} icon">`
    weatherDiv.innerHTML = `<h2>Weather in ${data.location.name}</h2>
                            <p>Temperature: ${temp} °C</p>
                            <p>Description: ${description}</p>
                            <p>Continent ${Continent}
                            <p>${iconImage}</p>
                            `;
}

document.getElementById('fetchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    
    fetchWeather(city);
});
document.getElementById('cityInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = event.target.value;
        fetchWeather(city);
    }
});
document.getElementById('fetchButton').addEventListener('click', () => {
    const city = prompt("Please enter a city name:");
    
    if (city) {
        alert(`You entered: ${city}`);
        fetchWeather(city);
    } else {
        alert("No city entered.");
    }
});