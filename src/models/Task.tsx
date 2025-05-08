import { Category } from "./Category";
import { Tag } from "./Tag";

export type  Task ={
    id:string;
    title:string;
    description?:string;
    endDate?:string;
    status:number;
    subTasks:Task[];
    tags:Tag[];
    categories:Category[];
    idUser:string;
}