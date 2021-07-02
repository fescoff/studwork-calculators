<template>
  <Carcass
    ref="carcass"
    :stats="stats"
  >
    <template slot="source">
      <MatrixCarcass ref="matrixCarcass">
        <template slot="source">
          <form
            class="v-rhythm"
            @submit.prevent="doMatrix"
          >
            <div class="row title">Задайте размер матриц:</div>

            <div class="grid-inputs-list">
              <div class="grid-inputs-list__text">
                Число строк
              </div>

              <div class="grid-inputs-list__input">
                <SwInput
                  :show-validation="matrixHasAttempt && matrixValidators.rows.invalid"
                  :validator="matrixValidators.rows"
                >
                  <input v-model="matrixForm.rows">
                </SwInput>
              </div>

              <div class="grid-inputs-list__text">
                Число столбцов
              </div>

              <div class="grid-inputs-list__input">
                <SwInput
                  :show-validation="matrixHasAttempt && matrixValidators.cols.invalid"
                  :validator="matrixValidators.cols"
                >
                  <input v-model="matrixForm.cols">
                </SwInput>
              </div>
            </div>

            <ContinueButton />
          </form>
        </template>

        <template slot="matrixInput">
          <form
            class="v-rhythm"
            @submit.prevent="confirmMatrix"
          >
            <div class="row title">Задайте значения матриц:</div>

            <div class="row">
              <MatrixInput
                class="col"
                :matrix.sync="matrices.matrix1"
                :attempt="hasAttempt"
                :validators="matriceValidators.matrix1"
              />

              <Formula :text="`\\, \\, + \\,\\,`" />

              <MatrixInput
                class="col"
                :matrix.sync="matrices.matrix2"
                :attempt="hasAttempt"
                :validators="matriceValidators.matrix2"
              />
            </div>

            <SubmitButton />
          </form>
        </template>
      </MatrixCarcass>
    </template>

    <template
      slot="decision"
      slot-scope="{ matrixForm, decision }"
    >
      <div class="title">Вычисление суммы матриц</div>

      <div>
        <div class="title">Решение:</div>

        <LoggerViewer :logger="decision.logger" />
      </div>

      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>
          <Formula
            :config="{ displayMode: true }"
            :text="decision.end.toLatex()"
          />
        </div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js"></script>
