import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Status } from "../models/Status";
import { Task } from "../models/Task";
import { Tag } from "../models/Tag";
import { Category } from "../models/Category";
const api = "http://localhost:7105/api";

export const  PostTaskAPI = async (id:string,title:string,description:string,endDate:string,status:Status,subTasks:Task[],tags:Tag[],categories:Category[],idUser:string) =>{
    try{
       const data = await axios.post<Task>(api +"/AddTask",{
        id:id,
        title:title,
        description:description,
        endDate:endDate,
        status:status,
        subTasks:subTasks,
        tags:tags,
        categories:categories,
        idUser:idUser
       });
       return data;
    }catch (error) {
        handleError(error);
    }
}


export const  GetTaskAPI = async(idUser:string) =>{
    try {
       const response = await axios.get( api+'/GetTasks', { params: {
          idUser
       } });
   return response.data
      } catch (error) {
        handleError(error);
      }
  }