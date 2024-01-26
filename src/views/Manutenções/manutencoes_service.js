import axios from "axios";
import {
    createManutencoesUrl, findManutencoesUrl, getManut, updateManut, updateStatusManut,
} from "@/constants/config";

export const getAllHistory = (estabId) => {
    return axios.get(findManutencoesUrl + estabId);
};

export const createManutencao = (data) => {
    return axios.post(createManutencoesUrl, data);
};

export const updateStatus = (data, manutId) => {
    return axios.put(updateStatusManut + manutId, data );
};

export const editManutencao = (data, manutId) => {
    return axios.put(updateManut + manutId, data );
};

export const getInfosManut = (manutId, estabId) => {
    return axios.get(getManut + manutId + '/' + estabId);
};

