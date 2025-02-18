import React from 'react';

import axios from 'axios';


//get Roles



export async function getRoles(office_uuid:string){
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/role/${office_uuid}`,

            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
              },
            }
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to get roles');
    }
}