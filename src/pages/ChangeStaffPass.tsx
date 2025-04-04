import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { LogoutUser } from '../services/authService';

import { useAuth } from '../contexts/auth';
import NavBar from '../components/navbar';
import Header from '../components/header';

import { changePassword } from '../services/userService';

import { Bounce, toast } from 'react-toastify';

import { changeUniquePassword } from '../services/userService';


const ChangeStaffPass = ():JSX.Element => {


    const {uuid} = useParams();
const navigate = useNavigate();

const {setToken, setUser, user} = useAuth();

const [isValid, setIsValid] = useState(false);

const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const[showPassword, setShowPassword] = useState<boolean>(false);
    const[errorMessage, setErrorMessage] = useState<string>("");




    useEffect(() => {
        // Load user data from localStorage if available on initial render
      if(user){
        setEmail(user.email);

        if(user.role != "Super Admin"){
            navigate('/dashboard');
        }
      }
    }, [user]);


    function handleEmailChange(e:React.ChangeEvent<HTMLInputElement>){

        
    }

   


      function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        // Regular expressions to check password criteria
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumbers = /\d/.test(newPassword);
        const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
          newPassword
        );
        const isLengthValid = newPassword.length >= 8;
    
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


async function handleSubmit(e:React.FormEvent){
  e.preventDefault();


  try {
    
    if(uuid){
        const result =  await changeUniquePassword(uuid, password);
    }


   toast.success('User password Updated Successfully', {
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

  navigate('/staff-member');




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


async function handleLogOut(){

    
    await LogoutUser();

    setToken(null);
    setUser(null);

    navigate('/');
}


    return (
        <>
            <div className="flex flex-no-wrap">
    {/* <!-- Sidebar --> */}

        <NavBar />
    
    {/* <!-- Main Content --> */}
    <div className="w-full flex flex-col">
      {/* <!-- Header --> */}
            <Header title="Change User Password"/>
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
<div className='bg-white w-full md:w-1/3 rounded-lg min-h-[40vh] md:min-h-[40vh] m-auto py-16 md:py-8'>


<h2 className="text-center text-xl md:text-2xl font-medium font-sans">Change your password</h2>



<form onSubmit={handleSubmit} className="mt-3 px-5">



<div className="form-group py-3">
    <label className="block text-sm font-medium text-gray-700">New Password</label>
    <input
        onChange={handlePasswordChange}
        type={showPassword ? 'text' : 'password'}
        value={password}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
        placeholder="Enter your password"
    />

{isValid ? <span className='text-xs text-green-500'>Password is valid </span> : <span className='text-red-500 text-xs'>Password length must be up to 8 and content capital letter, small letter, number and special character</span>}


    <div className="toggle my-3">
    <input type="checkbox" onChange={function(){
        setShowPassword(!showPassword)
    }} checked={showPassword} className='text-[#c1393a]' /> <span className="px-4 text-sm">{showPassword ? 'Hide Password' : 'Show Password'}</span>
    
    
    </div>

  


    <br />


    {
        isValid && <div className="buttondiv text-center">
        <button className="btn w-full rounded-md bg-[#f36e25] py-2 px-3 text-white font-sans font-medium text-base">Change Password</button>
    </div>
    }

    
    
</div>
                
</form>

</div>






          
    

     



      </main>
    </div>
  </div>
           
        </>
    )
}

export default ChangeStaffPass;