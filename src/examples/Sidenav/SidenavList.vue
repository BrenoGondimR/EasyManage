<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Financeiro'"
        >
          <template v-slot:icon>
            <i class="ni ni-money-coins text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/manutencoes"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'Manutenções'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-settings text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
            url="/treinamentos"
            :class="getRoute() === 'tables' ? 'active' : ''"
            :navText="this.$store.state.isRTL ? 'الجداول' : 'Treinamentos'"
        >
          <template v-slot:icon>
            <i
                class="ni ni-single-copy-04 text-sm opacity-10" style="color: #179417 !important;"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/fornecedores"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'Fornecedores'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-box-2 text-sm opacity-10" style="color: orange !important;"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/piscina"
          :class="getRoute() === 'piscina' ? 'active' : ''"
          :navText="'Piscina'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-umbrella-13 text-info text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
