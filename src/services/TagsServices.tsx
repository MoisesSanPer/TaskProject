import axios from "axios";
import { Tag } from "../models/Tag";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:7105/api";    
export const  PostTagsAPI = async (title:string,idUser:string)=>{
    try{
        const data = await axios.post<Tag>(api +"/AddTags"
            ,{
            title:title,
            idUser:idUser
        });
        return data;
    }catch(error){
        handleError(error);
    }
}
export const GetTagsAPI = async (idUser:string) =>{
    try{
        const response = await axios.get( api+"/GetTags", { params: {
            idUser
         } });
     return response.data
    }catch(error){
        handleError(error);
    }
}