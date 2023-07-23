import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Quartos/Dashboard.vue";
import Funcionarios from "../views/Funcionarios/Funcionarios"
import Signin from "../views/Signin.vue";
import Piscina from "../views/Piscina/Piscina.vue";
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
