import { toast } from "react-toastify"

export const handleError =(error:any)=>{
    if(error.response){
        toast.error("Response error:",error.response);
        console.log("Response error:", error.response);
    } else if (error.request){
        toast.error("Request error:",error.response);
        console.log("Request error:", error.response); 
    } else{
        toast.error("Error:",error.message);
        console.log("Error:", error.message); 
    }
}