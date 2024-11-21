import React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate, Link, useParams } from 'react-router-dom';

import { verifyToken, resetPassword } from '../services/authService';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';





const ResetPass = ():JSX.Element => {

    const [email, setEmail] = useState<string>("");

    const[password, setPassword] = useState<string>("");

    const [isValid, setIsValid] = useState(false);

    const[showPassword, setShowPassword] = useState<boolean>(false);
    
    const[errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();
    const {token} = useParams();



   

  useEffect(() => {
    // Check if token exists
    if (!token) {
      setErrorMessage("Token is missing.");
      return;
    }

    // Call the verifyToken function to verify the token
    const verify = async () => {
      try {
       const response = await verifyToken(token); // Verify the token
       if (response.valid) {
        const emailaddress = response.user.email; // Extract email
        setEmail(emailaddress);
      }
      else{

      }

      
      } catch (err: any) {
        

        toast.error(`${err.message || 'Invalid or expired token'}`, {
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


           navigate('/');
      }


    };

    verify(); // Call the verify function inside useEffect
  }, [token, navigate]); // 



    function handleEmailChange(e:React.ChangeEvent<HTMLInputElement>){

        setEmail(e.target.value)
    }

  

    function handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>){

        setPassword(e.target.value)

           // Regular expressions to check password criteria
           const hasUpperCase = /[A-Z]/.test(password);
           const hasLowerCase = /[a-z]/.test(password);
           const hasNumbers = /\d/.test(password);
           const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
           const isLengthValid = password.length >= 8;
       
           // Check if all criteria are met
           setIsValid(
             hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && isLengthValid
           );

        
    }

    

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        

     
        try {
          
          
         const result =  await resetPassword(email,password);

         toast.success('Password updated successfully', {
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

           navigate('/');
        } catch (err:any) {
                //setErroMessage(err.message);

               toast.error(`${err.message || 'Unable to reset password'}`, {
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
            <section className="flex flex-col justify-center px-5 md:px-0  m-0  overflow-x-hidden bg-blue-900 min-h-screen">

                <div className='bg-white w-full md:w-2/5 rounded-lg min-h-[60vh] md:min-h-[45vh] m-auto py-16 md:py-8'>

                        {errorMessage && ( <div className="p-4 mx-3 mb-4 text-sm text-red-800 rounded-lg text-center bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error!</span> {errorMessage}.
                        </div>)}
                    <h2 className="text-center text-xl md:text-2xl font-medium font-sans py-4">Reset  Password</h2>
                    <p className=" font-normal text-sm text-center text-slate-600">Kindly input your new password</p>



                    <form onSubmit={handleSubmit} className="mt-3 px-5">


                        <div className="form-group py-3">
                            <label className="block text-sm font-medium text-gray-700">Email Address </label>
                            <input
                              value={email}
                                type="email"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                                placeholder="Enter your email address"readOnly
                            />
                        </div>

                        

                        <div className="form-group py-3">
                            <label className="block text-sm font-medium text-gray-700">Secured Password</label>
                            <input
                                onChange={handlePasswordChange}
                                type={showPassword ? 'text' : 'password'}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            {isValid ? <span className='text-xs text-green-500'>Password is valid </span> : <span className='text-red-500 text-xs'>Password length must be up to 8 and content capital letter, small letter, number and special character</span>}

                            <div className="toggle my-3">
                            <input type="checkbox" onChange={function(){
                                setShowPassword(!showPassword)
                            }} checked={showPassword} className='text-[#c1393a]' /> <span className="px-4 text-sm">{showPassword ? 'Hide Password' : 'Show Password'}</span>
                            </div>
                            
                            </div>


                            

                        <div className="form-group py-3">
                

                           

                            <br />


                            {
                                isValid && <div className="buttondiv text-center">
                                <button className="btn w-full rounded-md bg-[#c1393a] py-2 px-3 text-white font-sans font-medium text-base">Reset Password</button>
                            </div>
                            }

                            <div className="text-center my-3">
                                <Link to="/" className="text-sm font-normal font-sans text-blue-600">Back to login</Link>
                            </div>
                            
                        </div>
                                        
                    </form>
                
                </div>


                


            </section>
        </>
    );
}

export default ResetPass;