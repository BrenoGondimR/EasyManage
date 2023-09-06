import axios from "axios";
import {criarFinanceiro, getAllCustos, getAllGanhos, getAllRenda} from "@/constants/config";


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
