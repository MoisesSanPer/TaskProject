import { toast } from "react-toastify"

export const handleError =(error:any)=>{
    if(error.response){
        toast.warning("Response error:",error.response);
        console.log("Response error:", error.response);
    } else if (error.request){
        toast.warning("Request error:",error.response);
        console.log("Request error:", error.response); 
    } else{
        toast.warning("Error:",error.message);
        console.log("Error:", error.message); 
    }
}