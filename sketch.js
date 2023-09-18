const canvasWidth = 500;
const canvasHeight = 500;
const gridW = 20;
const cols = Math.floor(canvasWidth / gridW);
const rows = Math.floor(canvasHeight / gridW);
const gridSize = cols * rows;

var mazeStarted = false;
var mazeFinished = false;
var button; // button to start maze
var grid = new Array(cols);
var start; // starting cell
var end; // ending cell
var wallList = []; // list of walls to check for prim's algo
var openSet = new pQueue(gridSize); // set of nodes to check
var closedSet = new pQueue(gridSize); // set of done nodes
var initSetup = false; // set up for a_star
var path = []; // correct path

// finds and draws current path as blue
function findAndDrawCurrPath(current, path) {
  path = [];
  var temp = current;
  while (temp) {
    path.push(temp);
    temp = temp.previous;
  }

  for (var i = 0; i < path.length; i++) {
    // color blue
    path[i].show(gridW, color(0, 0, 255));
  }
}

// draws potential grid spaces green
function drawGreenSpaces(openSet) {
  for (var i = 0; i <= openSet.length(); i++) {
    openSet.elem(i).show(gridW, color(0, 255, 0));
  }
}

// draws discarded grid spaces red
function drawRedSpaces(closedSet) {
  for (var i = 0; i <= closedSet.length(); i++) {
    closedSet.elem(i).show(gridW, color(255, 0, 0));
  }
}

// heuristic function for h
function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j); // euclidean distance
  // return abs(a.i - b.i) + abs(a.j - b.j); // manhattan distance
}

// evaluates the cost of neighbors around current spot
function checkNeighbors(current, openSet, end) {
  for (var i = 0; i < current.neighbors.length; i++) {
    var neighbor = current.neighbors[i];

    if (!closedSet.contains(neighbor) && !neighbor.wall) {
      var tempG = current.g + 1;

      var newPath = false;
      if (openSet.contains(neighbor)) {
        // node already checked before, see if its g is worse than current path
        if (tempG < neighbor.g) {
          neighbor.g = tempG;
          newPath = true;
        }
      } else {
        // new node discovered
        neighbor.g = tempG;
        newPath = true;
      }

      if (newPath) {
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
        openSet.insert(neighbor);
      }
    }
  }
}

// checks if current node is at the end
function checkIfFinished(currSpot, endSpot) {
  if (currSpot == endSpot) {
    noLoop();
    console.log("DONE!");
  }
}

// add neighbors to every open cell
function addNeighborsToOpenCells(grid) {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let cell = grid[i][j];
      if (!cell.wall) cell.addNeighbors(grid);
    }
  }
}

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
      grid[i][j].show(gridW, color(255));
    }
  }
}

function setup() {
  // style create maze button
  button = createButton("Create maze");
  button.size(150, 50);
  button.style("background-color", color(50, 250, 150));
  button.position(windowWidth / 2.2, canvasHeight + 20);
  button.mousePressed(() => (mazeStarted = true));

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
  start = grid[1][1];
  start.wall = true;
  start.addWalls(wallList);
  start.visited = true;

  end = grid[cols - 2][rows - 2];
}

function draw() {
  createCanvas(canvasWidth, canvasHeight);
  background(51);
  displayGrid(grid, gridW);

  if (mazeStarted) {
    button.style("background-color", color(200, 0, 0));

    // create maze
    start.wall = false;
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
      // maze finished creating
      mazeStarted = false;
      mazeFinished = true;
      console.log("Created maze!");
    }
  } else if (mazeFinished) {
    // start a_star algorithm
    console.log("start A_star!");
    // complete set up
    if (!initSetup) {
      // add possible neighbors
      addNeighborsToOpenCells(grid);
      start.wall = false;
      end.wall = false;
      openSet.insert(start);
      initSetup = true;
    }

    if (openSet.length() > -1) {
      // keep going
      // get index of best node
      var current = openSet.getMin();
      // check if we are at destination
      checkIfFinished(current, end);

      // not done yet, move best node to closed set
      openSet.remove(current);
      closedSet.insert(current);

      checkNeighbors(current, openSet, end);
    } else {
      console.log("no solution");
      noLoop();
    }

    // draw discarded grid spaces red
    drawRedSpaces(closedSet);

    // draw potential grid spaces green
    drawGreenSpaces(openSet);

    // find and draw current shortest path blue
    findAndDrawCurrPath(current, path);

    // show where the end grid space is
    end.show(gridW, color("yellow"));
  }
}
