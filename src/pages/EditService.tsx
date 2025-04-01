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
import { AddSponsor } from "../services/sponsorService";
import { updateService } from "../services/Service";



const EditService = (): JSX.Element => {
  const navigate = useNavigate();

  

  // Parse query parameters
  
  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

      const location = useLocation();
       const { uuid = "" } = useParams();
       
    
      // Initialize investigations, imaging, otherservices from location state or empty array
  
        const [name, setName] = useState<any>(location.state?.name || {});
        const [type, setType] = useState<any>(location.state?.type || {});
        const [price, setPrice] = useState<any>(location.state?.price || {});

  
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [roles, setRoles] = useState<any[]>([]);
  const [department, setDepartment] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //   form values

//   name, type, phone, contact_email, contact_person




  const [office, setOffice] = useState<string>("");
  const [office_uuid, setOfficeUuid] = useState<string>("");

  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setOffice(user.office);
      setOfficeUuid(user.office_uuid);

      fetchRole(user.office_uuid);
      fetchDepartment(user.office_uuid);
    }
  }, [user]);


  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
     
        const result = await updateService(name, type, price, uuid);

      toast.success("Service updated successfully", {
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

      navigate('/services');
      
     
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

  async function fetchRole(office_uuid: string) {
    try {
      const result = await getRoles(office_uuid);
      setRoles(result.roles);
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

  async function fetchDepartment(office_uuid: string) {
    try {
      const result = await getDepartments(office_uuid);
      setDepartment(result.departments);
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

  // handles

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }


  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value);
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value);
  }

//   function handleDepartChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     setDepart(e.target.value);
//   }

//   function handleAosChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     setAos(e.target.value);
//   }

//   function handleAddressChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
//     setAddress(e.target.value);
//   }

//   function handleFeeChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setFee(Number(e.target.value));
//   }


  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="Edit Service" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <input
                className="hidden mt-1  w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Enter your password"
              />

              <div className="buttondiv text-right">
                <Link
                  to="/services"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                     Service Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleNameChange}
                      value={name}
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleTypeChange}
                            value={type}
                           
                            required
                          >
                            <option value=""></option>

                            <option value="Pathology Investigations">Pathology Investigations</option>
                            <option value="Imaging Investigation">Imaging Investigation</option>
                            <option value="Service">Other Services</option>
                           




                          </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      onChange={handlePriceChange}
                      value={price}
                     
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      
                      required
                    />
                  </div>
                 

                </div>

             
               

                <hr />

           

                <div className="form-group m-auto w-1/2">
                  <button
                    type="submit"
                    className="w-full text-center text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base px-5 py-3  dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                  >
                    {loading ? "Loading..." : "Update Service"}
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

export default EditService;
