import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Financeiro/Dashboard.vue";
import Manutencoes from "../views/Manutenções/index.vue"
import Treinamentos from "../views/Treinamentos/index.vue"
import Signin from "../views/Login/Signin.vue";
import CreateTrat from "../views/Piscina/Create.vue";
import Piscina from "../views/Piscina/index.vue";
import CreateManut from "../views/Piscina/Manutencao";
import CreateManutGeral from "../views/Manutenções/create.vue";
import CreateTreinamento from "../views/Treinamentos/create.vue";
import Fornecedores from "../views/Fornecedores/index.vue";
import CreateForne from "../views/Fornecedores/create.vue";
import MeusDados from "../views/User/index.vue";
import CreateCustos from "../views/Financeiro/create_custos.vue";
import CreateGanhos from "../views/Financeiro/create_ganhos.vue";
import EditManut from "../views/Manutenções/edit.vue";
import EditTreinamento from "../views/Treinamentos/edit.vue";
import EditFornecedor from "../views/Fornecedores/edit.vue";
import EditCusto from "../views/Financeiro/editcusto.vue";
import EditGanho from "../views/Financeiro/editganho.vue";
import EditTrat from "../views/Piscina/edit";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_manutencao",
    name: "Manutenção Piscina",
    component: CreateManut,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit_manutencao/:id',
    name: 'Editar Manutencao',
    component: EditManut,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit_treinamento/:id',
    name: 'Editar Treinamento',
    component: EditTreinamento,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit_fornecedor/:id',
    name: 'Editar Fornecedor',
    component: EditFornecedor,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit_piscina/:id',
    name: 'Editar Tratamento',
    component: EditTrat,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit_financeirocusto/:id',
    name: 'Editar Custo',
    component: EditCusto,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit_financeiroganho/:id',
    name: 'Editar Ganho',
    component: EditGanho,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_manutencao_geral",
    name: "Manutenção",
    component: CreateManutGeral,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_custos",
    name: "Custos",
    component: CreateCustos,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_ganhos",
    name: "Ganhos",
    component: CreateGanhos,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_treinamento",
    name: "Treinamento",
    component: CreateTreinamento,
    meta: { requiresAuth: true }
  },
  {
    path: "/manutencoes",
    name: "Manutencoes",
    component: Manutencoes,
    meta: { requiresAuth: true }
  },
  {
    path: "/treinamentos",
    name: "Treinamentos",
    component: Treinamentos,
    meta: { requiresAuth: true }
  },
  {
    path: "/fornecedores",
    name: "Fornecedores",
    component: Fornecedores,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_tratamento",
    name: "Create Tratamento",
    component: CreateTrat,
    meta: { requiresAuth: true }
  },
  {
    path: "/create_fornecedor",
    name: "Create Fornecedor",
    component: CreateForne,
    meta: { requiresAuth: true }
  },
  {
    path: "/meus_dados",
    name: "Meus Dados",
    component: MeusDados,
    meta: { requiresAuth: true }
  },
  {
    path: "/piscina",
    name: "Piscina",
    component: Piscina,
    meta: { requiresAuth: true }
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

// Exemplo de um guard global
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Usa o getter 'isAuthenticated' para verificar o estado de autenticação
    if (!store.getters.isAuthenticated) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
