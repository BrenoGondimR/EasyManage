import axios from "axios";
import {
    criarTratamento, getHistory,
} from "@/constants/config"

export const getAllHistory = () => {
    return axios.get(getHistory);
};

export const createTratamento = (bodyTratamento) => {
    return axios.post(criarTratamento, bodyTratamento);
};

