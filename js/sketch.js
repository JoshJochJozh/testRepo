var myFirstVariable = 20;
var seconVariable = 35;
var myName = "Josh";
var numbers = [12, 214, 523, 645, 86]
var myObject = {name:'Josh', lastName:'Zhao'}


var circleSize = colorX

// function preload() {

// }


function my1st (x1, x2, x3) {
	var x4 = x1*x2*x3;
	return x4;

}



function setup() {
	createCanvas(600,600);

	for ( var i=0; i <100; i++) {
		print(i);
	}


}


function draw() {
	var circleSize = random (60);
	fill(random(255),random(255), random(255));
	strokeWeight(0);
	ellipse(random(600), random(600), circleSize, circleSize);


	if(mouseIsPressed) {
		background(255);
	} else {

	}

}