import type React from "react"
import type { RegisterFormData } from "../constant"
import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
    children: React.ReactNode;
  };

const PrivateRoute : React.FC<PrivateRouteProps> = ({children}) => {
    const loggedData : RegisterFormData | null = JSON.parse(localStorage.getItem("loggedUser") || "") 
    console.log(loggedData,"LOggggg");
    
    return loggedData ?<>{children}</> : <Navigate to="/appinovation/login" />;

}
export default PrivateRoute