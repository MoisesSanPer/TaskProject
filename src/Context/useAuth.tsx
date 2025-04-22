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

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  Categories: Category[];
  Tags:Tag[];
};
type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [category,setCategory] = useState<Category[]>([]);
  const [tag,setTag]= useState<Tag[]>([]);
  const [isReady, setIsReady] = useState(false);

  const isTokenValid = () => {
    console.log("Validating the token");
    // const token2 = localStorage.getItem("token");
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
  //Validar el token
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
          return data;
        })
        .catch(() => {
          toast.warning("Server error occurred");
        });
        GetTagsAPI(user.id)
        .then((data) => {
          setTag(data);
          return data;
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
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
            id:res.data.id,
          };
          setToken(res?.data.token);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/menu");
        }
      })
      .catch(() => toast.warning("Server error occurred"));
  };

  

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
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser, Categories:category, Tags:tag}}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
