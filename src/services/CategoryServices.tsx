import axios from "axios";
import { Category } from "../models/Category";
import { handleError } from "../Helpers/ErrorHandler";
const api = "http://localhost:7105/api";

export const  PostCategoryAPI = async(title:string,idUser:string) =>{
    try {
        const data = await axios.post<Category>(api + "/AddCategory", {
            title: title,
            id: idUser,
        });
        return data;
      } catch (error) {
        handleError(error);
      }
}

export const  GetCategoryAPI = async() =>{
  try {
      const data = (await axios.get<Category[]>(api + "/GetCategory"));
      return data;
    } catch (error) {
      handleError(error);
    }
}