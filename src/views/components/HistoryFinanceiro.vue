<template>
  <div class="card">
    <div class="row" style="display: flex; justify-content: space-between">
      <b-col sm="7" class="mb-2">
        <span class="h3 font-weight-semibold">Informações</span>
      </b-col>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Origem</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo De Transação</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Valor</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in tableHistory" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ history.origem }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.tipo_transacao }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.data }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.valor }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.status }}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {updateStatusTreinamento} from "@/views/Treinamentos/treinamentos_service";
import {formatDate} from "@/utils";
import {getAllFinanceiro} from "@/views/Financeiro/financeiro_service";
export default {
  name: "HistoryPisc",
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
    toggleRow(index) {
      // Alternar a linha expandida com base no índice clicado
      this.expandedRow = this.expandedRow === index ? null : index;
    },
    toggleDropdownValue(id) {
      debugger
      console.log(this.dropdownValue);
      let estadoFitler = {
        '_id': id,
        'status': this.dropdownValue,
      };
      updateStatusTreinamento(estadoFitler, id)
          .then((response) => {
            console.log(response.data);
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
    getAllFinanceiro() {
      getAllFinanceiro()
          .then((response) => {
            debugger
            if (response.data.data) {
              this.tableHistory = [];
              response.data.data.forEach((financeiro) => {
                // Adicione cada funcionário à lista
                this.tableHistory.push({
                  ID: financeiro._id,
                  origem: financeiro.origem,
                  tipo_transacao: financeiro.tipo_transacao,
                  valor: financeiro.valor,
                  data: formatDate(financeiro.data),
                  status: financeiro.status,
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
    this.getAllFinanceiro();
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
