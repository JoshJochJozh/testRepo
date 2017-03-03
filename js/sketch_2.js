// ***** Global variables ***** //
var refugeeTable;

// ***** Preload function ***** //
function preload(){
  refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header');
  console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
  createCanvas(800, 800);
  textAlign(LEFT, TOP);
  textSize(12);
  console.log('Setup complete...');
  print(refugeeTable.getRowCount() + ' rows loaded...');
  print(refugeeTable.getColumnCount() + ' columns loaded...');
}

// ***** Draw function ***** //
function draw(){
  background(255);
  fill(0);
  noStroke();
  for (var i = 0; i < refugeeTable.getRowCount(); i++) {
    rect(100, 2 + 14*i, refugeeTable.getNum(i, 'Total'), 12);
  }
  for (var i = 0; i < refugeeTable.getRowCount(); i++) {
    text(refugeeTable.getString(i, 'Country'), 10, 14*i);
  }
}