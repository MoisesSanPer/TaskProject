import { toast } from "react-toastify";
import { Tag } from "../models/Tag";
import { DeleteTagsAPI, PostTagsAPI, UpdateTagsAPI } from "../services/TagsServices";

export const tagAdd = async (id: string, title: string, idUser: string) => {
  await PostTagsAPI(id, title, idUser)
    .then((res) => {
      const tag: Tag = {
        id: res?.data.id ?? "",
        title: res?.data.title ?? "",
        idUser: res?.data.idUser ?? "",
      };
      toast.success("Tag Add Success!");
      return tag;
    })
    .catch(() => toast.warning("Server error occurred"));
};

export const tagDelete = async (id: string): Promise<boolean> => {
  try {
    const res = await DeleteTagsAPI(id);
    if (res?.status == 200) {
      toast.success("Tag Delete Success!");
      return true;
    } else {
      toast.warning("Failed to delete tag. Please try again.");
      return false;
    }
  } catch {
    toast.warning("Server error occurred");
    return false;
  }
};

export const tagUpdate = async (id: string, title: string, idUser: string) =>{
  await UpdateTagsAPI(id, title, idUser)
  .then((res) =>{
    toast.success("Tag Update Success!");
    return res;
  })
  .catch(() => toast.warning("Server error occurred"));
}
