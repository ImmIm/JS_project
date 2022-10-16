export default class maze3D {
  #maze;

  constructor(maze) {
    this.#maze = maze;
  }

  get maze() {
    return this.#maze;
  }

  toString(cell) {
    let output = '';
    let counter = 1;

    for (const layer of this.#maze) {
      output += `Layer ${counter} \n\n`;
      counter++;

      output += '+';
      for (let i = 0; i < layer.length; i++) {
        output += '-+';
      }
      output += '\n';

      for (const row of layer) {
        let line1 = '|';
        let line2 = '+';
        for (const cell of row) {
          if (cell.value) {
            if (cell.value === 'finish') {
              line1 += 'F';
            } else if (cell.value === 'start') {
              line1 += 'S';
            }
          } else {
            if (cell.directions['up'] && cell.directions['down']) {
              line1 += '↕️';
            } else if (cell.directions['up']) {
              line1 += '↑';
            } else if (cell.directions['down']) {
              line1 += '↓';
            } else {
              line1 += ' ';
            }
          }

          if (cell.directions['right']) {
            line1 += ' ';
          } else {
            line1 += '|';
          }
          if (cell.directions['backward']) {
            line2 += ' +';
          } else {
            line2 += '-+';
          }
        }
        output += line1 + '\n';
        output += line2 + '\n';
      }
      output += '\n\n';
    }

    return output;
  }
}
