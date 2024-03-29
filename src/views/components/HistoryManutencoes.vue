<template>
  <div class="card">
    <div class="row" style="display: flex; justify-content: space-between">
      <b-col sm="7" class="mb-2">
        <span class="h3 font-weight-semibold">Manutenções</span>
      </b-col>
      <b-col md="5" style="justify-content: end !important;">
        <div style="display: flex; gap: 1rem">
          <b-button style="border-radius: 10px; cursor: pointer" class="w-100 btn-create" variant="primary" @click="getPageCreate">
            Nova Manutenção
          </b-button>
        </div>
      </b-col>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0" style="margin-bottom: 0px;">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Local</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data Da Ocorrencia</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data Da Resolução</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in paginatedHistory" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ history.local }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.tipo }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.data_ocorrencia }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.data_resolucao }}</p>
            </td>
            <td class="align-middle text-center">
              <b-dropdown v-model="dropdownValue" :class="getStatusClass(history.status)" :text="history.status" class="mt-2" :menu-class="getMenuClass(history.status)">
                <b-dropdown-item @click="toggleDropdownValue(history.ID, history.status)">{{ history.status === 'Pendente' ? 'Ajustado' : 'Pendente' }}</b-dropdown-item>
              </b-dropdown>
            </td>
            <td class="align-middle text-center" style="width: 10px">
              <i @click="editManutencao(history.ID)" class="ni ni-settings-gear-65" style="cursor: pointer !important;"></i>
            </td>
          </tr>
          </tbody>
        </table>
        <b-pagination
            v-if="tableHistory.length > 0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="table-manutencoes"
            align="center"
            class="mt-4">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllHistory, updateStatus} from "@/views/Manutenções/manutencoes_service";
import {formatDate} from "@/utils";
export default {
  name: "HistoryManutencoes",
  data(){
    return {
      tableHistory: [],
      dropdownValue: '',
      currentPage: 1,
      perPage: 6,
      rows: 0, // Total de itens em tableHistory
      tableHistoryManutencao: [],
      isFull: false,
    }
  },
  computed: {
    paginatedHistory() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tableHistory.slice(start, end);
    }
  },
  methods :{
    getPageCreate() {
      this.$router.push('/create_manutencao_geral')
    },
    editManutencao(id) {
      this.$router.push(`/edit_manutencao/${id}`);
    },
    toggleDropdownValue(id, status) {
      // Verifique se o status atual é "Ajustado" e retorne sem fazer nada
      if (status === 'Ajustado') {
        return;
      }

      // Antes de fazer qualquer alteração, verifique se o valor é diferente do atual
      if (this.dropdownValue === 'Pendente') {
        this.dropdownValue = 'Ajustado';
      } else {
        this.dropdownValue = 'Pendente';
      }

      let estadoFitler = {
        '_id': id,
        'status': this.dropdownValue, // Use o valor atual de dropdownValue
        'estabelecimento_id': localStorage.getItem('estabId'),
      };

      updateStatus(estadoFitler, id)
          .then(() => {
            this.getAllManutencoes();
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
    getStatusClass(status) {
      // Retorna a classe apropriada com base no valor atual
      if (status === 'Pendente') {
        return 'card-pendente';
      } else if (status === 'Ajustado') {
        return 'card-ajustado';
      } else {
        return '';
      }
    },
    getMenuClass(status) {
      // Retorna a classe apropriada para o menu suspenso (dropdown-menu)
      if (status === 'Pendente') {
        return 'pendente-color-menu';
      } else if (status === 'Ajustado') {
        return 'ajustado-color-menu';
      } else {
        return '';
      }
    },
    getAllManutencoes() {
      getAllHistory(localStorage.getItem('estabId'))
          .then((response) => {
            if (response.data.data) {
              this.tableHistory = [];
              response.data.data.forEach((manutencao) => {
                // Adicione cada funcionário à lista
                this.tableHistory.push({
                  ID: manutencao._id,
                  local: manutencao.local,
                  tipo: manutencao.tipo,
                  data_ocorrencia: formatDate(manutencao.data_ocorrencia),
                  data_resolucao: formatDate(manutencao.data_resolucao) ,
                  status: manutencao.status,
                });
              });
            }
            this.rows = this.tableHistory.length; // Atualize o total de linhas após receber os dados
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
  },
  created() {
    this.getAllManutencoes();
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
