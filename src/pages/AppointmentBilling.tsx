import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
// import { getRegisteredPatients } from "../services/patientService";
import { billAppoinment, getAppointments } from "../services/appointment";

import { searchUsers } from "../services/patientService";
import { getClinicalStaff } from "../services/userService";

import { scheduleAppointment } from "../services/appointment";
import moment from "moment";

const AppointmentBilling = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

   const location = useLocation();
   const [appointment, setAppointment] = useState<any>(location.state?.appointment || {});

//   const [appointments, setAppointments] = useState<any[]>([]);

const [amount, setAmount] = useState<number>(location.state?.appointment.amount || 0);

const [payment_policy, setPaymentPolicy] = useState("");

// Handle select input change
const handlePaymentPolicyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setPaymentPolicy(e.target.value);
};





  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }



  const [loading, setLoading] = useState<boolean>(false);


   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
  
      setLoading(true);
  
    
  
      try {

        
        // const result = await scheduleAppointment(
            // amount:number,
            // payment_policy:string,
            // biller:string,
            // sponsor:string,
            // sponsor_plan:string
        // );

        const result = await billAppoinment(
            appointment.upi,
            appointment.uuid,
            amount,
           payment_policy,
           user.email,
           appointment.sponsor,
           appointment.sponsor_plan


        );
  
        toast.success("Apppointment billed successfully", {
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
  
        
          navigate("/appointments");
        
       
       
      } catch (err: any) {
        //setErroMessage(err.message);
        setLoading(false);
        console.log(err);
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
  
    useEffect(() => {
      if (appointment) {
        setPaymentPolicy(
         appointment.sponsor === "Self Sponsor" ? "cash" : "claims"
        );
      }
    }, [appointment]);


  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="flex-1 bg-gray-100 min-h-screen">
          {/* <!-- Header --> */}
          <Header title="Appointment Billing" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">

            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">


              <div className="buttondiv text-right">
                <Link
                  to="/appointments"
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



              <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">


                {/* table here */}


                <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8 ">

                  {/* content here */}

                  <div className="flex justify-between ">
                    <div className="w-[50%] pr-10">
                      <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                      

                        <div className="space-y-2">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Amount<span className="text-red-500">*</span>
                          </label>

                          <input
                      type="number"
                      onChange={handleAmountChange}
                      value={amount}
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder=""required
                    />
                        </div>

</div>



                      



                      {/* urgent */}

                  

                      {/*  */}



                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-5">

                     





                      </div>

                      {/*  */}

                      


                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-6">

                        {/* <div className="space-x-2">
             

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleBillableChange} checked={billable} type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Billing</span>
                          </label>


                        </div> */}



                        <div className="space-x-2">
                       

                          <label className="relative inline-flex items-center cursor-pointer">
                            

                           
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Payment Policy</span>
                          </label>




                          

                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handlePaymentPolicyChange}
                            value={payment_policy}
                            required
                          >
                            <option value=""></option>
                            <option value="cash">Cash</option>
                            <option value="claims">Claims</option>
                          </select>


                        </div>





                      </div>




<br />
 <br />

                      <div className="form-group w-full">
                  <button
                    type="submit"
                    className="w-full text-center text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base px-5 py-3  dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                  >
                    Bill Appointment
                  </button>
                </div>

                </form>

                    </div>



                    <div className="w-[35%] min-h-[30vh] ">
                      <h3 className="text-base text-gray-700 font-medium py-5">Appointment Details</h3>
                      {/* //         patientUPI: upi,
    //         type: "appointment",
    //         type_uuid: uuid,
    //         paymentMethod: payment_policy, // Assuming default payment method
    //         date: new Date(),
    //         billingOfficer: biller,
    //         totalAmount: consultantInfo?.fee || 0, // Assuming consultantInfo has a fee field
    //         paymentStatus: "paid",
    //         sponsor,
    //         sponsor_plan,
    //         createdAt: new Date(),
    //         month: moment().format("MMMM"),
    //         year: moment().format("YYYY"), */}



                      {
                        appointment && 
                      
                        <div className="rounded-lg border border-gray-300 py-3 px-2 text-sm">
                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500 text-sm">Patient Details</span>
                            <span className="text-gray-800 text-sm font-medium">
                              {appointment.firstname +  " " +  appointment.lastname || "N/A"}
                            </span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">UPI</span>
                            <span className="text-gray-800 font-medium">{appointment.upi || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Sponsor</span>
                            <span className="text-gray-800 font-medium">{appointment.sponsor || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Plan</span>
                            <span className="text-gray-800 font-medium">{appointment.sponsor_plan || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Appointment_uuid</span>
                            <span className="text-gray-800 font-medium">{appointment.uuid || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Purpose</span>
                            <span className="text-gray-800 font-medium">{appointment.purpose || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Case Type</span>
                            <span className="text-gray-800 font-medium">{appointment.visit_type|| "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Consultant</span>
                            <span className="text-gray-800 font-medium">{appointment.consultant || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Amount</span>
                            <span className="text-gray-800 font-medium">{appointment.amount || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Date</span>
                            <span className="text-gray-800 font-medium">{appointment.visit_date || "N/A"}</span>
                          </div>

                          <div className="flex justify-between px-3 mb-3 items-center space-x-2">
                            <span className="text-gray-500">Time</span>
                            <span className="text-gray-800 font-medium">{appointment.scheduled_time || "N/A"}</span>
                          </div>

                       

                        
                        </div>
                      
                      }
                    </div>
                      



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

export default AppointmentBilling;
