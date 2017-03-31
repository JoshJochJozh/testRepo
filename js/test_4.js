var citibikeData;

var apiKey  = 'eaf69ef47b772f01998d2ccb237bb48f';

var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'houston';
var units   = 'metric';

var weatherData;

var temperature = 0;
var humidity = 0;

var button;



// ***** Setup function ***** //
function setup(){
    createCanvas(800, 800);
    var request = baseURL + city + '&units=' + units + '&apikey=' + apiKey;
    loadJSON(request, getWeatherData);
}

function getWeatherData(apiData){
  weatherData = apiData;
  console.log(weatherData);
}

// ***** Draw function ***** //
function draw(){
    background(255);
    if (weatherData) {
      text(weatherData.clouds.all, 20, 20);
    }
    else{
      text('Loading...', 20, 20);
    }
}