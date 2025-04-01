import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LogoutUser } from '../services/authService';
import { updateProfile } from '../services/userService';
import { useAuth } from '../contexts/auth';
import NavBar from '../components/navbar';
import Header from '../components/header';
import ReportingCards from '../components/reportingcards';
import { Bounce, toast } from 'react-toastify';

const Profile = ():JSX.Element => {



const navigate = useNavigate();

const {setToken, setUser, user} = useAuth();
const[phone, setPhone] = useState<string>("");
const[uuid, setUuid] = useState<string>("");

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



    return (
        <>
            <div className="flex flex-no-wrap">
    {/* <!-- Sidebar --> */}

        <NavBar />
    
    {/* <!-- Main Content --> */}
    <div className="w-full flex flex-col">
      {/* <!-- Header --> */}
            <Header title="My Profile"/>
      {/* <!-- Content --> */}
      <main className="p-6 bg-gray-100 flex-1">

      

<br />
<br />
        <div className="w-[80%] m-auto bg-white p-6 rounded-lg shadow-md">

          <div className="text-right">
            {/* <p onClick={openModal} className="text-sm text-blue-800 font-medium cursor-pointer">Edit Profile</p> */}
          {user &&   <Link to={`/profile/${user.uuid}`} className="text-sm text-blue-800 font-medium cursor-pointer">Edit Profile</Link>}
          </div>


          <h2 className="text-lg font-semibold text-gray-800 py-5">Basic Information</h2>
          


      {user && 
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
  <thead className="bg-gray-100 border-b border-gray-300">
    <tr>
      <th className="text-left px-4 py-2 font-semibold text-gray-700">Field</th>
      <th className="text-left px-4 py-2 font-semibold text-gray-700">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Firstname</td>
      <td className="border px-4 py-2 text-gray-800">{user.firstname}</td>
    </tr>
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Lastname</td>
      <td className="border px-4 py-2 text-gray-800">{user.lastname}</td>
    </tr>
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Email Address</td>
      <td className="border px-4 py-2 text-gray-800">{user.email}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Phone Number</td>
      <td className="border px-4 py-2 text-gray-800">{user.phone}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Gender</td>
      <td className="border px-4 py-2 text-gray-800">{user.gender}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">DOB</td>
      <td className="border px-4 py-2 text-gray-800">{user.dob}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Role</td>
      <td className="border px-4 py-2 text-gray-800">{user.role}</td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-600">Department</td>
      <td className="border px-4 py-2 text-gray-800">{user.department}</td>
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

  <input type="hidden"value={uuid} />

 



  
  
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

export default Profile;