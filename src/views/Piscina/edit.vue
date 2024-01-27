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
            <input v-else-if="form.type === 'data'" v-model="form.value" :type="form.type" @input="formatarDataInput" :placeholder="form.placeholder" class="form-control" />
          </div>
        </div>
        <div class="col-12 mt-4" style="justify-content: right; display: flex">
          <div class="col-6" style="display: flex">
            <div class="col-6" style="margin-right: 15px;">
              <button id="btn-dark" @click="getPage" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
            </div>
            <div class="col-6">
              <button id="btn-white" @click="EditTratamento"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { editTratamento, getPiscinaId } from "@/views/Piscina/piscina_service";
import { formatDate } from "@/utils";
export default {
  name: "edit_piscina",
  components: {
  },
  data() {
    return {
      type: "Tratamento",
      ID: '',
      estado: "",
      formsTratamento: [
        {label: "Nome", type: "text", value: "", placeholder: "Nome Do Piscineiro", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Empresa", type: "text", value: "", placeholder: "Nome Da Empresa", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Data", type: "data", value: "", placeholder: "Data (DD/MM/YYYY)", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Cloro (PPM)", type: "text", value: "", placeholder: "Cloro Da Piscina", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Pha", type: "text", value: "", placeholder: "Pha Da Piscina", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Alcalinidade", type: "text", value: "", placeholder: "Alcalinidade", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Acidez", type: "text", value: "", placeholder: "Acidez Da Piscina", error: "", errorMessage: "", col: "col-md-12"},
      ],
    };
  },
  methods:{
    getPage() {
      this.$router.push('/piscina')
    },
    EditTratamento() {
      let id = this.ID
      // Split the date into day, month, and year
      const parts = this.formsTratamento[2].value.split('/');
      const dia = parts[0];
      const mes = parts[1];
      const ano = parts[2];
      // Format the date as "AAAA-MM-DD" to ensure it's correctly parsed by Go's time package
      const dataFormatada = `${ano}-${mes}-${dia}T00:00:00Z`;
      const tratamento = {
        'type': this.type,
        'estado': this.estado,
        'nome_piscineiro': this.formsTratamento[0].value,
        'nome_empresa': this.formsTratamento[1].value,
        'data': dataFormatada,
        'cloro': parseFloat(this.formsTratamento[3].value),
        'pha': parseFloat(this.formsTratamento[4].value),
        'alcalinidade': parseFloat(this.formsTratamento[5]),
        'acidez': parseFloat(this.formsTratamento[6].value),
        'estabelecimento_id': localStorage.getItem('estabId'),
      };
      editTratamento(tratamento, id)
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
    formatarDataInput() {
      // Obtém o valor atual do campo
      let value = this.formsTratamento[2].value;

      // Remove caracteres não numéricos
      value = value.replace(/\D/g, '');

      // Aplica a máscara DD/MM/YYYY
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9);
      }

      // Atualiza o valor do campo
      this.formsTratamento[2].value = value;
    },
    getAllInfosPiscina() {
      getPiscinaId(this.ID, localStorage.getItem('estabId'))
        .then((response) => {
          // Supondo que você deseja preencher apenas com o primeiro registro obtido
          const tratamento = response.data.data;
          this.formsTratamento[0].value = tratamento.nome_piscineiro;
          this.formsTratamento[2].value = formatDate(tratamento.data);
          this.formsTratamento[1].value = tratamento.nome_empresa;
          this.formsTratamento[3].value = tratamento.cloro;
          this.formsTratamento[4].value = tratamento.pha;
          this.formsTratamento[5].value = tratamento.alcalinidade;
          this.formsTratamento[6].value = tratamento.acidez;
          this.type = tratamento.type;
          this.estado = tratamento.estado;
        })
        .catch((error) => {
          // Tratar erros aqui, caso ocorram
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
  },
  created() {
    this.ID = this.$route.params.id;
    this.getAllInfosPiscina()
  }
};
</script>
