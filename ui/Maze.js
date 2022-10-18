export default class Maze {
  #maze;
  #element;
  #currentLayer;
  #mainMaze;
  #otherMazes;
  #otherMazesContainer;

  constructor(maze, currentLayer) {
    this.#maze = maze;
    this.#currentLayer = currentLayer;
    this.#element = document.createElement('div');
    this.#element.className = 'Maze-container';
    this.#element.style.width = '70%';
    this.#element.style.margin = '0 auto';

    this.#mainMaze = document.createElement('div');
    this.#mainMaze.className = 'main-maze';
    this.#otherMazesContainer = document.createElement('div');
    this.#otherMazesContainer.className = 'other-maze-container';
    this.#otherMazes = [];
  }

  createMazeElement() {
    let m = this.#maze;
    for (let k = 0; k < m.layers; k++) {
      let layerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr '.repeat(m.columns),
        gridTemplateRows: '1fr'.repeat(m.rows),
        backgroundImage : k === 0? 'url(./Assets/background0.jpg)' : 'url(./Assets/background1.jpg)'
      };
      let mazeContainer = document.createElement('div');
      mazeContainer.className = `maze-layer-${k + 1}`;
      mazeContainer.style.display = layerStyle.display;
      mazeContainer.style.gridTemplateColumns = layerStyle.gridTemplateColumns;
      mazeContainer.style.gridTemplateRows = layerStyle.gridTemplateRows;
      mazeContainer.style.border = '1px solid black'
      mazeContainer.style.margin = '10px';
      mazeContainer.style.width = '100%';
      mazeContainer.style.aspectRatio = '1/1';
      mazeContainer.style.backgroundImage = layerStyle.backgroundImage
      mazeContainer.style.backgroundSize = 'cover'

      for (let i = 0; i < m.rows; i++) {
        for (let j = 0; j < m.columns; j++) {
          this.createCell(k, i, j, mazeContainer);
        }
      }
      this.#otherMazes.push(mazeContainer);
    }
  }

  renderMaze(layer) {
    this.#currentLayer = layer
    this.createMazeElement();
    this.#mainMaze = this.#otherMazes[layer];
    this.#mainMaze.style.height = '50%';
    this.#mainMaze.style.aspectRatio = '1/1';
    let additionalMazes = this.#otherMazes.filter((v, i) => i != layer);
    this.#otherMazesContainer.append(...additionalMazes);
    this.#otherMazesContainer.style.display = 'grid';
    this.#otherMazesContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
    this.#otherMazesContainer.style.gridTemplateRows = '1fr'.repeat(
      additionalMazes.length / 3
    );
    this.#otherMazesContainer.style.gap = '10px';
    this.#otherMazesContainer.style.flexDirection = 'row';
    this.#otherMazesContainer.style.flexWrap = 'wrap';

    this.#element.append(this.#mainMaze);
    this.#element.append(this.#otherMazesContainer);
    return this.#element;
  }

  createCell(k, i, j, container) {
    let mazeCell = this.#maze.maze[k][i][j].directions;

    const cell = document.createElement('div');
    if (!mazeCell['right']) {
      cell.style.borderRight = '1px solid black';
    }
    if (!mazeCell['left']) {
      cell.style.borderLeft = '1px solid black';
    }
    if (!mazeCell['forward']) {
      cell.style.borderTop = '1px solid black';
    }
    if (!mazeCell['backward']) {
      cell.style.borderBottom = '1px solid black';
    }
    if (this.#maze.maze[k][i][j].value === 'start') {
      cell.style.backgroundImage = 'url(./Assets/Start.png)';
      cell.style.backgroundSize = 'cover'
    }

    if(k > 0){
        cell.style.borderColor = 'red'
    }else{
        cell.style.borderColor = 'black'
    }
    if (this.#maze.maze[k][i][j].value === 'finish') {
        cell.style.backgroundImage = 'url(./Assets/finish.png)';
        cell.style.backgroundSize = 'cover'
    }
    if (mazeCell['up'] && mazeCell['down']) {
      let arrow = document.createElement('span');
      arrow.textContent = '↕️';
      arrow.style.fontSize = k == this.#currentLayer? '24px' : '18px'
      arrow.style.color = k > 0? 'white' : 'black'
      cell.appendChild(arrow);
      cell.style.textAlign = 'center';
    } else if (mazeCell['up']) {
      let arrow = document.createElement('span');
      arrow.textContent = '↑';
      arrow.style.fontSize = k == this.#currentLayer? '24px' : '18px'
      arrow.style.color = k > 0? 'white' : 'black'

      cell.appendChild(arrow);
      cell.style.textAlign = 'center';
    } else if (mazeCell['down']) {
      let arrow = document.createElement('span');
      arrow.textContent = '↓';
      arrow.style.fontSize = k == this.#currentLayer? '24px' : '18px'
      arrow.style.color = k > 0? 'white' : 'black'


      cell.appendChild(arrow);
      cell.style.textAlign = 'center';
    }

    cell.style.gridColumn = j + 1;
    cell.style.gridRow = i + 1;

    cell.id = `xy${k}/${i}/${j}`
    container.appendChild(cell);
  }
}
