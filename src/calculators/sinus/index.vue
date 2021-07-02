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
        <div class="row title">Выберите способ решения:</div>

        <div
          v-for="elem in calcOptions"
          :key="elem.type"
          class="row"
        >
          <SwRadio
            :active.sync="form.calcBy"
            color="white"
            :value="elem.type"
          >
            {{elem.label}}
          </SwRadio>
        </div>

        <div class="row" />

        <Transition
          name="fade"
          mode="out-in"
        >
          <div
            v-if="form.calcBy === 'degrees'"
            key="degrees"
            class="v-rhythm"
          >
            <div class="row title">
              Введите угол в градусах&nbsp;
            </div>

            <div class="row -inputs-list">
              <CalculatorInput
                v-model="form.degrees"
                :show-validation="hasAttempt && validators.degrees.invalid"
                :validator="validators.degrees"
              >
                Угол:
              </CalculatorInput>
            </div>
          </div>

          <div
            v-else-if="form.calcBy === 'radians'"
            key="radians"
            class="v-rhythm"
          >
            <div class="row title">
              Введите угол в радианах&nbsp;
            </div>

            <div class="row -inputs-list">
              <CalculatorInput
                v-model="form.radians"
                :show-validation="hasAttempt && validators.radians.invalid"
                :validator="validators.radians"
              >
                Угол:
              </CalculatorInput>
            </div>
          </div>

          <div
            v-else
            key="sides"
            class="v-rhythm"
          >
            <div class="row title">
              Введите длины сторон&nbsp;
            </div>

            <div class="row -inputs-list">
              <CalculatorInput
                v-model="form.sideA"
                :show-validation="hasAttempt && validators.sideA.invalid"
                :validator="validators.sideA"
              >
                Сторона A:
              </CalculatorInput>

              <CalculatorInput
                v-model="form.sideC"
                :show-validation="hasAttempt && validators.sideC.invalid"
                :validator="validators.sideC"
              >
                Сторона C:
              </CalculatorInput>
            </div>
          </div>
        </Transition>

        <SubmitButton />
      </form>
    </template>

    <template
      slot="decision"
      slot-scope="{ form, decision }"
    >
      <div class="title">Вычисление синуса угла</div>
      <div>
        <div class="title">Дано:</div>

        <template v-if="form.calcBy === 'degrees'">
          <div>
            Угол: <Formula :text="`${form.degrees}^\\circ`" />
          </div>
        </template>

        <template v-else-if="form.calcBy === 'radians'">
          <div>
            Угол: <Formula :text="`${form.radians} \\, rad`" />
          </div>
        </template>

        <template v-else>
          <div>
            <Formula
              :config="{ displayMode: true }"
              :text="`a = ${form.sideA}`"
            />
          </div>

          <div>
            <Formula
              :config="{ displayMode: true }"
              :text="`c = ${form.sideC}`"
            />
          </div>
        </template>
      </div>
      <div>
        <div class="title">Решение:</div>

        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`\\sin\\alpha = ${decision.steps}`"
          />
        </div>
      </div>
      <div />
      <div>
        <div class="title">Ответ:</div>

        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="`\\sin\\alpha=${decision.end}`"
          />
        </div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js">
</script>
