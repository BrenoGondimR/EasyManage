import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Quartos/Dashboard.vue";
import Funcionarios from "../views/Funcionarios/Funcionarios"
import Signin from "../views/Signin.vue";
import CreateTrat from "../views/Piscina/Create.vue";
import Piscina from "../views/Piscina/index.vue";
import CreateFunc from "../views/Funcionarios/Create";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/funcionarios",
    name: "Funcionarios",
    component: Funcionarios,
  },
  {
    path: "/create_tratamento",
    name: "Create Tratamento",
    component: CreateTrat,
  },
  {
    path: "/piscina",
    name: "Piscina",
    component: Piscina,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/create_funcionario",
    name: "Create Funcionario",
    component: CreateFunc,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
