import axios from "axios";
import {
  criarTreinamento,
  getHistoryTreinamentos, getTreinamento,
  updateStatusTreinamentos, updateTreinamento
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

export const editTreinamento = (data, manutId) => {
  return axios.put(updateTreinamento + manutId, data );
};

export const getTreinamentoId = (manutId) => {
  return axios.get(getTreinamento + manutId );
};
