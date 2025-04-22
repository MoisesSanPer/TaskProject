import { Category } from "./Category";
import { Status } from "./Status";
import { Tag } from "./Tag";

export type  Task ={
    id:string;
    title:string;
    description?:string;
    endDate?:string;
    status:Status;
    subTasks?:Task[];
    tags?:Tag[];
    category?:Category[];
    idUser:string;
}