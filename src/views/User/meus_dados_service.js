import axios from "axios";
import {
    dadosEstab
} from "@/constants/config";

export const getAllDados= (estabId) => {
    return axios.get(dadosEstab + estabId);
};

