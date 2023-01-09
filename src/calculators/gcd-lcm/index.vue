<template>
  <Carcass ref="carcass" :stats="stats">
    <template slot="source">
      <form class="v-rhythm" @submit.prevent="doDecision">
        <div class="row title">Найти НОД и НОК:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.a"
            :show-validation="hasAttempt && validators.a.invalid"
            :validator="validators.a"
          >
            Число <Formula text="a" />:
          </CalculatorInput>
          <CalculatorInput
            v-model="form.b"
            :show-validation="hasAttempt && validators.b.invalid"
            :validator="validators.b"
          >
            Число <Formula text="b" />:
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
      <div class="title">Вычесление НОД и НОК</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.a}`" /></div>
        <div><Formula :text="`b = ${form.b}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>1)Разложим числа на простые множители:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`${form.a}= ${decision.factorsA}`"
          />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`${form.b}= ${decision.factorsB}`"
          />
        </div>
        <div>
          2) Найдём общие множители введённых чисел:
          {{ decision.commonFactors.join(',') ? decision.commonFactors.join(',') : 1 }}
        </div>
        <div>
          3)
          <Formula
            :config="{ displayMode: true }"
            :text="`НОД= ${
              decision.commonFactors.length > 0
                ? decision.commonFactors.join('\\cdot')
                : 1
            }`"
          />
        </div>
        <div>
          4)
          <Formula
            :config="{ displayMode: true }"
            :text="`НОК = {a\\cdot b\\overНОД} = {${form.a}\\cdot${form.b}\\over${decision.gcd}} = ${decision.lcm} `"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>
          <Formula :text="`НОД(${form.a},${form.b}) = ${decision.gcd}`" />
        </div>
        <div>
          <Formula :text="`НОК(${form.a},${form.b}) = ${decision.lcm} `" />
        </div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
