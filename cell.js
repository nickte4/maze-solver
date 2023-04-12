/* File for Cell object */
class Cell {
  constructor(i, j) {
    this.i = i; // col pos
    this.j = j; // row pos
    this.f = 0; // total cost = actual + remaining
    this.g = 0; // actual cost
    this.h = 0; // remaining cost
    this.neighbors = []; // available neighbors
    this.wall = true; // wall marker
    this.visited = false; // tracks if visited
    this.attachedCell; // cell a wall came from
    this.previous; // pointer to previous cell in a* path
  }
  // PRIVATE methods

  // checks if cell above exists
  #checkTop(grid) {
    if (this.j > 1) {
      return grid[this.i][this.j - 1];
    }
    return null;
  }

  // checks if cell to right exists
  #checkRight(grid) {
    if (this.i < cols - 2) {
      return grid[this.i + 1][this.j];
    }
    return null;
  }

  // checks if cell below exists
  #checkBottom(grid) {
    if (this.j < rows - 2) {
      return grid[this.i][this.j + 1];
    }
    return null;
  }

  // checks if cell to left exists
  #checkLeft(grid) {
    if (this.i > 1) {
      return grid[this.i - 1][this.j];
    }
    return null;
  }

  // checks if cell to top right exists
  #checkTRight(grid) {
    if (this.i < cols - 1 && this.j > 0) {
      return grid[this.i + 1][this.j - 1];
    }
    return null;
  }

  // checks if cell to bottom right exists
  #checkBRight(grid) {
    if (this.i < cols - 1 && this.j < rows - 1) {
      return grid[this.i + 1][this.j + 1];
    }
    return null;
  }

  // checks if cell to top left exists
  #checkTLeft(grid) {
    if (this.i > 0 && this.j > 0) {
      return grid[this.i - 1][this.j - 1];
    }
    return null;
  }

  // checks if cell to bottom left exists
  #checkBLeft(grid) {
    if (this.i > 0 && this.j < rows - 1) {
      return grid[this.i - 1][this.j + 1];
    }
    return null;
  }

  // checks diags if attached cell was from top
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

  // checks diags if attached cell was from right
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

  // checks diags if attached cell was from left
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

  // checks diags if attached cell was from bottom
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

  // master function to check all diags
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

  // finds the cell that a wall came from
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

  // PUBLIC methods

  // displays current grid space
  show(gridWidth, cellColor) {
    let w = gridWidth;
    let x = this.i * w;
    let y = this.j * w;

    if (this.wall) {
      fill(0);
    } else {
      fill(color(cellColor));
    }
    noStroke();
    rect(x, y, w - 1, w - 1);
  }

  // checks if a wall has more than one visited neighboring cell
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

  // adds walls of a cell to the wall list
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

  // highlights a cell
  highlight(gridWidth) {
    let w = gridWidth;
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(255, 0, 0);
    rect(x, y, w - 1, w - 1);
  }

  // add available neighbors
  addNeighbors(grid) {
    // cell above
    var top = this.#checkTop(grid);
    if (top && !top.wall) this.neighbors.push(top);

    // cell to right
    var right = this.#checkRight(grid);
    if (right && !right.wall) this.neighbors.push(right);

    // cell below
    var bottom = this.#checkBottom(grid);
    if (bottom && !bottom.wall) this.neighbors.push(bottom);

    // cell to left
    var left = this.#checkLeft(grid);
    if (left && !left.wall) this.neighbors.push(left);
  }
}
