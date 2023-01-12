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
      <div class="title">Нахождение n-го октаэдрального числа</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`n = ${form.number}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula :config="{ displayMode: true }" :text="`On= {n(2n^3 + 1) \\over 3}`" />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`On= {${form.number}(2 \\cdot ${Math.pow(
              form.number,
              2,
            )} + 1) \\over 3}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`On = ${round(decision)}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
