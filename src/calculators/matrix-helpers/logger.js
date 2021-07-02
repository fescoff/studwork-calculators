export class CalcLogger {
  steps; // Array of steps
  result;
  ended;
  _id;
  matrix;

  constructor() {
    this.steps = [];
    this.ended = false;
    this.result = null;
    this.matrix = null;
    this._id = 0;
  }

  addStep({ text, isLatex = false, nextLine = false, big = false }) {
    if (this.ended) return;
    if (this.steps.length === 0) nextLine = false;
    this.steps.push({
      text,
      isLatex,
      nextLine,
      big,
      id: this._id++,
    });
  }

  removeLastStep(countOfSteps = 1) {
    if (this.ended) return;
    this.steps.splice(-countOfSteps);
  }

  end(result = null, matrix = null) {
    this.ended = true;
    this.result = result;
    this.matrix = matrix;
  }

  error(text) {
    this.addStep({
      text: 'Ошибка',
      nextLine: true,
    });
    this.addStep({ text, nextLine: true });

    this.ended = true;
    this.result = null;
    this.matrix = null;
  }

  merge(anotherLogger) {
    if (this.ended) return;
    anotherLogger.steps.forEach((elem, index) => {
      const copy = { ...elem };
      if (index === 0) copy.nextLine = true;
      copy.id = this._id++;
      this.steps.push(copy);
    });
  }
}

export default class MatrixLogger extends CalcLogger {}

export class FakeLogger extends CalcLogger {
  addStep() {}

  removeLastStep() {}

  end() {}
}
