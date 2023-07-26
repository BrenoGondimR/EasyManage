import axios from "axios";
import {
  deleteFuncionarioUrl, createFuncionarioUrl, editFuncionarioUrl, findFuncionariosUrl
} from "@/constants/config"

export const getFuncionarios = () => {
  return axios.get(findFuncionariosUrl);
};

export const createFuncionarios = (bodyCupom) => {
  return axios.post(createFuncionarioUrl, bodyCupom);
};

export const editFuncionarios = (bodyCupomPre) => {
  return axios.put(editFuncionarioUrl, bodyCupomPre);
};

export const deleteFuncionarios = (bodyCupomPre) => {
  return axios.put(deleteFuncionarioUrl, bodyCupomPre);
};
