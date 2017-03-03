// ***** Global variables ***** //
var refugeeTable;
var maxLength =1600;
var maxValue = 0;




// ***** Preload function ***** //
function preload(){
  refugeeTable = loadTable('../data/RefugeesUNHCR_2.csv', 'csv', 'header');
  console.log('Done loading table...');
}

// ***** Setup function ***** //

function setup() {
  createCanvas(1600,4200);
  textAlign(LEFT, TOP);
  print(refugeeTable.getRowCount());
  print(refugeeTable.getColumnCount());

  for (var i =0; i<refugeeTable.getRowCount(); i++) {
  maxValue = max(maxValue, refugeeTable.getNum(i,'Refugees'));
}

  print(maxValue);

}

// ***** Draw function ***** //
function draw() {
  background(255);
  noStroke();
  fill(0);
  for (var i=0; i<refugeeTable.getRowCount(); i++) {

    var rectLength = map(refugeeTable.getNum(i,'Refugees'), 0, maxValue, 0, maxLength);
    rect(150,50 +20*i, rectLength, 15);
    text(refugeeTable.getString(i, 'Country'), 10, 50+20*i);
  }
}