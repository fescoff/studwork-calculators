<template>
  <Carcass
    ref="carcass"
    :stats="stats"
  >
    <template slot="source">
      <MatrixCarcass
        ref="matrixCarcass"
        hide-matrix-form
      >
        <template slot="matrixInput">
          <form
            class="v-rhythm"
            @submit.prevent="confirmMatrix"
          >
            <div class="row title">Задайте значения векторов:</div>

            <div class="row">
              <VectorsInput
                class="col"
                :validators="matriceValidators.vectors"
                :attempt="hasAttempt"
                :vectors.sync="matrices.vectors"
              />
            </div>

            <SubmitButton />
          </form>
        </template>
      </MatrixCarcass>
    </template>

    <template
      slot="decision"
      slot-scope="{ form, decision }"
    >
      <div class="title">Вычисление результата</div>
      <div>
        <div class="title">Дано:</div>

        <div>
          <Formula
            :text="decision.given.a"
            :config="{ displayMode: true }"
          />
        </div>

        <div>
          <Formula
            :text="decision.given.b"
            :config="{ displayMode: true }"
          />
        </div>
      </div>

      <div>
        <div class="title">Решение:</div>

        <div>
          <Formula
            :text="decision.solution"
            :config="{ displayMode: true }"
          />
        </div>
      </div>

      <div />
      <div>
        <div class="title">Ответ:</div>
        <div>
          <Formula
            :text="decision.answer"
            :config="{ displayMode: true }"
          />
        </div>
      </div>
    </template>
  </Carcass>
</template>

<script src="./index.js">
</script>
