var dimensionX = 40;
var dimensionY = 20;

function setup() {
	createCanvas(800,400);

}


function drawCubes(xPos, yPos) {

	background(255);

	colorMode(HSB, 100);

	for (var i = 0; i < dimensionX; i++) {
		for (var j = 0; j < dimensionY;j++) {

          noStroke();

          var hue = i*2.5;
          var saturation = j*5;

          fill(hue,saturation,100);

          var cubeX = i * 20 +5;
          var cubeY = j * 20 +5;

          var x2 = xPos;
          var y2 = yPos;

          var d = int(dist(cubeX, cubeY, x2, y2));

		  ellipse(cubeX, cubeY, d/20,d/20);


		}

	}
}



function draw() {
	drawCubes(mouseX,mouseY);

}
