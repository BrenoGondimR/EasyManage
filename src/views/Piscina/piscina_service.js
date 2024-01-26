import axios from "axios";
import {
    criarManutencao,
    criarTratamento, getHistory, getHistoryManutencao, getPiscina, updateEstadoManut, updateTrat
} from "@/constants/config";

export const getAllHistory = (estabId) => {
    return axios.get(getHistory + estabId);
};

export const getAllHistoryManut = (estabId) => {
    return axios.get(getHistoryManutencao + estabId);
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

export const getPiscinaId = (manutId, estabId) => {
    return axios.get(getPiscina + manutId + '/' + estabId);
};

export const editTratamento = (data, manutId) => {
    return axios.put(updateTrat + manutId, data );
};

