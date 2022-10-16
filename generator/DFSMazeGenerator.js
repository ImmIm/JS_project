import Maze3dGenerator from './maze3DGenerator.js';


export default class DFSMazeGenerator extends Maze3dGenerator {

  constructor(row, col, layer) {
    super(row, col, layer);
  }

  generate() {
    this.generateDefaultBoard();

    let cell = this.generateRandomPoint('start');
    let finish = this.generateRandomPoint('finish');
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
      console.log(newLayer, newRow, newColumn);
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
