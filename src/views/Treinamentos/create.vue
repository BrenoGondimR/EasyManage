<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="row">
            <div class="col-md-8">
              <h2>Treinamento</h2>
            </div>
            <div v-for="(form, index) in forms" :key="index" :class="form.col">
              <label>{{ form.label }}</label>
              <div>
                <template v-if="form.type === 'text'">
                  <input v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" />
                </template>
                <template v-else-if="form.type === 'radio'">
                  <div class="form-check">
                    <label v-for="(option, optionIndex) in form.options" :key="optionIndex" class="form-check-label">
                      <input v-model="form.value" :type="form.type" :value="option" :name="form.label" class="form-check-input" />{{ option }}
                    </label>
                  </div>
                </template>
                <template v-else-if="form.type === 'dropdown2'">
                  <b-dropdown :class="getStatusClass(form.value)" v-model="form.value" :text="getStatusText(form.value)" :menu-class="getMenuClass(form.value)">
                    <b-dropdown-item v-for="item in form.options" :key="item" @click="updatePriority(form, item)">
                      {{ item }}
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-else-if="form.type === 'textarea'">
                  <b-form-textarea v-model="form.value" :placeholder="form.placeholder" class="form-control"></b-form-textarea>
                </template>
                <template v-else-if="form.type === 'data'">
                  <input v-model="form.value" :type="form.type" @input="formatarDataInput" :placeholder="form.placeholder" class="form-control" />
                </template>
              </div>
            </div>

            <div class="row mt-4" style="justify-content: right;">
              <div class="col-6" style="display: flex">
                <div class="col-6" style="margin-right: 15px;">
                  <button id="btn-dark" @click="getPage" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
                </div>
                <div class="col-6">
                  <button id="btn-white" @click="createTreinamento"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
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

import { createTreinamento } from "@/views/Treinamentos/treinamentos_service";

export default {
  name: "create_treinamento",
  components: {

  },
  data() {
    return {
      status: 'Andamento',
      forms: [
        {label: "Treinamento", type: "text", value: "", placeholder: "Necessidade de treinamento", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Data Treinamento", type: "data", value: "", placeholder: "Data", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Carga horária", type: "text", value: "", placeholder: "Carga horaria", error: "", errorMessage: "", col: "col-md-9"},
        { label: "Caracteristica do treinamento", type: "radio", value: "A", error: "", options: ['A', 'F'], col: "col-md-3" },
        {label: "Funcionarios", type: "text", value: "", placeholder: "Funcionarios", error: "", errorMessage: "", col: "col-md-9"},
        {label: "Tipo",type: "dropdown2", value: "EP", error: "", options: ['IHEAD', 'IP'], col: "col-md-3"},
        {label: "Observações", type: "textarea", value: "", placeholder: "Observações do treinamento", error: "", errorMessage: "", col: "col-md-12"},
      ]
    };
  },
  methods: {
    getPage() {
      this.$router.push('/treinamentos')
    },
    createTreinamento() {
      // Obtenha a data como um objeto JavaScript Date
      const dataInput = new Date(this.forms[1].value);
      let manutencao = {
        'treinamento': this.forms[0].value,
        'tipo': this.forms[5].value,
        'data_treinamento': dataInput,
        'carga_horaria': this.forms[2].value,
        'caracteristica_treinamento': this.forms[3].value,
        'funcionarios': this.forms[4].value,
        'observacoes': this.forms[6].value,
        'status': this.status,
      };
      createTreinamento(manutencao)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/treinamentos");
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
    getStatusText(status) {
      // Retorna o texto com base no valor atual
      if (status === 'Baixa') {
        return 'Baixa';
      } else if (status === 'Média') {
        return 'Média';
      } else if (status === 'Alta') {
        return 'Alta';
      } else {
        // Se o valor não for 'Baixa', 'Média' ou 'Alta', retorna o valor atual
        return status;
      }
    },
    getMenuClass(status) {
      // Retorna a classe apropriada para o menu suspenso (dropdown-menu)
      if (status === 'Baixa') {
        return 'baixa-color-menu';
      } else if (status === 'Média') {
        return 'media-color-menu';
      } else if (status === 'Alta') {
        return 'alta-color-menu';
      } else {
        return ''; // Classe padrão se o valor não for 'Baixa', 'Média' ou 'Alta'
      }
    },
    formatarDataInput() {
      debugger
      // Obtém o valor atual do campo
      let value = this.forms[1].value;

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
      this.forms[1].value = value;
    },
    getStatusClass(status) {
      // Retorna a classe apropriada com base no valor atual
      if (status === 'Baixa') {
        return 'baixa-color';
      } else if (status === 'Média') {
        return 'media-color';
      } else if (status === 'Alta') {
        return 'alta-color';
      } else {
        return '';
      }
    },
    updatePriority(form, selectedPriority) {
      // Verifica se o valor atual é diferente do item clicado
      if (form.value !== selectedPriority) {
        // Adiciona o valor atual ao array de opções, se não estiver presente
        if (form.value && !form.options.includes(form.value)) {
          form.options.push(form.value);
        }
        // Define o item clicado como o novo valor selecionado
        form.value = selectedPriority;
        // Remove o item clicado do array de opções
        form.options = form.options.filter((option) => option !== selectedPriority);
      }
    },
  }
};
</script>

<style scoped>
.card{
  padding: 25px !important;
}
.form-check-label{
  margin-right: 30px !important;
}
.form-check-input:checked[type=radio]{
  background-image: linear-gradient(310deg, #2dce89 0%, #2dcecc 100%) !important;
}
.dropdown-menu.show{
  min-width: 145px !important;
}
</style>
