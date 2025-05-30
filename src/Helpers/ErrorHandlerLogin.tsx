import axios from "axios";
import { toast } from "react-toastify";

export const handleErrorLogin =(error:any) =>{
    if(axios.isAxiosError(error)){
        var err=error.response;
        // you insert it into the arry, run through it and return it.
        if(Array.isArray(err?.data.errors)){
            for(let val of err.data.errors){
                 toast.warning(val.description);
            }
        }else if (err?.data){
            toast.error(err.data);
        } else if (err?.status == 404){
            //This error is the status code that the  return the login from the BackEnd when it does not found the user at the database
            toast.error("Incorrect email or password")
            //this line makes the app to navigate to login page if there is any erro
            window.history.pushState({},"LoginPage","/");
        } else if (err){
            toast.error(err?.data);
        }
    }
}