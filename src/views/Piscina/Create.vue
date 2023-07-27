<template>
  <div class="py-4 container-fluid">
    <div class="card">
      <div class="row" style="display: flex">
        <div class="col-md-8">
          <h2>Tratamento</h2>
        </div>
      </div>
      <!--Tela De Tratamento-->
      <div class="row">
        <div v-for="(form, index) in formsTratamento" :key="index" :class="form.col">
          <label>{{ form.label }}</label>
          <div>
            <input v-if="form.type === 'text'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" @input="onInputNumberOnly(form)" />
          </div>
        </div>
        <div class="col-12 mt-4" style="justify-content: right; display: flex">
          <div class="col-6" style="display: flex">
            <div class="col-6" style="margin-right: 15px;">
              <button id="btn-dark" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
            </div>
            <div class="col-6">
              <button id="btn-white" @click="Tratamento"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {createTratamento} from "@/views/Piscina/piscina_service";
export default {
  name: "create_tratamento",
  components: {
  },
  data() {
    return {
      formsTratamento: [
        {label: "Nome", type: "text", value: "", placeholder: "Nome Do Piscineiro", error: "", errorMessage: "", col: "col-md-4"},
        {label: "Empresa", type: "text", value: "", placeholder: "Nome Da Empresa", error: "", errorMessage: "", col: "col-md-4"},
        {label: "Cloro", type: "text", value: "", placeholder: "Cloro Da Piscina", error: "", errorMessage: "", col: "col-md-4"},
        {label: "Pha", type: "text", value: "", placeholder: "Pha Da Piscina", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Alcalinidade", type: "text", value: "", placeholder: "Alcalinidade", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Acidez", type: "text", value: "", placeholder: "Acidez Da Piscina", error: "", errorMessage: "", col: "col-md-12"},
      ],
    };
  },
  methods:{
    Tratamento() {
      debugger
      const tratamento = {
        'nome_piscineiro': this.formsTratamento[0].value,
        'nome_empresa': this.formsTratamento[1].value,
        'cloro': parseFloat(this.formsTratamento[2].value.replace(/,/g, '.')),
        'pha': parseFloat(this.formsTratamento[3].value.replace(/,/g, '.')),
        'alcalinidade': parseFloat(this.formsTratamento[4].value.replace(/,/g, '.')),
        'acidez': parseFloat(this.formsTratamento[5].value.replace(/,/g, '.')),
      };
      createTratamento(tratamento)
          .then((response) => {
            // Tratar a resposta do backend aqui
            console.log(response.data);
            this.$router.push("/piscina"); // Redirecionar após a criação do funcionário
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
    onInputNumberOnly(form) {
      if (form.label === 'Nome' || form.label === 'Empresa') {
        // Permite a entrada de texto para campos do tipo "text"
        return;
      }
      // Remove caracteres não numéricos do valor do campo
      form.value = form.value.replace(/[^\d.,]/g, '');
    },
  }
};
</script>
