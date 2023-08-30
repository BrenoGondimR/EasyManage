import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Quartos/Dashboard.vue";
import Funcionarios from "../views/Funcionarios/Funcionarios"
import Signin from "../views/Signin.vue";
import CreateTrat from "../views/Piscina/Create.vue";
import Piscina from "../views/Piscina/index.vue";
import CreateFunc from "../views/Funcionarios/Create";
import CreateManut from "../views/Piscina/Manutencao";
import Fornecedores from "../views/Fornecedores/index.vue";
import CreateForne from "../views/Fornecedores/create.vue";

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
    path: "/create_manutencao",
    name: "Manutenção",
    component: CreateManut,
  },
  {
    path: "/funcionarios",
    name: "Funcionarios",
    component: Funcionarios,
  },
  {
    path: "/fornecedores",
    name: "Fornecedores",
    component: Fornecedores,
  },
  {
    path: "/create_tratamento",
    name: "Create Tratamento",
    component: CreateTrat,
  },
  {
    path: "/create_fornecedor",
    name: "Create Fornecedor",
    component: CreateForne,
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
