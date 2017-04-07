



var nervousBall = [];
var blackWhole;









function setup () {
  createCanvas(800,800);

  for (var i = 0; i < 50; i++) {
    nervousBall.push(new Jitter());
  }

  blackWhole = createVector(400, 400);
}




function Jitter() {

  //**** Properties

  this.position = createVector(random(0,width), random(0,height));


  this.diameter = random(0,60);

  this.r = random(20,80);
  this.g = random(50,100);
  this.b = random(50,100);

  this.speed = random(0,5);


  this.velocityX = random(-4,4);
  this.velocityY = random(-4,4);


  this.panic =false;




  //***** Functions

  this.display = function() {

    if (this.panic == true) {
      fill(255,0,0);
    } else {
      fill(this.r,this.g,this.b);
    }


    colorMode(HSB,100);




    noStroke();
    ellipse(this.position.x,this.position.y, this.diameter, this.diameter);
  }

  this.update = function() {
    this.position.x = this.position.x + random(-this.speed,this.speed);
    this.position.y = this.position.y + random(-this.speed,this.speed);

  }

  this.move = function() {
    this.position.x = this.position.x + this.velocityX;
    this.position.y = this.position.y + this.velocityY;

  }


  this.calculateDistance = function() {

    var distance = this.position.dist(blackWhole);

    if(distance > 400) {
      this.velocityX = -this.velocityX;
      this.velocityY = -this.velocityY;
    }

    if(distance < 150) {
      this.panic = true;
    }

    if(distance > 150) {
      this.panic = false;
    }

  }





}




function draw() {
  background(255);


  fill(0,100,100,0.01);
  rect(0,0,width,height);

  fill(0);
  ellipse(blackWhole.x, blackWhole.y, 800, 800);

  stroke(255);
  strokeWeight(1);
  fill(255);
  ellipse(blackWhole.x, blackWhole.y, 300, 300);


  for (var i = 0; i < 50; i++) {
    

    nervousBall[i].display();
    nervousBall[i].update();

    nervousBall[i].move();

    nervousBall[i].calculateDistance();



  }


}

