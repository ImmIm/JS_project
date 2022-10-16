import Maze3dGenerator from './maze3DGenerator.js';

export default class WilsonMazeGenerator extends Maze3dGenerator {


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
    let startNode = this.#start

    // Base tree
    const visited = new Set();
    const unvisited = [];

    visited.add(startNode.coordinate);
    //Filling unvisited Set
    for (let layer = 0; layer < this.layers; layer++) {
      for (let row = 0; row < this.rows; row++) {
        for (let column = 0; column < this.columns; column++) {
          if (`${layer}, ${row}, ${column}` !== startNode.coordinate) {
            unvisited.push(this.maze[layer][row][column]);
          }
        }
      }
    }

    this.shuffleArray(unvisited);

    let cell = unvisited.pop();
    while (unvisited.length > 0) {
      const subVisited = new Set();
      const path = [];

      while (!visited.has(cell.coordinate)) {
        const directions = this.generateDirections(
          cell.layer,
          cell.row,
          cell.column
        );

        const randIndex = Math.floor(Math.random() * directions.length);

        let nextCell =
          this.maze[cell.layer + directions[randIndex][0]][
            cell.row + directions[randIndex][1]
          ][cell.column + directions[randIndex][2]];

        // Self erase loop path
        if (subVisited.has(nextCell.coordinate)) {
;
          let erasedCell = path.pop();
          subVisited.delete(erasedCell[0].coordinate)
          while (erasedCell[0].coordinate !== nextCell.coordinate) {
            erasedCell = path.pop();
            subVisited.delete(erasedCell[0].coordinate);
          }
          cell = erasedCell[0];
        } else {
          path.push([cell, directions[randIndex]]);
          subVisited.add(cell.coordinate);
          cell = nextCell;
        }
      }

      for (let node of path) {
        visited.add(node[0].coordinate);
        let way = node[0];
        way.deleteWall(node[1][3]);
        let oppositeDirection = this.generateOppositeDirections(node[1][3]);
        this.maze[way.layer + node[1][0]][way.row + node[1][1]][
          way.column + node[1][2]
        ].deleteWall(oppositeDirection);
        visited.delete(node[0]);
      }

      cell = unvisited.pop();
    }
  }
}
