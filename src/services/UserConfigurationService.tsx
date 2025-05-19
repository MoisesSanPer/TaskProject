import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserConfiguration } from "../models/UserConfiguration";

const api = "http://localhost:7105/api";

export const PostUserConfigurationAPI = async (theme: string,idUser:string) => {
  try {
    const data = await axios.post<UserConfiguration>(api + "/AddTheme", {
      theme: theme,
      idUser:idUser
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const GetUserConfigurationAPI = async (idUser:string) => {
  try {
    const response = await axios.get(api + "/GetTheme", { params: {
        idUser
     } });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
