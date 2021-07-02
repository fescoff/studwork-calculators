<template>
  <div id="app">
    <SwContainer fill="gray">
      <Content>
        <h1>Calculators list</h1>

        <div class="reference-page">
          <div class="calculators article">
            <div
              v-for="calc in calculators"
              :key="calc.id"
              class="calculators__elem"
            >
              <h2 class="calculators__elem__title">
                {{ calc.title }}
              </h2>

              <Component
                :is="calc.component"
                class="calculators__elem__component"
              />
            </div>
          </div>
        </div>
      </Content>
    </SwContainer>
  </div>
</template>

<script>
import Content from '@/components/content';

import { calculators } from './calculators/calculators';

export default {
  name: 'App',

  components: {
    Content,
  },

  computed: {
    calculators() {
      return Object.entries(calculators).map(([key, value]) => ({
        id: key,
        ...value,
      }));
    },
  },
};
</script>

<style src="./style/index.unscoped.styl" lang="stylus"></style>
<style src="./style/index.styl" lang="stylus"></style>

<style lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
