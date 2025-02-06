import React from 'react'

// export const DiagnosisContextProvider = ({ children }: { children: ReactNode }) => {
//     const [diagnoses, setDiagnoses] = useState<DiagnosisType[]>([]);
  
//     const fetchDiagnoses = async () => {
//       try {
//         const response = await getAllDiagnosis();
//         localStorage.setItem("diagnoses", JSON.stringify(response.diagnosis)); // Store in localStorage
//         localStorage.setItem("diagnoses_timestamp", Date.now().toString()); // Save timestamp
//         setDiagnoses(response.diagnosis);
//       } catch (error) {
//         console.error("Failed to fetch diagnoses", error);
//       }
//     };
  
//     useEffect(() => {
//       const cachedData = localStorage.getItem("diagnoses");
//       const timestamp = localStorage.getItem("diagnoses_timestamp");
//       const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  
//       if (cachedData && timestamp && Date.now() - Number(timestamp) < CACHE_DURATION) {
//         setDiagnoses(JSON.parse(cachedData)); // Load from cache if fresh
//       } else {
//         fetchDiagnoses(); // Fetch from API if expired
//       }
//     }, []);
  
//     return (
//       <DiagnosisContext.Provider value={{ diagnoses }}>
//         {children}
//       </DiagnosisContext.Provider>
//     );
//   };