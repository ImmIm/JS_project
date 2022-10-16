import PriorityQueue from '../helperClasses/PriorityQueue.js';

export default class AStarSearch {
  #problem;

  constructor(problem) {
    this.#problem = problem;
  }

  AStarAlgorithm() {
    let startState = {
      state: this.#problem.startState,
      path: [],
      cost: 0,
      heuristic: this.heuristic(this.#problem.startState),
    };

    let frontier = new PriorityQueue(
      (state1, state2) =>
        state1.heuristic + state1.cost > state2.heuristic + state2.cost
    );

    frontier.push(startState);

    console.log(frontier);

    let visited = new Set();

    while (!frontier.isEmpty()) {
      console.log('iteration');
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
          cost: currentNode.steps + 1,
          heuristic: this.heuristic(currentNode.state),
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

  heuristic(state) {
    let goal = this.#problem.goalState;
    return (
      Math.abs(goal.layer - state.layer) +
      Math.abs(goal.row - state.row) +
      Math.abs(goal.column - state.column)
    );
  }
}
