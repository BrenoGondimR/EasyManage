import axios from "axios";
import {createFornecedorUrl, getForne, getHistoryFornecedores, updateForne} from "@/constants/config";


export const createFornecedor = (bodyCupom) => {
  return axios.post(createFornecedorUrl, bodyCupom);
};

export const getAllFornecedores = () => {
  return axios.get(getHistoryFornecedores);
};

export const getInfosFornecedor = (manutId) => {
  return axios.get(getForne + manutId);
};

export const editFornecedor = (data, manutId) => {
  return axios.put(updateForne + manutId, data );
};