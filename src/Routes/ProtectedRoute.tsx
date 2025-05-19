import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = { children: React.ReactNode };
//This methos is to protected the children route if  it is logged in the app it would  redirect to the children if not it would not go 
const ProtectedRoute = ({children}: Props) => {
  const location = useLocation();
  const {isLoggedIn} = useAuth();
  return (isLoggedIn()) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state = {{from: location}} replace />
  );
};

export default ProtectedRoute;
