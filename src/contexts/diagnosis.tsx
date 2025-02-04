import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getAllDiagnosis } from '../services/diagnosisService';

interface DiagnosisType {
    code: string;
    name: string;
    
}


interface DiagnosisContextProps {
    diagnoses: DiagnosisType[];
}

const DiagnosisContext = createContext<DiagnosisContextProps | undefined>(undefined);


// create the DiagnosisProvider

export const DiagnosisContextProvider  = function({children} : {children:ReactNode}){

    const [diagnoses, setDiagnoses] = useState<DiagnosisType[]>([]);

        const fetchDiagnoses = async () => {
            try {
                const response = await getAllDiagnosis();
             
                setDiagnoses(response.diagnosis);
            } catch (error) {
                console.error('Failed to fetch diagnoses', error);
            }
        };
    
        useEffect(() => {
            fetchDiagnoses();
        }, []);


    return <DiagnosisContext.Provider value={{ diagnoses }}> {children} </DiagnosisContext.Provider>
    }

   




export const useDiagnosis =() => {
    const context = useContext(DiagnosisContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
}