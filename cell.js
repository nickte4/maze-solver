/* File for Cell object */
class Cell {
  constructor(i, j) {
    this.i = i; // x
    this.j = j; // y
    //this.neighbors = [];
    this.wall = true;
    this.visited = false; // tracks if visited
    this.attachedCell;
  }
  // PRIVATE methods
  #checkTRight(grid) {
    if (this.i < cols - 1 && this.j > 0) {
      return grid[this.i + 1][this.j - 1];
    }
  }

  #checkBRight(grid) {
    if (this.i < cols - 1 && this.j < rows - 1) {
      return grid[this.i + 1][this.j + 1];
    }
  }

  #checkTLeft(grid) {
    if (this.i > 0 && this.j > 0) {
      return grid[this.i - 1][this.j - 1];
    }
  }

  #checkBLeft(grid) {
    if (this.i > 0 && this.j < rows - 1) {
      return grid[this.i - 1][this.j + 1];
    }
  }

  #fromTop(grid) {
    var bLeft = this.#checkBLeft(grid);
    var bRight = this.#checkBRight(grid);
    if (bLeft && bLeft.visited) {
      return false;
    }
    if (bRight && bRight.visited) {
      return false;
    }
    return true;
  }

  #fromRight(grid) {
    var tLeft = this.#checkTLeft(grid);
    var bLeft = this.#checkBLeft(grid);
    if (tLeft && tLeft.visited) {
      return false;
    }
    if (bLeft && bLeft.visited) {
      return false;
    }
    return true;
  }

  #fromLeft(grid) {
    var tRight = this.#checkTRight(grid);
    var bRight = this.#checkBRight(grid);
    if (tRight && tRight.visited) {
      return false;
    }
    if (bRight && bRight.visited) {
      return false;
    }
    return true;
  }

  #fromBottom(grid) {
    var tLeft = this.#checkTLeft(grid);
    var tRight = this.#checkTRight(grid);
    if (tLeft && tLeft.visited) {
      return false;
    }
    if (tRight && tRight.visited) {
      return false;
    }
    return true;
  }

  #checkDiags(grid, top, right, bottom, left) {
    if (top && this.attachedCell == top) {
      return this.#fromTop(grid);
    }
    if (right && this.attachedCell == right) {
      return this.#fromRight(grid);
    }
    if (bottom && this.attachedCell == bottom) {
      return this.#fromBottom(grid);
    }
    if (left && this.attachedCell == left) {
      return this.#fromLeft(grid);
    }
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
  }
  checkNeighbors(grid) {
    let numVisited = 0;
    let top, right, bottom, left;
    // cell above
    if (this.j > 0) {
      top = grid[this.i][this.j - 1];
      if (top.visited) numVisited++;
    }
    // cell to right
    if (this.i < cols - 1) {
      right = grid[this.i + 1][this.j];
      if (right.visited) numVisited++;
    }
    // cell below
    if (this.j < rows - 1) {
      bottom = grid[this.i][this.j + 1];
      if (bottom.visited) numVisited++;
    }
    // cell to left
    if (this.i > 0) {
      left = grid[this.i - 1][this.j];
      if (left.visited) numVisited++;
    }
    if (numVisited == 1) {
      this.attachedCell = this.#findAttachedCell(grid);
      return this.#checkDiags(grid, top, right, bottom, left);
    }
    return false;
  }

  #findAttachedCell(grid) {
    // cell above
    if (this.j > 0) {
      var top = grid[this.i][this.j - 1];
      if (!top.wall) return top;
    }
    // cell to right
    if (this.i < cols - 1) {
      var right = grid[this.i + 1][this.j];
      if (!right.wall) return right;
    }
    // cell below
    if (this.j < rows - 1) {
      var bottom = grid[this.i][this.j + 1];
      if (!bottom.wall) return bottom;
    }
    // cell to left
    if (this.i > 0) {
      var left = grid[this.i - 1][this.j];
      if (!left.wall) return left;
    }
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
