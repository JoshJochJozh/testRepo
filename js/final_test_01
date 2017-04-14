



var nervousBall = [];
var blackWhole;









function setup () {
  createCanvas(1600,800);

  for (var i = 0; i < 50; i++) {
    nervousBall.push(new Jitter());
  }

  blackWhole = createVector(width/2, height/2);
}




function Jitter() {

  //**** Properties

  this.position = createVector(random(width/2-200,width/2+200), random(height/2-200,height/2+200));


  this.diameter = random(0,60);

  this.r = random(20,80);
  this.g = random(50,100);
  this.b = random(50,100);

  this.speed = random(0,4);


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

    if(distance >= 400) {
      this.velocityX = -this.velocityX;
      this.velocityY = -this.velocityY;
    }

    if(distance < 100) {
      this.panic = true;
    }

    if(distance > 100) {
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
  ellipse(blackWhole.x, blackWhole.y, 200, 200);


  for (var i = 0; i < 50; i++) {
    

    nervousBall[i].display();
    nervousBall[i].update();

    nervousBall[i].move();

    nervousBall[i].calculateDistance();



  }


}

