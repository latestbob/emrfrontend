import React, { act, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

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

const OPDResults = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const location = useLocation();
  const { uuid = "" } = useParams();

  // Initialize investigations, imaging, otherservices from location state or empty array
  const [investigations, setInvestigations] = useState<Investigation[]>(
    location.state?.investigations || []
  );
  const [imaging, setImaging] = useState<Investigation[]>(
    location.state?.imaging || []
  );
  const [otherservices, setOtherServices] = useState<Investigation[]>(
    location.state?.otherservices || []
  );
  const [patient, setPatient] = useState<any>(location.state?.patient || {});

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [encounters, setSetEncounters] = useState<any[]>([]);
  const TABS = [
    { key: "awaiting billing", label: "Awaiting Billing" },
    { key: "billed", label: "Billed" },
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

  async function fetchServices() {
    try {
      const result = await getEncounterByBillingStatus(
        activeTab,
        user.firstname + " " + user.lastname
      );
      setSetEncounters(result.encounters);
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

  //   const [data, setData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  interface Investigation {
    _id: string;
    name: string;
    amount: number;
    billing_status: string;
    has_result: string | null;
  }

  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="OPD Results" />
          {/* <!-- Content --> */}

          {
            user && 
        
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-between items-center rounded">
              <input
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Search Patient"
              />

              <div className="buttondiv ">
                {user && user.role == "Doctor" || user.role == "Nurse" ? (
                  <Link
                    to="/opd"
                    className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                  >
                    <span className="pr-4"></span>
                    Back
                  </Link>
                ) : (
                  <Link
                    to="/encounters"
                    className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                  >
                    <span className="pr-4"></span>
                    Back
                  </Link>
                )}
              </div>
            </div>

            <br />
            <br />

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Investigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {investigations.map((investigation) => (
                  <div
                    key={investigation._id}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <h3 className="text-base font-semibold mb-2">
                      {investigation.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Amount: N{investigation.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {investigation.billing_status == "billed" ? (
                        <span className="bg-green-600 text-white  px-3 rounded-lg my-3 shadow-sm text-sm">
                          Billed
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-dark  px-3 rounded-lg my-3 shadow-sm text-sm">
                          Awaiting Billing
                        </span>
                      )}
                    </p>

                    {investigation.has_result ? (
                      <div className="flex justify-end py-2">

                        {
                            user && user.role == "Doctor" || user.role == "Nurse" ?   <Link
                            to={`/opd/view-result/${uuid}/${investigation.name}`}
                            state={{
                              patient: patient,
                            }}
                            className="text-white bg-cyan-800 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                          >
                            View Result
                          </Link>

                          :   <Link
                          to={`/download-test-result`}
                          state={{
                            patient: patient,
                            uuid:uuid,
                            testname:investigation.name
                          }}
                          className="text-white bg-cyan-800 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                        >
                          Download Result
                        </Link>
                        }

                      
                      </div>
                    ) : (
                      <div className="flex justify-end py-2">
                        <button
                          disabled
                          className="text-white bg-gray-400 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                        >
                          Awaiting result
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="py-5" />

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Imaging</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imaging.map((img) => (
                  <div
                    key={img._id}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <h3 className="text-base font-semibold mb-2">{img.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Amount: N{img.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {img.billing_status == "billed" ? (
                        <span className="bg-green-600 text-white  px-3 rounded-lg my-3 shadow-sm text-sm">
                          Billed
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-dark  px-3 rounded-lg my-3 shadow-sm text-sm">
                          Awaiting Billing
                        </span>
                      )}
                    </p>
                    {img.has_result ? (
                      <div className="flex justify-end py-2">

                        {
                            user && user.role == "Doctor" || user.role == "Nurse " ?

                            <Link
                          to={`/opd/view-result/${uuid}/${img.name}`}
                          state={{
                            patient: patient,
                          }}
                          className="text-white bg-cyan-800 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                        >
                          View Result
                        </Link>

                        :

                        <Link
                          to={'/download-test-result'}
                          state={{
                            patient: patient,
                            uuid:uuid,
                            testname:img.name
                          }}
                          className="text-white bg-cyan-800 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                        >
                          Download Result
                        </Link>

                        }
                        
                      </div>
                    ) : (
                      <div className="flex justify-end py-2">
                        <button
                          disabled
                          className="text-white bg-gray-400 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                        >
                          Awaiting result
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
            }
        </div>
      </div>
    </>
  );
};

export default OPDResults;
