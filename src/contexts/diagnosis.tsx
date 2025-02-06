import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getAllDiagnosis } from '../services/diagnosisService';
import { openDB } from "idb";


interface DiagnosisType {
    code: string;
    name: string;
    
}


interface DiagnosisContextProps {
    diagnoses: DiagnosisType[];
}

const DiagnosisContext = createContext<DiagnosisContextProps | undefined>(undefined);


// Open IndexedDB database
const dbPromise = openDB("diagnosisDB", 1, {
    upgrade(db) {
      db.createObjectStore("diagnoses");
      db.createObjectStore("metadata");
    },
  });

  // Function to save diagnoses in IndexedDB
const saveToIndexedDB = async (data: DiagnosisType[]) => {
    const db = await dbPromise;
    await db.put("diagnoses", data, "all"); // Store data
    await db.put("metadata", Date.now(), "timestamp"); // Store timestamp
  };


  // Function to get diagnoses from IndexedDB
const getFromIndexedDB = async (): Promise<DiagnosisType[] | null> => {
    const db = await dbPromise;
    return (await db.get("diagnoses", "all")) || null;
  };


  // Function to get the timestamp from IndexedDB
const getTimestampFromIndexedDB = async (): Promise<number | null> => {
    const db = await dbPromise;
    return (await db.get("metadata", "timestamp")) || null;
  };


// create the DiagnosisProvider

export const DiagnosisContextProvider = ({ children }: { children: ReactNode }) => {
    const [diagnoses, setDiagnoses] = useState<DiagnosisType[]>([]);
  
    const fetchDiagnoses = async () => {
        try {
          const response = await getAllDiagnosis();
          await saveToIndexedDB(response.diagnosis); // Save new data to IndexedDB
          setDiagnoses(response.diagnosis);
        } catch (error) {
          console.error("Failed to fetch diagnoses", error);
        }
      };


      
      useEffect(() => {
        (async () => {
          const cachedData = await getFromIndexedDB();
          const timestamp = await getTimestampFromIndexedDB();
          const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    
          if (cachedData && timestamp && Date.now() - timestamp < CACHE_DURATION) {
            setDiagnoses(cachedData); // Use cached data if it's fresh
          } else {
            fetchDiagnoses(); // Fetch new data if expired or not available
          }
        })();
      }, []);
    
      return (
        <DiagnosisContext.Provider value={{ diagnoses }}>
          {children}
        </DiagnosisContext.Provider>
      );
  };
  

   




export const useDiagnosis =() => {
    const context = useContext(DiagnosisContext);
    if (!context) {
        throw new Error("useAuth must be used within Diagnosis");
      }
      return context;
}

