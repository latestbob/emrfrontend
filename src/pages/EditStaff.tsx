import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword, getUniqueNonClinicalStaff, updateUniqueUser } from "../services/userService";

import { Bounce, toast } from "react-toastify";
import { getRoles } from "../services/roleService";

import { getDepartments } from "../services/departmentService";
import { registerMember } from "../services/authService";



const EditStaff = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");


  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

 
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [roles, setRoles] = useState<any[]>([]);
  const [department, setDepartment] = useState<any[]>([]);
 const [loading, setLoading] = useState<boolean>(false);
 const[fetcheduser, setFetchUser]=useState<any>({});

//   form values

const [firstname, setFirstName] = useState<string>("");
const [lastname, setLastName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [phone, setPhone] = useState<string>("");
const [dob, setDob] = useState<string>("");
const [role, setRole] = useState<string>("");
const [depart, setDepart] = useState<string>("");
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>("");

  const[office, setOffice] = useState<string>("");
  const[office_uuid, setOfficeUuid] = useState<string>("");
  const [aos, setAos] = useState<string>("");
  const [fee, setFee] = useState<number>(0);


  const {uuid} = useParams();


  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
     setOffice(user.office);
     setOfficeUuid(user.office_uuid);

     fetchRole(user.office_uuid);
     fetchDepartment(user.office_uuid);

        fetchUniqueNonClinicalStaff();
      
    }
  }, [user]);



  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {

      if(uuid){
        const result = await updateUniqueUser(firstname, lastname, email, phone, uuid, role, depart, dob, gender, address, aos, fee);
      }
      

      toast.success(
        "Staff profile updated successfully",
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
      setLoading(false);
      if(type == 'clinical'){
        navigate("/clinical-staff");
      }
      else{
        navigate("/staff-member");
      }
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

  async function handleLogOut() {
    await LogoutUser();

    setToken(null);
    setUser(null);

    navigate("/");
  }

//   handleRole fetch

async function fetchRole(office_uuid:string){
   

    
    try {
      
      
     const result =  await getRoles(office_uuid);
        setRoles(result.roles);
     
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


async function fetchDepartment(office_uuid:string){
   

    
    try {
      
      
     const result =  await getDepartments(office_uuid);
        setDepartment(result.departments);
     
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

// handles

function handleFirstChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value)
}

function handleLastChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value)
}


function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value;
  setEmail(value);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    e.target.setCustomValidity("Please enter a valid email address.");
  } else {
    e.target.setCustomValidity(""); // Clear error when valid
  }
}

function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
  let value = e.target.value;

  // Allow only numbers and a single "+" at the start
  if (!/^\+?[0-9]*$/.test(value)) {
    e.target.setCustomValidity("Please enter valid phone number.");
  } else {
    e.target.setCustomValidity(""); // Reset validation message
  }

  setPhone(value);
}

function handleDobChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDob(e.target.value)
}

function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRole(e.target.value)
}


function handleDepartChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDepart(e.target.value)
}

function handleAddressChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAddress(e.target.value)
}

function handleAosChange(e: React.ChangeEvent<HTMLSelectElement>) {
  setAos(e.target.value);
}

function handleFeeChange(e: React.ChangeEvent<HTMLInputElement>) {
  setFee(Number(e.target.value));
}


