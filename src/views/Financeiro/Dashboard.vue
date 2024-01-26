<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12">
            <card style="cursor: pointer"
              :title="stats.money.title"
              :value="stats.money.value"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              @click="getPageGanhos"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card style=""
              :title="stats.users.title"
              :value="stats.users.value"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card style="cursor: pointer"
              :title="stats.clients.title"
              :value="stats.clients.value"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              @click="getPageCustos"
              directionReverse
            ></card>
          </div>
        </div>
        <HistoryFinanceiro @update:date="handleDateChange"></HistoryFinanceiro>
        <div class="row">
          <div class="col-lg-6 mb-lg mt-4">
            <div class="card z-index-2">
              <h6 class="font-weight-semibold" style="padding-right: 1.5rem; padding-left: 1.5rem;">Maiores Ganhos</h6>
              <DoughnutChart style="margin: auto" :values="topGanhosValues" :titles="topGanhosTitles" :colors="['#f3701f', '#ed1a23', '#01a88f', '#7d429a', '#0154a4']"/>
            </div>
          </div>
          <div class="col-lg-6 mb-lg mt-4">
            <div class="card z-index-2">
              <h6 class="font-weight-semibold" style="padding-right: 1.5rem; padding-left: 1.5rem;">Maiores Custos</h6>
              <DoughnutChart style="margin: auto" :values="topCustosValues" :titles="topCustosTitles" :colors="['#f3701f', '#ed1a23', '#01a88f', '#7d429a', '#0154a4']"/>
            </div>
          </div>
          <div class="col-lg-12 mb-lg mt-4">
            <gradient-line-chart :detail2="new Date().getFullYear()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {
  getAllCustosFinanceiro,
  getAllGanhosFinanceiro,
  getAllRendaFinanceiro, getTopCustosFinanceiro, getTopGanhosFinanceiro
} from "@/views/Financeiro/financeiro_service";
import HistoryFinanceiro from "@/views/components/HistoryFinanceiro.vue";
import DoughnutChart from "@/views/components/Donut.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      selectedDate: null,
      topCustosTitles: ['Default','Default','Default','Default','Default'],
      topCustosValues: [1,1,1,1,1],
      topGanhosTitles: ['Default','Default','Default','Default','Default'],
      topGanhosValues: [1,1,1,1,1],
      filters: [
        {key: "period", value: "", size: "3", placeholder: "Selecione a data", options: []},
        {key: "method", value: "TODOS", size: "3", placeholder: "Selecione o metodo", options: []},
        {key: "value", value: "TODOS", size: "3", placeholder: "Valor", options: []},
      ],
      stats: {
        money: {
          title: "Ganhos",
          value: "R$ 0,00",
          iconClass: "ni ni-money-coins",
          detail: "12/06/2023",
          iconBackground: "bg-gradient-success",
        },
        users: {
          title: "Renda",
          value: "R$ 0,00",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-primary",
          detail: "22/07/2023",
        },
        clients: {
          title: "Custos",
          value: "R$ 0,00",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
          detail: "06/10/2023",
        },
      },
    };
  },
  methods: {
    getPageCustos() {
      this.$router.push('/create_custos')
    },
    getAllCustos() {
      getAllCustosFinanceiro(localStorage.getItem('estabId'), localStorage.getItem('selectedDate'))
          .then((response) => {
            if (response.data.totalCustos) {
              // Atualize o valor da propriedade "value" com o total de custos formatado
              this.stats.clients.value = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(response.data.totalCustos);
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
    getTopCustos() {
      getTopCustosFinanceiro(localStorage.getItem('estabId'), localStorage.getItem('selectedDate'))
          .then((response) => {
            // Certifique-se de que a resposta contém o array de topCustos
            if (response.data.topCustos) {
              // Limpe os arrays antigos
              this.topCustosTitles = [];
              this.topCustosValues = [];

              // Preencha os arrays com os novos dados
              response.data.topCustos.forEach(custo => {
                this.topCustosTitles.push(custo.nome_custo);
                this.topCustosValues.push(custo.valor_custo);
              });

              // Preencher com valores padrão apenas se não houver 5 elementos
              while (this.topCustosTitles.length < 5) {
                this.topCustosTitles.push('Default');
              }
              while (this.topCustosValues.length < 5) {
                this.topCustosValues.push(1);
              }
            } else {
              console.error('Dados de topCustos não recebidos na resposta');
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },

    getTopGanhos() {
      getTopGanhosFinanceiro(localStorage.getItem('estabId'), localStorage.getItem('selectedDate'))
          .then((response) => {
            // Certifique-se de que a resposta contém o array de topGanhos
            if (response.data.topGanhos) {
              // Limpe os arrays antigos
              this.topGanhosTitles = [];
              this.topGanhosValues = [];

              // Preencha os arrays com os novos dados
              response.data.topGanhos.forEach(ganho => {
                this.topGanhosTitles.push(ganho.nome_ganho);
                this.topGanhosValues.push(ganho.valor_ganho);
              });

              // Preencher com valores padrão apenas se não houver 5 elementos
              while (this.topGanhosTitles.length < 5) {
                this.topGanhosTitles.push('Default');
              }
              while (this.topGanhosValues.length < 5) {
                this.topGanhosValues.push(1);
              }
            } else {
              console.error('Dados de topGanhos não recebidos na resposta');
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
    handleDateChange(newDate) {
      // Atualize o estado ou chame métodos com base na nova data
      this.selectedDate = newDate;
      localStorage.setItem('selectedDate', newDate);
      this.stats.money.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format('0');
      this.stats.clients.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format('0');
      this.stats.users.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format('0');
      this.getAllGanhos()
      this.getAllCustos()
      this.getAllRenda()
      this.getTopCustos();
      this.getTopGanhos()

    },
    getAllGanhos() {
      getAllGanhosFinanceiro(localStorage.getItem('estabId'), localStorage.getItem('selectedDate'))
          .then((response) => {
            if (response.data.totalGanhos) {
              // Atualize o valor da propriedade "value" com o total de custos formatado
              this.stats.money.value = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(response.data.totalGanhos);
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
    getAllRenda() {
      getAllRendaFinanceiro(localStorage.getItem('estabId'), localStorage.getItem('selectedDate'))
          .then((response) => {
            if (response.data.totalRenda) {
              // Atualize o valor da propriedade "value" com o total de custos formatado
              this.stats.users.value = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(response.data.totalRenda);
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
    getPageGanhos() {
      this.$router.push('/create_ganhos')
    },
  },
  created() {
    this.getAllCustos();
    this.getAllGanhos();
    this.getAllRenda();
    this.getTopCustos();
    this.getTopGanhos();
  },
  components: {
    DoughnutChart,
    HistoryFinanceiro,
    Card,
    GradientLineChart,
  },
};
</script>
