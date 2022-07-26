import "./style.css";
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
      "&APPID=6d59b255cd4521630de93aa232d082f9&units=metric",
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
  errorTab.textContent = '';
  const data = await response.json();
  locationName = data.city.name;
  listOfTemperatures = data.list;
  let weatherObject = new weatherInfo(locationName, listOfTemperatures);
  return weatherObject;
}

async function displayInformation(location) {
  let weatherObject = await getLocationInformation(location);
  if (weatherObject !== 0) {
    let locationName = document.querySelector(".locationName");
    locationName.textContent = weatherObject.name;
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
displayInformation("vilnius");
