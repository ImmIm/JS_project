import Maze3dGenerator from './maze3DGenerator.js';


export default class DFSMazeGenerator extends Maze3dGenerator {

  #start
  #goal
  constructor(row, col, layer) {
    super(row, col, layer);
    this.maze = this.generateDefaultBoard();

    this.#start = this.generateRandomPoint('start');
    this.#goal = this.generateRandomPoint('finish');
    this.measureAlgorithmTime()

  }

  set start(start){
    this.#start = start
  }

  get start(){
    return this.#start
  }

  set goal(goal){
    this.#goal = goal
  }

  get goal(){
    return this.#goal
  }

  generate() {

    let cell = this.#start
    let finish = this.#goal
    let stack = [];
    let visited = new Set();


    cell = this.checkNeighbours(cell, visited, stack);
    while (stack.length > 0) {
      let nextCell = this.checkNeighbours(cell, visited, stack);

      if (!nextCell) {
        cell = stack.pop();
      } else {
        nextCell = this.checkNeighbours(nextCell, visited, stack);
      }
    }
  }

  checkNeighbours(cell, visited, stack) {

    const directions = this.generateDirections(cell.layer, cell.row, cell.column);

    this.shuffleArray(directions);

    for (let route of directions) {
      let newLayer = cell.layer + route[0];
      let newRow = cell.row + route[1];
      let newColumn = cell.column + route[2];
      if (
        newLayer >= 0 &&
        newLayer < this.layers &&
        newRow >= 0 &&
        newRow < this.rows &&
        newColumn >= 0 &&
        newColumn < this.columns
      ) {
        let newCell = this.maze[newLayer][newRow][newColumn];
        if (!visited.has(newCell.coordinate)) {
          cell.deleteWall(route[3]);
          let oppositeDirection = this.generateOppositeDirections(route[3]);
          
          newCell.deleteWall(oppositeDirection);
          visited.add(newCell.coordinate);
          stack.push(newCell);
          return newCell;
        }
      }
    }
    return false;
  }

  //

}
