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
import { getUniqueConsultation } from "../services/consultationService";

const Consultations = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const[appointments, setAppointments] = useState<any[]>([]);

  const TABS = [
    { key: null, label: "Awaiting Consultation" },
    { key: "consulted", label: "Consulted" },
    { key: "cancelled", label: "Cancelled" },
  ];
 

    const [activeTab, setActiveTab] = useState(TABS[0].key);


  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setEmail(user.email);
      fetchScheduledAppointment();
    }
  }, [user, activeTab]);

  

  //   function handlePhoneChange(e:React.ChangeEvent<HTMLInputElement>){

  //     setPhone(e.target.value)
  // }

 



  //   handle nonclincial staff  fetch

async function fetchScheduledAppointment(){
   

    try {
      
      if(user){
        const result =  await getUniqueConsultation(user.uuid);
      //  setAppointments(result.appointment);

      // const filteredAppointments = activeTab
      // ? result.appointment.filter(
      //     (appointment: any) => appointment.status === activeTab
      //   )
      // : result.appointment;
      const filteredAppointments = activeTab === null
      ? result.appointment.filter((appointment: any) => appointment.status === null) // Only appointments with status null
      : result.appointment.filter((appointment: any) => appointment.status === activeTab); // Filter by selected tab
    setAppointments(filteredAppointments);


      }
     
     
    } catch (err:any) {
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


// const [isDropdownVisible, setIsDropdownVisible] = useState(false);

// const toggleDropdown = () => {
//   setIsDropdownVisible(!isDropdownVisible);
// };

  // State to track which dropdown is visible
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null);

  // Function to toggle dropdown for a specific row
  const toggleDropdown = (index:any) => {
    setVisibleDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };



 
  





  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="flex-1 bg-gray-100 min-h-screen">
          {/* <!-- Header --> */}
          <Header title="Consultations" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">

          <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              {/* <input
               
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Search by name, gender, role"
              /> */}

                    <div className="buttondiv ">
                   

                        <Link to='/dashboard' type="button" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"><i className="fa fa-backward"></i></span>
                      Back To Dashboard
                        </Link>
                            </div>
            </div>


            <br />
            <br />

           
            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              {/* table content here */}



<div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">

   {/* Tabs Navigation */}
 <div className="flex border-b border-gray-200 w-full justify-center space-x-20">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 text-base font-medium transition-all 
            ${
              activeTab === tab.key
                ? "border-b-2 border-[#f36e25] text-black"
                : "text-gray-500 font-normal hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


  {/* table here */}
            

  <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    uuid
                </th>
                <th scope="col" className="px-6 py-3">
                  Schedule Time
                </th>
                <th scope="col" className="px-6 py-3">
                   Patient
                </th>

                <th scope="col" className="px-6 py-3">
                    Vist Type
                </th>

                <th scope="col" className="px-6 py-3">
                    Purpose / Outcome
                </th>

                <th scope="col" className="px-6 py-3">
                   Status
                </th>

               
               
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>


            {
                appointments && appointments.map((appoint, index) => {
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </td>

                <td className="px-6 py-4">
                    {appoint.uuid}
                </td>
                <td scope="row" className="px-6 py-4">
                    {appoint.visit_date} -  {appoint.scheduled_time}
                </td>
              
                
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {appoint.firstname + ' ' + appoint.lastname + ' - ' + appoint.upi}
                </td>

                <td className="px-6 py-4">
                    {appoint.visit_type}
                </td>

                <td className="px-6 py-4">
                    {appoint.purpose}
                </td>

                <td className="px-6 py-4">
                    {appoint.status === null ? (
                      <span className="text-amber-500">Awaiting Consultation</span>
                    ) : appoint.status === "consulted" ? (
                      <span className="text-green-500">Consulted</span>
                    ) : appoint.status === "cancelled" ? (
                      <span className="text-red-500">Cancelled</span>
                    ) : (
                      <span>{appoint.status}</span>
                    )}
                </td>

                
               
                {/* <td className="flex items-center px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td> */}

<td className="px-6 py-4">
                <button
                  id="dropdownDefaultButton"
                  className="text-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                  onClick={() => toggleDropdown(index)} // Pass index to toggleDropdown
                >
                  Manage
                </button>

                {/* Dropdown Menu */}
                <div
                  id="dropdown"
                  className={`z-10 ${
                    visibleDropdownIndex === index ? "block" : "hidden"
                  } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >

                    {appoint.status === null && (
                      <li>
                        <Link
                          to={`/consultview/${appoint.uuid}`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Consult
                        </Link>
                      </li>
                    )}

{appoint.status === "consulted" && (
                      <li>
                        <Link
                          to={`/edit-consultation/${appoint.uuid}`}
                          className="block text-amber-400 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </Link>
                      </li>
                    )}


                    
                    
       
                    
                    
                  </ul>
                </div>
              </td>
            </tr>
                    )
                })
            }


            
            
           
            
          
       
        </tbody>
    </table>
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

export default Consultations;
