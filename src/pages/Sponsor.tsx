import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";

import { getAllSponsors, getPaginatedSponsors } from "../services/sponsorService";

const Sponsors = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToken, setUser, user } = useAuth();

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const[ sponsors, setSponsors] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
 
  useEffect(() => {
    // Load user data from localStorage if available on initial render
    if (user) {
      setEmail(user.email);
      fetchSponsors();
    }
  }, [user, currentPage]);

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

async function fetchSponsors(){
   

    try {
      
      
     const result =  await getPaginatedSponsors(currentPage);
       setSponsors(result.sponsors);
       setTotalPages(result.totalPages);
     
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


// const [isDropdownVisible, setIsDropdownVisible] = useState(false);

// const toggleDropdown = () => {
//   setIsDropdownVisible(!isDropdownVisible);
// };

  // State to track which dropdown is visible
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null);

  // Function to toggle dropdown for a specific row
  const toggleDropdown = (index:any) => {
    setVisibleDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <>
      <div className="flex flex-no-wrap">
        {/* <!-- Sidebar --> */}

        <NavBar />

        {/* <!-- Main Content --> */}
        <div className="w-full flex flex-col">
          {/* <!-- Header --> */}
          <Header title="Sponsor Management" />
          {/* <!-- Content --> */}
          <main className="p-6 bg-gray-100 flex-1">

          <div className="flex bg-cyan-900 px-10 py-5 justify-between items-center rounded">
              <input
               
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                placeholder="Search by name, email"
              />

                    <div className="buttondiv ">
                    <Link to="/add-sponsor" className="text-white bg-[#f36e25] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"><i className="fa fa-add"></i></span>
                       Add Sponsor
                        </Link>

                        {/* <button type="button" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <span className="pr-4"><i className="fa fa-upload"></i></span>
                       Import Member
                        </button> */}
                            </div>
            </div>


            <br />
            <br />

           
            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              {/* table content here */}



<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        {/* <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label className="sr-only">checkbox</label> */}
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                   Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Contact Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>

                <th scope="col" className="px-6 py-3">
                    Contact Person
                </th>

                
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

       
        { sponsors &&
         sponsors.map((sponsor, index) => {
          return (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  {/* <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="sr-only">checkbox</label> */}
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {sponsor.name}
              </th>
              <td className="px-6 py-4">{sponsor.type}</td>
              <td className="px-6 py-4">{sponsor.contact_email}</td>
              <td className="px-6 py-4">{sponsor.phone}</td>
              <td className="px-6 py-4">{sponsor.contact_person}</td>
              <td className="px-6 py-4">
                <button
                  id="dropdownDefaultButton"
                  className="text-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                  onClick={() => toggleDropdown(index)} // Pass index to toggleDropdown
                >
                  Manage
                </button>




                {/* Dropdown Menu */}
                <div
                  id="dropdown"
                  className={`z-10 ${
                    visibleDropdownIndex === index ? "block" : "hidden"
                  } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to={``}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sponsor Plans
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/sponsor/${sponsor.uuid}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Sponsor
                      </Link>
                    </li>
{/* 
                    {user.role =='Super Admin' && 
                    <li>
                      <Link
                        to={`/change-pass/${staff.uuid}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Change Password 
                      </Link>
                    </li>
                    } */}
                  </ul>
                </div>
              </td>
            </tr>
          );
        })}
          
           
           
           
        </tbody>
    </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
</div>





              {/* end of table content */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
