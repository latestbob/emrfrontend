import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import { LogoutUser } from "../services/authService";
import { changePassword } from "../services/userService";
import { getEncounterByBillingStatus } from "../services/encounterService";

import { Bounce, toast } from "react-toastify";

import NavBar from "../components/navbar";
import Header from "../components/header";
import { useAuth } from "../contexts/auth";

interface Investigation {
  
  _id: string;
  name: string;
  amount: number;
  billing_status: boolean;
}

const EncounterBilling = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
   const { uuid = "" } = useParams();

  // Initialize investigations, imaging, otherservices from location state or empty array
  const [investigations, setInvestigations] = useState<Investigation[]>(location.state?.investigations || []);
  const [imaging, setImaging] = useState<Investigation[]>(location.state?.imaging || []);
  const [otherservices, setOtherServices] = useState<Investigation[]>(location.state?.otherservices || []);
    const [patient, setPatient] = useState<any>(location.state?.patient || {});

  // Selected services per category and total amount
  const [selectedInvestigations, setSelectedInvestigations] = useState<Investigation[]>([]);
  const [selectedImaging, setSelectedImaging] = useState<Investigation[]>([]);
  const [selectedOtherServices, setSelectedOtherServices] = useState<Investigation[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  console.log(investigations);

  // Authentication and user states
  const { setToken, setUser, user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Encounters state (renamed from setSetEncounters)
  const [encounters, setEncounters] = useState<any[]>([]);
  const TABS = [
    { key: "awaiting billing", label: "Awaiting Billing" },
    { key: "billed", label: "Has Billing" }
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      fetchServices();
    }
  }, [user, activeTab]);

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Use the newPassword value for validation
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword);
    const isLengthValid = newPassword.length >= 8;

    setIsValid(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && isLengthValid);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {

        // const transaction: Transaction = {
        //   patientId: patient._id,
        //   encounterUuid: uuid,
        //   date: new Date(),
        //   totalAmount: totalAmount,
        //   paymentStatus: "pending",
        //   paymentMethod: "cash", // This should be dynamically set based on user selection
        //   services: {
        //     investigations: selectedInvestigations.map(service => ({
        //     _id: service._id,
        //     name: service.name,
        //     amount: service.amount,
        //     billingStatus: "pending"
        //     })),
        //     imaging: selectedImaging.map(service => ({
        //     _id: service._id,
        //     name: service.name,
        //     amount: service.amount,
        //     billingStatus: "pending"
        //     })),
        //     otherServices: selectedOtherServices.map(service => ({
        //     _id: service._id,
        //     name: service.name,
        //     amount: service.amount,
        //     billingStatus: "pending"
        //     }))
        //   },
        //   createdBy: user._id,
        //   createdAt: new Date()
        // };

        // // Call the service to save the transaction
        // await saveTransaction(transaction);

        toast.success("Transaction successfully created!", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          theme: "colored"
        });

        // Redirect or perform any other actions after successful submission
        navigate("/transactions");
      
    } catch (err: any) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        theme: "colored"
      });
    }
  }

  async function handleLogOut() {
    await LogoutUser();
    setToken(null);
    setUser(null);
    navigate("/");
  }

  async function fetchServices() {
    try {
      const result = await getEncounterByBillingStatus(activeTab);
      setEncounters(result.encounters);
    } catch (err: any) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        theme: "colored"
      });
    }
  }

  // Toggle a single service for a given category
  const toggleService = (service: Investigation, category: string) => {
    let selectedServices: Investigation[];
    let setSelectedServices: React.Dispatch<React.SetStateAction<Investigation[]>>;

    switch (category) {
      case "investigations":
        selectedServices = selectedInvestigations;
        setSelectedServices = setSelectedInvestigations;
        break;
      case "imaging":
        selectedServices = selectedImaging;
        setSelectedServices = setSelectedImaging;
        break;
      case "otherservices":
        selectedServices = selectedOtherServices;
        setSelectedServices = setSelectedOtherServices;
        break;
      default:
        return;
    }

    const isSelected = selectedServices.some(s => s._id === service._id);

    if (isSelected) {
      // Remove the service if it's already selected
      const updatedServices = selectedServices.filter(s => s._id !== service._id);
      setSelectedServices(updatedServices);
      setTotalAmount(prevTotal => prevTotal - service.amount);
    } else {
      // Add the service if it's not selected
      setSelectedServices([...selectedServices, service]);
      setTotalAmount(prevTotal => prevTotal + service.amount);
    }
  };


//   check all functions

