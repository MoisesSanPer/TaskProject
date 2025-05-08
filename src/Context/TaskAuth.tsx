import { toast } from "react-toastify";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import { Task } from "../models/Task";
import { DeleteTaskAPI, PostTaskAPI, UpdateTaskAPI } from "../services/TaskService";

export const TaskAdd = async(id:string,title:string,description:string,endDate:string,status:number,subTasks:Task[],tags:Tag[],categories:Category[],idUser:string) => {
  await PostTaskAPI(id,title,description,endDate,status,subTasks,tags,categories,idUser)
    .then((res) => {
      const task: Task = {
        id: res?.data.id ?? "",
        title: res?.data.title ?? "",
        description: res?.data.description ?? "",
        endDate: res?.data.endDate ?? "",
        status: res?.data.status!! , 
        subTasks: res?.data.subTasks ?? [] ,
        tags: res?.data.tags ?? [] ,
        categories: res?.data.categories ?? []  ,
        idUser: res?.data.idUser ?? "",
      };
      toast.success("Task Add Success!");
      return task;
    })
    .catch(() => toast.warning("Server error occurred"));
};
export const taskDelete = async (id: string):Promise<boolean> => {
  try {
    const res = await DeleteTaskAPI(id);
    if (res?.status == 200) {
      toast.success("Task Delete Success!");
      return true;
    } else {
      toast.warning("Failed to delete task. Please try again.");
      return false;
    }
  } catch {
    toast.warning("Server error occurred");
    return false;
  }
};
export const taskUpdate = async (id:string,title:string,idUser:string,description:string,endDate:string,status:number,subTasks:Task[],tags:Tag[],categories:Category[]) =>{
  await UpdateTaskAPI(id,title,idUser,description,endDate,status,subTasks,tags,categories)
  .then((res) =>{
    toast.success("Task Update Success!");
    return res;
  })
  .catch(() => toast.warning("Server error occurred"));
}