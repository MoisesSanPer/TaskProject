import { toast } from "react-toastify";
import { Category } from "../models/Category";
import {
  DeleteCategoryAPI,
  PostCategoryAPI,
  UpdateCategoryAPI,
} from "../services/CategoryServices";

//Function that call the  API function
export const categoryAdd = async (
  id: string,
  title: string,
  idUser: string
) => {
  await PostCategoryAPI(id, title, idUser)
    .then((res) => {
      const category: Category = {
        id: res?.data.id ?? "",
        title: res?.data.title ?? "",
        idUser: res?.data.idUser ?? "",
      };
      toast.success("Category Add Success!");
      return category;
    })
    .catch(() => toast.error("Category can not be updated"));
};

//Function that return a  Promise<boolean> and can later control the status code in the build of the view
//It return a boolean to later  to control it  has delete successfully the   category or no
export const categoryDelete = async (id: string,isAll:boolean): Promise<boolean> => {
  try {
    //This is the return of the backend function that  told us  if the category has been deleted
    //Normally you do the when but ins this case we need to return a boolean because  if we do not return we do not know
    // if the status is 200 or not
    const res = await DeleteCategoryAPI(id,isAll);
    if (res?.status == 200 && isAll == true) {
      toast.success("Category Delete Success!");
      return true;
    }
    else if (res?.status == 200) {
      toast.success("Category Delete Success!");
      toast.success("Task Delete Success!");
      return true;
    } else {
      toast.error("Failed to delete category. Please try again.");
      return false;
    }
  } catch {
    toast.warning("Server error occurred");
    return false;
  }
};

export const categoryUpdate = async (
  id: string,
  title: string,
  idUser: string
) => {
  await UpdateCategoryAPI(id, title, idUser)
    .then((res) => {
      toast.success("Category Update Success!");
      return res;
    })
    .catch(() => toast.error("Category can not be updated"));
};
