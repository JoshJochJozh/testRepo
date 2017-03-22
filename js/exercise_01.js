var dimensionX = 50;
var dimensionY = 50;

function setup() {
	createCanvas(500,500);

}


function drawCubes() {

	colorMode(HSB, 100);

	for (var i = 0; i < dimensionX; i++) {
		for (var j = 0; j < dimensionY;j++) {

          noStroke();

          var hue = i*2;
          var saturation = j*2;

          fill(hue,saturation,100);

          var cubeX = i * 10;
          var cubeY = j * 10;

		  rect(cubeX, cubeY, 10,10);


		}

	}
}


function draw() {
	drawCubes();
}
