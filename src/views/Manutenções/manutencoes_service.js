import axios from "axios";
import {
    createManutencoesUrl, findManutencoesUrl,
} from "@/constants/config";

export const getAllHistory = () => {
    return axios.get(findManutencoesUrl);
};

export const createManutencao = (data) => {
    return axios.post(createManutencoesUrl, data);
};