async function fetchUniqueNonClinicalStaff(){
   

    try {
      
      if(uuid){
        const result =  await getUniqueNonClinicalStaff(uuid);
        setFetchUser(result.user);

        setFirstName(result.user.firstname)
        setLastName(result.user.lastname)
        setEmail(result.user.email)
        setPhone(result.user.phone)
        setDob(result.user.dob)
        setRole(result.user.role)
        setDepart(result.user.department)
        setAddress(result.user.address)
        setGender(result.user.gender)
        setAos(result.user.aos)
        setFee(result.user.fee)
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
  


  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="Edit Staff Information" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <input
                className="hidden mt-1  w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Enter your password"
              />

<div className="buttondiv text-right bg-cyan-900 px-10  justify-end items-center rounded">
                <div
                onClick={() => navigate(-1)}

                  className="cursor-pointer text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                >
                  <span className="pr-4">
                    <i className="fa fa-backward"></i>
                  </span>
                  Back 
                </div>
              </div>
            </div>

            <br />
            <br />

            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              {/* table content here */}

              <form onSubmit={handleSubmit} className="space-y-4 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      onChange={handleFirstChange}
                      value={firstname}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your first name"required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      onChange={handleLastChange}
                      value={lastname}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your last name"required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      onChange={handleEmailChange}
                      value={email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your email address"required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      onChange={handlePhoneChange}
                      value={phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your Phone Number"required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      DOB
                    </label>
                    <input
                      type="date"
                      onChange={handleDobChange}
                      value={dob}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role <span className="text-red-500">*</span>
                    </label>
                    {/* <select
                 
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     
                    /select> */}

                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleRoleChange}
                      value={role}
                      required
                    >
                        <option value="">Assign Role</option>

                        {roles &&
                        roles
                            .filter((role) => {
                                // Filter roles based on type
                                if (type === 'clinical') {
                                    return !['super admin', 'administrator', 'receptionist', 'billing and accounts staff', 'it support'].includes(role.name.toLowerCase());
                                }
                                else{
                                  return !['doctor', 'nurse', 'pharmacist', 'radiologist', 'lab technician'].includes(role.name.toLowerCase());
                                }
                                return true; // Include all roles if type is not clinical
                            })
                            .map((role) => (
                                <option key={role._id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                            >
                            Gender <span className="text-red-500">*</span>
                            </label>
                                    <input
                                   checked={gender === "Male"}
                            type="radio"
                             name="gender"
                            className=""
                            value="Male"
                            onChange={handleGenderChange}
                            /> <span className="ml-3">Male</span>

                        <input
                            type="radio"
                            checked={gender === "Female"}
                            name="gender"
                            className="ml-5"
                         value="Female"
                            onChange={handleGenderChange}
                            /> <span className="ml-3">Female</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                     Choose Department<span className="text-red-500">*</span>
                    </label>
                    {/* <select
                 
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     
                    /select> */}

                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleDepartChange}
                      value={depart}
                      required
                    >
                        <option value="">Choose Department</option>
                        {department && department.map((depart) => (
                            <option key={depart._id} value={depart.name}>
                                {depart.name}
                            </option>
                        ))}
                                            
                    </select>
                  </div>

                  {type == "clinical" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Area of Specialization
                      </label>
                      {/* <select
                 
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     
                    /select> */}

                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        name=""
                        id=""
                        onChange={handleAosChange}
                        value={aos}
                       
                      >
                        <option value="">Select Specialization</option>
                        <option value="" disabled selected>
                          Select specialization
                        </option>
                        <option value="General Practitioner">
                          General Practitioner
                        </option>

                        <option value="Nurse Practitioner">Nurse Practitioner</option>
                        <option value="Surgical Nurse">Surgical Nurse</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Orthopedic Surgeon">
                          Orthopedic Surgeon
                        </option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="Oncologist">Oncologist</option>
                        <option value="Radiologist">Radiologist</option>
                        <option value="Anesthesiologist">
                          Anesthesiologist
                        </option>
                        <option value="Urologist">Urologist</option>
                        <option value="Nephrologist">Nephrologist</option>
                        <option value="Gastroenterologist">
                          Gastroenterologist
                        </option>
                        <option value="Pulmonologist">Pulmonologist</option>
                        <option value="Otolaryngologist (ENT Specialist)">
                          Otolaryngologist (ENT Specialist)
                        </option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="Rheumatologist">Rheumatologist</option>
                        <option value="Pathologist">Pathologist</option>
                        <option value="Surgeon (General)">
                          Surgeon (General)
                        </option>
                        <option value="Infectious Disease Specialist">
                          Infectious Disease Specialist
                        </option>
                        <option value="Hematologist">Hematologist</option>
                        <option value="Allergist/Immunologist">
                          Allergist/Immunologist
                        </option>
                        <option value="Plastic Surgeon">Plastic Surgeon</option>
                      </select>
                    </div>
                  )}
                
                  
                  
                </div>

                {type == 'clinical' && 
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Consultation Fee{" "}
                      <span className="text-gray-700">
                        (Doctors and Nurses)
                      </span>
                    </label>
                    <input
                      type="number"
                      onChange={handleFeeChange}
                      value={fee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter consultation fee i.e 5000"
                    />
                  </div>
                </div>
}

                <hr />

                <p className="text-sm text-blue-800">Other details</p>



                <div className=" mt-5">
                    <label
               
                      className="block text-sm font-medium text-gray-700"
                    >
                     Address
                    </label>

                    <textarea value={address} onChange={handleAddressChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" name="" id=""></textarea>
                </div>



                <div className="form-group m-auto w-1/2">
                <button type="submit" className="w-full text-center text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base px-5 py-3  dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                       
                        {loading ? 'Loading...' : 'Update Information'}
                        </button>
                </div>
                    


              </form>

          

              
            </div>



          </main>
        </div>
      </div>
    </>
  );
};

export default EditStaff;
