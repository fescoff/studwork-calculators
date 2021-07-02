import { inputNumber } from '@/utils';

import {
  scalarNumberValidator,
  angleValidator,
  radianValidator,
  radGrad,
} from '../utils';
import mixin from '../mixin';

const cosATEX = {
  '0': '{ 1 }',
  '30': ' {\\sqrt{3} \\over 2 } ',
  '45': ' { \\sqrt{2} \\over 2 }',
  '60': ' {1 \\over 2} ',
  '90': '  0 ',
  '120': '{ -1 \\over 2}',
  '135': '{ -\\sqrt{2} \\over 2 }',
  '150': '{-\\sqrt{3} \\over 2 }',
  '180': ' -1 ',
  '210': '{-\\sqrt{3} \\over 2 }',
  '225': '{ -\\sqrt{2} \\over 2 }',
  '240': '{ -1 \\over 2}',
  '270': ' 0 ',
  '300': '{ 1 \\over 2}',
  '315': '{ \\sqrt{2} \\over 2 }',
  '330': '{\\sqrt{3} \\over 2 }',
  '360': ' 1 ',
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

  name: 'cosine',

  data() {
    return {
      calcOptions,
      form: {
        calcBy: 'degrees',

        degrees: '',
        radians: '',
        sideB: '',
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

    sideB() {
      return inputNumber(this.form.sideB, {
        float: true,
        negative: false,
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
            sideB: scalarNumberValidator(this.sideB, 'Сторона B'),
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

      if (this.degrees in cosATEX) {
        result = cosATEX[this.degrees];
      } else {
        result = this.round(Math.cos((this.degrees * Math.PI) / 180), 5);
      }

      resultObj.steps = `\\cos ${this.degrees}^\\circ = ${result}`;

      resultObj.end = result;
      return resultObj;
    },

    getRadiansDecision() {
      const resultObj = {};
      let result;

      if (this.radians in radGrad) {
        result = cosATEX[radGrad[this.radians]];
      } else {
        result = this.round(Math.cos(this.radians), 5);
      }

      resultObj.steps = `\\cos ${this.radians} \\, rad = ${result}`;

      resultObj.end = result;
      return resultObj;
    },

    getSidesDecision() {
      const resultObj = {};
      const result = this.round(this.sideB / this.sideC, 5);

      resultObj.steps = `\\frac{b}{c} = \\frac{${this.sideB}}{${this.sideC}} = ${result}`;

      resultObj.end = result;
      return resultObj;
    },
  },
};
