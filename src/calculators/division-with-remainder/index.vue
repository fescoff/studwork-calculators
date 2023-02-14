<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Выполнить деление чисел с остатком:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.dividend"
            :show-validation="hasAttempt && validators.dividend.invalid"
            :validator="validators.dividend"
          >
            Делимое <formula text="a" />:
          </CalculatorInput>
          <CalculatorInput
            v-model="form.divisor"
            :show-validation="hasAttempt && validators.divisor.invalid"
            :validator="validators.divisor"
          >
            Делитель <formula text="b" />:
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
      <div class="title">Деление с остатком</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.dividend}`" /></div>
        <div><Formula :text="`b = ${form.divisor}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`{${form.dividend}\\over${form.divisor}}= ${form.divisor} \\cdot ${decision.quotient} + ${decision.remainder}   `"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>
          <div>
            <Formula
              :text="`{${form.dividend}\\over${form.divisor}} = ${decision.quotient}`"
            />
          </div>
          <div><Formula :text="`остаток:${decision.remainder}`" /></div>
        </div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
