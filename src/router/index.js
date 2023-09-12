import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Financeiro/Dashboard.vue";
import Manutencoes from "../views/Manutenções/index.vue"
import Treinamentos from "../views/Treinamentos/index.vue"
import Signin from "../views/Signin.vue";
import CreateTrat from "../views/Piscina/Create.vue";
import Piscina from "../views/Piscina/index.vue";
import CreateManut from "../views/Piscina/Manutencao";
import CreateManutGeral from "../views/Manutenções/create.vue";
import CreateTreinamento from "../views/Treinamentos/create.vue";
import Fornecedores from "../views/Fornecedores/index.vue";
import CreateForne from "../views/Fornecedores/create.vue";
import CreateCustos from "../views/Financeiro/create_custos.vue";
import CreateGanhos from "../views/Financeiro/create_ganhos.vue";
import EditManut from "../views/Manutenções/edit.vue";
import EditTreinamento from "../views/Treinamentos/edit.vue";
import EditFornecedor from "../views/Fornecedores/edit.vue";

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
    name: "Manutenção Piscina",
    component: CreateManut,
  },
  {
    path: '/edit_manutencao/:id',
    name: 'Editar Manutencao',
    component: EditManut,
  },
  {
    path: '/edit_treinamento/:id',
    name: 'Editar Treinamento',
    component: EditTreinamento,
  },
  {
    path: '/edit_fornecedor/:id',
    name: 'Editar Fornecedor',
    component: EditFornecedor,
  },
  {
    path: "/create_manutencao_geral",
    name: "Manutenção",
    component: CreateManutGeral,
  },
  {
    path: "/create_custos",
    name: "Custos",
    component: CreateCustos,
  },
  {
    path: "/create_ganhos",
    name: "Ganhos",
    component: CreateGanhos,
  },
  {
    path: "/create_treinamento",
    name: "Treinamento",
    component: CreateTreinamento,
  },
  {
    path: "/manutencoes",
    name: "Manutencoes",
    component: Manutencoes,
  },
  {
    path: "/treinamentos",
    name: "Treinamentos",
    component: Treinamentos,
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
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
