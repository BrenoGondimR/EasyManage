<template>
  <div class="card">
    <div class="row" style="display: flex; justify-content: space-between">
      <b-col sm="9" class="mb-2">
        <span class="h3 font-weight-semibold">Informações</span>
      </b-col>
      <b-col sm="3" class="mb-2" style="display: flex;">
        <DatePicker
            placeholder="Selecione o Mes"
            :minimum-view="'month'"
            :maximum-view="'month'"
            v-model="dateInput"
            language="pt"
            @update:modelValue="getAllFinanceiro"
        >
        </DatePicker>
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
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in paginatedHistory" :key="index">
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
              <span class="text-secondary text-xs font-weight-bold" :class="getPriorityClass(history.status)">{{ history.status }}</span>
            </td>
            <td class="align-middle text-center">
              <i @click="editFinanceiro(history.ID, history.status)" class="ni ni-settings-gear-65" style="cursor: pointer !important;"></i>
            </td>
            <td class="align-middle text-center">
              <i @click="delFinanceiro(history.ID)" class="pi pi-trash" style="cursor: pointer"></i>
            </td>
          </tr>
          </tbody>
        </table>
        <b-pagination
            v-if="tableHistory.length > 0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="table-financeiro"
            align="center"
            class="mt-4">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {updateStatusTreinamento} from "@/views/Treinamentos/treinamentos_service";
import {formatDate} from "@/utils";
import {deleteFinanceiro, getAllFinanceiro} from "@/views/Financeiro/financeiro_service";
import DatePicker from 'vuejs3-datepicker';

export default {
  name: "HistoryFinanceiro",
  components: {
    DatePicker
  },
  data(){
    return {
      tableHistory: [],
      dateInput: null, // Inicializado como null
      dropdownValue: '',
      currentPage: 1,
      perPage: 10,
      rows: 0, // Total de itens em tableHistory
      selectedDate: '',
      expandedRow: null,
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
    toggleRow(index) {
      // Alternar a linha expandida com base no índice clicado
      this.expandedRow = this.expandedRow === index ? null : index;
    },

    editFinanceiro(id, status) {
      if(status === 'Custo'){
        this.$router.push(`/edit_financeirocusto/${id}`);
      }else{
        this.$router.push(`/edit_financeiroganho/${id}`);
      }
    },
    toggleDropdownValue(id) {
      let estadoFitler = {
        '_id': id,
        'status': this.dropdownValue,
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
    delFinanceiro(idFina) {
      // Call the function to send the POST request
      deleteFinanceiro(idFina, localStorage.getItem('estabId'))
          .then(() => {
            // Handle the backend response here
            this.getAllFinanceiro()
            this.$router.push("/dashboard-default"); // Redirect after creating the record
          })
          .catch((error) => {
            // Handle errors here
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
    getPriorityClass(prioridade) {
      switch (prioridade) {
        case 'Ganho':
          return 'card-ganho';
        case 'Custo':
          return 'card-custo';
        default:
          return '';
      }
    },
    setMesAtual() {
      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
      const mesAtual = hoje.getMonth(); // getMonth() retorna o mês de 0 (Janeiro) a 11 (Dezembro)
      this.dateInput = new Date(anoAtual, mesAtual, 1); // Define o dateInput para o primeiro dia do mês atual
    },
    getAllFinanceiro() {
      this.tableHistory = []
      const ano = this.dateInput.getFullYear();
      const mes = this.dateInput.getMonth() + 1; // getMonth() retorna um índice baseado em 0, então adicione 1
      const dia = this.dateInput.getDate();

      // Preenche o mês e o dia com zeros à esquerda se necessário
      const mesFormatado = mes < 10 ? `0${mes}` : mes;
      const diaFormatado = dia < 10 ? `0${dia}` : dia;

      // Formata a data como "AAAA-MM-DD"
      const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;
      this.$emit('update:date', dataFormatada);
      getAllFinanceiro(localStorage.getItem('estabId'), dataFormatada)
          .then((response) => {
            if (response.data.data) {
              this.tableHistory = [];
              response.data.data.forEach((financeiro) => {
                // Formate o valor para formato monetário
                const valorMonetario = parseFloat(financeiro.ganhos ? financeiro.ganhos : financeiro.custos).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                });

                // Adicione cada registro formatado à lista
                this.tableHistory.push({
                  ID: financeiro._id,
                  origem: financeiro.origem,
                  tipo_transacao: financeiro.tipo_transacao,
                  valor: valorMonetario, // Valor formatado em moeda
                  data: formatDate(financeiro.data),
                  status: financeiro.status,
                });
              });
              this.rows = this.tableHistory.length; // Atualize o total de linhas após receber os dados
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
  },
  created() {
    this.setMesAtual();
    this.getAllFinanceiro();
  },
};
</script>
<style>

.vuejs3-datepicker__value{
  padding: 5px 15px;
}

.vuejs3-datepicker__icon{
  margin-top: -2px;
}

.vuejs3-datepicker__calendar{
  width: 280px;
}

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
