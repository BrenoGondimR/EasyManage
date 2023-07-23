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

// Defina outras constantes globais, se necessário

// Exporte as constantes para serem usadas em outros arquivos
export default {
  deleteFuncionarioUrl,
  editFuncionarioUrl,
  createFuncionarioUrl,
  findFuncionariosUrl,
};
