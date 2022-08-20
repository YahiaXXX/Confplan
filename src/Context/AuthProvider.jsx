import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({accessToken:localStorage.getItem('token')});
   
    return (
        <AuthContext.Provider value={{ auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;