<template>
  <div class="card">
    <div class="row" style="display: flex; justify-content: space-between">
      <b-col sm="7" class="mb-2">
        <span class="h3 font-weight-semibold">Historico Piscina</span>
      </b-col>
      <b-col md="5" style="justify-content: end !important;">
        <div style="display: flex; gap: 1rem">
          <b-button style="border-radius: 10px;" class="w-100 btn-create" variant="outline-primary" @click="getPageCadastrar">
            Tratamento
          </b-button>
          <b-button style="border-radius: 10px;" class="w-100 btn-create" variant="primary" @click="getPageManut">
            Manutenção
          </b-button>
        </div>
      </b-col>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Responsavel</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cloro</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Alcalinidade</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Pha</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Acidez</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in tableHistory" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ history.nome_piscineiro }}</h6>
                  <p class="text-xs text-secondary mb-0">{{ history.nome_empresa }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs text-secondary mb-0">{{ history.cloro }}</p>
            </td>
            <td>
              <p class="text-xs text-secondary mb-0">{{ history.alcalinidade }}</p>
            </td>
            <td>
              <p class="text-xs text-secondary mb-0">{{ history.pha }}</p>
            </td>
            <td>
              <p class="text-xs text-secondary mb-0">{{ history.acidez }}</p>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ history.history }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/utils";
import { getAllHistory } from "@/views/Piscina/piscina_service";
export default {
  name: "HistoryPisc",
  data(){
    return {
      tableHistory: [],
    }
  },
  methods :{
    getPageCadastrar() {
      this.$router.push('/create_tratamento')
    },
    getPageManut() {
      this.$router.push('/create_manutencao')
    },
    getAllTratamento() {
      getAllHistory()
          .then((response) => {
            if (response.data.data) {
              this.tableHistory = [];
              response.data.data.forEach((tratamento) => {
                debugger
                // Adicione cada funcionário à lista
                this.tableHistory.push({
                  nome_piscineiro: tratamento.nome_piscineiro,
                  nome_empresa: tratamento.nome_empresa,
                  cloro: tratamento.cloro,
                  alcalinidade: tratamento.alcalinidade,
                  pha: tratamento.pha,
                  acidez: tratamento.acidez,
                  history: formatDate(tratamento.createdAt)
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
    this.getAllTratamento();
  },
};
</script>
<style>
#btn-white{
  width: 100% !important;
}
</style>
