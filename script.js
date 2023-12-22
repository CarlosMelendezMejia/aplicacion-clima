let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = `6cc84b04c0216537c5e9f432dd2a0af6`;

document.getElementById("buttonQuery").addEventListener("click", () => {
    const city = document.getElementById("city").value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    fetch(`${baseURL}?q=${city}&appid=${api_key}`)
        .then(res => res.json())
        .then(res => showWeatherData(res));
}

function showWeatherData(data) {
    if (data.cod == 200) {
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = "Temperatura: " + kelvinToCelsius(data.main.temp) + "°C";
        document.getElementById("humidity").innerText = "Humedad: " + data.main.humidity + "%";
        document.getElementById("weatherDescription").innerText = data.weather[0].description;

        document.getElementById("container-result").classList.remove("cold-strong", "mild-strong", "hot-strong");
        document.getElementById("cityName").classList.remove("cold-softer", "mild-softer", "hot-softer");
        document.getElementById("temperature").classList.remove("cold-softer", "mild-softer", "hot-softer");
        document.getElementById("humidity").classList.remove("cold-softer", "mild-softer", "hot-softer");
        document.getElementById("weatherDescription").classList.remove("cold-softer", "mild-softer", "hot-softer");

        let temperature = kelvinToCelsius(data.main.temp);
        if (temperature <= 10) {
            document.getElementById("container-result").classList.add("cold-strong");
            document.getElementById("cityName").classList.add("cold-softer");
            document.getElementById("temperature").classList.add("cold-softer");
            document.getElementById("humidity").classList.add("cold-softer");
            document.getElementById("weatherDescription").classList.add("cold-softer");
        } else if (temperature > 10 && temperature <= 20) {
            document.getElementById("container-result").classList.add("mild-strong");
            document.getElementById("cityName").classList.add("mild-softer");
            document.getElementById("temperature").classList.add("mild-softer");
            document.getElementById("humidity").classList.add("mild-softer");
            document.getElementById("weatherDescription").classList.add("mild-softer");
        } else {
            document.getElementById("container-result").classList.add("hot-strong");
            document.getElementById("cityName").classList.add("hot-softer");
            document.getElementById("temperature").classList.add("hot-softer");
            document.getElementById("humidity").classList.add("hot-softer");
            document.getElementById("weatherDescription").classList.add("hot-softer");
        }
    } else {
        alert("Ingresa una ciudad valida");
    }

}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

