export default class DeapthFirstSearch {
   #problem;
 
   constructor(problem) {
     this.#problem = problem;
   }
 
   DFSAlgorithm() {
     let state = [this.#problem.startState, []];
 
     const stack = []; // LIFO queue
     stack.push(state);
     const visited = new Set();
 
     while (stack.length > 0) {
       let node = stack.shift();
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
             stack.push([nextNode[0], nextNode[1]]);
           }
         } else {
           nextNode[1].push(nextNode[0]);
         }
       }
     }
     console.log('No sollution');
     return false;
   }
 }
 