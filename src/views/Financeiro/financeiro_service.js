import axios from "axios";
import {
    criarFinanceiro,
    getAllCustos,
    getAllFinanceiroCGR,
    getAllFinanceiros,
    getAllGanhos,
    getAllRenda, getFinanc, getTopCustos, getTopGanhos, updateFinanc
} from "@/constants/config";


export const createFinanceiro = (bodyCupom) => {
    return axios.post(criarFinanceiro, bodyCupom);
};

export const getAllCustosFinanceiro = (estabId, mes) => {
    return axios.get(getAllCustos + estabId + '/' + mes);
};

export const getTopCustosFinanceiro = (estabId, mes) => {
    return axios.get(getTopCustos + estabId + '/' + mes);
};

export const getTopGanhosFinanceiro = (estabId, mes) => {
    return axios.get(getTopGanhos + estabId + '/' + mes);
};
export const getAllGanhosFinanceiro = (estabId, mes) => {
    return axios.get(getAllGanhos + estabId + '/' + mes);
};
export const getAllRendaFinanceiro = (estabId, mes) => {
    return axios.get(getAllRenda + estabId + '/' + mes);
};

export const getAllFinanceiro = (estabId, mes) => {
    return axios.get(getAllFinanceiros + estabId + '/' + mes);
};
export const getAllCGR = (estabId) => {
    return axios.get(getAllFinanceiroCGR + estabId);
};

export const getInfosFinanceiro = (manutId, estabId) => {
    return axios.get(getFinanc + manutId + '/' + estabId);
};

export const editFinanceiro = (data, manutId) => {
    return axios.put(updateFinanc + manutId, data );
};