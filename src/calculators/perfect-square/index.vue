<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Проверка на идеальный квадрат: </div>
        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.number"
            :show-validation="hasAttempt && validators.number.invalid"
            :validator="validators.number"
          >
            Число <formula text="a" /> :
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
      <div class="title">Проверка числа</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.number}`" /></div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>{{ decision }}</div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
