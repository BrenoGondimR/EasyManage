<template>
  <div class="card">
    <div class="row" style="display: flex; justify-content: space-between">
      <b-col sm="7" class="mb-2">
        <span class="h3 font-weight-semibold">Fornecedores</span>
      </b-col>
      <b-col md="5" style="justify-content: end !important;">
        <div style="display: flex; gap: 1rem">
          <b-button style="border-radius: 10px; cursor: pointer" class="w-100 btn-create" variant="primary" @click="getPageCreate">
            Novo Fornecedor
          </b-button>
        </div>
      </b-col>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fornecedor</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cidade</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Contato</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nota</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="width: 60px;">Detalhes</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="width: 10px;"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in tableHistory" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ history.fornecedor }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.cidade }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.contato }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.nota }}</p>
            </td>
            <td class="align-middle text-center">
              <button @click="toggleRow(index)" class="btn btn-link" style="margin-bottom: 0 !important;">
                <i :class="['fa', expandedRow === index ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
              </button>
            </td>
            <td class="align-middle text-center">
              <i @click="editFornecedor(history.ID)" class="ni ni-settings-gear-65" style="cursor: pointer !important;"></i>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div v-if="expandedRow !== null" class="expanded-details">
                <p><strong>Observações:</strong> {{ tableHistory[expandedRow].observacao }}</p>
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
import { getAllFornecedores } from "@/views/Fornecedores/fornecedores_service";
export default {
  name: "HistoryFornecedores",
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
      this.$router.push('/create_fornecedor')
    },
    editFornecedor(id) {
      this.$router.push(`/edit_fornecedor/${id}`);
    },
    toggleRow(index) {
      // Alternar a linha expandida com base no índice clicado
      this.expandedRow = this.expandedRow === index ? null : index;
    },
    getAllFornecedoresFunc() {
      getAllFornecedores(localStorage.getItem('estabId'))
        .then((response) => {
          if (response.data.data) {
            this.tableHistory = [];
            response.data.data.forEach((fornecedor) => {
              // Adicione cada funcionário à lista
              this.tableHistory.push({
                ID: fornecedor._id,
                fornecedor: fornecedor.fornecedor,
                cidade: fornecedor.cidade,
                contato: fornecedor.contato,
                nota: fornecedor.nota,
                observacao: fornecedor.observacao,
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
    this.getAllFornecedoresFunc();
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
