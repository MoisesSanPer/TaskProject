import { toast } from "react-toastify";
import { Category } from "../models/Category";
import { PostCategoryAPI } from "../services/CategoryServices";


export const categoryAdd = async (title:string,idUser:string) =>{
    await PostCategoryAPI(title,idUser)
      .then((res) =>
      {
        const category:Category ={
          id:res?.data.id ?? "",
          title:res?.data.title ?? "",
          idUser:res?.data.idUser ?? "",
        }
        toast.success("Category Add Success!");
        return category;
      })
      .catch(() => toast.warning("Server error occurred"));
  }