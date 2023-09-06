import axios from "axios";
import {  criarTreinamento, getHistoryTreinamentos } from "@/constants/config";

export const getAllHistory = () => {
  return axios.get(getHistoryTreinamentos);
};

export const createTreinamento = (data) => {
  return axios.post(criarTreinamento, data);
};

