import axios, { HttpStatusCode } from "axios";
import { Category } from "../models/Category";
import { handleError } from "../Helpers/ErrorHandler";
const api = "http://localhost:7105/api";

export const  PostCategoryAPI = async(id: string, title: string, idUser: string) => {
    try {
        const data = await axios.post<Category>(api + "/AddCategory", {
            id: id,
            title: title,
            idUser: idUser,
        });
        return data;
      } catch (error) {
        handleError(error);
      }
}
export const  GetCategoryAPI = async (idUser: string) =>{
  try {
     const response = await axios.get( api +'/GetCategory', { params: {
        idUser
     } });
 return response.data
    } catch (error) {
      handleError(error);
    }
}

export const DeleteCategoryAPI = async (id :string)=>{
  try{
    const response = await axios.delete<HttpStatusCode>(api +"/DeleteCategory?id="+ id)
    console.log("User deleted succesfully"+ response)
    return response;
  }catch (error) {
    handleError(error);
  }
}
export const UpdateCategoryAPI = async (id: string, title: string, idUser: string)=>{
  try {
    const response = await axios.patch(api+ "/UpdateCategory",{
      id: id,
      title: title,
      idUser: idUser,
    })
    return response
  } catch (error) {
    handleError(error);
  }
}