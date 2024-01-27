let apisUrl;

if (window.location.host === "easymanagepro.com.br") {
  apisUrl = 'https://apiseasymanage.online/'; // Usando 'https' após configurar SSL
} else {
  apisUrl = 'http://localhost:5001/'; // 'http' está correto apenas para desenvolvimento local
}

// Manutenções
export const createManutencoesUrl = apisUrl + 'manutencoes/create';
export const findManutencoesUrl = apisUrl + 'manutencoes/';
export const updateStatusManut = apisUrl + 'manutencoes/status/update/';
export const updateManut = apisUrl + 'manutencoes/edit/update/';
export const getManut = apisUrl + 'manutencoes/edit/get/';

// Fornecedores
export const createFornecedorUrl = apisUrl + 'fornecedores/create';
export const getHistoryFornecedores = apisUrl + 'fornecedores/';
export const getForne = apisUrl + 'fornecedores/edit/get/';
export const updateForne = apisUrl + 'fornecedores/edit/update/';

// Piscina
export const criarTratamento = apisUrl + 'piscina/create';
export const criarManutencao = apisUrl + 'piscina/manutencao/create';
export const updateEstadoManut = apisUrl + 'piscina/estado/update/';
export const getHistory = apisUrl + 'piscina/';
export const getHistoryManutencao = apisUrl + 'piscina/manutencao/';
export const getPiscina = apisUrl + 'piscina/edit/get/';
export const updateTrat = apisUrl + 'piscina/edit/update/';



// Treinamentos
export const criarTreinamento = apisUrl + 'treinamentos/create';
export const getHistoryTreinamentos = apisUrl + 'treinamentos/';
export const updateStatusTreinamentos = apisUrl + 'treinamentos/status/update/';
export const getTreinamento = apisUrl + 'treinamentos/edit/get/';
export const updateTreinamento = apisUrl + 'treinamentos/edit/update/';

// Financeiro
export const criarFinanceiro = apisUrl + 'financeiro/create';
export const getAllCustos = apisUrl + 'financeiro/custos/';
export const getTopCustos = apisUrl + 'financeiro/topcustos/';
export const getTopGanhos = apisUrl + 'financeiro/topganhos/';
export const getAllFinanceiros = apisUrl + 'financeiro/todos/';
export const getAllFinanceiroCGR = apisUrl + 'financeiro/cgr/';
export const getFinanc = apisUrl + 'financeiro/edit/get/';
export const updateFinanc = apisUrl + 'financeiro/edit/update/';
export const getAllGanhos = apisUrl + 'financeiro/ganhos/';
export const getAllRenda = apisUrl + 'financeiro/renda/';


// Login
export const loginUser = apisUrl + 'login';


// Meus Dados
export const dadosEstab = apisUrl + 'estabelecimento/';

