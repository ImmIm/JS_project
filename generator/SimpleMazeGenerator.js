import Maze3dGenerator from './maze3DGenerator.js';


export default class SimpleMazeGenerator extends Maze3dGenerator {
  constructor(row, col, layer) {
    super(row, col, layer);
  }

  generate() {
    this.generateDefaultBoard();
    let start = this.generateRandomPoint('start');
    let finish = this.generateRandomPoint('finish');
    while (start.coordinate === finish.coordinate) {
      finish.value = false;
      finish = this.generateRandomPoint('finish');
    }

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
    let visited = new Set()


    while(nextCell.coordinate !== finish.coordinate){
      const direction = this.generateDirections(nextCell.layer, nextCell.row, nextCell.column);
      const randomIndex = Math.floor(Math.random() * direction.length)
      const oppositeDirection = this.generateOppositeDirections(direction[randomIndex][3])
      if(!visited.has(nextCell.coordinate)){
        nextCell.deleteWall(direction[randomIndex][3])
        visited.add(nextCell)
        nextCell = this.maze[nextCell.layer + direction[randomIndex][0]][nextCell.row + direction[randomIndex][1]][nextCell.column + direction[randomIndex][2]]
        nextCell.deleteWall(oppositeDirection)
      }else{
        randomIndex = Math.floor(Math.random() * direction.length)
        nextCell =  this.maze[nextCell.layer + direction[randomIndex][0]][nextCell.row + direction[randomIndex][1]][nextCell.column + direction[randomIndex][2]]
      }
    }
  }
}
