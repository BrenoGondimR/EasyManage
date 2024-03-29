<template>
  <div class="card">
    <div class="row" style="display: flex; justify-content: space-between">
      <b-col sm="7" class="mb-2">
        <span class="h3 font-weight-semibold">Treinamentos</span>
      </b-col>
      <b-col md="5" style="justify-content: end !important;">
        <div style="display: flex; gap: 1rem">
          <b-button style="border-radius: 10px; cursor: pointer" class="w-100 btn-create" variant="primary" @click="getPageCreate">
            Novo Treinamento
          </b-button>
        </div>
      </b-col>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Necessidade Treinamento</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Carga Horaria</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="width: 30px;">Detalhes</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="width: 20px;"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in tableHistory" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ history.treinamento }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.carga_horaria }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.data_treinamento }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.tipo }}</p>
            </td>
            <td class="align-middle text-center">
              <b-dropdown v-model="dropdownValue" :class="getStatusClass(history.status)" :text="history.status" class="mt-2" :menu-class="getMenuClass(history.status)">
                <b-dropdown-item @click="toggleDropdownValue(history.ID, history.status)">{{ history.status === 'Andamento' ? 'Concluído' : 'Andamento' }}</b-dropdown-item>
              </b-dropdown>
            </td>
            <td class="align-middle text-center">
              <button @click="toggleRow(index)" class="btn btn-link" style="margin-bottom: 0 !important;">
                <i :class="['fa', expandedRow === index ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
              </button>
            </td>
            <td class="align-middle text-center">
              <i @click="editTreinamento(history.ID)" class="ni ni-settings-gear-65" style="cursor: pointer !important;"></i>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div v-if="expandedRow !== null" class="expanded-details">
                <p><strong>Observações:</strong> {{ tableHistory[expandedRow].observacoes }}</p>
                <p><strong>Funcionários:</strong> {{ tableHistory[expandedRow].funcionarios }}</p>
                <p><strong>Características:</strong> {{ tableHistory[expandedRow].caracteristica_treinamento }}</p>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllHistory, updateStatusTreinamento} from "@/views/Treinamentos/treinamentos_service";
import {formatDate} from "@/utils";
export default {
  name: "HistoryTreinamentos",
  data(){
    return {
      tableHistory: [],
      dropdownValue: '',
      expandedRow: null,
      tableHistoryManutencao: [],
      isFull: false,
    }
  },
  methods :{
    getPageCreate() {
      this.$router.push('/create_treinamento')
    },
    toggleRow(index) {
      // Alternar a linha expandida com base no índice clicado
      this.expandedRow = this.expandedRow === index ? null : index;
    },
    editTreinamento(id) {
      this.$router.push(`/edit_treinamento/${id}`);
    },
    toggleDropdownValue(id, status) {
      // Verifique se o status atual é "Concluído" e retorne sem fazer nada
      if (status === 'Concluído') {
        return;
      }

      // Antes de fazer qualquer alteração, verifique se o valor é diferente do atual
      if (this.dropdownValue === 'Andamento') {
        this.dropdownValue = 'Concluído';
      } else {
        this.dropdownValue = 'Andamento';
      }

      let estadoFitler = {
        '_id': id,
        'status': this.dropdownValue, // Use o valor atual de dropdownValue
        'estabelecimento_id': localStorage.getItem('estabId'),
      };

      updateStatusTreinamento(estadoFitler, id)
          .then(() => {
            this.getAllTrepinamentos();
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
    getStatusClass(status) {
      // Retorna a classe apropriada com base no valor atual
      if (status === 'Andamento') {
        return 'card-pendente';
      } else if (status === 'Concluido') {
        return 'card-ajustado';
      } else {
        return '';
      }
    },
    getMenuClass(status) {
      // Retorna a classe apropriada para o menu suspenso (dropdown-menu)
      if (status === 'Andamento') {
        return 'pendente-color-menu';
      } else if (status === 'Concluido') {
        return 'ajustado-color-menu';
      } else {
        return '';
      }
    },
    getAllTrepinamentos() {
      getAllHistory(localStorage.getItem('estabId'))
          .then((response) => {
            if (response.data.data) {
              this.tableHistory = [];
              response.data.data.forEach((treinamento) => {
                // Adicione cada funcionário à lista
                this.tableHistory.push({
                  ID: treinamento._id,
                  treinamento: treinamento.treinamento,
                  carga_horaria: treinamento.carga_horaria,
                  tipo: treinamento.tipo,
                  data_treinamento: formatDate(treinamento.data_treinamento),
                  status: treinamento.status,
                  observacoes: treinamento.observacoes,
                  funcionarios: treinamento.funcionarios,
                  caracteristica_treinamento: treinamento.caracteristica_treinamento,
                });
              });
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
  },
  created() {
    this.getAllTrepinamentos();
  },
};
</script>
<style>
#btn-white{
  width: 100% !important;
}
.dropdown-menu.show{
  min-width: 86px !important;
  border: none !important;
}

.btn.show{
  background-color: unset !important;
}
</style>
