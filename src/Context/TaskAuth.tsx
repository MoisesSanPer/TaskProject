import { toast } from "react-toastify";
import { Category } from "../models/Category";
import { Status } from "../models/Status";
import { Tag } from "../models/Tag";
import { Task } from "../models/Task";
import { PostTaskAPI } from "../services/TaskService";

export const TaskAdd = async(id:string,title:string,description:string,endDate:string,status:Status,subTasks:Task[],tags:Tag[],categories:Category[],idUser:string) => {
  await PostTaskAPI(id,title,description,endDate,status,subTasks,tags,categories,idUser)
    .then((res) => {
      const task: Task = {
        id: res?.data.id ?? "",
        title: res?.data.title ?? "",
        description: res?.data.description ?? "",
        endDate: res?.data.endDate ?? "",
        status: res?.data.status ?? Status.NonStarted, 
        subTasks: res?.data.subTasks ??undefined,
        tags: res?.data.tags ?? undefined,
        categories: res?.data.categories ?? undefined,
        idUser: res?.data.idUser ?? "",
      };
      toast.success("Task Add Success!");
      return task;
    })
    .catch(() => toast.warning("Server error occurred"));
};