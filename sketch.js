const canvasWidth = 400;
const canvasHeight = 400;
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

// removes walls on cells depending on start to end traversal
function removeWalls(current, next) {
  // if curr -> next
  if (current.i - next.i == -1) {
    current.wall = false;
    next.wall = false;
  }
  // if next <- curr
  if (current.i - next.i == 1) {
    current.wall = false;
    next.wall = false;
  }
  // if curr v next
  if (current.j - next.j == -1) {
    current.wall = false;
    next.wall = false;
  }
  // if curr ^ next
  if (current.j - next.j == 1) {
    current.wall = false;
    next.wall = false;
  }
}

function setup() {
  frameRate(10);

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
  current.inMaze = true;

  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    // stack push
    // remove walls
    next.wall = false;
    current = next;
  }
}
