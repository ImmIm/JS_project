import mazeAdapter from "../helperClasses/mazeToSearchableAdapter.js"
import AStarSearch from "./AStarSearch.js"
import BreadthFirstSearch from "./BFSSearch.js"
import DeapthFirstSearch from "./DFSSearch.js"


export default class SearchDemo {
    generator
    rows
    columns
    layers

    constructor(generator, rows, columns , layers){
        this.generator = generator
        this.rows = rows
        this.columns = columns
        this.layers = layers
    }

    run(problem = false){
        let maze;
        let adaptedMaze;
        if(!problem){
            maze = new this.generator(this.rows,this.columns,this.layers)
            adaptedMaze = new mazeAdapter(maze)
        }else{
            adaptedMaze = problem

        }
        


        const BFSSearch = new BreadthFirstSearch(adaptedMaze)
        console.log(BFSSearch.BFSAlgorithm());
        
        console.log('BFS Search. Iteration count: ', BFSSearch.iterationCounter);
        const DFSSearch = new DeapthFirstSearch(adaptedMaze)
        console.log(DFSSearch.DFSAlgorithm());
        console.log('DFS Search. Iteration count: ', DFSSearch.iterationCounter);
        const ASearch = new AStarSearch(adaptedMaze)
        console.log(ASearch.AStarAlgorithm());
        console.log('A* Search. Iteration count: ', ASearch.iterationCounter);
    }
}