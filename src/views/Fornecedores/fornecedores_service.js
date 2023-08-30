import axios from "axios";
import { createFornecedorUrl, getHistoryFornecedores } from "@/constants/config";


export const createFornecedor = (bodyCupom) => {
  return axios.post(createFornecedorUrl, bodyCupom);
};

export const getAllFornecedores = () => {
  return axios.get(getHistoryFornecedores);
};