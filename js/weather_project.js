document.getElementById('searchButton').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const loading = document.getElementById('loading');
    const weatherDisplay = document.getElementById('weatherDisplay');

    // Check if the city input is empty
    if (city.trim() === '') {
        weatherDisplay.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const apiKey = '5fa58ecdd7c3f65fb76cb46f22e0617f'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Show loading message
        loading.style.display = 'block';
        weatherDisplay.innerHTML = ''; // Clear previous weather data

        // Fetch the weather data
        const response = await fetch(url);

        // Check if the response is not ok (e.g., city not found)
        if (!response.ok) {
            throw new Error('City not found');
        }

        // Parse the response JSON
        const data = await response.json();
        
        // Display the weather data
        displayWeather(data);
    } catch (error) {
        // Display error message
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    } finally {
        // Hide loading message after fetching completes (whether successful or not)
        loading.style.display = 'none';
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherDisplay.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <img src="${icon}" alt="${description}">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${description}</p>
    `;
}
