import React from 'react';

import axios from 'axios';


//update profile
export async function updateProfile(phone:string, uuid:string){
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/profile`, 
            { phone, uuid },

            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to update Profile');
    }
}


export async function changePassword(email:string, password:string){
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/changepassword`, 
            { email, password},

            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to change Password');
    }
}


//get all nonclincal staff


export async function getNonClinicalStaff(){
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/nonclincalstaff`
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to get Non Clinical Staff');
    }
}

//get unique not clinical staff

export async function getUniqueNonClinicalStaff(uuid:string){
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/unique/${uuid}`,
            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to get User Details');
    }
}
