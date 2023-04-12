const canvasWidth = 600;
const canvasHeight = 600;
const gridW = 40;
const cols = Math.floor(canvasWidth / gridW);
const rows = Math.floor(canvasHeight / gridW);

var grid = new Array(cols);
var current; // current cell

function displayGrid(grid, gridW) {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(gridW);
    }
  }
}

function setup() {
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // add cell to each grid space
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // make first cell the current cell
  current = grid[0][0];
}

function draw() {
  createCanvas(canvasWidth, canvasHeight);
  background(51);
  displayGrid(grid, gridW);
  current.visited = true;
  current.highlight(gridW);
}
