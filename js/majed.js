// ***** Global variables ***** //
var weatherData;
var apiKey = '176d293c90dad47eec4535f35ec1a4fb';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var units = 'imperial';
var selectedCity= ['Chicago','New York','Bogota','Paris','Catania','Beirut','Damascus','Tokyo','Sydney'];
var j=0;
var selectedButton=0;
var temperature=0;
var city;




// ***** Setup function ***** //
//function setup(){
//  createCanvas(800, 800);

 // drawButtons(queryAPI);
  
//}


function setup() {

  createCanvas(800,800);
  //city = selectedCity[j];



}






function queryAPI() {
  var query = baseURL + city+ '&apiKey=' + apiKey + '&units=' + units;
  loadJSON(query,getWeatherData);

}


function getWeatherData(apiData){
  weatherData = apiData;
  
  temperature = weatherData.main.temp;

}


function drawButtons(){
    
    for (var i = 0; i < selectedCity.length; i++) {
        if (selectedButton== i) {
            fill(0,138,138);
            city = selectedCity[j];
            
        }
        else {

            fill(235)

        }
        stroke(0);
        strokeWeight(1);
        ellipse(75 + 80* i, 60, 50, 50)
        fill(50);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(18);
        text(selectedCity[i], 75+80*i, 100);
        }
      }
    }
  }
}

}

function mousePressed(){
  if (mouseX > 130 && mouseX < 180 && mouseY > 25 && mouseY < 80){
    selectedButton = 1; j=1; 

  }
  if (mouseX > 208 && mouseX < 260 && mouseY > 25 && mouseY < 80){
    selectedButton = 2;j=2; 

  if (mouseX > 290 && mouseX < 340 && mouseY > 25 && mouseY < 80){
    selectedButton = 3;j=3;
  }
  if (mouseX > 370 && mouseX < 420 && mouseY > 25 && mouseY < 80){
    selectedButton = 4;j=4;
  }
  if (mouseX > 450 && mouseX < 500 && mouseY > 25 && mouseY < 80){
    selectedButton = 5;j=5;
  }
  if (mouseX > 530 && mouseX < 580 && mouseY > 25 && mouseY < 80){
    selectedButton = 6;j=6;
  }
  if (mouseX > 600 && mouseX < 660 && mouseY > 25 && mouseY < 80){
    selectedButton = 7;j=7;
  }
  if (mouseX > 690 && mouseX < 740 && mouseY > 25 && mouseY < 80){
    selectedButton = 8;j=8;
  }
}





function draw() {
    background(255);
    textSize(18);
    drawButtons();

    if (weatherData) {
      text('The current temperature in '+ selectedCity[j] + ' is ' + temperature, 200, 200);
    }
    else {
      text('Failed to load ;(', 200, 200);

    }
}