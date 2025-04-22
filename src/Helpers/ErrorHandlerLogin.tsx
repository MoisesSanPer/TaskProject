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
            toast.warning(err.data);
        } else if (err?.status == 401){
            toast.warning("Please login")
            window.history.pushState({},"LoginPage","/login");
        } else if (err){
            toast.warning(err?.data);
        }
    }
}