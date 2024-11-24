import React from 'react';

import axios from 'axios';


//get Roles



export async function getDepartments(office_uuid:string){
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/department/office/${office_uuid}`
          );
          return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.error || 'Unable to get departments');
    }
}