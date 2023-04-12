const canvasWidth = 400;
const canvasHeight = 400;
const gridW = 20;
const cols = Math.floor(canvasWidth / gridW);
const rows = Math.floor(canvasHeight / gridW);

var grid = new Array(cols);
var current; // current cell
var wallList = [];

// remove element from array
function removeFromArray(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elem) {
      arr.splice(i, 1);
    }
  }
}

function displayGrid(grid, gridW) {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(gridW);
    }
  }
}

function setup() {
  //   frameRate(5);

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
  current = grid[1][1];
  current.wall = false;
  current.addWalls(wallList);
  current.visited = true;
}

function draw() {
  createCanvas(canvasWidth, canvasHeight);
  background(51);
  displayGrid(grid, gridW);

  if (wallList.length > 0) {
    var r = floor(random(0, wallList.length));
    var nextWall = wallList[r];
    if (nextWall.checkNeighbors(grid)) {
      nextWall.addWalls(wallList);
      nextWall.visited = true;
      nextWall.wall = false;
      nextWall.highlight(gridW);
    }
    removeFromArray(wallList, nextWall);
  } else {
    console.log("Created maze!");
    noLoop();
  }
}
