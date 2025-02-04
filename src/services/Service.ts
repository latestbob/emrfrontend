import React from 'react';

import axios from 'axios';



//fetch services by type

export async function getServiceByType(type:string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/service/fetch/${type}`,
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to get sponsor"
      );
    }
  }
