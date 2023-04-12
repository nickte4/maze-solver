/* File for Cell object */
class Cell {
  constructor(i, j) {
    this.i = i; // x
    this.j = j; // y
    // [top, right, bottom, left]
    this.walls = [true, true, true, true];
    //this.neighbors = [];
    this.wall = true;
    this.visited = false; // tracks if visited
    this.inMaze = false;
  }

  // PUBLIC methods

  show(gridWidth) {
    let w = gridWidth;
    let x = this.i * w;
    let y = this.j * w;

    fill(255);
    if (this.wall) fill(0);
    if (this.inMaze) fill(255);
    noStroke();
    rect(x, y, w - 1, w - 1);

    // if (this.visited) {
    //   noStroke();
    //   fill(255);
    //   rect(x, y, w - 1, w - 1);
    // }
  }
  checkNeighbors() {
    var neighbors = [];
    // cell above
    if (this.j > 0) {
      var top = grid[this.i][this.j - 1];
      if (!top.visited) neighbors.push(top);
    }
    // cell to right
    if (this.i < cols - 1) {
      var right = grid[this.i + 1][this.j];
      if (!right.visited) neighbors.push(right);
    }
    // cell below
    if (this.j < rows - 1) {
      var bottom = grid[this.i][this.j + 1];
      if (!bottom.visited) neighbors.push(bottom);
    }
    // cell to left
    if (this.i > 0) {
      var left = grid[this.i - 1][this.j];
      if (!left.visited) neighbors.push(left);
    }
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return null;
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
