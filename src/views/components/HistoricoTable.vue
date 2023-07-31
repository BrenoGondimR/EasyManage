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
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cloro</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Alcalinidade</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Pha</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Acidez</th>
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
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.cloro }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.alcalinidade }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.pha }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.acidez }}</p>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ history.history }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="this.isFull === true" class="card-body px-0 pt-0 pb-2 mt-4">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Responsavel</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Titulo</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descrição</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Prioridade</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estado</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in tableHistoryManutencao" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ history.nome_piscineiro }}</h6>
                  <p class="text-xs text-secondary mb-0">{{ history.nome_empresa }}</p>
                </div>
              </div>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.titulo }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.descricao }}</p>
            </td>
            <td class="align-middle text-center">
              <p class="mb-0 text-sm">{{ history.history }}</p>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold" :class="getPriorityClass(history.prioridade)">{{ history.prioridade }}</span>
            </td>
            <td class="align-middle text-center">
              <b-dropdown v-model="dropdownValue" :text="history.estado" toggle-class="card-dropdown" class="mt-2">
                <b-dropdown-item @click="toggleDropdownValue(history.ID, history.estado)">{{ history.estado === 'Pendente' ? this.dropdownValue = 'Ajustado' : this.dropdownValue = 'Pendente' }}</b-dropdown-item>
              </b-dropdown>
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
import {getAllHistory, getAllHistoryManut, updateEstado} from "@/views/Piscina/piscina_service";
export default {
  name: "HistoryPisc",
  data(){
    return {
      tableHistory: [],
      dropdownValue: '',
      tableHistoryManutencao: [],
      isFull: false,
    }
  },
  methods :{
    getPageCadastrar() {
      this.$router.push('/create_tratamento')
    },
    getPageManut() {
      this.$router.push('/create_manutencao')
    },
    toggleDropdownValue(id, estado) {
      debugger
      let estadoFitler = {
        'estado': estado,
        '_id': id,
      };
      updateEstado(estadoFitler)
          .then((response) => {
            console.log(response.data);
            this.getAllManutencao();
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
    getPriorityClass(prioridade) {
      switch (prioridade) {
        case 'Baixa':
          return 'card-baixa';
        case 'Média':
          return 'card-media';
        case 'Alta':
          return 'card-alta';
        default:
          return '';
      }
    },
    getStatusText(status) {
      // Retorna o texto com base no valor atual
      if (status === 'Pendente') {
        return 'Pendente';
      } else if (status === 'Ajustado') {
        return 'Ajustado';
      } else {
        // Se o valor não for 'Baixa', 'Média' ou 'Alta', retorna o valor atual
        return status;
      }
    },
    getAllTratamento() {
      getAllHistory()
          .then((response) => {
            if (response.data.data) {
              this.tableHistory = [];
              response.data.data.forEach((tratamento) => {
                // Adicione cada funcionário à lista
                this.tableHistory.push({
                  nome_piscineiro: tratamento.nome_piscineiro,
                  nome_empresa: tratamento.nome_empresa,
                  cloro: tratamento.cloro,
                  alcalinidade: tratamento.alcalinidade,
                  estado: tratamento.estado,
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
    getAllManutencao() {
      getAllHistoryManut()
          .then((response) => {
            if (response.data.data) {
              this.tableHistoryManutencao = [];
              response.data.data.forEach((manutencao) => {
                // Verificar se todos os campos estão preenchidos
                if (manutencao.titulo && manutencao.nome_piscineiro && manutencao.nome_empresa && manutencao.descricao && manutencao.estado && manutencao.prioridade && manutencao.createdAt) {
                  // Adicione cada funcionário à lista
                  debugger
                  this.tableHistoryManutencao.push({
                    ID: manutencao.ID,
                    titulo: manutencao.titulo,
                    nome_piscineiro: manutencao.nome_piscineiro,
                    nome_empresa: manutencao.nome_empresa,
                    descricao: manutencao.descricao,
                    estado: manutencao.estado,
                    prioridade: manutencao.prioridade,
                    history: formatDate(manutencao.createdAt),
                  });
                  this.isFull = true;
                } else {
                  // Se algum campo estiver faltando, definir isFull como false
                  this.isFull = false;
                }
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
    this.getAllManutencao();
  },
};
</script>
<style>
#btn-white{
  width: 100% !important;
}
</style>
