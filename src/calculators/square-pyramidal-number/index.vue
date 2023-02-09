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
      <div class="title">Нахождение n-го пирамидального числа</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`n = ${form.number}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`Pn =\\sum_{k=1}^n{k^2} = {n(n+1)(2n+1)\\over 6} = {2n^3+3n^2+n \\over6}`"
          />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`Pn= {${Math.pow(form.number, 3) * 2}+${
              Math.pow(form.number, 2) * 3
            }+${form.number}\\over 6}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`Pn = ${decision}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
