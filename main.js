import DFSMazeGenerator from './generator/DFSMazeGenerator.js';
import SimpleMazeGenerator from './generator/SimpleMazeGenerator.js';
import maze3D from './helperClasses/maze3d.js';
import WilsonMazeGenerator from './generator/WilsonMazeGenerator.js';
import MazeToSearchableAdapter from './helperClasses/mazeToSearchableAdapter.js'
import BreadthFirstSearch from './searchAlgorithms/BFSSearch.js';
import DeapthFirstSearch from './searchAlgorithms/DFSSearch.js'
import AStarSearch from './searchAlgorithms/AStarSearch.js';
import SearchDemo from './searchAlgorithms/SearchDemo.js';
import Maze from './ui/Maze.js'

import MazeWidget from './ui/MazeWidget.js';




// let demo = new SearchDemo(DFSMazeGenerator, 10, 10, 3)
// demo.run()

const body = document.getElementById('root');

const widget = new MazeWidget(body)

widget.renderWidget()



// body.append(form.createForm())






// let m = new DFSMazeGenerator(5, 5, 1);

// let g = new maze3D(m.maze);


// let t = new MazeToSearchableAdapter(m)


// let search = new BreadthFirstSearch(t)



// console.log(search.BFSAlgorithm());

// for (let k = 0; k < m.layers; k++) {
//   let mazeContainer = document.createElement('div');
//   mazeContainer.style.display = 'grid';
//   mazeContainer.style.gridTemplateColumns =
//     '1fr '.repeat(m.columns);
//   mazeContainer.style.gridTemplateRows =
//     '1fr'.repeat(m.rows);
//   mazeContainer.style.width = '50%';
//   mazeContainer.style.height = '50vh';
//   mazeContainer.style.border = '1px solid black';
//   mazeContainer.style.marginBottom = '10px'

//   for (let i = 0; i < m.rows; i++) {
//     for (let j = 0; j < m.columns; j++) {
//       createCell(k, i, j, mazeContainer);
//     }
//   }

// body.append(mazeContainer);

// }

//

// console.log(g.toString());
