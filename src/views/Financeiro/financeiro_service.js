import axios from "axios";
import {
    criarFinanceiro,
    getAllCustos,
    getAllFinanceiroCGR,
    getAllFinanceiros,
    getAllGanhos,
    getAllRenda, getFinanc, updateFinanc
} from "@/constants/config";


export const createFinanceiro = (bodyCupom) => {
    return axios.post(criarFinanceiro, bodyCupom);
};

export const getAllCustosFinanceiro = () => {
    return axios.get(getAllCustos);
};
export const getAllGanhosFinanceiro = () => {
    return axios.get(getAllGanhos);
};
export const getAllRendaFinanceiro = () => {
    return axios.get(getAllRenda);
};

export const getAllFinanceiro = () => {
    return axios.get(getAllFinanceiros);
};
export const getAllCGR = () => {
    return axios.get(getAllFinanceiroCGR);
};

export const getInfosFinanceiro = (manutId) => {
    return axios.get(getFinanc + manutId);
};

export const editFinanceiro = (data, manutId) => {
    return axios.put(updateFinanc + manutId, data );
};