const checkAllServices = () => {
    const allServices = [...investigations, ...imaging, ...otherservices];
  
    // Filter out services that are already selected
    const newServices = allServices.filter(
      (service) => !selectedInvestigations.some((s) => s._id === service._id) &&
                   !selectedImaging.some((s) => s._id === service._id) &&
                   !selectedOtherServices.some((s) => s._id === service._id)
    );
  
    // Separate services by category
    const newInvestigations = newServices.filter((service) => investigations.includes(service));
    const newImaging = newServices.filter((service) => imaging.includes(service));
    const newOtherServices = newServices.filter((service) => otherservices.includes(service));
  
    // Update state for each category
    setSelectedInvestigations((prev) => [...prev, ...newInvestigations]);
    setSelectedImaging((prev) => [...prev, ...newImaging]);
    setSelectedOtherServices((prev) => [...prev, ...newOtherServices]);
  
    // Update the total amount
    const total = newServices.reduce((sum, service) => sum + service.amount, 0);
    setTotalAmount((prevTotal) => prevTotal + total);
  };
  
  

  return (
    <>
      <div className="flex flex-no-wrap">
        {/* Sidebar */}
        <NavBar />

        {/* Main Content */}
        <div className="w-full flex flex-col">
          {/* Header */}
          <Header title={`Encounter Billing - ${uuid}`} />

          {/* Content */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <div className="buttondiv">
                <Link to="/encounters" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] font-medium rounded-lg text-xs px-5 py-2.5 inline-flex items-center me-2 mb-2">
                  <span className="pr-4"><i className="fa fa-backward"></i></span>
                  Back
                </Link>

                <button type="button" className="text-white bg-teal-500 hover:bg-[#f36e25] font-medium rounded-lg text-xs px-5 py-2.5 inline-flex items-center me-2 mb-2">
                  <span className="pr-4"><i className="fa fa-add"></i></span>
                  Add Investigation
                </button>

                <button type="button" className="text-white bg-blue-600 hover:bg-[#f36e25] font-medium rounded-lg text-xs px-5 py-2.5 inline-flex items-center me-2 mb-2">
                  <span className="pr-4"><i className="fa fa-add"></i></span>
                  Add Imaging
                </button>

                <button type="button" className="text-black bg-amber-400 hover:bg-[#f36e25] font-medium rounded-lg text-xs px-5 py-2.5 inline-flex items-center me-2 mb-2">
                  <span className="pr-4"><i className="fa fa-add"></i></span>
                  Other Services
                </button>
              </div>
            </div>

            <br />
            <br />

         
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
                <p className="text-sm font-medium ">Patient Full Name</p>
                <p className="text-gray-600">{patient && patient.fullname}</p>
            </div>

            <div>
                <p className="text-sm font-medium ">Sponsor | Sponsor Plan</p>
                <p className="text-gray-600">{patient.sponsor} | {patient.sponsor_plan}</p>
            </div>

            <div>
                <p className="text-sm font-medium">Payment Policy</p>
                <select className="w-full p-2 border rounded">
                    <option value="cash">Cash</option>
                    <option value="claims">Claims</option>
                </select>
            </div>


        </div>

            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-semibold">Investigations</p>
                    <button onClick={checkAllServices} className="px-4 py-2 bg-cyan-800 text-white rounded hover:bg-blue-600">
                      Check All
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {investigations.map(service => (
                      <div key={service._id} className="flex justify-between items-center border p-3 rounded-md">
                        <div>
                          <p className="text-sm">{service.name}</p>
                          <p className="text-gray-600 text-sm">₦{service.amount}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedInvestigations.some(s => s._id === service._id)}
                          onChange={() => toggleService(service, "investigations")}
                          className="w-5 h-5 accent-blue-500"
                        />
                      </div>
                    ))}
                  </div>

                  <br />
                  <hr className="border border-gray-300" />
                  <br />

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-semibold">Imaging</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {imaging.map(service => (
                      <div key={service._id} className="flex justify-between items-center border p-3 rounded-md">
                        <div>
                          <p className="text-sm">{service.name}</p>
                          <p className="text-gray-600 text-sm">₦{service.amount}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedImaging.some(s => s._id === service._id)}
                          onChange={() => toggleService(service, "imaging")}
                          className="w-5 h-5 accent-blue-500"
                        />
                      </div>
                    ))}
                  </div>

                  <br />
                  <hr className="border border-gray-300" />
                  <br />

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-semibold">Other Services</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {otherservices.map(service => (
                      <div key={service._id} className="flex justify-between items-center border p-3 rounded-md">
                        <div>
                          <p className="text-sm">{service.name}</p>
                          <p className="text-gray-600 text-sm">₦{service.amount}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedOtherServices.some(s => s._id === service._id)}
                          onChange={() => toggleService(service, "otherservices")}
                          className="w-5 h-5 accent-blue-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between items-center font-semibold text-lg">
                    <p>Total Amount:</p>
                    <p className="text-lg font-semibold">₦{totalAmount}</p>
                  </div>

                  <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EncounterBilling;
