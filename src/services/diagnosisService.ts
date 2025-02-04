import React from "react";

import axios from "axios";

//get all registered patient

export async function getAllDiagnosis() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/diagnosis/fetch`,

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