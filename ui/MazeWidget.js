import DFSMazeGenerator from '../generator/DFSMazeGenerator.js';
import SimpleMazeGenerator from '../generator/SimpleMazeGenerator.js';
import WilsonMazeGenerator from '../generator/WilsonMazeGenerator.js';
import mazeAdapter from '../helperClasses/mazeToSearchableAdapter.js';
import AStarSearch from '../searchAlgorithms/AStarSearch.js';
import BreadthFirstSearch from '../searchAlgorithms/BFSSearch.js';
import DeapthFirstSearch from '../searchAlgorithms/DFSSearch.js';
import SearchDemo from '../searchAlgorithms/SearchDemo.js';
import Maze from './Maze.js';

export default class MazeWidget {
  #form = `<section id="formsSection">
    <form id="MazeGenerationForm" validate>
      <div>
        <label for="inputName">Name</label>
        <input type="text" id="inputName" name="inputName" required />
      </div>
      <div>
        <label for="inputLayers">Layers</label>
        <input
          type="number"
          id="inputLayers"
          name="inputLayers"
          required
          min="1"
          max="3"
        />
      </div>
      <div>
        <label for="inputRows">Rows</label>
        <input
          type="number"
          id="inputRows"
          name="inputRows"
          required
          min="1"
          max="100"
        />
      </div>
      <div>
        <label for="inputColumn">Cols</label>
        <input
          type="number"
          id="inputColumn"
          name="inputColumn"
          required
          min="1"
          max="100"
        />
      </div>

      <div>
        <label for="generators">Choose a generator:</label>

        <select id="generators" name="generators">
          <option value="Simple">Simple</option>
          <option value="DFS">DFS</option>
          <option value="Wilson" selected>Wilson</option>
        </select>
      </div>
      <div id="submitMaze">
        <button type="submit">Generate maze and start game</button>
      </div>
    </form>

    <form id="searchForm" validate>
      <label> Search Algorithms </label>
      <select id="searchAlgo">
        <option value="DFS">DFS Algorithm</option>
        <option value="BFS">BFS Algorithm</option>
        <option value="A" selected>A* Algorithm</option>
      </select>
      <div id="solveGame">
        <button id="solveGameBtn">Solve Game</button>
      </div>
      <div id="runDemo">
      <button id="RunDemoBtn">Run demo</button>
    </div>
    </form>
    </section>`;

  #root;
  #maze;
  #layers;
  #rows;
  #columns;
  #generator;
  #currentLayer;
  #search;

  constructor(root) {
    this.#root = root;
  }

  set rows(rows) {
    this.#rows = rows;
  }

  set layers(layers) {
    this.#layers = layers;
  }
  set columns(columns) {
    this.#columns = columns;
  }

  set generator(generator) {
    this.#generator = generator;
  }

  set maze(maze) {
    this.#maze = maze;
  }

  get maze() {
    return this.#maze;
  }

  set currentLayer(layer) {
    this.#currentLayer = layer;
  }

  renderWidget() {
    this.#root.innerHTML += this.#form;

    const player = document.createElement('div')

    player.style.width

    const generationFormData = document.getElementById('MazeGenerationForm');

    generationFormData.addEventListener('submit', (e) => {
      e.preventDefault();
      const prevMaze = document.querySelector('.Maze-container');
      if (prevMaze) {
        prevMaze.remove();
      }
      this.#rows = document.querySelector('#inputRows').value;
      this.#layers = document.querySelector('#inputLayers').value;
      this.#columns = document.querySelector('#inputColumn').value;

      this.#generator = this.getGeneratorConstructor(
        document.querySelector('#generators').value
      );

      this.#root.append(
        this.renderMaze(
          this.#layers,
          this.#rows,
          this.#columns,
          this.#generator
        )
      );
    });

    const searchForm = document.querySelector('#searchForm');
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.#generator) {
        const adaptedMaze = new mazeAdapter(this.#maze);
        const searchEngineConstructor = this.getSearchEngine(
          document.querySelector('#searchAlgo').value
        );

        const searchEngine = new searchEngineConstructor(adaptedMaze);
        console.log(searchEngine.run());
      } else {
        console.log('You need to generate maze firstly');
      }
    });

    const runDemo = document.querySelector('#RunDemoBtn');
    runDemo.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.#generator) {
        console.log('Search demo started');
        const demo = new SearchDemo(
          this.#generator,
          this.#rows,
          this.#columns,
          this.#layers
        );
        const adaptedMaze = new mazeAdapter(this.#maze);
        demo.run(adaptedMaze);
      } else {
        console.log('You need to generate maze firstly');
      }
    });
  }

  renderMaze(layers, rows, columns) {
    let mazeElement;

    this.#maze = new this.#generator(rows, columns, layers);
    mazeElement = new Maze(this.#maze);
    return mazeElement.renderMaze(this.#maze.start.layer);
  }

  getGeneratorConstructor(generator) {
    switch (generator) {
      case 'Wilson':
        this.#generator = WilsonMazeGenerator;
        return this.#generator;
      case 'Simple':
        this.#generator = SimpleMazeGenerator;
        return this.#generator;
      case 'DFS':
        this.#generator = DFSMazeGenerator;
        return this.#generator;
      default:
        mazeElement = document.createElement('div');
        mazeElement.innerHTML += 'ERROR';
        return mazeElement;
    }
  }

  getSearchEngine(name) {
    switch (name) {
      case 'DFS':
        this.#search = DeapthFirstSearch;
        return this.#search;

      case 'BFS':
        this.#search = BreadthFirstSearch;
        return this.#search;

      case 'A':
        this.#search = AStarSearch;
        return this.#search;

      default:
        console.err('Unexpected error');
        break;
    }
  }
}
