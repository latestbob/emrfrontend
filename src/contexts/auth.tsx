import React from 'react';
import { createContext, useState, useEffect,  useContext, ReactNode } from "react";
import { LoginUser, LogoutUser } from '../services/authService';

import { useNavigate } from 'react-router-dom';


interface AuthContextType {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>; // Type for setUser
    setToken: React.Dispatch<React.SetStateAction<string | null>>; // Type for setToken
}


// create the auth context

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// create the AuthProvider

export const AuthContextProvider  = function({children} : {children:ReactNode}){

    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    const isAuthenticated = !!token;


    useEffect(() => {
        // Load user data from localStorage if available on initial render
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const value = {
        user,
        token,
        isAuthenticated,
        setUser,
        setToken,
    }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>

}


// custom hook to use the context

export const useAuth =() => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
}