const apiKey = "2e0c495d4dbbd42cd9390c1f6253e4d3";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");


const weatherCard = document.getElementById("weatherCard");
const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherDescription = document.getElementById("weatherDescription");
const weatherIcon = document.getElementById("weatherIcon");

// Fetch weather by city
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") {
    showMessage("Please enter a city name!");
    return;
  }
  fetchWeatherByCity(city);
});



// Fetch weather using city name
function fetchWeatherByCity(city) {
  showMessage("Loading...");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => updateUI(data))
    .catch((err) => showMessage(err.message));
}




// Update UI with weather data
function updateUI(data) {
  message.textContent = "";
  weatherCard.classList.remove("hidden");

  cityName.textContent = data.name;
  countryName.textContent = data.sys.country;
  temperature.textContent = Math.round(data.main.temp);
  feelsLike.textContent = `${Math.round(data.main.feels_like)} °C`;
  humidity.textContent = `${data.main.humidity} %`;
  windSpeed.textContent = `${data.wind.speed} m/s`;

  const description = data.weather[0].description;
  weatherDescription.textContent = description;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = description;
}

// Show error / status message
function showMessage(text) {
  message.textContent = text;
  weatherCard.classList.add("hidden");
}
