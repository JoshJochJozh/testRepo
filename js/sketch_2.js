// ***** Global variables ***** //
var refugeeTable;
var maxLength =1600;
var maxValue = 0;



function preload() {
  refugeeTable = loadTable('../data/RefugeesUNHCR.csv','csv', 'header');

}


// ***** Setup function ***** //
function setup() {
  createCanvas(1600,1800);
  textAlign(RIGHT, TOP);
  print(refugeeTable.getRowCount());
  print(refugeeTable.getColumnCount());

  for (var i =0; i<refugeeTable.getRowCount(); i++) {
  maxValue = max(maxValue, refugeeTable.getNum(i,'Total'));
}

  print(maxValue);

}

// ***** Draw function ***** //
function draw() {
  background(0);
  noStroke();
  fill(255);
  for (var i=0; i<refugeeTable.getRowCount(); i++) {

    var rectLength = map(refugeeTable.getNum(i,'Total'), 0, maxValue, 0, maxLength);
    rect(100,50 +20*i, rectLength, 15);
  }

}