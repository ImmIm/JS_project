import Searchable from './Searchable.js';

export default class mazeAdapter extends Searchable {
  #maze;

  constructor(maze, start = maze.start) {
    super(start, maze.goal);
    this.#maze = maze.maze;
  }

  reachedGoalState(cell) {
    if (cell.hash === this.goalState.hash) {
      return true;
    } else {
      return false;
    }
  }

  actions(cell) {
    const actions = [];

    if (cell.directions['left']) {
      actions.push([0, 0, -1]);
    }
    if (cell.directions['right']) {
      actions.push([0, 0, 1]);
    }
    if (cell.directions['backward']) {
      actions.push([0, 1, 0]);
    }
    if (cell.directions['forward']) {
      actions.push([0, -1, 0]);
    }
    if (cell.directions['up']) {
      actions.push([-1, 0, 0]);
    }
    if (cell.directions['down']) {
      actions.push([1, 0, 0]);
    }

    return actions;
  }

  getNextState(cell, action) {
    let layer = cell.layer;
    let row = cell.row;
    let column = cell.column;

    return this.#maze[layer + action[0]][row + action[1]][column + action[2]];
  }
}

