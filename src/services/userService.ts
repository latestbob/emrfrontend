import React from 'react';

import axios from 'axios';


//update profile
export async function updateProfile(firstname:string, lastname:string, email:string, phone:string,  department:string, dob:string, gender:string, address:string, uuid:string ){
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/profile/${uuid}`, 
            { firstname, lastname, email, phone, department, dob, gender, address  },

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
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/nonclincalstaff`,

            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to get Non Clinical Staff');
    }
}

//get all clinial staff

export async function getClinicalStaff(){
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/clinicalstaff`,

            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to get  Clinical Staff');
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


//update unique user details (function by admin and super admin)
export async function updateUniqueUser(
    firstname:string, lastname:string, email:string, phone:string, uuid:string, role:string, depart:string, dob:string, gender:string, address:string, aos:string, fee:number
){
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/unique/update`, 
            { firstname, lastname, email, phone, uuid, role, department:depart, dob, gender, address, aos, fee },

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


//update unique user password  (super admin)
export async function changeUniquePassword(
   uuid:string, password:string
){
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/unique/password/${uuid}`, 
            { password },

            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to change staff password');
    }
}