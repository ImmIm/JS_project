import Maze3dGenerator from './maze3DGenerator.js';

export default class SimpleMazeGenerator extends Maze3dGenerator {
  #start;
  #goal;
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
    let start = this.#start
    let finish = this.#goal


    for (let layer = 0; layer < this.layers; layer++) {
      for (let row = 0; row < this.rows; row++) {
        for (let column = 0; column < this.columns; column++) {
          const directions = this.generateDirections(layer, row, column);

          let randIndex = Math.floor(Math.random() * directions.length);

          this.maze[layer][row][column].deleteWall(directions[randIndex][3]);

          let oppositeDirection = this.generateOppositeDirections(
            directions[randIndex][3]
          );

          let newLayer = layer + directions[randIndex][0];
          let newRow = row + directions[randIndex][1];
          let newColumn = column + directions[randIndex][2];

          this.maze[newLayer][newRow][newColumn].deleteWall(oppositeDirection);
        }
      }
    }
    this.#carvePathToFinish(start, finish);
  }

  #carvePathToFinish(start, finish) {
    let nextCell = start;
    let visited = new Set();

    while (nextCell.coordinate !== finish.coordinate) {
      const direction = this.generateDirections(
        nextCell.layer,
        nextCell.row,
        nextCell.column
      );
      const randomIndex = Math.floor(Math.random() * direction.length);
      const oppositeDirection = this.generateOppositeDirections(
        direction[randomIndex][3]
      );
      if (!visited.has(nextCell.coordinate)) {
        nextCell.deleteWall(direction[randomIndex][3]);
        visited.add(nextCell);
        nextCell =
          this.maze[nextCell.layer + direction[randomIndex][0]][
            nextCell.row + direction[randomIndex][1]
          ][nextCell.column + direction[randomIndex][2]];
        nextCell.deleteWall(oppositeDirection);
      } else {
        randomIndex = Math.floor(Math.random() * direction.length);
        nextCell =
          this.maze[nextCell.layer + direction[randomIndex][0]][
            nextCell.row + direction[randomIndex][1]
          ][nextCell.column + direction[randomIndex][2]];
      }
    }
  }
}
