<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите n:</div>
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
      <div class="title">Нахождение n-го тетраэдрального числа</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`n = ${form.number}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula :config="{ displayMode: true }" :text="`Tn= {n(n+1)(n+2) \\over 6}`" />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`Tn= {${form.number}(${form.number}+1)(${form.number}+2) \\over 6}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`Tn = ${round(decision)}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
