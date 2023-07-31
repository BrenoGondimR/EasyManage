let apisUrl;

if (window.location.host.split(":")[0] === "easymanage.com.br") {
  apisUrl = 'https://easymanage.com.br/';
} else {
  apisUrl = 'http://localhost:5001/';
}

// Funcionarios
export const deleteFuncionarioUrl = apisUrl + 'funcionarios/delete';
export const editFuncionarioUrl = apisUrl + 'funcionarios/edit';
export const createFuncionarioUrl = apisUrl + 'funcionarios/create';
export const findFuncionariosUrl = apisUrl + 'funcionarios';

// Piscina
export const criarTratamento = apisUrl + 'piscina/create';
export const criarManutencao = apisUrl + 'piscina/manutencao/create';
export const updateEstadoManut = apisUrl + 'piscina/estado/update/';
export const getHistory = apisUrl + 'piscina';
export const getHistoryManutencao = apisUrl + 'piscina/manutencao';


// Exporte as constantes para serem usadas em outros arquivos
export default {
  deleteFuncionarioUrl,
  editFuncionarioUrl,
  createFuncionarioUrl,
  findFuncionariosUrl,
};
