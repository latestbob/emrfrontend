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
import { getUniqueResultByTestName } from "../services/resultService";
import jsPDF from "jspdf";

const OPDViewResult = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);


    const location = useLocation();
     const { uuid = "" } = useParams();
     const { testname = "" } = useParams();
  
    // Initialize investigations, imaging, otherservices from location state or empty array

      const [patient, setPatient] = useState<any>(location.state?.patient || {});

 const[resultHtml, setResultHtml] = useState<string>("");
 const[sampleType, setSampleType] = useState<string>("");
 const[testType, setTestType] = useState<string>("");

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
  }, [uuid]);

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
      const result = await getUniqueResultByTestName(uuid,testname);
      setResultHtml(result.result.results.notes);
      setSampleType(result.result.testDetails.sampleType);
      setTestType(result.result.testType);
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

  function handleBack(){
    navigate(-1);
  }


  const logoUrl = "https://famacare.com/img/famacare.png"; // Replace with your actual logo URL

  const generatePDF = async () => {
    const pdf = new jsPDF();

    try {
      // Convert URL image to Base64
      const imgData = await getBase64ImageFromURL(logoUrl);

      // Add hospital logo
      const imgWidth = 40;
      const imgHeight = 20;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    } catch (error) {
      console.error("Error loading logo image:", error);
    }

    // Title
    pdf.setFontSize(16);
    pdf.text("Medical Test Result", 70, 20);

    // Patient Details (Left)
    pdf.setFontSize(12);
    pdf.text("Patient Details:", 10, 40);
    pdf.text("Name: John Doe", 10, 50);
    pdf.text("Age: 30", 10, 60);
    pdf.text("Gender: Male", 10, 70);
    pdf.text("Date: 2025-03-24", 10, 80);

    // Hospital Details (Right)
    pdf.text("Hospital Details:", 120, 40);
    pdf.text("Hospital: City Health Clinic", 120, 50);
    pdf.text("Doctor: Dr. Smith", 120, 60);
    pdf.text("Contact: 123-456-7890", 120, 70);

    // Test Results
    pdf.setFontSize(14);
    pdf.text("Test Conducted:", 10, 100);
    pdf.setFontSize(12);
    pdf.text("Test Name: Blood Sugar Test", 10, 110);
    pdf.text("Result: Normal (95 mg/dL)", 10, 120);
    pdf.text("Remarks: Within normal range", 10, 130);

    // Save PDF
    pdf.save("Test_Result.pdf");
  };

  // Function to fetch an image from a URL and convert it to Base64
  const getBase64ImageFromURL = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="OPD View Result" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              {/* <input
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Search Patient"
              /> */}

              <div className="buttondiv ">
                <button onClick={handleBack} type="button" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"></span>
                       Back
                        </button> 
{/* 
                        <button onClick={generatePDF} type="button" className="text-white bg-[#f36e25]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"></span>
                       Download Result
                        </button>  */}
              </div>
            </div>

          

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md mb-4">
                <h3 className="font-semibold text-lg">⚠ Confidential Information</h3>
                <p className="text-sm">
                    This patient’s result is confidential. Please do not share, screenshot, or distribute this information.
                </p>
                </div>


           
           <hr />

           <div className="p-6 border rounded-lg shadow-md bg-white mt-6">
      <h2 className="text-xl font-bold mb-2">Patient Result</h2>
      <p className="text-sm text-gray-700"><strong>Patient Name:</strong> {patient.firstname + " " + patient.lastname}  </p>
      <p className="text-sm text-gray-700"><strong>Patient UPI</strong> {patient.upi}</p>
      <p className="text-sm text-gray-700"><strong>Test Name:</strong> {testname && testname}</p>
      <p className="text-sm text-gray-700"><strong>Sample Type:</strong>{sampleType}</p>
      <p className="text-sm text-gray-700"><strong>Test Type:</strong> {testType}</p>
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Test Result</h3>
        <div className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html:  resultHtml}} />
      </div>
    </div>

        
           


          

             
 
          </main>
        </div>
      </div>
    </>
  );
};

export default OPDViewResult;
