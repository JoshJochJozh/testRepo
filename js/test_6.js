// ***** Global variables ***** //
var weatherData;

// ***** Setup function ***** //
function setup(){
    createCanvas(800, 800);
    loadJSON('../data/Refugee_2.json', getWeatherData);
}

function getWeatherData(apiData){
  weatherData = apiData;
  console.log(weatherData);
}

// ***** Draw function ***** //
function draw(){
    background(255);
    if (weatherData) {
      text(weatherData, 20, 20);
    }
    else{
      text('Loading...', 20, 20);
    }
}