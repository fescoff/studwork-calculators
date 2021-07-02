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
        <div class="row title">Введите радиус шара:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.radius"
            :show-validation="hasAttempt && validators.radius.invalid"
            :validator="validators.radius"
          >
            Радиус <Formula text="R" />:
          </CalculatorInput>
        </div>

        <SubmitButton />
      </form>
    </template>

    <template
      slot="decision"
      slot-scope="{ form, decision }"
    >
      <div class="title">Вычисление объема шара</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`R = ${form.radius}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`V = {4 \\over 3} \\cdot \\pi \\cdot R^3`"
          />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`V = {4 \\over 3} \\cdot 3.14 \\cdot ${form.radius}^3 = ${round(decision)}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`V = ${round(decision)}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js">
</script>
