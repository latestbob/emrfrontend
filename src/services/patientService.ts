import React from "react";

import axios from "axios";

//get all registered patient

export async function getRegisteredPatients() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/patient/all`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get  registered patients"
    );
  }
}

export async function registerPatient(
  title: string,
  firstname: string,
  lastname: string,
  middlename: string,
  email: string,
  phone: string,
  marital_status: string,
  state: string,
  city: string,
  religion: string,
  blood_group: string,
  genotype: string,
  next_of_kin: string,
  next_of_kin_address: string,
  next_of_kin_phone: string,
  next_of_kin_relationship: string,
  height: number,
  weight: number,
  sponsor: string,
  sponsor_plan: string,
  occupation: string,
  office: string,
  office_uuid: string,
  dob: string,
  gender: string,
  address: string
) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/patient/register`,
      {
        title,
        firstname,
        lastname,
        middlename,
        email,
        phone,
        marital_status,
        state,
        city,
        religion,
        blood_group,
        genotype,
        next_of_kin,
        next_of_kin_address,
        next_of_kin_phone,
        next_of_kin_relationship,
        height,
        weight,
        sponsor,
        sponsor_plan,
        occupation,
        office,
        office_uuid,
        dob,
        gender,
        address,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to register patient"
    );
  }
}

//get unique patient

export async function getUniquePatient(upi:string){
  try {
      const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/patient/unique/${upi}`,
          {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
              },
          }
        );
        return response.data;
  } catch (error:any) {
      throw new Error(error.response?.data?.error || 'Unable to get Patient Details');
  }
}


