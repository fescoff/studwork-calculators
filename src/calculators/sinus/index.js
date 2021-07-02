import { inputNumber } from '@/utils';

import {
  scalarNumberValidator,
  angleValidator,
  radianValidator,
  radGrad,
} from '../utils';
import mixin from '../mixin';

const sinATEX = {
  '0': '0',
  '30': '{ 1 \\over 2 }',
  '45': '{ \\sqrt{2} \\over 2 }',
  '60': '{ \\sqrt{3} \\over 2 }',
  '90': '1',
  '120': '{ \\sqrt{3} \\over 2 }',
  '135': '{ \\sqrt{2} \\over 2 }',
  '150': '{ 1 \\over 2 }',
  '180': '0',
  '210': '{ -1 \\over 2 }',
  '225': '{ -\\sqrt{2} \\over 2 }',
  '240': '{ -\\sqrt{3} \\over 2 }',
  '270': '-1',
  '300': '{ -\\sqrt{3} \\over 2 }',
  '315': '{ -\\sqrt{2} \\over 2 }',
  '330': '{ -1 \\over 2 }',
  '360': '0',
};

const calcOptions = [
  {
    type: 'radians',
    label: 'По радианам',
  },
  {
    type: 'degrees',
    label: 'По градусам',
  },
  {
    type: 'sides',
    label: 'По сторонам',
  },
];

export default {
  mixins: [mixin],

  name: 'sinus',

  data() {
    return {
      calcOptions,
      form: {
        calcBy: 'degrees',

        degrees: '',
        radians: '',
        sideA: '',
        sideC: '',
      },
    };
  },

  computed: {
    degrees() {
      return inputNumber(this.form.degrees, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    radians() {
      return inputNumber(this.form.radians, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    sideC() {
      return inputNumber(this.form.sideC, {
        float: true,
        negative: false,
        divisional: false,
      });
    },

    sideA() {
      return inputNumber(this.form.sideA, {
        float: true,
        negative: false,
        divisional: false,
      });
    },

    validators() {
      switch (this.form.calcBy) {
        case 'radians':
          return {
            radians: radianValidator(this.radians),
          };

        case 'degrees':
          return {
            degrees: angleValidator(this.degrees),
          };

        case 'sides':
          return {
            sideC: scalarNumberValidator(this.sideC, 'Сторона C'),
            sideA: scalarNumberValidator(this.sideA, 'Сторона A'),
          };
      }
    },

    decision() {
      if (this.formInvalid) return null;

      switch (this.form.calcBy) {
        case 'degrees':
          return this.getDegreesDecision();

        case 'radians':
          return this.getRadiansDecision();

        case 'sides':
          return this.getSidesDecision();
      }
    },
  },

  methods: {
    getDegreesDecision() {
      const resultObj = {};
      let result;

      if (this.degrees in sinATEX) {
        result = sinATEX[this.degrees];
      } else {
        result = this.round(Math.sin((this.degrees * Math.PI) / 180), 5);
      }

      resultObj.steps = `\\sin ${this.degrees}^\\circ = ${result}`;

      resultObj.end = result;
      return resultObj;
    },

    getRadiansDecision() {
      const resultObj = {};
      let result;

      if (this.radians in radGrad) {
        result = sinATEX[radGrad[this.radians]];
      } else {
        result = this.round(Math.sin(this.radians), 5);
      }

      resultObj.steps = `\\sin ${this.radians} \\, rad = ${result}`;

      resultObj.end = result;
      return resultObj;
    },

    getSidesDecision() {
      const resultObj = {};
      const result = this.round(this.sideA / this.sideC, 5);

      resultObj.steps = `\\frac{a}{c} = \\frac{${this.sideA}}{${this.sideC}} = ${result}`;

      resultObj.end = result;
      return resultObj;
    },
  },
};
