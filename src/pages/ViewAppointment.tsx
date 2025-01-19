import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { LogoutUser } from '../services/authService';
import { updateProfile, getUniqueNonClinicalStaff } from '../services/userService';
import { useAuth } from '../contexts/auth';
import NavBar from '../components/navbar';
import Header from '../components/header';
import ReportingCards from '../components/reportingcards';
import { Bounce, toast } from 'react-toastify';
import { getUniquePatient } from '../services/patientService';

import { getUniqueAppointment } from '../services/appointment';

const ViewAppointment = ():JSX.Element => {



const navigate = useNavigate();

const {uuid} = useParams();


const {setToken, setUser, user} = useAuth();
const[phone, setPhone] = useState<string>("");
const[user_uuid, setUuid] = useState<string>("");

const[fetchedAppointment, setFetchAppointment]=useState<any>({});

const [isOpen, setIsOpen] = useState(false); // Modal visibility s
  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);

    setPhone(user.phone);
    setUuid(user.uuid);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
   
  };

  function handlePhoneChange(e:React.ChangeEvent<HTMLInputElement>){

    setPhone(e.target.value)
}


async function handleSubmit(e:React.FormEvent){
  e.preventDefault();


  try {
    
    
  //  const result =  await updateProfile(phone, uuid);

   toast.success('Profile updated successfully', {
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



  

 const updatedUser = {...user, phone:phone};

 setUser(updatedUser);

  // Step 3: Persist changes to localStorage
  localStorage.setItem('user', JSON.stringify(updatedUser));


  setIsOpen(false);

  window.location.reload();

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


async function fetchUniqueAppointment(){
   

  try {
    
    if(uuid){
      const result =  await getUniqueAppointment(uuid);
      setFetchAppointment(result.appointment);
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



useEffect(() => {
  // Load user data from localStorage if available on initial render
  if (fetchedAppointment) {
   fetchUniqueAppointment();
  }
}, [fetchedAppointment]);


    return (
        <>
            <div className="flex flex-no-wrap">
    {/* <!-- Sidebar --> */}

        <NavBar />
    
    {/* <!-- Main Content --> */}
    <div className="w-full flex flex-col">
      {/* <!-- Header --> */}
            <Header title={`Appointment - ${uuid}`}/>
      {/* <!-- Content --> */}
      <main className="p-6 bg-gray-100 flex-1">

      

      <div className="buttondiv text-right bg-cyan-900 px-10 py-5 justify-end items-center rounded">
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

<br />
<br />
        <div className="w-[90%] m-auto bg-white p-6 rounded-lg shadow-md">

          <div className="text-right">

            
             
              <Link to={`/appointment/edit/${fetchedAppointment.uuid}`} className="text-sm text-blue-800 font-medium cursor-pointer">Edit Appointment</Link>
            
           
          </div>


          <h2 className="text-lg font-semibold text-gray-800 py-5">Appointment Details</h2>
          


      {fetchedAppointment && 
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
  <thead className="bg-gray-100 border-b border-gray-300">
    <tr>
      <th className="text-left px-4 py-2 font-semibold text-gray-700">Field</th>
      <th className="text-left px-4 py-2 font-semibold text-gray-700">Value</th>
    </tr>
  </thead>
  <tbody>

  <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Patient UPI</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.upi}</td>
    </tr>
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Firstname</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.firstname}</td>
    </tr>
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Email</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.lastname}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Visit Purpose</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.purpose}</td>
    </tr>
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Visit Type</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.visit_type}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Visit Date</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.visit_date}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Schedule Time</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.scheduled_time}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Is Urgent</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.is_urgent ? "Urgent" : "Not Urgent"}</td>
    </tr>

  


    <tr className="col-span-2 text-left font-medium py-5">
        <th className='text-sm pl-4 py-3'>Vital Signs</th>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Weight</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.vital_weight}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Height</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.vital_height}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Blood Pressure</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.vital_blood_pressure}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Temperature</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.vital_temperature}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Pulse Rate</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.vital_pulserate}</td>
    </tr>


    <tr className="col-span-2 text-left font-medium py-5">
        <th className='text-sm pl-4 py-3'>Billing And Sponsor</th>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Sponsor</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.sponsor}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Sponsor Plan</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.sponsor_plan}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Is Billed</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.is_billed ? "Billed" : "Not Billed"}</td>
    </tr>

    {/* <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Amount</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.amount}</td>
    </tr> */}

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Consultant</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.consultant}</td>
    </tr>


    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Status</td>
      <td className="border px-4 py-2 text-gray-800">{fetchedAppointment.status}</td>
    </tr>


   

    



    




   
    

    
  </tbody>
</table>
}
        </div>






            {/* social modal */}




            <div>
    

      {isOpen && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="relative m-4 p-4 w-full md:w-2/5 min-w-[80%] max-w-[80%] md:min-w-[40%] md:max-w-[40%] rounded-lg bg-white shadow-sm"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
            Update Profile
            </div>

                
            {/* form start */}



<form onSubmit={handleSubmit}  className="max-w-md mx-auto">
  
  
  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlePhoneChange}  type="text" value={phone} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>

  {/* <input type="hidden"value={uuid} /> */}

 



  
  
  <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Update</button>
</form>





            {/* form end */}
            <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
              <button
                onClick={closeModal}
                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Cancel
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>










            {/* end of social modal */}




      </main>
    </div>
  </div>
           
        </>
    )
}

export default ViewAppointment;