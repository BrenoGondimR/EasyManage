import axios from "axios";
import {
    loginUser,
} from "@/constants/config";


export const loginAccount = (data) => {
    return axios.post(loginUser, data);
};
