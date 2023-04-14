# Maze Solver

## About The Project

A JavaScript project that creates a maze, using randomized Prim's algorithm, and solves it with the A\* pathfinding algorithm.

## Built With

- HTML/CSS
- JavaScript
- p5.js

## Scope

Project was implemented using only vanilla JavaScript. Notion of Classes are used, e.g. Cell and Priority Queue. Maze was generated using a randomized Prim's algorithm. An enhancement to the algorithm can be found in [Interesting Challenges](#interesting-challenges). The shortest path was found using A\* pathfinding algorithm.

## Description

### How the grid will fit in

One of the main differences between my a_star and maze-generator projects is that the maze-generator supposes that each cell is made of lines (or walls) that can be removed. What needs to be implemented is integrating this wall removal system into how the a_star algorithm views cells. Instead of lines for walls, I want to have literal cells be a whole wall (as it is in a_star).

This initially conversion from line to grids initially stumped me, as the DFS algorithm described on the wikipedia page for maze generation algorithms worked upon the notion of walls--rather than cells. Fortunately, there was a later section detailing a randomized Prim's algorithm that starts with every grid space starting as a wall and then carving a path out using a list of walls.

### Interesting Challenges

With this project, I encountered three main problems. The first two being major, surprising ones that required a lot of thinking and research and the second one being a given that I expected to deal with.

First, the conversion from line to grids almost made me quit the project altogether. The original algorithm used for the maze generation was a depth-first search algorithm with recursive backtracking. I spent a lot of time trying to make it work on a pixel grid but to no avail. This led me to change the algorithm to Prim's algorithm which thankfully worked.

Second, after implementing the maze generation on a 2-D grid. I noticed that the mazes often ended up looking less maze-like and more QR-code like. This was because paths would be created where they touched each other diagonally--causing jagged looking paths and just looking generally messy altogether. This problem occurred because the path was carved out only using the walls to the top, right, bottom, and left. However, having it check for diagonals alongside the other four directions prevented the algorithm from working properly. The feasible solution to this problem, after much time spent debating, was to check only two diagonal walls depending on the direction in which the path was carved. More details about how I solved this are in "Implement cleaner Prim's algorithm" (commit id dd16a07).

Third, merging the code between maze-generation and a_star proved to be relatively simple but, as noted in [Current Limitations](#current-limitations), I don't believe I did this perfectly.

### Current Limitations

Due to the manner in which the algorithm generates its path, I currently do not have a working solution to ensure that the destination (the bottom right corner grid space) does not remain as a wall after generation. Thus, the maze will sometimes generate an 'unsolvable' maze.

A possible workaround may be to select 4 grid spaces in that general 'ending' area and pick whichever one did not remain a wall.

Another possible flaw with the project is that the A\* algorithm may not be working correctly? It seems to be checking almost the entire maze when it looks for the shortest path (though it will find the shortest path). This may be causing the shortest path to be found much slower than it should be. Currently, I have not taken time to analyze my implementation to check for what may be wrong it.

### Overall

I'm quite happy with how the end result came out. The challenges I faced were quite daunting to me initially and it was extremely satisfying conceptualizing and problem-solving these issues. One important thing that I learned after this project was that I need to take more time in between completing and starting a new project--as the positive feedback loop from completing projects can be addicting. If I don't take longer breaks, I'm likely prone to burn myself out on coding and problem-solving.

## Contact

Nick Topacio - ntopacio25@gmail.com

## Acknowledgments

- [Maze generation algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
