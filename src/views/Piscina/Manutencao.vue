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
                <div v-else-if="form.type === 'radio'" class="form-check">
                  <label v-for="(option, optionIndex) in form.options" :key="optionIndex" class="form-check-label">
                    <input v-model="form.value" :type="form.type" :value="option.value" :name="form.label" class="form-check-input" />{{ option.label }}
                  </label>
                </div>
                <b-dropdown v-else-if="form.type === 'dropdown'" :class="getStatusClass(form.value)" v-model="form.value" :text="getStatusText(form.value)" :menu-class="getMenuClass(form.value)">
                  <b-dropdown-item v-for="item in form.options" :key="item" @click="updatePriority(form, item)">
                    {{ item }}
                  </b-dropdown-item>
                </b-dropdown>
                <b-form-textarea v-else-if="form.type === 'textarea'" v-model="form.value" :placeholder="form.placeholder" class="form-control"></b-form-textarea>
              </div>
            </div>
            <div class="row mt-4" style="justify-content: right;">
              <div class="col-6" style="display: flex">
                <div class="col-6" style="margin-right: 15px;">
                  <button id="btn-dark" class="btn w-100 px-3 mb-2 bg-gradient-success">Cancelar</button>
                </div>
                <div class="col-6">
                  <button id="btn-white" @click="createManut"  class="btn w-100 px-3 mb-2 btn-outline-success">Salvar</button>
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

import { createManutencao } from "@/views/Piscina/piscina_service";

export default {
  name: "create_manutencao",
  components: {

  },
  data() {
    return {
      type: 'Manutenção',
      estado: "Pendente",
      forms: [
        {label: "Nome Responsavel", type: "text", value: "", placeholder: "Responsavel Pela Anotação", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Nome Da Empresa", type: "text", value: "", placeholder: "Empresa Do Responsavel", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Titulo", type: "text", value: "", placeholder: "Titulo Para Manutenção", error: "", errorMessage: "", col: "col-md-9"},
        {label: "Prioridade",type: "dropdown", value: "Baixa", error: "", options: ['Média', 'Alta'], col: "col-md-3"},
        {label: "Descrição", type: "textarea", value: "", placeholder: "Descrição Da Manutenção", error: "", errorMessage: "", col: "col-md-12"},
      ]
    };
  },
  methods: {
    createManut() {
      let manutencao = {
        'estado': this.estado,
        'nome_piscineiro': this.forms[0].value,
        'nome_empresa': this.forms[1].value,
        'titulo': this.forms[2].value,
        'prioridade': this.forms[3].value,
        'descricao': this.forms[4].value,
        'type': this.type,
      };
      createManutencao(manutencao)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/piscina");
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
    getStatusClass(status) {
      debugger
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
.dropdown-menu.show{
  min-width: 145px !important;
}
</style>
