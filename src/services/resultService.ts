import React from "react";

import axios from "axios";

//get all registered patient




// add new result


export async function AddResults(
    
    encounterUuid : string,
    userType:string,
    
    testType: string,
    testDetails: {
      testName: string,
      description?: string,
      sampleType: string,
    },

    results: {
      resultFile?: string,
      notes: string,
   
    },
    uploadedBy: string, // Lab technician/radiologist
    
           
        
        
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/result/add-result`,
        { encounterUuid, userType, testType, testDetails, results, uploadedBy },
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to add result"
      );
    }
  }


//get result by testname

export async function getUniqueResultByTestName(uuid:string, testname:string) {
  try {


    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/result/unique/${uuid}/${testname}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get result"
    );
  }
}


//download result
export async function downloadResultByTestName(uuid:string, testname:string) {
  try {


    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/result/download/${uuid}/${testname}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get result"
    );
  }
}

