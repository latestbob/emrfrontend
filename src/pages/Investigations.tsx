import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";

import { getAllSponsors } from "../services/sponsorService";
import { getServiceByType } from "../services/Service";
import { getEncounterByBillingStatus } from "../services/encounterService";
import moment from "moment";
import { spawn } from "child_process";

const Investigations = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const[ encounters, setSetEncounters] = useState<any[]>([]);
  const TABS = [
    { key: "awaiting billing", label: "Awaiting Billing" },
    { key: "billed", label: "Has Billing" },
    
  ];


  const [activeTab, setActiveTab] = useState(TABS[0].key);
 
  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setEmail(user.email);
      fetchServices();
    }
  }, [user, activeTab]);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {}

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);

    // Regular expressions to check password criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );
    const isLengthValid = password.length >= 8;

    // Check if all criteria are met
    setIsValid(
      hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars &&
        isLengthValid
    );
  }

  //   function handlePhoneChange(e:React.ChangeEvent<HTMLInputElement>){

  //     setPhone(e.target.value)
  // }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await changePassword(email, password);

      toast.success(
        "Password Updated Successfully, Kindly Login with new password",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
      //    alert("Reset Password Link has been shared to your mail");

      await handleLogOut();
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

  async function handleLogOut() {
    await LogoutUser();

    setToken(null);
    setUser(null);

    navigate("/");
  }


  //   handle nonclincial staff  fetch

async function fetchServices(){
   

    try {
      
      
     const result =  await getEncounterByBillingStatus(activeTab);
       setSetEncounters(result.encounters);
     
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
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  // Function to toggle dropdown for a specific row
  const toggleDropdown = (index:any) => {
    setVisibleDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  
 
//   const [data, setData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const [showInvestigationModal, setShowInvestigationModal] = useState<boolean>(false);
const [showImagingModal, setShowImagingModal] = useState<boolean>(false);
const [showothersModal, setShowOthersModal] = useState<boolean>(false);


// Function to handle investigation modal
const handleInvestigationModalChange = (index:number) => {
  setSelectedRowIndex(index); // Set the selected row index
  setShowInvestigationModal(!showInvestigationModal); // Toggle modal visibility
};

const handleImagingModalChange = (index:number) => {
  setSelectedRowIndex(index); // Set the selected row index
  setShowImagingModal(!showImagingModal); // Toggle modal visibility
};

const handleOthersModalChange = (index:number) => {
  setSelectedRowIndex(index); // Set the selected row index
  setShowOthersModal(!showothersModal); // Toggle modal visibility
};


// Render investiagations the modal outside the table
const renderInvestigationModal = () => {
  if (showInvestigationModal && selectedRowIndex !== null) {
    const serve = encounters[selectedRowIndex]; // Get the selected row data
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-cyan-800 p-6 rounded shadow-lg w-1/2">
          <h2 className="text-xl mb-4 text-white">Investigations</h2>
          <table className="min-w-full bg-cyan-800">
            <thead className="text-white">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Billing Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {serve.investigations.map((inv:any, idx:number) => (
                <tr key={idx}>
                  <td className="py-2">{inv.name}</td>
                  <td className="py-2">{inv.amount}</td>
                  <td className="py-2">{inv.billing_status == null && <span className="text-xs bg-amber-400 p-1 rounded text-black">Awaiting Billing</span>  }
                  {inv.billing_status =="invoiced" && <span className="text-xs bg-blue-600  p-1 rounded">Invoiced</span>  }

                  {inv.billing_status =="billed" && <span className="text-xs bg-green-600  p-1 rounded">Billed</span>  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setShowInvestigationModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return null;
};


const renderImagingModal = () => {
  if (showImagingModal && selectedRowIndex !== null) {
    const serve = encounters[selectedRowIndex]; // Get the selected row data
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-cyan-800 p-6 rounded shadow-lg w-1/2">
          <h2 className="text-xl mb-4 text-white">Imaging</h2>
          <table className="min-w-full bg-cyan-800">
            <thead className="text-white">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Billing Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {serve.imaging.map((inv:any, idx:number) => (
                <tr key={idx}>
                  <td className="py-2">{inv.name}</td>
                  <td className="py-2">{inv.amount}</td>
                  <td className="py-2">{inv.billing_status == null && <span className="text-xs bg-amber-400 p-1 rounded text-black">Awaiting Billing</span>  }
                  {inv.billing_status =="invoiced" && <span className="text-xs bg-blue-600  p-1 rounded">Invoiced</span>  }

                  {inv.billing_status =="billed" && <span className="text-xs bg-green-600  p-1 rounded">Billed</span>  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setShowImagingModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return null;
};


const renderOthersModal = () => {
  if (showothersModal && selectedRowIndex !== null) {
    const serve = encounters[selectedRowIndex]; // Get the selected row data
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-cyan-800 p-6 rounded shadow-lg w-1/2">
          <h2 className="text-xl mb-4 text-white">Other Services</h2>
          <table className="min-w-full bg-cyan-800">
            <thead className="text-white">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Billing Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {serve.otherservices.map((inv:any, idx:number) => (
                <tr key={idx}>
                  <td className="py-2">{inv.name}</td>
                  <td className="py-2">{inv.amount}</td>
                  <td className="py-2">{inv.billing_status == null && <span className="text-xs bg-amber-400 p-1 rounded text-black">Awaiting Billing</span>  }
                  {inv.billing_status =="invoiced" && <span className="text-xs bg-blue-600  p-1 rounded">Invoiced</span>  }

                  {inv.billing_status =="billed" && <span className="text-xs bg-green-600  p-1 rounded">Billed</span>  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setShowOthersModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return null;
};



  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="Investigation Request" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">

          <div className="flex bg-cyan-900 px-10 py-5 justify-between items-center rounded">
              <input
               
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Search Services"
              />

                    <div className="buttondiv ">
                   

                        {/* <button type="button" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"><i className="fa fa-upload"></i></span>
                       Import Member
                        </button> */}
                            </div>
            </div>


            <br />
            <br />

           
            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              {/* table content here */}



<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    


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




      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            {/* <th scope="col" className="p-4">
                <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="sr-only">checkbox</label>
                </div>
            </th> */}
            <th scope="col" className="px-6 py-3 w-32">
                Req. Date
            </th>
            <th scope="col" className="px-6 py-3 w-72"> {/* Increased width */}
                Patient
            </th>
            <th scope="col" className="px-6 py-3 w-32">
                Consultant
            </th>
            <th scope="col" className="px-6 py-3 w-24">
                Urgent
            </th>
            <th scope="col" className="px-6 py-3 w-32">
                Billing Officer
            </th>
            <th scope="col" className="px-6 py-3 w-64">
                Investigations
            </th>
            <th scope="col" className="px-6 py-3 w-32">
                Billing
            </th>
            <th scope="col" className="px-6 py-3 w-32">
                Status/Comments
            </th>
            <th scope="col" className="px-6 py-3 w-32">
                Action
            </th>
        </tr>
    </thead>
    <tbody>
        {encounters &&
            encounters.map((serve, index) => {
              const formattedDate = moment(serve.request_date).format("MM/DD/YYYY hh:mm A");
                return (

                  




                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >

                      
                        <td className="px-6 py-4 w-32 text-xs">{formattedDate}</td>
                        <td className="px-6 py-4 w-72"> {/* Increased width */}
                            <span className="text-cyan-900 text-sm">
                                {serve.patient?.fullname || "No Name"} | <span className="text-xs">DOB : {serve.patient.dob}</span> | <span className="text-xs">Sponsor : {serve.patient.sponsor}</span>  | <span className="text-xs">Plan : {serve.patient.sponsor_plan}</span>
                            </span>
                        </td>
                        <td className="px-6 py-4 w-32 text-xs">{serve.consultant}</td>
                        <td className="px-6 py-4 w-24 text-xs">{serve.isUrgent ? <span className="text-xs text-red-600">Yes</span>
                        : <span className="text-sm">No</span> }</td>
                        <td className="px-6 py-4 w-32 text-xs">{serve.billing_officer}</td>
                        <td className="px-6 py-4 w-64 text-xs">


                        {user.role == 'Lab Technician' && serve.investigations.length > 0 && (
                  <span
                    onClick={() => handleInvestigationModalChange(index)} // Pass the row index
                    className="text-xs cursor-pointer bg-teal-700 text-white px-1 rounded"
                  >
                    has investigations
                  </span>
                )}
                     <br />
                     <br />

                     {user.role == 'Radiologist' && serve.imaging.length > 0 && <span onClick={() => handleImagingModalChange(index)}   className="text-xs bg-blue-400 text-white mt-55 px-1 rounded cursor-pointer">has  imaging</span> }
<br />
<br />

                     {serve.otherservices.length > 0 && <span  onClick={() => handleOthersModalChange(index)} className="text-xs bg-amber-600 text-white mt-55 px-1 rounded cursor-pointer">has  other services</span> }
                       
                       
                        </td>
                        <td className="px-6 py-4 w-32 text-xs">
                        {serve.status === "billed" ? (
                            <span className="text-xs bg-green-600 text-white px-1 rounded">Billed</span>
                          ) : (
                            <span className="text-xs bg-gray-400 text-white px-1 rounded">Not Billed</span>
                          )}
                        </td>
                        <td className="px-6 py-4 w-32 text-xs">{serve.comment}</td>
                        <td className="px-6 py-4 w-32 text-xs">
                            <button
                                id="dropdownDefaultButton"
                                className="text-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                type="button"
                                onClick={() => toggleDropdown(index)}
                            >
                                Manage
                            </button>
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
                                    <li>
                                        <Link
                                            to={`/sponsor/${serve.uuid}`}
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </td>
                  
                        
                    </tr>
                );
            })}
    </tbody>

    {renderInvestigationModal()} {/* Render the modal outside the table */}
    {renderImagingModal()}
    {renderOthersModal()}
   
</table>
</div>





              {/* end of table content */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Investigations;
