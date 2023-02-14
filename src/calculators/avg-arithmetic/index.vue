<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите набор чисел через запятую или пробел:</div>
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
      <div class="title">Среднее арифметическое</div>
      <div>
        <div class="title">Дано:</div>
        <div>Числа: <Formula :text="` ${numbers}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`S =
          {{${numbers.join('+')}}\\over{${numbers.length}}}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>Cреднее арифметическое: <Formula :text="`${decision}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
