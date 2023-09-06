<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="row">
            <div v-for="(form, index) in forms" :key="index" :class="form.col">
              <label>{{ form.label }}</label>
              <div>
                <input v-if="form.type === 'text'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" @input="restrictToNumbers"/>
              </div>
            </div>
            <div class="row mt-4" style="justify-content: right;">
              <div class="col-6" style="display: flex">
                <div class="col-6" style="margin-right: 15px;">
                  <button id="btn-dark" @click="getPage" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
                </div>
                <div class="col-6">
                  <button id="btn-white" @click="createFinanceiro"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createFinanceiro} from "@/views/Financeiro/financeiro_service";
export default {
  name: "create_ganhos",
  components: {

  },
  data() {
    return {
      forms: [
        {label: "Ganhos", type: "text", value: "", placeholder: "Ganhos do mes", error: "", errorMessage: "", col: "col-md-12"},
      ]
    };
  },
  methods: {
    getPage() {
      this.$router.push('/dashboard-default')
    },
    restrictToNumbers() {
      // Remove todos os caracteres não numéricos do valor do input
      this.forms[0].value = this.forms[0].value.replace(/[^0-9]/g, '');
    },
    createFinanceiro() {
      const custos = {
        'ganhos': parseFloat(this.forms[0].value),
      };

      // Chamar a função para enviar a requisição POST
      createFinanceiro(custos)
          .then((response) => {
            // Tratar a resposta do backend aqui
            console.log(response.data);
            this.$router.push("/dashboard-default"); // Redirecionar após a criação do funcionário
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
  }
};
</script>

<style>
.card{
  padding: 25px !important;
}
.form-check-label{
  margin-right: 30px !important;
}
.form-check-input:checked[type=radio]{
  background-image: linear-gradient(310deg, #2dce89 0%, #2dcecc 100%) !important;
}
</style>
