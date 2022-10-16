export default class BreadthFirstSearch {
  #problem;
  #iterationCounter

  constructor(problem) {
    this.#problem = problem;
    this.#iterationCounter = 0

  }

  get iterationCounter(){
    return this.#iterationCounter
  }

  BFSAlgorithm() {
    let state = [this.#problem.startState, []];

    const queue = []; // LIFO queue
    queue.push(state);
    const visited = new Set();

    while (queue.length > 0) {
      this.#iterationCounter = visited.size
      let node = queue.pop();
      visited.add(node[0].hash);
      for (const action of this.#problem.actions(node[0])) {
        let nextNode = [
          this.#problem.getNextState(node[0], action),
          [...node[1]],
        ];

        if (!visited.has(nextNode[0].hash)) {
          if (this.#problem.reachedGoalState(nextNode[0])) {
            console.log('Sollution reached');
            nextNode[1].push(node[0], nextNode[0]);
            return nextNode[1];
          } else {
            nextNode[1].push(node[0]);
            queue.push([nextNode[0], nextNode[1]]);
          }
        } else {
          nextNode[1].push(nextNode[0]);
        }
      }
    }
    console.log('No sollution');
    return false;
  }

  run(){
    return this.BFSAlgorithm()
  }
}



 