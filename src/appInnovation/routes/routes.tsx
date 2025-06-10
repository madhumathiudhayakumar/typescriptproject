import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "../screens/registerForm";
import LoginFom from "../screens/loginForm";
import PrivateRoute from "./privateRoute";
import Dashboard from "../screens/dashboard";
import User from "../screens/user";


const AppRoutes : React.FC = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="appinnovation/register" element={<RegisterForm/>}/>
                    <Route path="appinnovation/login" element={<LoginFom/>}/>
                    <Route path="appinnovation/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                    <Route path="appinnovation/user" element={<PrivateRoute><User/></PrivateRoute>}/>

                </Routes>
            </BrowserRouter>
        </div>
    )

}
export default AppRoutes