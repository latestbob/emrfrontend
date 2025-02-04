import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
import { getRegisteredPatients } from "../services/patientService";

const Patient = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const[patients, setPatients] = useState<any[]>([]);
 
  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setEmail(user.email);
      fetchRegisteredPatient();
    }
  }, [user]);

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

async function fetchRegisteredPatient(){
   

    try {
      
      
     const result =  await getRegisteredPatients();
       setPatients(result.patients);
     
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
          <Header title="Patient Management" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">

          <div className="flex bg-cyan-900 px-10 py-5 justify-between items-center rounded">
              <input
               
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Search by name, gender, role"
              />

                    <div className="buttondiv ">
                    <Link to="/register-patient" className="text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"><i className="fa fa-add"></i></span>
                        Register Patient
                        </Link>

                        <button type="button" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"><i className="fa fa-upload"></i></span>
                       Import Patient
                        </button>
                            </div>
            </div>


            <br />
            <br />

           
            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              {/* table content here */}



<div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
            <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                Last 30 days
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
   
            <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{
                position: "absolute", inset: "auto auto 0px 0px", margin: '0px', transform: 'translate3d(522.5px, 3847.5px, 0px)'
            }}>
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input checked={false} id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <label  className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
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
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Fullname
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    DOB
                </th>
                <th scope="col" className="px-6 py-3">
                    gender
                </th>
                <th scope="col" className="px-6 py-3">
                    Marital Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>


            {
                patients && patients.map((patient, index) => {
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </td>

                <td className="px-6 py-4">
                    {patient.title}
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {patient.fullname}
                </td>
              
                
                <td className="px-6 py-4">
                   {patient.email}
                </td>
                <td className="px-6 py-4">
                    {patient.phone}
                </td>
                <td className="px-6 py-4">
                    {patient.dob}
                </td>
                <td className="px-6 py-4">
                    {patient.gender}
                </td>

                <td className="px-6 py-4">
                    {patient.marital_status}
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
                    <li>
                      <Link
                        to={`/patient/${patient.upi}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        View More 
                      </Link>
                    </li>

                    {["Super Admin", "Administrator", "Receptionist"].includes(user.role) && (
                      <li>
                        <Link
                          to={`/patient/edit/${patient.upi}`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit Details
                        </Link>
                      </li>
                    )}
                    {/* <li>
                      <Link
                        to={`/patient/edit/${patient.upi}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Details
                      </Link>
                    </li> */}

                    <li>
                      <Link
                        to='Deactivate'
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Health Records
                      </Link>
                    </li>


                    

                    {["Super Admin", "Administrator", "Receptionist"].includes(user.role) && (
                      <li>
                        <Link
                        to='Remove'
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Delete Account
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

export default Patient;
