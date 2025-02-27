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


  //get investigation by plan code

  export async function getInvestigationByPlanCode(plan_code:string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/service/investigations/${plan_code}`,
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to get Investigations"
      );
    }
  }


    //get imaging by plan code

    export async function getImagingByPlanCode(plan_code:string) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/service/imaging/${plan_code}`,
    
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
            },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.error || "Unable to get Imaging"
        );
      }
    }

    //get otherservices by plan code

    export async function getOtherServicesByPlanCode(plan_code:string) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/service/otherservices/${plan_code}`,
    
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
            },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.error || "Unable to get other services"
        );
      }
    }
