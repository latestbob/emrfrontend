import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
import { getRoles } from "../services/roleService";

import { getDepartments } from "../services/departmentService";
import { registerMember } from "../services/authService";
import { getUniquePatient, registerPatient } from "../services/patientService";

const EditPatient = (): JSX.Element => {
  const navigate = useNavigate();

  const location = useLocation();

  // Parse query parameters

  const {upi} = useParams();
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

  const [title, setTitle] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [middlename, setMiddleName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dob, setDob] = useState<string>("");
 
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [marital_status, setMaritalStatus] = useState<string>("");
const [religion, setReligion] = useState<string>("");
const [state, setState] = useState<string>("");
const [city, setCity] = useState<string>("");
const [occupation, setOccupation] = useState<string>("");
const [next_of_kin, setNextOfKin] = useState<string>("");
const [next_of_kin_relationship, setNextOfKinRelationship] = useState<string>("");
const [next_of_kin_phone, setNextOfKinPhone] = useState<string>("");
const [next_of_kin_address, setNextOfKinAddress] = useState<string>("");


const [blood_group, setBloodGroup] = useState<string>("");
const [genotype, setGenotype] = useState<string>("");
const [weight, setWeight] = useState<number>(0);
const [height, setHeight] = useState<number>(0);
const [sponsor, setSponsor] = useState<string>("");
const [sponsor_plan, setSponsorPlan] = useState<string>("");


  const [office, setOffice] = useState<string>("");
  const [office_uuid, setOfficeUuid] = useState<string>("");

  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setOffice(user.office);
      setOfficeUuid(user.office_uuid);
      fetchUniquePatient();

      
    }
  }, [user]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };



  async function fetchUniquePatient(){
   

    try {
      
      if(upi){
        const result =  await getUniquePatient(upi);
        setFetchUser(result.patient);

        setTitle(result.patient.title);
        setFirstName(result.patient.firstname)
        setLastName(result.patient.lastname)
        setMiddleName(result.patient.middlename)
        setEmail(result.patient.email)
        setPhone(result.patient.phone)
        setDob(result.patient.dob)
        setMaritalStatus(result.patient.marital_status)
        setReligion(result.patient.religion)
        setCity(result.patient.city)
        setState(result.patient.state)

        setAddress(result.patient.address)
        setGender(result.patient.gender)

        setOccupation(result.patient.occupation)
        setNextOfKin(result.patient.next_of_kin)
        setNextOfKinRelationship(result.patient.next_of_kin_relationship)
        setNextOfKinPhone(result.patient.next_of_kin_phone)
        setNextOfKinAddress(result.patient.next_of_kin_address)

        setBloodGroup(result.patient.blood_group)
        setGenotype(result.patient.genotype)
        setHeight(result.patient.height)
        setWeight(result.patient.weight)
        setSponsor(result.patient.sponsor)
        setSponsorPlan(result.patient.sponsor_plan)

        
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
  




  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await registerPatient(
        title,
        firstname,
        lastname,
        middlename,
        email,
        phone,
        marital_status,
        state,
        city,
        religion,
        blood_group,
        genotype,
        next_of_kin,
        next_of_kin_address,
        next_of_kin_phone,
        next_of_kin_relationship,
        height,
        weight,
        sponsor,
        sponsor_plan,
        occupation,
        office,
        office_uuid,
        dob,
        gender,
        address,
        
      );

      toast.success("Patient registered successfully", {
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

      
        navigate("/patients");
      
     
     
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

 


  // handles

  function handleTitleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTitle(e.target.value);
  }


  function handleFirstChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }


  function handleMiddleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMiddleName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value);
  }

  function handleDobChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDob(e.target.value);
  }

 


  function handleAddressChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAddress(e.target.value);
  }

  function handleMaritalStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setMaritalStatus(e.target.value);
  }


  function handleReligionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setReligion(e.target.value);
  }

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState(e.target.value);
  }


  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

   function handleOccupationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOccupation(e.target.value);
  }
  function handleNextOfKinChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNextOfKin(e.target.value);
  }

  function handleNextOfKinRelationshipChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setNextOfKinRelationship(e.target.value);
  }


  function handleNextOfKinPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNextOfKinPhone(e.target.value);
  }

  function handleNextOfKinAddressChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNextOfKinAddress(e.target.value);
  }


  function handleBloodGroupChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setBloodGroup(e.target.value);
  }

  function handleGenotypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setGenotype(e.target.value);
  }

  function handleSponsorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSponsor(e.target.value);
  }


  function handleSponsorPlanChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSponsorPlan(e.target.value);
  }


  function handleWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWeight(Number(e.target.value));
  }

  function handleHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHeight(Number(e.target.value));
  }

  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title={`Patient - ${upi}`} />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <input
                className="hidden mt-1  w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Enter your password"
              />

              <div className="buttondiv text-right">
                <Link
                  to="/patients"
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

              <form onSubmit={handleSubmit} className="space-y-4 px-10">

          

            


                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleTitleChange}
                      value={title}
                      required
                    >
                      <option value="">Select Title</option>
                      
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof">Prof</option>
                      <option value="Hon">Hon</option>
                      <option value="Rev">Rev</option>
                      <option value="Master">Master</option>
                      <option value="Sir">Sir</option>
                      <option value="Lady">Lady</option>

                     

                    </select>
                  </div>

                  </div>
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
                      placeholder="Enter your first name"
                      required
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
                      placeholder="Enter your last name"
                      required
                    />
                  </div>


                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Middle Name 
                    </label>
                    <input
                      type="text"
                     
                      onChange={handleMiddleChange}
                      value={middlename}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your first name"
                     
                    />
                  </div>

                  
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

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
                      placeholder="Enter your email address"
                      required
                    />
                  </div>


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
                      placeholder="Enter your Phone Number"
                      required
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
                      placeholder=""
                    />
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
                    />{" "}
                    <span className="ml-3">Male</span>
                    <input
                    checked={gender === "Female"}
                      type="radio"
                      name="gender"
                      className="ml-5"
                      value="Female"
                      onChange={handleGenderChange}
                    />{" "}
                    <span className="ml-3">Female</span>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Marital Status 
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleMaritalStatusChange}
                      value={marital_status}
                      
                    >
                      <option value="">Select Status</option>
                      
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Engaged">Engaged</option>
                      <option value="Prefer Not to Say">Prefer Not to Say</option>
                    
                     

                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                     Religion
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleReligionChange}
                      value={religion}
                      
                    >
                      <option value="">Choose</option>
                      
                    <option value="Christianity">Christianity</option>
                     <option value="Islam">Islam</option>
                     <option value="Traditional">Traditional</option>
                     <option value="Others">Others</option>

                    </select>
                  </div>

               

                
                </div>

     
                <hr />

                <p className="text-sm text-blue-800">Address and Occupation</p>

                <div className=" mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>

                  <textarea
                    value={address}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name=""
                    id=""
                  ></textarea>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

