import React from "react";

import axios from "axios";

//get all registered patient

export async function getAllSponsors() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/sponsor/fetch`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get sponsors"
    );
  }
}



// add new sponsor


export async function AddSponsor(
    
         name:string,
         type:string,
         phone:string,
         contact_email:string,
         
         contact_person:string
          
           
        
        
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/sponsor/create`,
        { name, type, phone, contact_email, contact_person },
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to add Sponsor"
      );
    }
  }


//get unique sponsor


export async function getUniqueSponsor(uuid:string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/sponsor/fetch/${uuid}`,
  
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


  //update unique sponsor

export async function updateUniqueSponsor(


  
    name:string,
    type:string,
    phone:string,
    contact_email:string,
    
    contact_person:string,
    uuid:string,
     
   
 ) {
   try {
     const response = await axios.put(
       `${process.env.REACT_APP_API_ENDPOINT}/api/sponsor/edit/${uuid}`,
       { name, type, phone, contact_email, contact_person },
 
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
         },
       }
     );
     return response.data;
   } catch (error: any) {
     throw new Error(
       error.response?.data?.error || "Unable to update sponsor"
     );
   }
 }

 //get all sponsor plans


 export async function getAllSponsorPlans() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/sponsor/fetch/all/plans`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get sponsors plans"
    );
  }
}


//get unique plan by name

export async function getUniquePlanByName(name:string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/sponsor/fetch/plan/${name}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get sponsor plan"
    );
  }
}