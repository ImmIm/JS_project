import Cell from '../helperClasses/mazeCell.js';

export default class Player {
  #columns;
  #rows;
  #layers;
  #maze;
  #player;
  constructor(layers, rows, columns, maze) {
    this.#columns = columns;
    this.#rows = rows;
    this.#layers = layers;
    this.#maze = maze;
  }

  get maze() {
    return this.#maze;
  }

  putPlayer(row, column, layer) {
    const previousPosition = document.querySelector('#player');
    const mainMaze = document.querySelector('.Maze-container div');

    let playerPosition = 'xy' + layer + '/' + row + '/' + column;
    let playerPositionCell = document.getElementById(playerPosition);

    if (previousPosition != null) {
      previousPosition.remove();
    }

    this.#player = document.createElement('div');
    this.#player.style.position = 'absolute';

    this.#player.style.width = `${playerPositionCell.clientWidth / 2}px`;
    this.#player.style.gridArea = playerPosition;
    this.#player.id = 'player';
    this.#player.style.aspectRatio = '1/1';
    this.#player.style.backgroundColor = 'blue';

    playerPositionCell.append(this.#player);
  }


}
