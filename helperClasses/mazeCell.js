export default class Cell {
  #directions;
  #value;
  #layer;
  #row;
  #column;
  #hash
  

  constructor(layer, row, col, value) {
    this.#directions = {
      right: false,
      left: false,
      forward: false,
      backward: false,
      up: false,
      down: false,
    };
    this.#row = row;
    this.#column = col;
    this.#value = value;
    this.#layer = layer;
    this.#hash = `${this.#layer}, ${this.#row}, ${this.#column}`
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  get layer() {
    return this.#layer;
  }

  get hash(){
    return this.#hash
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get directions() {
    return this.#directions;
  }

  set directions(directions) {
    this.#directions = directions;
  }

  get coordinate() {
    return `${this.#layer}, ${this.#row}, ${this.#column}`;
  }

  deleteWall(direction) {
    this.#directions[direction] = true;
  }
}
