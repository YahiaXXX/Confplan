import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from './hooks/useAuth'
const RequireAuth = ({bool}) => {

  
  // const  {auth}  = useAuth({is_admin:JSON.parse(localStorage.getItem('is_admin')),accessToken:JSON.parse(localStorage.getItem('accessToken'))});
  return  (
    JSON.parse(localStorage.getItem('is_admin'))===bool
        ? <Outlet/>
        : localStorage.getItem('token') !== null  
         ? <Navigate to="/Unauthorized" />
         : <Navigate to="/login" />
  ) 
};

export default RequireAuth;