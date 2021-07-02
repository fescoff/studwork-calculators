<template>
  <div class="calculator">
    <div
      v-if="stats"
      class="stats"
    >
      <span class="stats__item">
        Пример решили:
        <span class="stats__counter">
          {{stats.total}} {{ stats.total | plural('раз', 'раза', 'раз') }}
        </span>
      </span>
      <span class="stats__item">
        Сегодня решили:
        <span class="stats__counter">
          {{stats.today}} {{ stats.today | plural('раз', 'раза', 'раз') }}
        </span>
      </span>
    </div>
    <div
      ref="source"
      class="source"
    >
      <slot name="source" />
    </div>
    <SwTransitionHeight>
      <div
        v-if="loading"
        class="loading"
      >
        <SwSpinner />
      </div>
    </SwTransitionHeight>
    <SwTransitionHeight>
      <div
        v-if="decisionShowed && !loading"
        ref="decision"
        class="decision-outer"
      >
        <div class="decision">
          <slot
            name="decision"
            v-bind="decisionSlotData"
          />
        </div>
      </div>
    </SwTransitionHeight>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

import { scrollToElem } from '@/utils/scroll';

export default {
  props: {
    stats: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    decisionShowed: false,
    decisionSlotData: {},
  }),
  methods: {
    showDecision(data) {
      this.copyToLocal(data);
      this.decisionShowed = true;
      this.scrollToDecision();
    },

    copyToLocal(data) {
      /** клонируем полученные данные, чтобы передать их в слот с решением */
      this.decisionSlotData = cloneDeep(data);

      /**
       * здесь делаем преобразования данных из формы `form`.
       * преобразования исключительно визуальные -
       * запятые заменить на точки, убрать завершающую точку,
       * подставить ноль, если начинается с точки и т.п. -
       * для отображения в решении, в т.ч. внутри формул.
       */
      this.decisionSlotData.form &&
        Object.keys(this.decisionSlotData.form).forEach(key => {
          let value = this.decisionSlotData.form[key];

          switch (typeof value) {
            case 'string':
              value = value.trim();
              value = value.includes(',') ? value.replace(/,/g, '.') : value;
              value = /^\./.test(value) ? `0${value}` : value;
              value = /\.$/.test(value) ? value.slice(0, -1) : value;

              break;
          }

          this.decisionSlotData.form[key] = value;
        });
    },

    scrollToDecision() {
      this.$nextTick(() => scrollToElem(this.$refs.decision, { behavior: 'smooth' }));
    },
  },
};
</script>

<style
  src="./carcass.styl"
  lang="stylus"
  scoped
></style>
