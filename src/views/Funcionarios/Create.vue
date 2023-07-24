<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="row">
            <div v-for="(form, index) in forms" :key="index" :class="form.col">
              <label v-if="form.type !== 'password' || (form.type === 'password' && this.forms[1].value === 'admin')">{{ form.label }}</label>
              <div>
                <input v-if="form.type === 'text'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" />
                <div v-else-if="form.type === 'radio'" class="form-check">
                  <label v-for="(option, optionIndex) in form.options" :key="optionIndex" class="form-check-label">
                    <input v-model="form.value" :type="form.type" :value="option.value" :name="form.label" class="form-check-input" />{{ option.label }}
                  </label>
                </div>
                <div v-if="this.forms[1].value === 'admin'">
                  <input v-if="form.type === 'password'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row mt-4" style="justify-content: right;">
              <div class="col-6" style="display: flex">
                <div class="col-6" style="margin-right: 15px;">
                  <button id="btn-dark" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
                </div>
                <div class="col-6">
                  <button id="btn-white" @click="createFuncionario"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
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
import { createFuncionarios } from "./funcionarios_service";
export default {
  name: "create_funcionario",
  components: {

  },
  data() {
    return {
      forms: [
        {label: "Nome", type: "text", value: "", placeholder: "Nome Do Funcionario", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Cargo", type: "radio", value: "piscineiro", options: [{ label: "Piscineiro", value: "piscineiro" }, { label: "Faxineiro", value: "faxineiro" }, { label: "Cozinheiro", value: "Cozinheiro" }, { label: "Admin", value: "admin" }], error: false, errorMessage: "", col: "col-md-6"},
        {label: "Genero", type: "text", value: "", placeholder: "Genero Do Funcionario", error: "", errorMessage: "", col: "col-md-4"},
        {label: "E-mail", type: "text", value: "", placeholder: "Email Do Funcionario", error: "", errorMessage: "", col: "col-md-8"},
        {label: "Senha", type: "password", value: "", placeholder: "Senha Do Admin", error: "", errorMessage: "", col: "col-md-12", },
      ]
    };
  },
  methods: {
    createFuncionario() {
      debugger
      const funcionario = {
        'nome': this.forms[0].value,
        'cargo': this.forms[1].value,
        'genero': this.forms[2].value,
        'email': this.forms[3].value,
        'password': this.forms[4].value,
      };

      // Chamar a função para enviar a requisição POST
      createFuncionarios(funcionario)
        .then((response) => {
          // Tratar a resposta do backend aqui
          console.log(response.data);
          this.$router.push("/funcionarios"); // Redirecionar após a criação do funcionário
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