<div className="space-y-2">
    <label
      htmlFor="lastname"
      className="block text-sm font-medium text-gray-700"
    >
     State
    </label>
    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleStateChange}
                      value={state}
                      
                    >
                      <option value="">Select State</option>
                      <option value="Abia">Abia</option>
  <option value="Adamawa">Adamawa</option>
  <option value="Akwa-Ibom">Akwa Ibom</option>
  <option value="Anambra">Anambra</option>
  <option value="Bauchi">Bauchi</option>
  <option value="Bayelsa">Bayelsa</option>
  <option value="Benue">Benue</option>
  <option value="Borno">Borno</option>
  <option value="Cross-River">Cross River</option>
  <option value="Delta">Delta</option>
  <option value="Ebonyi">Ebonyi</option>
  <option value="Edo">Edo</option>
  <option value="Ekiti">Ekiti</option>
  <option value="Enugu">Enugu</option>
  <option value="Gombe">Gombe</option>
  <option value="Imo">Imo</option>
  <option value="Jigawa">Jigawa</option>
  <option value="Kaduna">Kaduna</option>
  <option value="Kano">Kano</option>
  <option value="Katsina">Katsina</option>
  <option value="Kebbi">Kebbi</option>
  <option value="Kogi">Kogi</option>
  <option value="Kwara">Kwara</option>
  <option value="Lagos">Lagos</option>
  <option value="Nasarawa">Nasarawa</option>
  <option value="Niger">Niger</option>
  <option value="Ogun">Ogun</option>
  <option value="Ondo">Ondo</option>
  <option value="Osun">Osun</option>
  <option value="Oyo">Oyo</option>
  <option value="Plateau">Plateau</option>
  <option value="Rivers">Rivers</option>
  <option value="Sokoto">Sokoto</option>
  <option value="Taraba">Taraba</option>
  <option value="Yobe">Yobe</option>
  <option value="Zamfara">Zamfara</option>
  <option value="FCT">Federal Capital Territory (FCT)</option>
                    
                    
                     

                    </select>
  </div>


  <div className="space-y-2">
    <label
      htmlFor="firstname"
      className="block text-sm font-medium text-gray-700"
    >
      City
    </label>
    <input
      type="tel"
      onChange={handleCityChange}
      value={city}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter City"
     
    />
  </div>
  <div className="space-y-2">
    <label
      htmlFor="lastname"
      className="block text-sm font-medium text-gray-700"
    >
     Occupation
    </label>
    <input
      type="text"
      onChange={handleOccupationChange}
      value={occupation}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder=""
    />
  </div>






 
