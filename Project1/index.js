const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=f226927460ec436aa02268c4a75d99bf&units=metric&`;

const searchBox = document.querySelector(".search input");
const serachBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const myInput = document.querySelector("#myInput");

async function checkWeather(cityName) {
  const response = await fetch(apiUrl + `q=${cityName}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".card").style.background =
      "linear-gradient(135deg, #634242, #f80e50)";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".card").style.background =
      "linear-gradient(135deg, #03a1d1, #02ff4e)";
  }
}

serachBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

myInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && searchBox.value != "") {
    checkWeather(searchBox.value);
  }
});
