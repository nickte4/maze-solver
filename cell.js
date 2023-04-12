/* File for Cell object */
class Cell {
  constructor(i, j) {
    this.i = i; // x
    this.j = j; // y
    //this.neighbors = [];
    this.wall = true;
    this.visited = false; // tracks if visited
  }

  // PUBLIC methods

  show(gridWidth) {
    let w = gridWidth;
    let x = this.i * w;
    let y = this.j * w;

    fill(255);
    if (this.wall) {
      fill(0);
    } else {
      fill(255);
    }
    noStroke();
    rect(x, y, w - 1, w - 1);

    // if (this.visited) {
    //   noStroke();
    //   fill(255);
    //   rect(x, y, w - 1, w - 1);
    // }
  }
  checkNeighbors() {
    let numVisited = 0;
    // cell above
    if (this.j > 0) {
      var top = grid[this.i][this.j - 1];
      if (top.visited) numVisited++;
    }
    // cell to right
    if (this.i < cols - 1) {
      var right = grid[this.i + 1][this.j];
      if (right.visited) numVisited++;
    }
    // cell below
    if (this.j < rows - 1) {
      var bottom = grid[this.i][this.j + 1];
      if (bottom.visited) numVisited++;
    }
    // cell to left
    if (this.i > 0) {
      var left = grid[this.i - 1][this.j];
      if (left.visited) numVisited++;
    }
    return numVisited == 1;
  }

  addWalls(wallList) {
    // cell above
    if (this.j > 0) {
      var top = grid[this.i][this.j - 1];
      if (top.wall) wallList.push(top);
    }
    // cell to right
    if (this.i < cols - 1) {
      var right = grid[this.i + 1][this.j];
      if (right.wall) wallList.push(right);
    }
    // cell below
    if (this.j < rows - 1) {
      var bottom = grid[this.i][this.j + 1];
      if (bottom.wall) wallList.push(bottom);
    }
    // cell to left
    if (this.i > 0) {
      var left = grid[this.i - 1][this.j];
      if (left.wall) wallList.push(left);
    }
  }

  highlight(gridWidth) {
    let w = gridWidth;
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 255, 0, 255);
    rect(x, y, w - 1, w - 1);
  }
}
