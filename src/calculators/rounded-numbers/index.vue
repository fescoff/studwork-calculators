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
            Число :
          </CalculatorInput>
          <CalculatorInput
            v-model="form.length"
            :show-validation="hasAttempt && validators.length.invalid"
            :validator="validators.length"
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
        <div><Formula :text="`n = ${form.length}`" /></div>
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
