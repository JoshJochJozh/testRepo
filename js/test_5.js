var citibikeData;

var apiKey  = 'eaf69ef47b772f01998d2ccb237bb48f';

var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units   = 'metric';

var weatherData;

var temperature = 0;
var humidity = 0;
var cloud =0;

var button;

var dimensionX = 50;






function setup() {

	createCanvas(800,800);

	button = select('#submit');
	city = select('#city');

	button.mousePressed(queryAPI);



}



function queryAPI() {
	var query = baseURL + city.value() + '&apiKey=' + apiKey + '&units=' + units;
	loadJSON(query,getWeatherData);

}




function getWeatherData(apiData) {
	weatherData = apiData;
	temperature = weatherData.main.temp;
	humidity = weatherData.main.humidity;
	cityName = city.value();
	weatherType = weatherData.weather[0].description;
	cloud = weatherData.clouds.all;

}




function drawCubes(tempCloud) {

	colorMode(HSB, 100);

	for (var i = 0; i < dimensionX; i++) {

          noStroke();

          var hue = i;
          var saturation = 100 - tempCloud;


          fill(hue,saturation,100);

          var cubeX = 500-i * 10;


		  rect(cubeX, 200, 10,10);

	}
}




function draw() {

	background(255);
	//drawCubes(cloud);

	fill(0);
	noStroke();


	if(weatherData) {
		var r = temperature*10;
		var weatherColor = 50 - temperature*2 ;

		var locationX = temperature*15+100;

		//var colorCloud = 100-cloud;

		//colorMode(HSB, 100);



		//fill(100,colorCloud,100);
		//ellipse(200,200, r, r);

		drawCubes(cloud);


		fill(0);
		textAlign(CENTER);
		textSize(12);
		text(temperature +' C',locationX,240);


		fill(0);
		textAlign(CENTER);
		textSize(22);
		text(cityName , locationX, 180);

		fill(0);
		textSize(12);
		text(weatherType, locationX, 260);
		//text(cloud, locationX, 420);


		stroke(0);

		line(locationX,190,locationX, 220);
	}

}

