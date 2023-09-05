let apisUrl;

if (window.location.host.split(":")[0] === "easymanage.com.br") {
  apisUrl = 'https://easymanage.com.br/';
} else {
  apisUrl = 'http://localhost:5001/';
}

// Manutenções
export const createManutencoesUrl = apisUrl + 'manutencoes/create';
export const findManutencoesUrl = apisUrl + 'manutencoes';

// Fornecedores
export const createFornecedorUrl = apisUrl + 'fornecedores/create';
export const getHistoryFornecedores = apisUrl + 'fornecedores';
// Piscina
export const criarTratamento = apisUrl + 'piscina/create';
export const criarManutencao = apisUrl + 'piscina/manutencao/create';
export const updateEstadoManut = apisUrl + 'piscina/estado/update/';
export const getHistory = apisUrl + 'piscina';
export const getHistoryManutencao = apisUrl + 'piscina/manutencao';

