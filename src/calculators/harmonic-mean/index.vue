<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите набор чисел через любой разделитель::</div>
        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.numbers"
            :show-validation="hasAttempt && validators.numbers.invalid"
            :validator="validators.numbers"
          >
            Введите значения :
          </CalculatorInput>
        </div>
        <SwTransitionHeight>
          <div v-if="hasAttempt && errorMessage" class="row">
            <div class="msg error">{{ errorMessage }}</div>
          </div>
        </SwTransitionHeight>
        <SubmitButton />
      </form>
    </template>
    <template slot="decision" slot-scope="{ form, decision }">
      <div class="title">Среднее гармоническое</div>
      <div>
        <div class="title">Дано:</div>
        <div>Числа: <Formula :text="` ${numbers}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`x = {${numbers.length} \\over ${numbers
              .map(num => `{1 \\over ${num} }`)
              .join(' + ')} }`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>Среднее геометрическое: <Formula :text="`${round(decision)}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
