<template>
  <Carcass
    ref="carcass"
    :stats="stats"
  >
    <template slot="source">
      <form
        class="v-rhythm"
        @submit.prevent="doDecision"
      >
        <div class="row title">Задайте сторону квадрата&nbsp; <Formula text="a" />:</div>

        <div class="row -inputs-list">
          <CalculatorInput
            v-model="form.sideA"
            :show-validation="hasAttempt && validators.sideA.invalid"
            :validator="validators.sideA"
          >
            Длина стороны <Formula text="a" />:
          </CalculatorInput>
        </div>

        <SubmitButton />
      </form>
    </template>

    <template
      slot="decision"
      slot-scope="{ form, decision }"
    >
      <div class="title">Вычисление периметра квадрата по заданной стороне</div>
      <div>
        <div class="title">Дано:</div>
        <div><Formula :text="`a = ${form.sideA}`" /></div>
      </div>
      <div>
        <div class="title">Решение:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`P= a \\cdot 4`"
          />
        </div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`P= ${form.sideA} \\cdot 4 = ${round(decision)}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>
        <div><Formula :text="`S = ${round(decision)}`" /></div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js">
</script>
