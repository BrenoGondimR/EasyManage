import axios from "axios";
import {
    createManutencoesUrl, findManutencoesUrl, updateStatusManut,
} from "@/constants/config";

export const getAllHistory = () => {
    return axios.get(findManutencoesUrl);
};

export const createManutencao = (data) => {
    return axios.post(createManutencoesUrl, data);
};

export const updateStatus = (data, manutId) => {
    return axios.put(updateStatusManut + manutId, data );
};

