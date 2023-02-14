import formula from '../formula';

<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Округлить число:</div>
        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.number"
            :show-validation="hasAttempt && validators.number.invalid"
            :validator="validators.number"
          >
            Число <formula text="a" />:
          </CalculatorInput>
          <CalculatorInput
            v-model="form.precision"
            :show-validation="hasAttempt && validators.precision.invalid"
            :validator="validators.precision"
          >
            Количество цифр после запятой:
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
      <div class="title">Округление числа</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.number}`" /></div>
        <div>Чисел после запятой: <Formula :text="`${form.precision}`" /></div>
      </div>

      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`${decision}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
