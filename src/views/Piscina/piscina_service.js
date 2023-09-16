import axios from "axios";
import {
    criarManutencao,
    criarTratamento, getHistory, getHistoryManutencao, getPiscina, updateEstadoManut, updateTrat
} from "@/constants/config";

export const getAllHistory = () => {
    return axios.get(getHistory);
};

export const getAllHistoryManut = () => {
    return axios.get(getHistoryManutencao);
};

export const createTratamento = (data) => {
    return axios.post(criarTratamento, data);
};
export const createManutencao = (data) => {
    return axios.post(criarManutencao, data);
};
export const updateEstado = (data, manutId) => {
    return axios.put(updateEstadoManut + manutId, data );
};

export const getPiscinaId = (manutId) => {
    return axios.get(getPiscina + manutId );
};

export const editTratamento = (data, manutId) => {
    return axios.put(updateTrat + manutId, data );
};

