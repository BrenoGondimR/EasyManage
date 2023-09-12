let apisUrl;

if (window.location.host.split(":")[0] === "easymanage.com.br") {
  apisUrl = 'https://easymanage.com.br/';
} else {
  apisUrl = 'http://localhost:5001/';
}

// Manutenções
export const createManutencoesUrl = apisUrl + 'manutencoes/create';
export const findManutencoesUrl = apisUrl + 'manutencoes';
export const updateStatusManut = apisUrl + 'manutencoes/status/update/';

// Fornecedores
export const createFornecedorUrl = apisUrl + 'fornecedores/create';
export const getHistoryFornecedores = apisUrl + 'fornecedores';
// Piscina
export const criarTratamento = apisUrl + 'piscina/create';
export const criarManutencao = apisUrl + 'piscina/manutencao/create';
export const updateEstadoManut = apisUrl + 'piscina/estado/update/';
export const getHistory = apisUrl + 'piscina';
export const getHistoryManutencao = apisUrl + 'piscina/manutencao';

// Treinamentos
export const criarTreinamento = apisUrl + 'treinamentos/create';
export const getHistoryTreinamentos = apisUrl + 'treinamentos';
export const updateStatusTreinamentos = apisUrl + 'treinamentos/status/update/';

// Financeiro
export const criarFinanceiro = apisUrl + 'financeiro/create';
export const getAllCustos = apisUrl + 'financeiro/custos';
export const getAllFinanceiros = apisUrl + 'financeiro/todos';
export const getAllFinanceiroCGR = apisUrl + 'financeiro/cgr';

export const getAllGanhos = apisUrl + 'financeiro/ganhos';
export const getAllRenda = apisUrl + 'financeiro/renda';