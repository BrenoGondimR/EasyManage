<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="row">
            <div v-for="(form, index) in forms" :key="index" :class="form.col">
              <label>{{ form.label }}</label>
              <div>
                <input v-if="form.type === 'text'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" />
              </div>
            </div>
            <div class="row mt-4" style="justify-content: right;">
              <div class="col-6" style="display: flex">
                <div class="col-6" style="margin-right: 15px;">
                  <button id="btn-dark" @click="getPage" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
                </div>
                <div class="col-6">
                  <button id="btn-white" @click="createFornecedor"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
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
import { createFornecedor } from "@/views/Fornecedores/fornecedores_service";
export default {
  name: "create_fornecedor",
  components: {

  },
  data() {
    return {
      forms: [
        {label: "Fornecedor", type: "text", value: "", placeholder: "Nome Do Fornecedor", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Cidade", type: "text", value: "", placeholder: "Cidade", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Contato", type: "text", value: "", placeholder: "Telefone", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Nota", type: "text", value: "", placeholder: "Avaliação", error: "", errorMessage: "", col: "col-md-6"},
      ]
    };
  },
  methods: {
    getPage() {
      this.$router.push('/fornecedores')
    },
    createFornecedor() {
      const fornecedor = {
        'fornecedor': this.forms[0].value,
        'cidade': this.forms[1].value,
        'contato': this.forms[2].value,
        'nota': parseFloat(this.forms[3].value),
      };

      // Chamar a função para enviar a requisição POST
      createFornecedor(fornecedor)
        .then((response) => {
          // Tratar a resposta do backend aqui
          console.log(response.data);
          this.$router.push("/fornecedores"); // Redirecionar após a criação do funcionário
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
