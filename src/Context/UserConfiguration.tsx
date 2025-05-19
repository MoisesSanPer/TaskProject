import { toast } from "react-toastify";
import { UserConfiguration } from "../models/UserConfiguration";
import { PostUserConfigurationAPI } from "../services/UserConfigurationService";

export const userConfigurationAdd = async (theme: string, idUser: string) => {
  await PostUserConfigurationAPI(theme, idUser)
    .then((res) => {
      const userConfiguration: UserConfiguration = {
        theme: res?.data.theme ?? "",
        idUser: res?.data.idUser ?? "",
      };
      return userConfiguration;
    })
    .catch(() => toast.warning("Server error occurred"));
};
