import Cell from '../helperClasses/mazeCell.js';

class Maze3dGenerator {
  #columns;
  #rows;
  #layers;
  #maze;

  constructor(rows, columns, layers) {
    if (this.constructor === Maze3dGenerator) {
      throw new Error('Abstract class Maze3dGenerator cannot be instantiated');
    }

    this.#columns = columns;
    this.#rows = rows;
    this.#layers = layers;
    this.#maze = [];
  }

  get columns() {
    return this.#columns;
  }

  get layers() {
    return this.#layers;
  }

  get rows() {
    return this.#rows;
  }

  set maze(maze) {
    this.#maze = maze;
  }

  get maze() {
    return this.#maze;
  }

  generate() {
    throw new Error('Method generate() must be implemented');
  }

  getCell(i, j, k) {
    return this.#maze[i][j][k];
  }

  generateDefaultBoard() {
    for (let i = 0; i < this.#layers; i++) {
      this.#maze[i] = new Array(this.#columns);
      for (let j = 0; j < this.#rows; j++) {
        this.#maze[i][j] = new Array(this.#rows);
        for (let k = 0; k < this.#columns; k++) {
          this.#maze[i][j][k] = new Cell(i, j, k, false);
        }
      }
    }
    return this.#maze;
  }

  /**
   *
   * @param {String} defaults false, if true, set value of point
   * @returns {Array} coordinates of chosen random point
   */
  generateRandomPoint(value = false) {
    let randLayer = Math.floor(Math.random() * this.#layers);
    let randRow = Math.floor(Math.random() * this.#rows);
    let randCol = Math.floor(Math.random() * this.#columns);

    if (value && !this.#maze[randLayer][randRow][randCol].value) {
      this.#maze[randLayer][randRow][randCol].value = value;
      return this.maze[randLayer][randRow][randCol]
    } else if (value && this.#maze[randLayer][randRow][randCol].value) {
      while (this.#maze[randLayer][randRow][randCol].value) {
        randLayer = Math.floor(Math.random() * this.#layers);
        randRow = Math.floor(Math.random() * this.#rows);
        randCol = Math.floor(Math.random() * this.#columns);
      }
      this.#maze[randLayer][randRow][randCol].value = value;
      return this.maze[randLayer][randRow][randCol]
    } else {
      return this.maze[randLayer][randRow][randCol]
    }
  }

  get maze() {
    return this.#maze;
  }

  measureAlgorithmTime() {
    let startTime = Date.now();
    console.log('Start generation');
    this.generate();
    let finishTime = Date.now();
    let result = finishTime - startTime;
    console.log('Finished generation, time elapsed: ', result, 'ms');

    return result;
  }

  generateDirections(layer, row, column) {
    const directions = [];

    if (layer < this.layers - 1) {
      directions.push([1, 0, 0, 'down']);
    }
    if (layer > 0) {
      directions.push([-1, 0, 0, 'up']);
    }

    if (row > 0) {
      directions.push([0, -1, 0, 'forward']);
    }
    if (row < this.rows - 1) {
      directions.push([0, 1, 0, 'backward']);
    }

    if (column < this.columns - 1) {
      directions.push([0, 0, 1, 'right']);
    }
    if (column > 0) {
      directions.push([0, 0, -1, 'left']);
    }

    return directions;
  }

  generateOppositeDirections(direction) {
    switch (direction) {
      case 'right':
        return 'left';

      case 'left':
        return 'right';

      case 'up':
        return 'down';

      case 'down':
        return 'up';

      case 'forward':
        return 'backward';

      case 'backward':
        return 'forward';

      default:
        throw Error(
          `Unexpected input in "generateOppositeDirections", got ${direction}`
        );
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

export default Maze3dGenerator;
