import axios from "axios";
import {
  criarTreinamento,
  getHistoryTreinamentos,
  updateStatusTreinamentos
} from "@/constants/config";

export const getAllHistory = () => {
  return axios.get(getHistoryTreinamentos);
};

export const createTreinamento = (data) => {
  return axios.post(criarTreinamento, data);
};

export const updateStatusTreinamento = (data, manutId) => {
  return axios.put(updateStatusTreinamentos + manutId, data );
};

