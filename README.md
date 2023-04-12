# Maze Solver

## Abstract

A JavaScript project that creates a maze, using randomized Prim's algorithm, and solves it with the A\* pathfinding algorithm.

## How the grid will fit in

One of the main differences between my a_star and maze-generator projects is that the maze-generator supposes that each cell is made of lines (or walls) that can be removed. What needs to be implemented is integrating this wall removal system into how the a_star algorithm views cells. Instead of lines for walls, I want to have literal cells be a whole wall (as it is in a_star).
