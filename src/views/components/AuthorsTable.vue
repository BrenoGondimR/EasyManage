<template>
  <div class="card">
    <div class="card-header pb-0" style="display: flex; justify-content: space-between">
      <h6>Funcionarios</h6>
      <router-link class="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/create_funcionario">
        <div id="btn-white" class="btn px-3 mb-2">Novo Funcionario</div>
      </router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Função</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Efetuado</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(funcionario, index) in funcionarios" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ funcionario.nome }}</h6>
                  <p class="text-xs text-secondary mb-0">{{ funcionario.email }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{ funcionario.cargo }}</p>
              <p class="text-xs text-secondary mb-0">{{ funcionario.organizacao }}</p>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ funcionario.efetuado }}</span>
            </td>
            <td class="align-middle">
              <a href="javascript:;" style="text-align: right !important;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
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
  name: "authors-table",

  data(){
    return {
      funcionarios: [],
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
