import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
import { getRoles } from "../services/roleService";

import { getDepartments } from "../services/departmentService";
import { registerMember } from "../services/authService";

const AddMember = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

 
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [roles, setRoles] = useState<any[]>([]);
  const [department, setDepartment] = useState<any[]>([]);
 const [loading, setLoading] = useState<boolean>(false);


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

  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
     setOffice(user.office);
     setOfficeUuid(user.office_uuid);

     fetchRole(user.office_uuid);
     fetchDepartment(user.office_uuid);
    }
  }, [user]);



  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

//   function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setPassword(e.target.value);

//     // Regular expressions to check password criteria
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
//       password
//     );
//     const isLengthValid = password.length >= 8;

//     // Check if all criteria are met
//     setIsValid(
//       hasUpperCase &&
//         hasLowerCase &&
//         hasNumbers &&
//         hasSpecialChars &&
//         isLengthValid
//     );
//   }

  //   function handlePhoneChange(e:React.ChangeEvent<HTMLInputElement>){

  //     setPhone(e.target.value)
  // }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await registerMember(firstname, lastname, email, phone, dob, role, gender, depart, address, office, office_uuid);

      toast.success(
        "You have successfully registered a staff",
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
      navigate('/staff-member');
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
    setEmail(e.target.value)
}

function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value)
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



  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="Add New Staff" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <input
                className="hidden mt-1  w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Enter your password"
              />

              <div className="buttondiv text-right">
                <Link
                  to="/staff-member"
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
                      placeholder=""
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

                        {roles && roles.map((role) => (
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
                            type="radio"
                             name="gender"
                            className=""
                            value="Male"
                            onChange={handleGenderChange}
                            /> <span className="ml-3">Male</span>

                        <input
                            type="radio"
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
                  
                </div>

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
                       
                        {loading ? 'Loading...' : 'Add New Member'}
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

export default AddMember;
