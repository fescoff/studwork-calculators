<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите число и степень:</div>
        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.number"
            :show-validation="hasAttempt && validators.number.invalid"
            :validator="validators.number"
          >
            Число: <Formula text="a" />:
          </CalculatorInput>
          <CalculatorInput
            v-model="form.power"
            :show-validation="hasAttempt && validators.power.invalid"
            :validator="validators.power"
          >
            Возвести в степень: <Formula text="n" />:
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
      <div class="title">Возведение числа в степень</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.number}`" /></div>
        <div><Formula :text="`n = ${form.power}`" /></div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`{${form.number}}^{${form.power}} = ${decision}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
