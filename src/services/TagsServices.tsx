import axios, { HttpStatusCode } from "axios";
import { Tag } from "../models/Tag";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:7105/api";
export const PostTagsAPI = async (id: string, title: string, idUser: string) => {
  try {
    const data = await axios.post<Tag>(api + "/AddTags", {
      id: id,
      title: title,
      idUser: idUser,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const GetTagsAPI = async (idUser: string) => {
  try {
    const response = await axios.get(api + "/GetTags", {
      params: {
        idUser,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const DeleteTagsAPI = async (id: string) => {
  try {
    const response = await axios.delete<HttpStatusCode>(
      api + "/DeleteTag?id=" + id
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};
export const UpdateTagsAPI = async (id: string, title: string, idUser: string) =>{
  try {
    const response = await axios.patch(api +"/UpdateTag",{
      id: id,
      title: title,
      idUser: idUser
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}