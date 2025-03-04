import React from "react";

import axios from "axios";

//get all registered patient

export async function getAppointments(page:number) {

  
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/all?page=${page}&limit=10`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get appointment"
    );
  }
}

//schedule an appoinmtment

export async function scheduleAppointment(
  firstname:string,
        lastname:string,
        upi:string,
        email:string,
        sponsor:string,
        sponsor_plan:string,
        office:string,
        office_uuid:string,
        
        


        visitType:string,
          
          visitDate:string,
          scheduleTime:string,
          urgent:boolean,
          weight:number,
          height:number,
          bloodPressure:number,
          temperature:number,
          pulseRate:number,
          billable:boolean,
       
      
      
        comment:string,
        purpose:string,
         consultant:string,
         biller:string,
         paymentPolicy:string,
        
         
      
      
) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/schedule`,
      { firstname, lastname, upi, email, sponsor, sponsor_plan, office, office_uuid,  visit_type:visitType, visit_date:visitDate, scheduled_time:scheduleTime, is_urgent:urgent, comment, vital_weight:weight, vital_height:height, vital_blood_pressure:bloodPressure, vital_temperature:temperature, vital_pulserate:pulseRate, is_billed:billable, purpose, consultant, biller, payment_policy:paymentPolicy },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to schedule appointment"
    );
  }
}



//get unique appointment

export async function getUniqueAppointment(uuid:string) {
  try {

    
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/unique/${uuid}`,
      

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get appointment"
    );
  }
}





//update appointment 

export async function updateAppointment(


 

   sponsor:string,
   sponsor_plan:string,

   purpose:string,
   visitType:string,
   consultant:string,
    visitDate:string,
   scheduleTime:string,
  urgent:boolean,
   comment:string,
 
   weight:number,
   height:number,
   bloodPressure:number,
   temperature:number,
   pulseRate:number,
   billable:boolean,
   uuid:string,
    
  
) {
  try {

    
    const response = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/unique/${uuid}`,
      { sponsor, sponsor_plan, purpose, visit_type:visitType, consultant, visit_date:visitDate, scheduled_time:scheduleTime, is_urgent:urgent, comment, vital_weight:weight, vital_height:height, vital_blood_pressure:bloodPressure, vital_temperature:pulseRate, vital_pulserate:pulseRate, is_billed:billable },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(

      
      error.response?.data?.error || "Unable to update appointment"
    );
  }
}


//cancel appointment

export async function cancelAppointment(uuid:string) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/cancel/${uuid}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to cancel appointment"
    );
  }
}