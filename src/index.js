import "./style.css";
import Sun from "./sun.png";
import Snowflake from "./snowflake.png";
import Clouds from "./clouds-and-sun.png";
import Rain from "./rainy.png";
import Wind from "./windIcon.png";

let units = "metric";

class weatherInfo {
  constructor(name, temperatures) {
    this.name = name;
    this.temperatures = temperatures;
  }
}
async function getLocationInformation(location) {
  let locationName;
  let listOfTemperatures = [];
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      location +
      "&APPID=6d59b255cd4521630de93aa232d082f9&units=" +
      units,
    { mode: "cors" },
    { method: "GET" }
  );
  if (!response.ok) {
    const errorTab = document.querySelector(".errorTab");
    errorTab.textContent =
      "There isn't any location that would match your input";
    return 0;
  }
  const errorTab = document.querySelector(".errorTab");
  errorTab.textContent = "";
  const data = await response.json();
  locationName = data.city.name;
  listOfTemperatures = data.list;
  let weatherObject = new weatherInfo(locationName, listOfTemperatures);
  return weatherObject;
}

async function displayInformation(location) {
  let weatherObject = await getLocationInformation(location);
  if (weatherObject !== 0) {
    let deletePrevious = document.querySelector(".temperatureDisplayNow");
    if (deletePrevious !== null) {
      deletePrevious.remove();
    }
    const locationName = document.querySelector(".locationName");
    locationName.textContent = weatherObject.name;

    const temperatureNow = document.querySelector(".temperatureNow");
    const temperatureDisplay = document.createElement("div");
    temperatureDisplay.className = "temperatureDisplayNow";
    temperatureDisplay.textContent =
      Math.trunc(weatherObject.temperatures[0].main.temp) + checkUnitsWeather(units);
    const temperatureIcon = new Image();
    temperatureIcon.src = checkWeather(
      weatherObject.temperatures[0].weather[0].main
    );
    
    const windSpeed = document.createElement("div");
    windSpeed.className = "windSpeed";
    windSpeed.textContent = weatherObject.temperatures[0].wind.speed + checkUnitsWind(units);
    const windIcon = new Image();
    windIcon.src = Wind;

    windSpeed.appendChild(windIcon);
    temperatureDisplay.appendChild(temperatureIcon);
    temperatureNow.appendChild(temperatureDisplay);
    temperatureNow.appendChild(windSpeed);
    console.log(weatherObject);
  }
}

const searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    console.log(searchBar.value);
    displayInformation(searchBar.value);
  }
});

function checkWeather(weather) {
  if (weather === "Clouds") {
    return Clouds;
  } else if (weather === "Rain") {
    return Rain;
  } else if (weather === "Snow") {
    return Snowflake;
  } else {
    return Sun;
  }
}

function checkUnitsWeather(units) {
  if (units === "imperial") {
    return "°F";
  } else {
    return "°C";
  }
}

function checkUnitsWind(units){
  if(units === "imperial"){
    return " mph";
  }
  else{
    return " km/h";
  }
}

displayInformation("vilnius");
