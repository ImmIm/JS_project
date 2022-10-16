import PriorityQueue from '../helperClasses/PriorityQueue.js';

export default class AStarSearch {
  #problem;
  #iterationCounter

  constructor(problem) {
    this.#problem = problem;
    this.#iterationCounter = 0

  }

  get iterationCounter(){
    return this.#iterationCounter
  }

  AStarAlgorithm() {
    let startState = {
      state: this.#problem.startState,
      path: [],
      cost: 0,
      heuristic: this.heuristic(this.#problem.startState , 0),
    };

    let frontier = new PriorityQueue(
      (state1, state2) =>
        state1.heuristic + state1.cost < state2.heuristic + state2.cost
    );

    frontier.push(startState);
    let visited = new Set();

    while (!frontier.isEmpty()) {
      this.#iterationCounter = visited.size
      let currentNode = frontier.pop();
      visited.add(currentNode.state.hash);

      if (this.#problem.reachedGoalState(currentNode.state)) {
        console.log('Sucsess');
        currentNode.path.push(currentNode.state);
        return currentNode.path;
      }

      for (const action of this.#problem.actions(currentNode.state)) {
        let nextNode = {
          state: this.#problem.getNextState(currentNode.state, action),
          path: [...currentNode.path, currentNode.state],
          cost: currentNode.cost + 1,
          heuristic: this.heuristic(currentNode.state, currentNode.cost + 1),
        };

        if (!visited.has(nextNode.state.hash)) {
          if (!frontier.has(nextNode)) {
            frontier.push(nextNode);
          } else if (frontier.peek() >= nextNode) {
            frontier.pop();
            frontier.push(nextNode);
          }
        }
      }
    }
    console.log('Sollution not found');
    return false;
  }

  run(){
    return this.AStarAlgorithm()
  }

  heuristic(state, d) {
    let goal = this.#problem.goalState;

    let dz = Math.abs(state.layer - goal.layer)
    let dx = Math.abs(state.row - goal.row)
    let dy = Math.abs(state.column - goal.column)

    return  d * (dx + dy + dz) + (d - 2 * 1) * Math.min(dx, dy, dz)
  }
}
