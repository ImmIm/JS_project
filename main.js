import DFSMazeGenerator from './generator/DFSMazeGenerator.js';
import SimpleMazeGenerator from './generator/SimpleMazeGenerator.js';
import maze3D from './helperClasses/maze3d.js';
import WilsonMazeGenerator from './generator/WilsonMazeGenerator.js';
import MazeToSearchableAdapter from './helperClasses/mazeToSearchableAdapter.js'
import BreadthFirstSearch from './searchAlgorithms/BFSSearch.js';
import DeapthFirstSearch from './searchAlgorithms/DFSSearch.js'

import AStarSearch from './searchAlgorithms/AStarSearch.js';

let m = new WilsonMazeGenerator(5, 5, 1);

let g = new maze3D(m.maze);


let t = new MazeToSearchableAdapter(m)


let search = new AStarSearch(t)





const body = document.querySelector('body');

console.log(search.AStarAlgorithm());





for (let k = 0; k < m.layers; k++) {
  let mazeContainer = document.createElement('div');
  mazeContainer.style.display = 'grid';
  mazeContainer.style.gridTemplateColumns =
    '1fr '.repeat(m.columns);
  mazeContainer.style.gridTemplateRows =
    '1fr'.repeat(m.rows);
  mazeContainer.style.width = '50%';
  mazeContainer.style.height = '50vh';
  mazeContainer.style.border = '1px solid black';
  mazeContainer.style.marginBottom = '10px'

  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.columns; j++) {
      createCell(k, i, j, mazeContainer);
    }
  }

body.append(mazeContainer);

}

function createCell(k, i, j, container) {
  let mazeCell = g.maze[k][i][j].directions;

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
  if (g.maze[k][i][j].value === 'start') {
    cell.style.backgroundColor = 'red';
  }
  if (g.maze[k][i][j].value === 'finish') {
    cell.style.backgroundColor = 'green';
  }
  if (mazeCell['up'] && mazeCell['down']){
    let arrow = document.createElement('span');
    arrow.textContent = '↕️';
    cell.appendChild(arrow);
    cell.style.textAlign = 'center'

  }
  else if (mazeCell['up']) {
    let arrow = document.createElement('span');
    arrow.textContent = '↑';
    cell.appendChild(arrow);
    cell.style.textAlign = 'center'
  }
  else if (mazeCell['down']) {
    let arrow = document.createElement('span');
    arrow.textContent = '↓';
    cell.appendChild(arrow);
    cell.style.textAlign = 'center'
  }

  cell.style.gridColumn = j + 1;
  cell.style.gridRow = i + 1;
  container.appendChild(cell);
}



console.log(g.toString());
