// ***** Global variables ***** //
var refugeeTable;
var topRefugeesTable = new p5.Table;
var maxTotal = 0;
var maxLabel = 0;
var maxLength = 550;

var headers = ['Country','Refugees','Asylum-seekers','Returned refugees','IDPs','Returned IDPs','Stateless','Others of concern','Total']



// ***** Preload function ***** //
function preload(){
    refugeeTable = loadTable('../data/RefugeesUNHCR_2.csv', 'csv', 'header');
    console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
    createCanvas(1600, 800);
    textSize(12);
    console.log('Setup complete...');
    print(refugeeTable.getRowCount() + ' rows loaded...');
    print(refugeeTable.getColumnCount() + ' columns loaded...');
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        maxTotal = max(refugeeTable.getNum(i, 'Total'), maxTotal);
        maxLabel = max(refugeeTable.getString(i, 'Country').length, maxLabel);
    }
    print('Maximum total is ' + maxTotal);
    print('Maximum label length is ' + maxLabel);
    createNewTable();

    text('REFUGEES RANKINGS', 800,20)
}

// ****** Create new table function ******** //
function createNewTable(){
  for (var i=0; i< headers.length; i++) {
    topRefugeesTable.addColumn(headers[i]);

  }

    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        var totalRefugees = refugeeTable.getNum(i, 'Total');
        if (totalRefugees >= 100000) {
            var newRow = topRefugeesTable.addRow()
            for (var j =0; j < headers.length;j++) {
              newRow.setString(headers[j], refugeeTable.getString(i, headers[j]));
            }
        }
    }
  
    print('New top refugee table created...');
    print(topRefugeesTable);
}

function drawCountries(category){
    fill(183, 28, 28);
    noStroke();
    textAlign(LEFT, BOTTOM);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        var total = topRefugeesTable.getNum(i, category);
        var length = map(total, 0, maxTotal, 0, maxLength);

        fill(183, 28, 28, length/maxLength*230+25);


        rect( 160 + 25*i , maxLabel * 5, 12, length);
        text(nfc(total, 0), 160+25*i, maxLabel * 5 + length + 15);
        text(topRefugeesTable.getString(i, 'Country'),160+25*i, maxLabel * 5 + length + 25);
    }
    textAlign(RIGHT, BOTTOM);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        //text(topRefugeesTable.getString(i, 'Country'),25*i, maxLabel * 5 + length + 25);
    }
}

// ***** Draw function ***** //
function draw(){
    background(255);
    // drawCountries(refugeeTable);
    drawCountries('Total');
}