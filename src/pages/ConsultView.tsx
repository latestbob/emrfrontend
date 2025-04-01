import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
// import { getRegisteredPatients } from "../services/patientService";
import {
  getAppointments,
  getUniqueAppointment,
  updateAppointment,
} from "../services/appointment";

import { getUniquePatient, searchUsers } from "../services/patientService";
import { getClinicalStaff } from "../services/userService";

import { scheduleAppointment } from "../services/appointment";

import { drugAllergies } from "../utils/allergies/drugsallergies";
import { foodallergies } from "../utils/allergies/foodallergies";
import { otherallergies } from "../utils/allergies/otherallergies";

import { symptons } from "../utils/allergies/symptoms";
import { familyHistoryData } from "../utils/familyHistory";
import { socialHistoryData } from "../utils/socialHistory";

import { useDiagnosis } from "../contexts/diagnosis";
import { getUniquePlanByName } from "../services/sponsorService";
import {
  getImagingByPlanCode,
  getInvestigationByPlanCode,
  getOtherServicesByPlanCode,
} from "../services/Service";
import { addEncounter } from "../services/encounterService";

const ConsultView = (): JSX.Element => {
  const navigate = useNavigate();

  const { diagnoses } = useDiagnosis();

  const { uuid = "" } = useParams();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);
  const [investigations, setInvestigations] = useState<any[]>([]);

  const [imagings, setImagings] = useState<any[]>([]);

  const [otherservices, setOtherservices] = useState<any[]>([]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [appointments, setAppointments] = useState<any[]>([]);

  const [clinicalStaff, setClinicalStaff] = useState<any[]>([]);

  const [sheowvital, setShowVital] = useState<boolean>(false);
  const [showhistory, setShowHistory] = useState<boolean>(false);
  const [showallergies, setShowAllergies] = useState<boolean>(false);
  const [showprocedures, setShowProcedures] = useState<boolean>(false);
  const [fetchedAppointment, setFetchAppointment] = useState<any>({});

  const [drugAllergy, setDrugAllergy] = useState<string[]>([]);
  const [foodAllergy, setFoodAllergy] = useState<string[]>([]);
  const [otherAllergy, setOtherAllergy] = useState<string[]>([]);

  const [symptomQueary, setSymptomQuery] = useState<string>("");
  const [diagnosisQueary, setDiagnosisQuery] = useState<string>("");
  const [investigationQueary, setInvestigationQuery] = useState<string>("");
  const [imagingQueary, setImagingQuery] = useState<string>("");
  const [otherserviceQueary, setOtherServiceQuery] = useState<string>("");

  const [filteredSymptoms, setFilteredSymptoms] = useState<string[]>([]);

  const [plancode, setPlanCode] = useState<string>("");

  interface DiagnosisType {
    code: string;
    name: string;
  }

  type selectedDiagnosisType = {
    name: string;
    suspected: boolean;
  };

  type selectedInvestigationType = {
    name: string;
    amount: number;
    billing_status?: string | null;
  };

  const [filteredDiagnosis, setFilteredDiagnosis] = useState<DiagnosisType[]>(
    []
  );
  const [filteredInvestigation, setFilteredInvestigation] = useState<any[]>([]);

  const [filteredImaging, setFilteredImaging] = useState<any[]>([]);

  const [filteredOtherservices, setFilteredOtherservices] = useState<any[]>([]);

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const [selectedDiagnosis, setSelectedDiagnosis] = useState<
    selectedDiagnosisType[]
  >([]);

  const [selectedInvestigation, setSelectedInvestigation] = useState<
    selectedInvestigationType[]
  >([]);

  const [selectedImaging, setSelectedImaging] = useState<
    selectedInvestigationType[]
  >([]);

  const [selectedOtherservices, setSelectedOtherservices] = useState<
  selectedInvestigationType[]
>([]);

  useEffect(() => {
    getFilterSymptoms();
  }, [symptomQueary]);

  useEffect(() => {
    getFilterDiagnosis();

    console.log(diagnoses.length);
  }, [diagnosisQueary]);

  useEffect(() => {
    getInvestigations();
    getFilterInvestigation();
  }, [investigationQueary]);

  useEffect(() => {
    getImagings();
    getFilterImaging();
  }, [imagingQueary]);


  useEffect(() => {
    getOtherservices();
    getFilterOtherservices();
  }, [otherserviceQueary]);

  const handleSymptomQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymptomQuery(e.target.value);
  };

  const handleDiagnosisQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiagnosisQuery(e.target.value);

   
  };

  const handleInvestigationQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvestigationQuery(e.target.value);
    console.log(investigationQueary);
  };

  const handleImagingQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagingQuery(e.target.value);
  };

  const handleOtherserviceQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherServiceQuery(e.target.value);
  };

  function getFilterSymptoms() {
    if (symptomQueary.length > 2) {
      const filtered = symptons.filter((symptom) =>
        symptom.toLowerCase().includes(symptomQueary.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    } else {
      setFilteredSymptoms([]);
    }
  }



  function getFilterDiagnosis() {
    if (diagnosisQueary.length > 2) {
      const filtered = diagnoses
        .filter((dia) =>
          dia.name.toLowerCase().includes(diagnosisQueary.toLowerCase())
        )
        .slice(0, 15); //
      setFilteredDiagnosis(filtered);
    } else {
      setFilteredDiagnosis([]);
    }
  }

  function getFilterInvestigation() {
    if (investigationQueary.length > 2 && investigations.length > 0) {
      const filtered = investigations
        .filter((ini) =>
          ini.name.toLowerCase().includes(investigationQueary.toLowerCase())
        )
        .slice(0, 15); //
      setFilteredInvestigation(filtered);

      console.log(filtered);

    } else {
      setFilteredInvestigation([]);
    }
  }




function getFilterImaging() {
  if (imagingQueary.length > 2 && imagings.length > 0) {
    const filtered = imagings
      .filter((img) =>
        img.name.toLowerCase().includes(imagingQueary.toLowerCase())
      )
      .slice(0, 15);
    setFilteredImaging(filtered);
    console.log(filtered)
  } else {
    setFilteredImaging([]);
  }
}


function getFilterOtherservices() {
  if (otherserviceQueary.length > 2 && otherservices.length > 0) {
    const filtered = otherservices
      .filter((ser) =>
        ser.name.toLowerCase().includes(otherserviceQueary.toLowerCase())
      )
      .slice(0, 15);
    setFilteredOtherservices(filtered);
    console.log(filtered)
  } else {
    setFilteredOtherservices([]);
  }
}

  useEffect(() => {
    // getInvestigations();
  }, [plancode]);

  //   get appoinmtment

  async function getInvestigations() {
    if (plancode) {
      const investigationResult = await getInvestigationByPlanCode(plancode);

      setInvestigations(investigationResult.investigations);
    }
  }

  async function getImagings() {
    if (plancode) {
      const imagingResult = await getImagingByPlanCode(plancode);
  
      // console.log(imagingResult.imaging);
  
      setImagings(imagingResult.imaging);
    }
  }


  async function getOtherservices() {
    if (plancode) {
      const otherservicesResult = await getOtherServicesByPlanCode(plancode);
  
      // console.log(imagingResult.imaging);
  
      setOtherservices(otherservicesResult.otherservice);
    }
  }


  async function fetchUniqueAppointment() {
    try {
      if (uuid) {
        const result = await getUniqueAppointment(uuid);
        setFetchAppointment(result.appointment);

        setPurpose(result.appointment.purpose);
        setVisitType(result.appointment.visit_type);
        setConsultant(result.appointment.consultant);
        setVisitDate(result.appointment.visit_date);
        setScheduleTime(result.appointment.scheduled_time);
        setUrgent(result.appointment.is_urgent);
        setBillable(result.appointment.is_billed);
        setWeight(result.appointment.vital_weight);
        setHeight(result.appointment.vital_height);
        setBloodPressure(result.appointment.vital_blood_pressure);
        setTemperature(result.appointment.vital_temperature);
        setPulseRate(result.appointment.vital_pulserate);
        setComment(result.appointment.comment);

        //get patient based on UPI

        const patientresult = await getUniquePatient(result.appointment.upi);
        setSelectedPatient(patientresult.patient);

        setQuery(patientresult.patient.fullname);

        setDrugAllergy(patientresult.patient.allergies.drugs);
        setFoodAllergy(patientresult.patient.allergies.food);
        setOtherAllergy(patientresult.patient.allergies.other);

        const plancodeResult = await getUniquePlanByName(
          patientresult.patient.sponsor_plan
        );

        setPlanCode(plancodeResult.plan.plan_code);

        console.log(plancode);

        //  if(plancodeResult){
        //   const investigationResult = await getInvestigationByPlanCode(patientresult.patient.sponsor_plan);
        //   setInvestigations(investigationResult.investigations);
        //  }

        // if(plancode){
        //   const investigationResult = await getInvestigationByPlanCode(patientresult.patient.sponsor_plan);
        //   setInvestigations(investigationResult.investigations);

        // }
      }
    } catch (err: any) {
      //setErroMessage(err.message);

      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  useEffect(() => {
    const fetchClinicalStaff = async () => {
      try {
        const response = await getClinicalStaff();
        setClinicalStaff(response.clinicalstaff);
      } catch (err: any) {
        toast.error(`${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    };

    fetchClinicalStaff();
    fetchUniqueAppointment();
  }, []);

  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setEmail(user.email);
      fetchScheduledAppointment();
    }
  }, [user]);

  //   handle nonclincial staff  fetch

  async function fetchScheduledAppointment() {
    try {
      // const result = await getAppointments();
      // setAppointments(result.appointments);
    } catch (err: any) {
      //setErroMessage(err.message);

      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  // State to track which dropdown is visible
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null);

  // Function to toggle dropdown for a specific row
  const toggleDropdown = (index: any) => {
    setVisibleDropdownIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await searchUsers(value);
        setSearchResults(response.users);

        console.log(response);
      } catch (err: any) {
        toast.error(`${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  function handleVitalShowClick() {
    setShowVital(!sheowvital);
  }

  function handleHistoryShowClick() {
    setShowHistory(!showhistory);
  }

  function handleAllergyShowClick() {
    setShowAllergies(!showallergies);
  }

  function handleProcedureShowClick() {
    setShowProcedures(!showprocedures);
  }

  const [selectedPatient, setSelectedPatient] = useState<any>({});

  function handleSelectedPatient(patient: any) {
    setSelectedPatient(patient);

    setSearchResults([]);
    setQuery(patient.fullname);
  }

  // form data

  const [purpose, setPurpose] = useState<string>("");
  const [visitType, setVisitType] = useState<string>("");
  const [consultant, setConsultant] = useState<string>("");
  const [visitDate, setVisitDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("");
  const [urgent, setUrgent] = useState<boolean>(false);
  const [billable, setBillable] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [pulseRate, setPulseRate] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  function handlePurposeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPurpose(e.target.value);
  }

  function handleVisitTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVisitType(e.target.value);
  }

  function handleConsultantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setConsultant(e.target.value);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVisitDate(e.target.value);
  }

  function handleScheduleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setScheduleTime(e.target.value);
  }

  function handleUrgentChange() {
    setUrgent(!urgent);
  }

  function handleBillableChange() {
    setBillable(!billable);
  }

  function handleWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWeight(e.target.value);
  }

  function handleHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHeight(e.target.value);
  }

  function handleBloodPressureChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBloodPressure(e.target.value);
  }

  function handleTemperatureChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTemperature(e.target.value);
  }

  function handlePulseRateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPulseRate(e.target.value);
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  const [loading, setLoading] = useState<boolean>(false);


  // consult form data here
const [payment_policy, setPaymentPolicy] = useState<string>("cash");



  // "payment_policy": "cash",
  // "patient": "6751645ec79ac1e69bc7efb8",
  // "consultant": "Dr. Dr Chibuzor Nwogu",
  // "isUrgent": true,
  // "comment": "Patient is experiencing severe headache",
  // "status": "awaiting billing",
  // "vitals": {
  //   "height":160,
  //   "weight":70,
  //   "blood_pressure": "120/80",
  //   "pulse_rate": 75,
  //   "temperature": 98.6
  // },
  // "allergies": {
  //   "drugs": ["penicillin"],
  //   "food": ["nuts"],
  //   "other": ["dust"]
  // },
  // "symptoms": ["headache", "nausea", "dizziness"],
  // "family_history": ["diabetes", "hypertension"],
  // "social_history": ["smoking", "alcohol"],
  // "diagnosis": [
  //   {
  //       "name":"Common Cold",
  //       "suspected":false
  // },

  //  {
  //       "name":"Typhoid fever",
  //       "suspected":true
  // }
  // ],
  // "investigations": [
  //   {"name":"Fasting Blood Glucose(FBS)","amount":2000},
  //    {"name":"Haemoglobin (HB)","amount":5000}
  // ],
  // "imaging": [
  //    {"name":"Both Feet","amount":7000},
  //    {"name":"Both Knee","amount":7000}
  // ],
  // "otherservices": [
  //   {"name":"Cast Removal","amount":7500}
  // ]



  //end of consult form data

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    let newHeight = Number(height);
    let newWeight = Number(weight);

    const vitals = {
      height: newHeight,
      weight: newWeight,
      blood_pressure: bloodPressure,
      pulse_rate: pulseRate,
      temperature: temperature,
    };

    try {
      const result = await addEncounter(

        
        selectedPatient._id,
          consultant,
          urgent,
          vitals,
          {
            drugs: drugAllergy,
            food: foodAllergy,
            other: otherAllergy,
          },
          "cash",
          comment,
          "awaiting billing",
          selectedSymptoms,
          familyHistory,
          socialHistory,
          selectedDiagnosis,
          selectedInvestigation,
          selectedImaging,
          selectedOtherservices,
          uuid,
          
        
      );

      toast.success("Consultation Submitted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      //    alert("Reset Password Link has been shared to your mail");
      setLoading(false);

      navigate("/consultations");
    } catch (err: any) {
      //setErroMessage(err.message);
      setLoading(false);
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  const [familyHistory, setFamilyHistory] = useState<string[]>([]);

  const [socialHistory, setSocialHistory] = useState<string[]>([]);

  const [drugAllergyInputText, setDrugAlleryInputText] = useState<string>("");
  const [foodAllergyInputText, setFoodAlleryInputText] = useState<string>("");
  const [otherAllergyInputText, setOtherAlleryInputText] = useState<string>("");

  const [familyHistoryInputText, setFamilyHistoryInputText] =
    useState<string>("");
  const [socialHistoryInputText, setSocialHistoryInputText] =
    useState<string>("");

  function handleDrugAllergyInput(e: React.ChangeEvent<HTMLInputElement>) {
    setDrugAlleryInputText(e.target.value);
  }

  function handleFoodAllergyInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFoodAlleryInputText(e.target.value);
  }

  function handleFamilyHistoryInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFamilyHistoryInputText(e.target.value);
  }

  function handleSocialHistoryInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSocialHistoryInputText(e.target.value);
  }

  function handleOtherAllergyInput(e: React.ChangeEvent<HTMLInputElement>) {
    setOtherAlleryInputText(e.target.value);
  }

  const [showdrugallergyInput, setDrugAllergyInput] = useState<boolean>(false);

  const [showfoodallergyInput, setFoodAllergyInput] = useState<boolean>(false);
  const [showfamilyHistoryInput, setFamilyHistoryInput] =
    useState<boolean>(false);
  const [showsocialHistoryInput, setSocialHistoryInput] =
    useState<boolean>(false);

  const [showotherallergyInput, setOtherAllergyInput] =
    useState<boolean>(false);

  function addToDrugsAllergy(e: React.ChangeEvent<HTMLSelectElement>) {
    setDrugAllergyInput(false);
    let allery: string = e.target.value;

    if (allery == "Other (Please specify)") {
      setDrugAllergyInput(true);
    }

    if (
      allery !== "Other (Please specify)" &&
      allery !== "" &&
      !drugAllergy.includes(allery) // Check if it's not already in the list
    ) {
      setDrugAllergy([...drugAllergy, allery]); // Add to list
      setDrugAllergyInput(false); // Optionally hide input field after adding
    }

    // append to drug allergy
  }

  function addToFoodAllergy(e: React.ChangeEvent<HTMLSelectElement>) {
    setFoodAllergyInput(false);
    let allery: string = e.target.value;

    if (allery == "Other (Please specify)") {
      setFoodAllergyInput(true);
    }

    // check if alleryAllery exists
    // if (!foodAllergy.includes(allery) && allery != "Other (Please specify)" && allery !="") {
    //   setFoodAllergy([...foodAllergy, allery]);
    //   setFoodAllergyInput(false)
    // }

    if (
      allery !== "Other (Please specify)" &&
      allery !== "" &&
      !foodAllergy.includes(allery)
    ) {
      setFoodAllergy([...foodAllergy, allery]); // Add to list
      setFoodAllergyInput(false); // Optionally hide input field after adding
    }

    // append to food allergy
  }

  function addToOtherAllergy(e: React.ChangeEvent<HTMLSelectElement>) {
    setOtherAllergyInput(false);
    let allery: string = e.target.value;

    if (allery == "Other (Please specify)") {
      setOtherAllergyInput(true);
    }

    if (
      allery !== "Other (Please specify)" &&
      allery !== "" &&
      !otherAllergy.includes(allery)
    ) {
      setOtherAllergy([...otherAllergy, allery]); // Add to list
      setOtherAllergyInput(false); // Optionally hide input field after adding
    }

    // append to other allergy
  }

  function addToDrugsAllergyInput(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    // check if alleryAllery exists
    if (
      !drugAllergy.includes(drugAllergyInputText) &&
      drugAllergyInputText != ""
    ) {
      setDrugAllergy([...drugAllergy, drugAllergyInputText]);
      // setDrugAllergyInput(false)
      setDrugAlleryInputText("");
    }

    // append to drug allergy
  }

  function addToFoodAllergyInput(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    // check if alleryAllery exists
    if (
      !foodAllergy.includes(foodAllergyInputText) &&
      foodAllergyInputText != ""
    ) {
      setFoodAllergy([...foodAllergy, foodAllergyInputText]);
      // setFoodAllergyInput(false)
      setFoodAlleryInputText("");
    }

    // append to food allergy
  }

  function addToFamilyHistoryInput(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (
      !familyHistory.includes(familyHistoryInputText) &&
      familyHistoryInputText != ""
    ) {
      setFamilyHistory([...familyHistory, familyHistoryInputText]);
      // setFoodAllergyInput(false)
      //  setFamilyHistoryInputText("");
      setFamilyHistoryInput(false);
      setFamilyHistoryInputText("");
    }

    // append to food allergy
  }

  function addToSocialHistoryInput(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (
      !socialHistory.includes(socialHistoryInputText) &&
      socialHistoryInputText != ""
    ) {
      setSocialHistory([...socialHistory, socialHistoryInputText]);
      // setFoodAllergyInput(false)
      //  setFamilyHistoryInputText("");
      setSocialHistoryInput(false);
      setSocialHistoryInputText("");
    }

    // append to food allergy
  }

  function addToOtherAllergyInput(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    // check if alleryAllery exists
    if (
      !otherAllergy.includes(otherAllergyInputText) &&
      otherAllergyInputText != ""
    ) {
      setOtherAllergy([...otherAllergy, otherAllergyInputText]);
      // setFoodAllergyInput(false)
      setOtherAlleryInputText("");
    }

    // append to food allergy
  }

  function handleSelectedSymptom(result: any) {
    setFilteredSymptoms([]);
    setSymptomQuery(result);
  }

  function addSelectedSymptoms(result: string) {
    if (
      result !== "Other (Please specify)" &&
      result !== "" &&
      !selectedSymptoms.includes(result)
    ) {
      // Add to list

      setSelectedSymptoms([...selectedSymptoms, result]);

      setFilteredSymptoms([]);
      setSymptomQuery("");
      // setFoodAllergyInput(false); // Optionally hide input field after adding
    }

    // append to food allergy
  }

  function addToSelectedDiagnosis(diagnosis: DiagnosisType) {
    if (!selectedDiagnosis.some((d) => d.name === diagnosis.name)) {
      setSelectedDiagnosis([
        ...selectedDiagnosis,
        { name: diagnosis.name, suspected: false },
      ]);

      setDiagnosisQuery("");
    }
  }

  function addToSelectedInvestigations(investigate: any) {
    if (!selectedInvestigation.some((d) => d.name === investigate.name)) {
      setSelectedInvestigation([
        ...selectedInvestigation,
        { name: investigate.name, amount: investigate.price },
      ]);

      setInvestigationQuery("");
    }
  }

  function addToSelectedImagings(image: any) {
    if (!selectedImaging.some((d) => d.name === image.name)) {
      setSelectedImaging([
        ...selectedImaging,
        { name: image.name, amount: image.price },
      ]);

      setImagingQuery("");
    }
  }

  function addToSelectedOtherservices(service: any) {
    if (!selectedOtherservices.some((d) => d.name === service.name)) {
      setSelectedOtherservices([
        ...selectedOtherservices,
        { name: service.name, amount: service.price },
      ]);

      setOtherServiceQuery("");
    }
  }

  function addToFamilyHistory(e: React.ChangeEvent<HTMLSelectElement>) {
    // setFoodAllergyInput(false)
    setFamilyHistoryInput(false);
    let familyData: string = e.target.value;

    if (familyData == "Other (Please specify)") {
      // setFoodAllergyInput(true)

      setFamilyHistoryInput(true);

      e.target.value = "";
    }

    if (
      familyData !== "Other (Please specify)" &&
      familyData !== "" &&
      !familyHistory.includes(familyData)
    ) {
      setFamilyHistory([...familyHistory, familyData]); // Add to list
      // setFoodAllergyInput(false); // Optionally hide input field after adding
      setFamilyHistoryInput(false);
      e.target.value = "";
    }

    // append to food allergy
  }

  function addToSocialHistory(e: React.ChangeEvent<HTMLSelectElement>) {
    // setFoodAllergyInput(false)
    setSocialHistoryInput(false);
    let socialData: string = e.target.value;

    if (socialData == "Other (Please specify)") {
      // setFoodAllergyInput(true)

      setSocialHistoryInput(true);

      e.target.value = "";
    }

    if (
      socialData !== "Other (Please specify)" &&
      socialData !== "" &&
      !socialHistory.includes(socialData)
    ) {
      setSocialHistory([...socialHistory, socialData]); // Add to list
      // setFoodAllergyInput(false); // Optionally hide input field after adding
      setSocialHistoryInput(false);
      e.target.value = "";
    }

    // append to food allergy
  }

  const clearFilteredDiagnosis = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilteredDiagnosis([]);
    setDiagnosisQuery("");
  };

  const clearFilteredInvestigation = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setFilteredInvestigation([]);
    setInvestigationQuery("");
  };

  const clearFilteredImaging = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilteredImaging([]);
    setImagingQuery("");
  };

  const clearFilteredOtherservice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilteredOtherservices([]);
    setOtherServiceQuery("");
  };

  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="flex-1 bg-gray-100 min-h-screen">
          {/* <!-- Header --> */}
          <Header title={`Consultation - ${uuid}`} />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <div className="buttondiv text-right">
                <Link
                  to="/consultations"
                  className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                >
                  <span className="pr-4">
                    <i className="fa fa-backward"></i>
                  </span>
                  Back
                </Link>
              </div>
            </div>

            <br />
            <br />

            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              {/* table content here */}

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
                {/* table here */}

                <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8 ">
                  {/* content here */}

                  <div className="flex justify-between ">
                    <div className="w-[60%] pr-10">
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-5 z-10">
                          <div className="space-y-2">
                            <label
                              htmlFor="firstname"
                              className="block text-base font-bold text-gray-700 "
                            >
                              Vital Signs -{" "}
                              <span
                                onClick={handleVitalShowClick}
                                className="text-blue-600 font-bold text-sm cursor-pointer"
                              >
                                Hide / Show
                              </span>
                            </label>
                            {sheowvital && (
                              <div className="flex space-x-4">
                                <div className="space-y-2 w-1/5">
                                  <label
                                    htmlFor="weight"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Weight
                                  </label>
                                  <input
                                    type="text"
                                    id="weight"
                                    onChange={handleWeightChange}
                                    value={weight}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>

                                <div className="space-y-2 w-1/5">
                                  <label
                                    htmlFor="height"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Height
                                  </label>
                                  <input
                                    type="text"
                                    id="height"
                                    onChange={handleHeightChange}
                                    value={height}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>

                                <div className="space-y-2 w-1/5">
                                  <label
                                    htmlFor="bloodPressure"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Blood Pressure
                                  </label>
                                  <input
                                    type="text"
                                    id="bloodPressure"
                                    onChange={handleBloodPressureChange}
                                    value={bloodPressure}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>

                                <div className="space-y-2 w-1/5">
                                  <label
                                    htmlFor="pulseRate"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Pulse Rate
                                  </label>
                                  <input
                                    type="text"
                                    id="pulseRate"
                                    onChange={handlePulseRateChange}
                                    value={pulseRate}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>

                                <div className="space-y-2 w-1/5">
                                  <label
                                    htmlFor="temperature"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Temperature
                                  </label>
                                  <input
                                    type="text"
                                    id="temperature"
                                    onChange={handleTemperatureChange}
                                    value={temperature}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/*  */}

                        {/* allergiies hide and show */}

                        <h3 className="font-bold text-base mt-5">
                          Allergies -{" "}
                          <span
                            onClick={handleAllergyShowClick}
                            className="text-blue-600 font-bold text-sm cursor-pointer"
                          >
                            Hide / Show
                          </span>
                        </h3>

                        {showallergies && (
                          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-5">
                            <div className="space-y-2 mt-3">
                              <label
                                htmlFor="lastname"
                                className="block text-sm font-normal text-blue-700"
                              >
                                Drug Allergies
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name=""
                                id=""
                                onChange={addToDrugsAllergy}
                              >
                                <option value="">Select drug allergies</option>
                                {drugAllergies.map((allergy, index) => (
                                  <option key={index} value={allergy}>
                                    {allergy}
                                  </option>
                                ))}
                              </select>

                              {showdrugallergyInput && (
                                <div className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2">
                                  <input
                                    onChange={handleDrugAllergyInput}
                                    type="text"
                                    placeholder="Free type Drug Allergy"
                                    className="w-[85%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                  />
                                  <button
                                    onClick={addToDrugsAllergyInput}
                                    className="bg-green-600 text-white rounded py-2 px-2 text-sm"
                                  >
                                    Add
                                  </button>
                                </div>
                              )}

                              {/* all drugys allergy selected */}

                              <div className="flex">
                                {drugAllergy.map((allergy, index) => (
                                  <div key={index} className="max-w-1/3 p-2">
                                    <p className="text-sm text-medium mx-3">
                                      {allergy}{" "}
                                      <span
                                        className="text-red-600 cursor-pointer"
                                        onClick={() =>
                                          setDrugAllergy(
                                            drugAllergy.filter(
                                              (item) => item !== allergy
                                            )
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/*  */}
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-blue-700"
                              >
                                Food Allergies
                              </label>
                              <select
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name=""
                                id=""
                                onChange={addToFoodAllergy}
                              >
                                <option value="">Select food allergies</option>
                                {foodallergies.map((allergy, index) => (
                                  <option key={index} value={allergy}>
                                    {allergy}
                                  </option>
                                ))}
                              </select>

                              {showfoodallergyInput && (
                                <div className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2">
                                  <input
                                    onChange={handleFoodAllergyInput}
                                    type="text"
                                    placeholder="Free type Drug Allergy"
                                    className="w-[85%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                  />
                                  <button
                                    onClick={addToFoodAllergyInput}
                                    className="bg-green-600 text-white rounded py-2 px-2 text-sm"
                                  >
                                    Add
                                  </button>
                                </div>
                              )}

                              <div className="flex">
                                {foodAllergy.map((allergy, index) => (
                                  <div key={index} className="max-w-1/3 p-2">
                                    <p className="text-sm text-medium mx-3">
                                      {allergy}{" "}
                                      <span
                                        className="text-red-600 cursor-pointer"
                                        onClick={() =>
                                          setFoodAllergy(
                                            foodAllergy.filter(
                                              (item) => item !== allergy
                                            )
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-blue-700"
                              >
                                Other Allergies
                              </label>
                              <select
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name=""
                                id=""
                                onChange={addToOtherAllergy}
                              >
                                <option value="">Select other allergies</option>
                                {otherallergies.map((allergy, index) => (
                                  <option key={index} value={allergy}>
                                    {allergy}
                                  </option>
                                ))}
                              </select>

                              {showotherallergyInput && (
                                <div className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2">
                                  <input
                                    onChange={handleOtherAllergyInput}
                                    type="text"
                                    placeholder="Free type Drug Allergy"
                                    className="w-[85%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                  />
                                  <button
                                    onClick={addToOtherAllergyInput}
                                    className="bg-green-600 text-white rounded py-2 px-2 text-sm"
                                  >
                                    Add
                                  </button>
                                </div>
                              )}

                              <div className="flex">
                                {otherAllergy.map((allergy, index) => (
                                  <div key={index} className="max-w-1/3 p-2">
                                    <p className="text-sm text-medium mx-3">
                                      {allergy}{" "}
                                      <span
                                        className="text-red-600 cursor-pointer"
                                        onClick={() =>
                                          setOtherAllergy(
                                            otherAllergy.filter(
                                              (item) => item !== allergy
                                            )
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* allergies */}

                        {/* symtoms and med history */}

                        <h3 className="font-bold text-base mt-5">
                          Symptoms and Medical History -{" "}
                          <span
                            onClick={handleHistoryShowClick}
                            className="text-blue-600 font-bold text-sm cursor-pointer"
                          >
                            Hide / Show
                          </span>
                        </h3>

                        {showhistory && (
                          <div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-5 z-10">
                              <div className="space-y-2">
                                <label
                                  htmlFor="firstname"
                                  className="block text-sm font-medium text-blue-700"
                                >
                                  Symptoms
                                  <span className="text-red-500">*</span>
                                </label>

                                <div className="flex justify-between items-center">
                                  <input
                                    type="text"
                                    onChange={handleSymptomQueryChange}
                                    value={symptomQueary}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Search Symptoms"
                                  />
                                </div>

                                {filteredSymptoms.length > 0 && (
                                  <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[45%] z-10">
                                    {filteredSymptoms.map((result, index) => (
                                      <li
                                        key={index}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() =>
                                          addSelectedSymptoms(result)
                                        }
                                      >
                                        {result}{" "}
                                        {/* Adjust this to match the property you want to display */}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>

                            <div className="flex">
                              {selectedSymptoms.map((symp, index) => (
                                <div key={index} className="max-w-1/3 p-2">
                                  <p className="text-sm text-medium mx-3">
                                    {symp}{" "}
                                    <span
                                      className="text-red-600 cursor-pointer"
                                      onClick={() =>
                                        setSelectedSymptoms(
                                          selectedSymptoms.filter(
                                            (item) => item !== symp
                                          )
                                        )
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </span>
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* end of symptoms and med history */}

                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-5 z-10">
                              {/* Family History */}
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-blue-700 mt-5">
                                  Family History
                                </h3>
                                <select
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  name=""
                                  id=""
                                  //  onChange={addToFoodAllergy}

                                  onChange={addToFamilyHistory}
                                >
                                  <option value=""></option>
                                  {familyHistoryData.map((fam, index) => (
                                    <option key={index} value={fam}>
                                      {fam}
                                    </option>
                                  ))}
                                </select>

                                {showfamilyHistoryInput && (
                                  <div className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2">
                                    <input
                                      onChange={handleFamilyHistoryInput}
                                      type="text"
                                      placeholder="Free type family history"
                                      className="w-[85%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                    />
                                    <button
                                      onClick={addToFamilyHistoryInput}
                                      className="bg-green-600 text-white rounded py-2 px-2 text-sm"
                                    >
                                      Add
                                    </button>
                                  </div>
                                )}

                                <div className="flex">
                                  {familyHistory.map((famm, index) => (
                                    <div key={index} className="max-w-1/3 p-2">
                                      <p className="text-sm text-medium mx-3">
                                        {famm}{" "}
                                        <span
                                          className="text-red-600 cursor-pointer"
                                          onClick={() =>
                                            setFamilyHistory(
                                              familyHistory.filter(
                                                (item) => item !== famm
                                              )
                                            )
                                          }
                                        >
                                          <i className="fa fa-times"></i>
                                        </span>
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Social History */}

                              <div className="space-y-2">
                                <h3 className="font-medium text-blue-700 mt-5 text-sm">
                                  Social History
                                </h3>

                                {/* socila history here */}

                                <select
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  name=""
                                  id=""
                                  // onChange={addToFamilyHistory}

                                  onChange={addToSocialHistory}
                                >
                                  <option value=""></option>
                                  {socialHistoryData.map((social, index) => (
                                    <option key={index} value={social}>
                                      {social}
                                    </option>
                                  ))}
                                </select>

                                {showsocialHistoryInput && (
                                  <div className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2">
                                    <input
                                      onChange={handleSocialHistoryInput}
                                      type="text"
                                      placeholder="Free type social history"
                                      className="w-[85%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                    />
                                    <button
                                      onClick={addToSocialHistoryInput}
                                      className="bg-green-600 text-white rounded py-2 px-2 text-sm"
                                    >
                                      Add
                                    </button>
                                  </div>
                                )}

                                <div className="flex">
                                  {socialHistory.map((soc, index) => (
                                    <div key={index} className="max-w-1/3 p-2">
                                      <p className="text-sm text-medium mx-3">
                                        {soc}{" "}
                                        <span
                                          className="text-red-600 cursor-pointer"
                                          onClick={() =>
                                            setSocialHistory(
                                              socialHistory.filter(
                                                (item) => item !== soc
                                              )
                                            )
                                          }
                                        >
                                          <i className="fa fa-times"></i>
                                        </span>
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                {/* social history end */}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* end of allergies */}

                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-6">
                          <div className="space-y-2">
                            {/* <label
    htmlFor="firstname"
    className="block text-sm font-medium text-gray-700"
  >
    Billable </label>  */}

                            {/* <label className="relative inline-flex items-center cursor-pointer">
                                                            <input onChange={handleBillableChange} checked={billable} type="checkbox" className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Billing</span>
                                                        </label> */}
                          </div>
                        </div>

                        <h3 className="font-bold text-base  mb-5">
                          Diagnosis & Procedures -{" "}
                          <span
                            onClick={handleProcedureShowClick}
                            className="text-blue-600 font-bold text-sm cursor-pointer"
                          >
                            Hide / Show
                          </span>
                        </h3>

                        {showprocedures && (
                          <div>
                            <div className="space-y-2">
                              <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-blue-700"
                              >
                                Diagnosis
                                <span className="text-red-500">*</span>
                              </label>

                              <div className="flex justify-between items-center">
                                <input
                                  type="text"
                                  onChange={handleDiagnosisQueryChange}
                                  value={diagnosisQueary}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  placeholder="Search Diagnosis"
                                />

                                {filteredDiagnosis.length > 0 && (
                                  <button
                                    onClick={clearFilteredDiagnosis}
                                    className="ml-2 text-cyan-900 font-bold text-sm cursor-pointer"
                                  >
                                    Clear
                                  </button>
                                )}
                                {diagnosisQueary.length > 2 &&
                                  filteredDiagnosis.length > 0 && (
                                    <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[45%] z-10">
                                      {filteredDiagnosis.map(
                                        (result, index) => (
                                          <li
                                            key={index}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                              addToSelectedDiagnosis(result);
                                              setFilteredDiagnosis([]);
                                            }}
                                          >
                                            {result.name}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </div>
                            </div>

                            <div className="flex-col w-full">
                              {selectedDiagnosis.map((dia, index) => (
                                <div key={index} className="w-full p-2">
                                  <p className="text-sm text-medium mx-3">
                                    {dia.name}{" "}
                                    <input
                                      className="mycheck"
                                      type="checkbox"
                                      checked={dia.suspected}
                                      onChange={() => {
                                        setSelectedDiagnosis(
                                          selectedDiagnosis.map((item) =>
                                            item.name === dia.name
                                              ? {
                                                  ...item,
                                                  suspected: !item.suspected,
                                                }
                                              : item
                                          )
                                        );
                                      }}
                                    />
                                    <span className="text-xs font-bold mr-3 text-cyan-600">
                                      Suspected{" "}
                                    </span>
                                    <span
                                      className="text-red-600 cursor-pointer"
                                      onClick={() =>
                                        setSelectedDiagnosis(
                                          selectedDiagnosis.filter(
                                            (item) => item !== dia
                                          )
                                        )
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </span>
                                  </p>
                                </div>
                              ))}
                            </div>

                            <br />

                            <div className="space-y-2">
                              <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-blue-700"
                              >
                                Investigations
                              </label>
                              <input
                                type="text"
                                id="mainSymptoms"
                                onChange={handleInvestigationQueryChange}
                                value={investigationQueary}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />

                              {filteredInvestigation.length > 0 && (
                                <button
                                  onClick={clearFilteredInvestigation}
                                  className="ml-2 text-cyan-900 font-bold text-sm cursor-pointer"
                                >
                                  Clear
                                </button>
                              )}

                              {investigationQueary.length > 2 &&
                                filteredInvestigation.length > 0 && (
                                  <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[45%] z-10">
                                    {filteredInvestigation.map(
                                      (result, index) => (
                                        <li
                                          key={index}
                                          className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                          onClick={() => {
                                            addToSelectedInvestigations(result);
                                            setFilteredInvestigation([]);
                                          }}
                                        >
                                          {result.name}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}

                              <div className="flex-col w-full">
                                {selectedInvestigation.map((ini, index) => (
                                  <div key={index} className="w-full p-2">
                                    <p className="text-sm text-medium mx-3">
                                      {ini.name}{" "}
                                      <span className="text-xs font-bold mr-3 text-cyan-600">
                                        {ini.amount}{" "}
                                      </span>
                                      <span
                                        className="text-red-600 cursor-pointer"
                                        onClick={() =>
                                          setSelectedInvestigation(
                                            selectedInvestigation.filter(
                                              (item) => item !== ini
                                            )
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <br />
{/* imaginge */}
                            <div className="space-y-2">
                              <label
                                htmlFor="mainSymptoms"
                                className="block  text-sm font-medium text-blue-700"
                              >
                                Imaging
                              </label>
                              <input
                                type="text"
                                id="mainSymptoms"
                                onChange={handleImagingQueryChange}
                                value={imagingQueary}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />

                              {filteredImaging.length > 0 && (
                                <button
                                  onClick={clearFilteredImaging}
                                  className="ml-2 text-cyan-900 font-bold text-sm cursor-pointer"
                                >
                                  Clear
                                </button>
                              )}

                              {imagingQueary.length > 2 &&
                                filteredImaging.length > 0 && (
                                  <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[45%] z-10">
                                    {filteredImaging.map((result, index) => (
                                      <li
                                        key={index}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                          addToSelectedImagings(result);
                                          setFilteredImaging([]);
                                        }}
                                      >
                                        {result.name}
                                      </li>
                                    ))}
                                  </ul>
                                )}

                              <div className="flex-col w-full">
                                {selectedImaging.map((image, index) => (
                                  <div key={index} className="w-full p-2">
                                    <p className="text-sm text-medium mx-3">
                                      {image.name}{" "}
                                      <span className="text-xs font-bold mr-3 text-cyan-600">
                                        {image.amount}{" "}
                                      </span>
                                      <span
                                        className="text-red-600 cursor-pointer"
                                        onClick={() =>
                                          setSelectedImaging(
                                            selectedImaging.filter(
                                              (item) => item !== image
                                            )
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <br />

{/* other service */}

<div className="space-y-2">
                              <label
                                htmlFor="mainSymptoms"
                                className="block  text-sm font-medium text-blue-700"
                              >
                                Other Services
                              </label>
                              <input
                                type="text"
                                id="mainSymptoms"
                                onChange={handleOtherserviceQueryChange}
                                value={otherserviceQueary}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />

                              {filteredOtherservices.length > 0 && (
                                <button
                                  onClick={clearFilteredOtherservice}
                                  className="ml-2 text-cyan-900 font-bold text-sm cursor-pointer"
                                >
                                  Clear
                                </button>
                              )}

                              {otherserviceQueary.length > 2 &&
                                filteredOtherservices.length > 0 && (
                                  <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[45%] z-10">
                                    {filteredOtherservices.map((result, index) => (
                                      <li
                                        key={index}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                          addToSelectedOtherservices(result);
                                          setFilteredOtherservices([]);
                                        }}
                                      >
                                        {result.name}
                                      </li>
                                    ))}
                                  </ul>
                                )}

                              <div className="flex-col w-full">
                                {selectedOtherservices.map((serve, index) => (
                                  <div key={index} className="w-full p-2">
                                    <p className="text-sm text-medium mx-3">
                                      {serve.name}{" "}
                                      <span className="text-xs font-bold mr-3 text-cyan-600">
                                        {serve.amount}{" "}
                                      </span>
                                      <span
                                        className="text-red-600 cursor-pointer"
                                        onClick={() =>
                                          setSelectedOtherservices(
                                            selectedOtherservices.filter(
                                              (item) => item !== serve
                                            )
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div> 
                            </div>
                            

                            {/* <div className="space-y-2">
                              <label
                                htmlFor="comment"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Comment
                              </label>
                              <textarea
                                id="comment"
                                onChange={handleCommentChange}
                                value={comment}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows={4}
                              />
                            </div> */}
                          </div>
                        )}

                        <br />
                        <br />

                        <div className="form-group w-full">
                          <button
                            type="submit"
                            className="w-full text-center text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base px-5 py-3  dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                          >
                            Submit Consultation
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="w-[35%] min-h-[30vh] ">
                      <h3 className="text-base text-gray-700 font-medium py-5">
                        Patient information
                      </h3>

                      {selectedPatient &&
                        Object.keys(selectedPatient).length > 0 && (
                          <div className="rounded-lg border border-gray-300 py-3 px-2 text-sm">
                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500 text-sm">
                                Sponsor
                              </span>
                              <span className="text-gray-800 text-sm font-medium">
                                {selectedPatient.sponsor || "N/A"}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Plan Type</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.sponsor_plan || ""}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Plan Code</span>
                              <span className="text-gray-800 font-medium">
                                {(plancode && plancode) || ""}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">UPI</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.upi}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Phone</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.phone}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Email</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.email}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">DOB</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.dob}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Religion</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.religion}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Occupation</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.occupation}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Blood Group</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.blood_group}
                              </span>
                            </div>

                            <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                              <span className="text-gray-500">Genotype</span>
                              <span className="text-gray-800 font-medium">
                                {selectedPatient.genotype}
                              </span>
                            </div>

                            <div className="flex justify-center px-3 mb-3 items-center">
                              <button className="text-white bg-cyan-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                View Patient Summary
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* end of table */}
              </div>

              {/* end of table content */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ConsultView;
