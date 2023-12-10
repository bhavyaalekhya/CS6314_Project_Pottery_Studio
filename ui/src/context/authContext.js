import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // const res = await axios.post("/auth/login", inputs);
    try{
        const res=await axios.post("/login",inputs);
        console.log("in auth context: ", res.data.data )
        res.data.data ? (setCurrentUser(res.data.data)) : alert("username or password incorrect");
    }catch(err){
        console.log(err);
    }
  };

  const logout = async () => {
    try{
        setCurrentUser(null);
        return;
        
    }catch(err){
        console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
