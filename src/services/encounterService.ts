import React from 'react'
import axios from 'axios'






interface IAllergies {
    drugs: string[];  // List of drug allergies
    food: string[];   // List of food allergies
    other: string[];  // List of other allergies (e.g., environmental, skin)
  }



 interface PatientInterface {
  
    title: string;
    firstname: string;
    lastname: string;
    middlename?: string | null;
    fullname?: string | null;
    upi?: string | null;
    email: string;
    phone: string;
    marital_status?: string | null;
    address?: string | null;
    state?: string | null;
    city?: string | null;
    religion?: string | null;
    blood_group?: string | null;
    genotype?: string | null;
    next_of_kin?: string | null;
    next_of_kin_relationship?: string | null;
    next_of_kin_phone?: string | null;
    next_of_kin_address?: string | null;
    height?: string | null;
    weight?: string | null;
    sponsor?: string | null;
    sponsor_plan?: string | null;
    profileImage: string | null;
    office: string;
    office_uuid: string;
    uuid: string;
    occupation?: string | null;
  
    isActive?: boolean;
    password?: string|null;
    createdAt?: Date;
    updatedAt?: Date | null;
    dob?: string | null;
    gender?: string | null;
    allergies?: IAllergies;
    
}
  
  interface IVitalSigns {
      weightt?: any | null;          // Weight in kilograms
      heightt?: any | null;          // Height in centimeters
      blood_pressure?: string | null;  // Blood pressure in format "systolic/diastolic"
      temperature?: any | null;     // Body temperature in Celsius
      pulse_rate?: any | null;      // Pulse rate in beats per minute
  }
  
  
  interface ISymptoms {
      symptoms: string[];  // List of symptoms
  }
  
  interface DiagnosisType {
      name: string;
      suspected: boolean;
   
    };
  
    interface InvestigationType {
      name: string;
     amount: number;
     billing_status?: string | null;
    };
  
    interface ImagingType {
      name: string;
     amount: number;
     billing_status?: string | null;
    };
  
  
    interface ServiceType {
      name: string;
     amount: number;
     billing_status?: string | null;
    };
  
  
  
  
  
  
  
  export interface IEncounter extends Document {
  
  
      payment_policy?: string | null;
  
      patient: PatientInterface;
      consultant : string;
      isUrgent : boolean;
      comment?: string | null;
      status?: string | null;
      vitals : IVitalSigns;
      allergies : IAllergies;
      symptoms? : string[] | null;
      family_history?: string[] | null;
      social_history?: string[] | null;
      diagnosis?: DiagnosisType[] | null;
      investigations?: InvestigationType[] | null;
      imaging?: ImagingType[] | null;
      otherservices? : ServiceType[] | null;
      prescription?: null;
  
      invoice_status?: boolean | null;
      billing_status?: boolean | null;
      receipt_status?: boolean | null;
  
      billing_officer?: string | null;
  
      outcome?: string | null;
  
  
  
  
  
  
  
  
    
  }

 


export interface ITransaction {
    patientUPI: string; // ID of the patient associated with the transaction
    type_uuid: string; // Optional: ID of the encounter (if applicable)
    date: Date; // Date and time of the transaction
    totalAmount: number; // Total amount of the transaction
    paymentStatus: "pending" | "paid" | "failed"; // Payment status
    paymentMethod: string; // Payment method
    paymentReference?: string; // Optional: Payment reference or transaction ID
    services: {
      // List of selected services
      investigations: Array<{
        _id: string; // Service ID
        name: string; // Service name
        amount: number; // Service price
        billingStatus: "pending" | "invoiced" | "billed"; // Billing status
      }>;
      imaging: Array<{
        _id: string;
        name: string;
        amount: number;
        billingStatus: "pending" | "invoiced" | "billed";
      }>;
      otherservices: Array<{
        _id: string;
        name: string;
        amount: number;
        billingStatus: "pending" | "invoiced" | "billed";
      }>;
    };
    createdBy: string; // ID of the user who created the transaction
    updatedBy?: string; // Optional: ID of the user who last updated the transaction
    createdAt: Date; // Timestamp for when the transaction was created
    updatedAt?: Date; // Optional: Timestamp for when the transaction was last updated
    sponsor:string;
    sponsor_plan:string;
    type?:string;
  }



export async function addEncounter(
    patient: PatientInterface,
    consultant : string,
    isUrgent : boolean,
    vitals : IVitalSigns,
    allergies : IAllergies,
    payment_policy?: string | null,
    comment?: string | null,
    status?: string | null,
    symptoms? : string[] | null,
    family_history?: string[] | null,
    social_history?: string[] | null,
    diagnosis?: DiagnosisType[] | null,
    investigations?: InvestigationType[] | null,
    imaging?: ImagingType[] | null,
    otherservices? : ServiceType[] | null,
    appointment_uuid?: string | null,
) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/encounter/submit`,
          {  
            patient,
            consultant,
            isUrgent,
            vitals,
            allergies,
            payment_policy,
            comment,
            status,
            symptoms,
            family_history,
            social_history,
            diagnosis,
            investigations,
            imaging,
            otherservices,
            appointment_uuid
          },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.error || "Unable to add Encounter"
        );
    }
}


//get encounter by billing status

export async function getEncounterByBillingStatus(status:string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/encounter/billing/${status}`,
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to get Encounters"
      );
    }
  }

  //get unique encounter by appointment_uuid

  export async function getUniqueEncounterByAppointmentUuid(appointment_uuid:string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/encounter/unique/${appointment_uuid}`,
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to get Encounter"
      );
    }
  }



  //update encounter / consultation by appointment uuid

  export async function updateEncounterByAppointmentUuid(
   
    vitals : IVitalSigns,
    allergies : IAllergies,
    comment?: string | null,
    symptoms? : string[] | null,
    family_history?: string[] | null,
    social_history?: string[] | null,
    diagnosis?: DiagnosisType[] | null,
    investigations?: InvestigationType[] | null,
    imaging?: ImagingType[] | null,
    otherservices? : ServiceType[] | null,
    appointment_uuid?: string | null,
) {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/encounter/unique/${appointment_uuid}`,
          {  
          
            vitals,
            allergies,
         
            comment,
         
            symptoms,
            family_history,
            social_history,
            diagnosis,
            investigations,
            imaging,
            otherservices,
            appointment_uuid
          },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.error || "Unable to update Encounter"
        );
    }
}



//encounter transaction 

export async function createEncounterTransaction(transactionData: ITransaction) {
  try {
      const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/api/billing/transaction`,transactionData
          ,
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
              },
          }
      );
      return response.data;
  } catch (error: any) {
      throw new Error(
          error.response?.data?.error || "Unable to create billing"
      );
  }
}
