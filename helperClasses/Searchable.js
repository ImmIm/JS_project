export default class Searchable {
  #startState;
  #goalState;

  constructor(startState, goalState) {
    if (this.constructor === Searchable) {
      throw new Error("Abstract class Searcheble cannot be instantiated");
    }

    this.#startState = startState
    this.#goalState = goalState
  }
  
  get startState() {
    return this.#startState;
  }

  get goalState() {
    return this.#goalState;
  }

  reachedGoalState() {
    throw new Error("Method goalTest() must be implemented");
  }

  actions() {
    throw new Error("Methd actions() must be implemented");
  }

  getNextState() {
    throw new Error("Methd getNextState() must be implemented");
  }
}