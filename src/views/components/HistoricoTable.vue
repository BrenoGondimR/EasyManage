<template>
  <div class="card">
    <div class="card-header pb-0" style="display: flex; justify-content: space-between">
      <h6>Historico Tratamentos/Manutenções</h6>
      <router-link class="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/create_tratamento">
        <div id="btn-white" class="btn px-3 mb-2">Novo Tratamento</div>
      </router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cloro</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Alcalinidade</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Pha</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Acidez</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, index) in tableHistory" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <p class="text-xs text-secondary mb-0">{{ history.cloro }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs text-secondary mb-0">{{ history.alcalinidade }}</p>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ history.pha }}</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ history.acidez }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {getFuncionarios} from "@/views/Funcionarios/funcionarios_service";
import {formatDate} from "@/utils";
export default {
  name: "HistoryPisc",

  data(){
    return {
      tableHistory: [],
    }
  },
  methods :{
    getAllFuncionarios() {
      // Chame a função para obter os funcionários da API
      getFuncionarios()
          .then((response) => {
            // Verifique se há dados retornados pela API
            if (response.data.data) {
              // Limpe o array antes de preencher novamente
              this.funcionarios = [];
              response.data.data.forEach((funcionario) => {
                debugger
                // Adicione cada funcionário à lista
                this.funcionarios.push({
                  nome: funcionario.nome,
                  email: funcionario.email,
                  cargo: funcionario.cargo,
                  efetuado: formatDate(funcionario.createdAt)
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
    this.getAllFuncionarios();
  },
};

</script>
