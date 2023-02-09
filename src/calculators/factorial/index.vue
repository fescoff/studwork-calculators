<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите число:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.number"
            :show-validation="hasAttempt && validators.number.invalid"
            :validator="validators.number"
          >
            Число <Formula text="n" />:
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
      <div class="title">Факториал числа</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`n = ${form.number}`" /></div>
      </div>
      <div />
      <div>
        <div class="title">Решение:</div>
        <div>
          Формула нахождения факториала:
          <Formula
            :config="{ displayMode: true }"
            :text="`n! = 1 \\cdot 2 \\cdot … \\cdot n`"
          />
          <div>Где n – это число, а n! – факториал этого числа.</div>
        </div>
      </div>
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`${form.number}! = ${decision}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
