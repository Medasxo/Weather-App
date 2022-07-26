import './style.css';
class weatherInfo{
    constructor(name, temperatures){
        this.name = name;
        this.temperatures = temperatures;
    }
}
async function getLocationInformation(location) {
    let locationName;
    let listOfTemperatures = [];
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&APPID=6d59b255cd4521630de93aa232d082f9&units=metric', {mode: 'cors'}, {method: 'GET'})
    if(!response.ok){
        throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    locationName = data.city.name;
    listOfTemperatures = data.list;
    let weatherObject = new weatherInfo(locationName, listOfTemperatures);
    return weatherObject;
}

async function displayInformation (location){
    let weatherObject = await getLocationInformation(location);
    let locationName = document.querySelector(".locationName");
    locationName.textContent = weatherObject.name;
    console.log(weatherObject);
}
displayInformation("Vilnius");
   