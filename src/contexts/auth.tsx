import React from 'react';
import { createContext, useState, useEffect,  useContext, ReactNode } from "react";
import { LoginUser, LogoutUser } from '../services/authService';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


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

        // Add Axios response interceptor
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.data?.message === "No token, authorization denied" || error.response?.data?.message  === "Token is not valid") {
                    // Clear token and user data
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                    setToken(null);

                    toast.error(`Authorized or expired token`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                      });

                    // Redirect to login
                    navigate("/");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };

    }, [navigate]);


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