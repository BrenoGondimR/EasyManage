import axios from "axios";
import {createFornecedorUrl, getForne, getHistoryFornecedores, updateForne} from "@/constants/config";


export const createFornecedor = (bodyCupom) => {
  return axios.post(createFornecedorUrl, bodyCupom);
};

export const getAllFornecedores = (estabId) => {
  return axios.get(getHistoryFornecedores + estabId);
};

export const getInfosFornecedor = (manutId, estabId) => {
  return axios.get(getForne + manutId + '/' + estabId);
};

export const editFornecedor = (data, manutId) => {
  return axios.put(updateForne + manutId, data );
};