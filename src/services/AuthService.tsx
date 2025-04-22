import axios from "axios";
import { UserProfileToken } from "../models/User";
import { handleErrorLogin } from "../Helpers/ErrorHandlerLogin";
const api = "http://localhost:7105/api";

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleErrorLogin(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleErrorLogin(error);
  }
};
