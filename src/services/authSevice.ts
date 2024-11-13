import React from 'react';
import axios from 'axios';

export async function LoginUser(email: string, password: string) {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, {
            email,
            password
        });

        return response.data; // This should contain the data from the backend (e.g., token or user info)
    } catch (error: any) {
       // console.error('Login error:', error.response?.data);

        
        return {
            status: 'failed',
            message: error.response?.data?.error || 'An error occurred during login',
        };
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
