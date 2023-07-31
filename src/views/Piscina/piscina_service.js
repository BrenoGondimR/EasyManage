import axios from "axios";
import {
    criarManutencao,
    criarTratamento, getHistory
} from "@/constants/config";

export const getAllHistory = () => {
    return axios.get(getHistory);
};

export const createTratamento = (data) => {
    return axios.post(criarTratamento, data);
};
export const createManutencao = (data) => {
    return axios.post(criarManutencao, data);
};

