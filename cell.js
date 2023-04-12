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
  #checkTop(grid) {
    if (this.j > 1) {
      return grid[this.i][this.j - 1];
    }
    return null;
  }

  #checkRight(grid) {
    if (this.i < cols - 2) {
      return grid[this.i + 1][this.j];
    }
    return null;
  }
  #checkBottom(grid) {
    if (this.j < rows - 2) {
      return grid[this.i][this.j + 1];
    }
    return null;
  }
  #checkLeft(grid) {
    if (this.i > 1) {
      return grid[this.i - 1][this.j];
    }
    return null;
  }
  #checkTRight(grid) {
    if (this.i < cols - 1 && this.j > 0) {
      return grid[this.i + 1][this.j - 1];
    }
    return null;
  }

  #checkBRight(grid) {
    if (this.i < cols - 1 && this.j < rows - 1) {
      return grid[this.i + 1][this.j + 1];
    }
    return null;
  }

  #checkTLeft(grid) {
    if (this.i > 0 && this.j > 0) {
      return grid[this.i - 1][this.j - 1];
    }
    return null;
  }

  #checkBLeft(grid) {
    if (this.i > 0 && this.j < rows - 1) {
      return grid[this.i - 1][this.j + 1];
    }
    return null;
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
    // cell above
    var top = this.#checkTop(grid);
    if (top && top.visited) numVisited++;
    // cell to right
    var right = this.#checkRight(grid);
    if (right && right.visited) numVisited++;
    // cell below
    var bottom = this.#checkBottom(grid);
    if (bottom && bottom.visited) numVisited++;
    // cell to left
    var left = this.#checkLeft(grid);
    if (left && left.visited) numVisited++;

    // now check diags
    if (numVisited == 1) {
      this.attachedCell = this.#findAttachedCell(grid);
      return this.#checkDiags(grid, top, right, bottom, left);
    }
    return false;
  }

  #findAttachedCell(grid) {
    // cell above
    var top = this.#checkTop(grid);
    if (top && !top.wall) return top;

    // cell to right
    var right = this.#checkRight(grid);
    if (right && !right.wall) return right;

    // cell below
    var bottom = this.#checkBottom(grid);
    if (bottom && !bottom.wall) return bottom;

    // cell to left
    var left = this.#checkLeft(grid);
    if (left && !left.wall) return left;
  }

  addWalls(wallList) {
    // cell above
    var top = this.#checkTop(grid);
    if (top && top.wall) wallList.push(top);

    // cell to right
    var right = this.#checkRight(grid);
    if (right && right.wall) wallList.push(right);

    // cell below
    var bottom = this.#checkBottom(grid);
    if (bottom && bottom.wall) wallList.push(bottom);

    // cell to left
    var left = this.#checkLeft(grid);
    if (left && left.wall) wallList.push(left);
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
