<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.money.title"
              :value="stats.money.value"
              :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.users.title"
              :value="stats.users.value"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.clients.title"
              :value="stats.clients.value"
              :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="stats.clients.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.sales.title"
              :value="stats.sales.value"
              :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass"
              :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail"
              directionReverse
            ></card>
          </div>
        </div>
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

export default {
  name: "dashboard-default",
  data() {
    return {
      stats: {
        money: {
          title: "Bem-Te-Vi",
          value: "Notificações",
          percentage: "1",
          iconClass: "ni ni-money-coins",
          detail: "12/06/2023",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "João De Barro",
          value: "Notificações",
          percentage: "4",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: "22/07/2023",
        },
        clients: {
          title: "Colibri",
          value: "Notificações",
          percentage: "10",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "06/10/2023",
        },
        sales: {
          title: "Sabiá",
          value: "Notificações",
          percentage: "12",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "11/12/2023",
        },
      },
    };
  },
  components: {
    Card,
    GradientLineChart,
  },
};
</script>
