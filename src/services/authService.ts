import React from 'react';
import axios from 'axios';

export async function LoginUser(email: string, password: string) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/login`, {
            email,
            password
        });

        return response.data; // This should contain the data from the backend (e.g., token or user info)
    } catch (error: any) {
       // console.error('Login error:', error.response?.data);

        
        // return {
        //     status: 'failed',
        //     message: error.response?.data?.error || 'An error occurred during login',
        // };

        throw new Error(error.response?.data?.error || 'n error occurred during login');
    }
}

// Logout User

export async function LogoutUser(){
    try {

        localStorage.removeItem("token");
        localStorage.removeItem('user');

        
        
    } catch (error:any) {
        console.error('Logout error:', error);
    }
}


// forgto password service


export async function forgotPassword(email:string){
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/auth/forgot`, 
            { email }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Email not registered');
    }
}

// verify token 

// Async function to verify the token
export async function verifyToken(token: string) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/auth/verifytoken`, 
        { token }
      );
      return response.data; // Return the response data from the API
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Invalid or expired token');
    }
  }


//   reset password

export async function resetPassword(email:string, password:string){
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/auth/reset-password`, 
            { email, password }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to reset password');
    }
}