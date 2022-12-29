<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Введите число n:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.length"
            :show-validation="hasAttempt && validators.length.invalid"
            :validator="validators.length"
          >
            Число n <Formula text="" />:
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
      <div class="title">Заголовок</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`n = ${form.length}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          Последовательность чисел Фибоначчи определяется формулой
          <Formula :config="{ displayMode: true }" :text="`Fn = Fn-1 + Fn-2.`" />
          То есть, следующее число получается как сумма двух предыдущих.
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>Ряд чисел фибоначчи = {{ decision }}</div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
