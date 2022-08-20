import { Navigate, Outlet ,useLocation } from "react-router-dom";
import useAuth from './hooks/useAuth'
import Account from "./pages/Account";
const RequireAuth = () => {
  const  {auth,setAuth}  = useAuth({accessToken:localStorage.getItem('token'),is_admin:localStorage.getItem('is_admin')});
  // useEffect(()=>{
    
  //   if (localStorage.getItem('token')){
  //     const accessToken=localStorage.getItem('token')
  //     setAuth({accessToken})}
  // },[])
  
  return  (
     auth?.is_admin==false
        ? <Outlet/>
        : <Navigate to="/login"/>
  ) 
};

export default RequireAuth;