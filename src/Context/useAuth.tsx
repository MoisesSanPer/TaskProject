import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/User";
import { loginAPI, registerAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Category } from "../models/Category";
import { GetCategoryAPI } from "../services/CategoryServices";
import { Tag } from "../models/Tag";
import { GetTagsAPI } from "../services/TagsServices";
import { Task } from "../models/Task";
import { GetTaskAPI} from "../services/TaskService";
import { GetUserConfigurationAPI } from "../services/UserConfigurationService";
import { UserConfiguration } from "../models/UserConfiguration";
//Here we delcare the type that we want to have in the context of the app
type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  Tasks:Task[];
  Categories: Category[];
  Tags:Tag[];
  updateListTask:(updatedList:Task[])  => void;
  Configuration:UserConfiguration;
  updateConfiguration:(configuration:UserConfiguration) => void;
};
type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [category,setCategory] = useState<Category[]>([]);
  const [tag,setTag]= useState<Tag[]>([]);
  const [task,setTask] = useState<Task[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [configuration, setConfiguration]=useState<UserConfiguration >( {theme:"light",idUser:user?.id ?? ""})




  const isTokenValid = () => {
    console.log("Validating the token");
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (decoded.exp) {
      if (Date.now() >= decoded.exp * 1000) {
        return false;
      }
    }
    return true;
  };

  //This  is execute when we  create the component
  //Validate the token
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    setToken(token);
  }, []);

  useEffect(() => {
    if (isTokenValid()) {
      if (user && token) {
        console.log("Token has been validated");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        GetCategoryAPI(user.id)
        .then((data) => {
         setCategory(data);
        })
        .catch(() => {
          toast.warning("Server error occurred");
        });
        GetTagsAPI(user.id)
        .then((data) => {
          setTag(data);
        })
        .catch(() => {
          toast.warning("Server error occurred");
        });
        GetTaskAPI(user.id)
        .then((data) => {
          setTask(data);
        })
        .catch(() => {
          toast.warning("Server error occurred");
        });
      }
      }
    setIsReady(true);
  }, [token]);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
            id:res.data.id,
          };
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Registration Success!");
          navigate("/menu");
        }
      })
      .catch(() => toast.warning("Server error occurred"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) =>  {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
            id:res.data.id,
          };
          setToken(res?.data.token);
          setUser(userObj!);
          GetUserConfigurationAPI(userObj?.id!).then((data) =>{
            setConfiguration(data)
          })
          toast.success("Login Success!");
          navigate("/menu");
        }
      })
      .catch(() => toast.warning("Server error occurred"));
  };

  
const updateListTask = (UpdatedTaskList:Task[]) => {
   setTask(UpdatedTaskList);
   };
   const updateConfiguration = (UpdatedConfiguration:UserConfiguration) =>{
    setConfiguration(UpdatedConfiguration)
   }
  

  const isLoggedIn = () => {
    return !!user && isTokenValid();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser, Categories:category, Tags:tag,Tasks:task,updateListTask,Configuration:configuration,updateConfiguration }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
//This is the function that recolect the data from the UserContextType which they are in the context of the application
export const useAuth = () => React.useContext(UserContext);