</div>


<hr />

<p className="text-sm text-blue-800">Next of Kin Details</p>


<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Next of Kin 
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      onChange={handleNextOfKinChange}
                      value={next_of_kin}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Relationship
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleNextOfKinRelationshipChange}
                      value={next_of_kin_relationship}
                      
                    >
                      <option value="">Select Relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Grandparent">Grandparent</option>
                      <option value="Grandchild">Grandchild</option>
                      <option value="Aunt">Aunt</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Cousin">Cousin</option>
                      <option value="Niece">Niece</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                      
                    
                    
                     

                    </select>
                  </div>


                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                     Phone Number
                    </label>
                    <input
                      type="text"
                     
                      onChange={handleNextOfKinPhoneChange}
                      value={next_of_kin_phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your first name"
                     
                    />
                  </div>

                  
                </div>


                <div className=" mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>

                  <textarea
                    value={next_of_kin_address}
                    onChange={handleNextOfKinAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name=""
                    id=""
                  ></textarea>
                </div>


                <hr />
                <p className="text-sm text-blue-800">Others</p>



                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Blood Group
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleBloodGroupChange}
                      value={blood_group}
                      
                    >
                      <option value="">Select Blood Group</option>
                      
                      <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                    
                     

                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Genotype
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleGenotypeChange}
                      value={genotype}
                      
                    >
                      <option value="">Select Genotype</option>
                      <option value="AA">AA</option>
                      <option value="AS">AS</option>
                      <option value="SS">SS</option>
                      <option value="AC">AC</option>
                      <option value="SC">SC</option>
                                        
                    
                     

                    </select>
                  </div>


               
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                     Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="firstname"
                      name="firstname"
                      onChange={handleWeightChange}
                      value={weight}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
                    
                    />
                  </div>
                  
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="lastname"
                      name="lastname"
                      onChange={handleHeightChange}
                      value={height}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your last name"
                      
                    />
                  </div>


                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sponsor
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleSponsorChange}
                      value={sponsor}
                      
                    >
                      <option value="">Choose</option>
                      <option value="Famacare HMO">Famacare HMO</option>
                    
                    
                     

                    </select>
                  </div>

                   <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sponsor's Plan
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      name=""
                      id=""
                      onChange={handleSponsorPlanChange}
                      value={sponsor_plan}
                      
                    >
                      <option value="">Choose</option>
                      <option value="Famacare HMO">Famacare HMO</option>
                    
                    
                     

                    </select>
                  </div>
                </div>


                


                <div className="form-group m-auto w-1/2">
                  <button
                    type="submit"
                    className="w-full text-center text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base px-5 py-3  dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                  >
                    {loading ? "Loading..." : "Add New Member"}
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

export default EditPatient;