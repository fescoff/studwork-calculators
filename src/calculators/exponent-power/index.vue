<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Заголовок:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.power"
            :show-validation="hasAttempt && validators.power.invalid"
            :validator="validators.power"
          >
            Степень <Formula text="x" />:
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
      <div class="title">Возведение экспоненты в степень</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`x = ${form.power}`" /></div>
        <div><Formula :text="`e ≈ 2,7182818284`" /></div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`{e}^{${form.power}} = ${decision}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
