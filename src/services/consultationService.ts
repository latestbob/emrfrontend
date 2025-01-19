import React from "react";

import axios from "axios";


//schedule an appoinmtment


export async function getUniqueConsultation(consultant_uuid:string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/consultation/doctor/${consultant_uuid}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get consultations"
    );
  }
}




