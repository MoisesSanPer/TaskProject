import { toast } from "react-toastify";
import { Tag } from "../models/Tag";
import { PostTagsAPI } from "../services/TagsServices";


export const tagAdd = async (title:string,idUser:string) =>{
    await PostTagsAPI(title,idUser)
      .then((res) =>
      {
        const tag:Tag ={
          id:res?.data.id ?? "",
          title:res?.data.title ?? "",
          idUser:res?.data.idUser ?? "",
        }
        toast.success("Tag Add Success!");
        return tag;
      })
      .catch(() => toast.warning("Server error occurred"));
  }