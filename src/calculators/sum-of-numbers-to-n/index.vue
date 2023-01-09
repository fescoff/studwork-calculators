<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите число N:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.length"
            :show-validation="hasAttempt && validators.length.invalid"
            :validator="validators.length"
          >
            Число <Formula text="N" />:
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
      <div class="title">Расчет чисел от 1 до N</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`N = ${form.length}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`
          S= {N \\cdot(N+1)\\over2} `"
          />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`
          {${form.length}  \\cdot(${form.length}+1)\\over2} =${decision} `"
          />
        </div>
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
