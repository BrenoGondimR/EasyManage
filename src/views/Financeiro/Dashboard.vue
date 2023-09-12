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
            <card style="cursor: pointer"
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
        <HistoryFinanceiro></HistoryFinanceiro>
        <div class="row">
          <div class="col-lg-12 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
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
  getAllRendaFinanceiro
} from "@/views/Financeiro/financeiro_service";
import HistoryFinanceiro from "@/views/components/HistoryFinanceiro.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
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
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Renda",
          value: "R$ 0,00",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: "22/07/2023",
        },
        clients: {
          title: "Custos",
          value: "R$ 0,00",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
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
      getAllCustosFinanceiro()
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
    getAllGanhos() {
      getAllGanhosFinanceiro()
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
      getAllRendaFinanceiro()
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
  },
  components: {
    HistoryFinanceiro,
    Card,
    GradientLineChart,
  },
};
</script>
