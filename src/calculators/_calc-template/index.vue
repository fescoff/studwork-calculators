<template>
  <Carcass
    ref="carcass"
    :stats="stats"
  >
    <template slot="source">
      <form
        class="v-rhythm"
        @submit.prevent="doDecision"
      >
        <div class="row title">Заголовок:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.sideA"
            :show-validation="hasAttempt && validators.sideA.invalid"
            :validator="validators.sideA"
          >
            Сторона <Formula text="a" />:
          </CalculatorInput>
          <CalculatorInput
            v-model="form.sideB"
            :show-validation="hasAttempt && validators.sideB.invalid"
            :validator="validators.sideB"
          >
            Сторона <Formula text="b" />:
          </CalculatorInput>
        </div>

        <SwTransitionHeight>
          <div
            v-if="hasAttempt && errorMessage"
            class="row"
          >
            <div class="msg error">{{ errorMessage }}</div>
          </div>
        </SwTransitionHeight>

        <SubmitButton />
      </form>
    </template>

    <template
      slot="decision"
      slot-scope="{ form, decision }"
    >
      <div class="title">Заголовок</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.sideA}`" /></div>
        <div><Formula :text="`b = ${form.sideB}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`S= a \\cdot b`"
          />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`S= ${form.sideA} \\cdot ${form.sideB} = ${round(decision)}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`S = ${round(decision)}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js">
</script>
