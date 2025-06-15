// Fetch weather data
async function fetchWeather(location) {
    const apiKey = "094b545dde613af5667ba10639a224f8"; // Use your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Failed to fetch weather data");
    }
}

// Display the weather data
function displayWeather(data) {
    // Select DOM elements
    document.getElementById("city-name").textContent = data.name + ", " + data.sys.country;
    document.getElementById("date").textContent = moment().format("dddd, MMMM Do YYYY");
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").textContent = `Condition: ${data.weather[0].main}`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weather-display").style.display = "block";
}

// Toggle element visibility
function toggleElementVisibility(id, show) {
    const element = document.getElementById(id);
    element.style.display = show ? "block" : "none";
}

// Event listener when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const locationInput = document.getElementById("location-input");

    searchButton.addEventListener("click", async () => {
        const location = locationInput.value.trim();
        if (!location) {
            alert("Please enter a city name.");
            return;
        }

        toggleElementVisibility("loading", true);
        toggleElementVisibility("error", false);
        toggleElementVisibility("weather-display", false);

        try {
            const weatherData = await fetchWeather(location);
            toggleElementVisibility("loading", false);
            displayWeather(weatherData);
        } catch (error) {
            toggleElementVisibility("loading", false);
            toggleElementVisibility("error", true);
        }
    });
});
