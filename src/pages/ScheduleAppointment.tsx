import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
// import { getRegisteredPatients } from "../services/patientService";
import { getAppointments } from "../services/appointment";

import { searchUsers } from "../services/patientService";
import { getClinicalStaff } from "../services/userService";

import { scheduleAppointment } from "../services/appointment";
import moment from "moment";

const ScheduleAppointment = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [appointments, setAppointments] = useState<any[]>([]);

  const [clinicalStaff, setClinicalStaff] = useState<any[]>([]);

  const [sheowvital, setShowVital] = useState<boolean>(false);




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


      // // const result = await getAppointments();
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
    setVisibleDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };



  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");


  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await searchUsers(value)
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
    setPurpose(e.target.value)
  }


  function handleVisitTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVisitType(e.target.value);
  }

  function handleConsultantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setConsultant(e.target.value)


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


   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
  
      setLoading(true);
  
    
  
      try {
        const result = await scheduleAppointment(
          selectedPatient.firstname, 
          selectedPatient.lastname, 
          selectedPatient.upi, 
          selectedPatient.email, 
          selectedPatient.sponsor, 
          selectedPatient.sponsor_plan, 
          selectedPatient.office, 
          selectedPatient.office_uuid, 
         
       


          visitType,

          
          
         visitDate,
          scheduleTime,
          urgent,

          
        
            Number(weight),
            Number(height),
            Number(bloodPressure),
            Number(temperature),
            Number(pulseRate),

          billable,
          comment,
          purpose, 
          consultant,
          user.email
        );
  
        toast.success("Apppointment scheduled successfully", {
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
  
        
          navigate("/appointments");
        
       
       
      } catch (err: any) {
        //setErroMessage(err.message);
        setLoading(false);
        console.log(err);
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
  


  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="flex-1 bg-gray-100 min-h-screen">
          {/* <!-- Header --> */}
          <Header title="Schedule Appointment" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">

            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">


              <div className="buttondiv text-right">
                <Link
                  to="/appointments"
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
                    <div className="w-[50%] pr-10">
                      <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Patient<span className="text-red-500">*</span>
                          </label>

                          <div className="flex justify-between items-center">
                            <input
                              type="text"

                              onChange={handleSearchChange}
                              value={query}
                              className="w-[80%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Search UPI, Card Number or Surname"

                            />




                            <Link to="/register-patient" className="font-medium text-blue-600 text-sm cursor-pointer">Add New</Link>
                          </div>


                          {searchResults.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-[45%] z-10">
                              {searchResults.map((result, index) => (
                                <li
                                  key={index}

                                  className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleSelectedPatient(result)}
                                >
                                  {result.fullname} {/* Adjust this to match the property you want to display */}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>


                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Purpose<span className="text-red-500">*</span>
                          </label>

                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            name=""
                            id=""
                            onChange={handlePurposeChange}
                            value={purpose}
                            required
                          >
                            <option value=""></option>

                            <option value="ANTENATAL">ANTENATAL</option>
                            <option value="BILLINGS/ACCOUNT">BILLINGS/ACCOUNT</option>
                            <option value="DOCTOR">DOCTOR</option>
                            <option value="FRONTDESK">FRONTDESK</option>
                            <option value="NURSING">NURSING</option>
                            <option value="IMMUNIZATION">IMMUNIZATION</option>
                            <option value="LABORATORY">LABORATORY</option>
                            <option value="PHARMACY">PHARMACY</option>
                            <option value="PHYSICIAN">PHYSICIAN</option>
                            <option value="RADIOLOGY">RADIOLOGY</option>
                            <option value="STORE">STORE</option>





                          </select>
                        </div>




                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Visit Type<span className="text-red-500">*</span>
                          </label>


                          <div className="">

                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="new-case"
                                name="visitType"
                                value="New Case"
                                className="mr-2"
                                onChange={handleVisitTypeChange}
                              />
                              <label htmlFor="new-case" className="mr-4">New Case</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="follow-up"
                                name="visitType"
                                value="Follow Up"
                                className="mr-2"
                                onChange={handleVisitTypeChange}
                              />
                              <label htmlFor="follow-up" className="mr-4">Follow Up</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="review"
                                name="visitType"
                                value="Review"
                                className="mr-2"
                                onChange={handleVisitTypeChange}
                              />
                              <label htmlFor="review" className="mr-4">Review</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="first-visit"
                                name="visitType"
                                value="First visit after discharge"
                                className="mr-2"
                                onChange={handleVisitTypeChange}
                              />
                              <label htmlFor="first-visit" className="mr-4">First visit after discharge</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="drug-refill"
                                name="visitType"
                                value="Drug refill"
                                className="mr-2"
                                onChange={handleVisitTypeChange}
                              />
                              <label htmlFor="drug-refill" className="mr-4">Drug refill</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="package-consultation"
                                name="visitType"
                                value="Package consultation"
                                className="mr-2"
                                onChange={handleVisitTypeChange}
                              />
                              <label htmlFor="package-consultation">Package consultation</label>
                            </div>






                          </div>

                        </div>



                        {/* consultant */}

                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Consultant<span className="text-red-500">*</span>
                          </label>

                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            name=""
                            id=""
                            onChange={handleConsultantChange}
                            value={consultant}
                            required
                          >
                            <option value=""></option>

                            {clinicalStaff.map((staff) => (
                              <option key={staff.uuid} value={staff.uuid}>
                                {staff.firstname} - {staff.lastname}
                              </option>
                            ))}








                          </select>
                        </div>




                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">

                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Visit Date<span className="text-red-500">*</span>

                            <input
                              type="date"

                              onChange={handleDateChange}
                              value={visitDate}
                              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Search UPI, Card Number or Surname"

                            />
                          </label>


                        </div>



                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Schedule Time<span className="text-red-500">*</span>

                            <input
                              type="time"

                              onChange={handleScheduleTimeChange}
                              value={scheduleTime}
                              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Search UPI, Card Number or Surname"

                            />
                          </label>


                        </div>

                      </div>




                      {/* urgent */}

                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-6">

                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Urgent (e.g. A&E, priority)



                            <input
                              type="checkbox"

                              onChange={handleUrgentChange}
                              checked={urgent}
                              className="ml-5"

                            />
                          </label>


                        </div>





                      </div>

                      {/*  */}



                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-5">

                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Vital Signs   -  <span onClick={handleVitalShowClick} className="text-blue-600 font-bold text-sm cursor-pointer">Hide / Show</span>


                          </label>
                          {
                            sheowvital &&

                            <div className="flex space-x-4">
                              <div className="space-y-2">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
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

                              <div className="space-y-2">
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
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

                              <div className="space-y-2">
                                <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">
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

                              <div className="space-y-2">
                                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
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

                              <div className="space-y-2">
                                <label htmlFor="pulseRate" className="block text-sm font-medium text-gray-700">
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
                            </div>

                          }


                        </div>





                      </div>

                      {/*  */}


                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-6">

                        <div className="space-y-2">
                          {/* <label
    htmlFor="firstname"
    className="block text-sm font-medium text-gray-700"
  >
    Billable </label>  */}

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleBillableChange} checked={billable} type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Billing</span>
                          </label>


                        </div>





                      </div>


                      <div className="space-y-2">
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
                      </div>



<br />
 <br />

                      <div className="form-group w-full">
                  <button
                    type="submit"
                    className="w-full text-center text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base px-5 py-3  dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                  >
                    Schedule New Appointment
                  </button>
                </div>

                </form>

                    </div>



                    <div className="w-[35%] min-h-[30vh] ">
                      <h3 className="text-base text-gray-700 font-medium py-5">Patient information</h3>

                      {selectedPatient && Object.keys(selectedPatient).length > 0 && (
                        <div className="rounded-lg border border-gray-300 py-3 px-2 text-sm">
                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500 text-sm">Sponsor</span>
                            <span className="text-gray-800 text-sm font-medium">
                              {selectedPatient.sponsor || "N/A"}
                            </span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Plan Type</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.sponsor_plan || ''}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">UPI</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.upi}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Phone</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.phone}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Email</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.email}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">DOB</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.dob}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Religion</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.religion}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Occupation</span>
                            <span className="text-gray-800 font-medium">{selectedPatient.occupation}</span>
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

export default ScheduleAppointment;
