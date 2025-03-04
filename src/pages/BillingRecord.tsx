import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/authService";

import { useAuth } from "../contexts/auth";
import NavBar from "../components/navbar";
import Header from "../components/header";

import { changePassword } from "../services/userService";

import { Bounce, toast } from "react-toastify";
// import { getRegisteredPatients } from "../services/patientService";
import { getAppointments } from "../services/appointment";
import { getAllBilling } from "../services/billingServices";
import { getAllTransactions } from "../services/transactionService";



const BillingRecords = (): JSX.Element => {
    const navigate = useNavigate();

    const { setToken, setUser, user } = useAuth();

    const [isValid, setIsValid] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [appointments, setAppointments] = useState<any[]>([]);
    const [billings, setBillings] = useState<any[]>([]);


    useEffect(() => {
        // Load user data from localStorage if available on initial render
        if (user) {
            setEmail(user.email);
            fetchAllBillings();
        }
    }, [user]);



    //   function handlePhoneChange(e:React.ChangeEvent<HTMLInputElement>){

    //     setPhone(e.target.value)
    // }





    //   handle nonclincial staff  fetch

    async function fetchAllBillings() {


        try {


            const result = await getAllTransactions();
            setBillings(result.transactions);

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


    // const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // const toggleDropdown = () => {
    //   setIsDropdownVisible(!isDropdownVisible);
    // };

    // State to track which dropdown is visible
    const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null);

    // Function to toggle dropdown for a specific row
    const toggleDropdown = (index: any) => {
        setVisibleDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    return (
        <>
            <div className="flex flex-no-wrap">
                {/* <!-- Sidebar --> */}

                <NavBar />

                {/* <!-- Main Content --> */}
                <div className="flex-1 bg-gray-100 min-h-screen">
                    {/* <!-- Header --> */}
                    <Header title="Transactions" />
                    {/* <!-- Content --> */}
                    <main className="p-6 bg-gray-100 flex-1">

                        <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">


                            <div className="buttondiv ">


                                <button type="button" className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <span className="pr-4"><i className=""></i></span>
                                    Back
                                </button>
                            </div>
                        </div>


                        <br />
                        <br />


                        <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
                            {/* table content here */}

                            <div className="flex flex-wrap justify-between items-center mb-4 px-5">
                               
                                <select
                                    className="w-[30%] sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 sm:mb-0"
                                >
                                    <option value="Today">Today</option>
                                    <option value="Yesterday">Yesterday</option>
                                    <option value="Current Week">Current Week</option>
                                    <option value="Current Month">Current Month</option>
                                    <option value="Current Year">Current Year</option>
                                    <option value="Custom Date">Custom Date</option>
                                </select>
                              
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
                              

                                {/* table here */}


                                <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="p-4">
                                                        <div className="flex items-center">
                                                            {/* <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label className="sr-only">checkbox</label> */}
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        UUID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        PatientUPI
                                                    </th>

                                                    <th scope="col" className="px-6 py-3">
                                                        Type
                                                    </th>

                                            

                                                    <th scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Amount
                                                    </th>

                                                    <th scope="col" className="px-6 py-3">
                                                        Payment Policy
                                                    </th>
                                                 

                                                    <th scope="col" className="px-6 py-3">
                                                        Billing Officer
                                                    </th>

                                                    <th scope="col" className="px-6 py-3">
                                                        Status
                                                    </th>

                                                    <th scope="col" className="px-6 py-3">
                                                        Sponsor | Plan
                                                    </th>

                                                    <th scope="col" className="px-6 py-3">
                                                        Month | Yeaar
                                                    </th>

                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    billings && billings.map((bill, index) => {
                                                        return (
                                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="w-4 p-4">
                                                                    <div className="flex items-center">
                                                                        {/* <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                        <label className="sr-only">checkbox</label> */}
                                                                    </div>
                                                                </td>

                                                                <td className="px-6 py-4">
                                                                    {bill.type_uuid}
                                                                </td>
                                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                    {bill.patientUPI}
                                                                </td>


                                                                <td className="px-6 py-4">
                                                                    {bill.type}
                                                                </td>

                                                                <td className="px-6 py-4">
                                                                    {bill.date}
                                                                </td>


                                                                <td className="px-6 py-4">
                                                                    {bill.totalAmount}
                                                                </td>

                                                                <td className="px-6 py-4">
                                                                    {bill.paymentMethod}
                                                                </td>

                                                                <td className="px-6 py-4">
                                                                    {bill.billingOfficer}
                                                                </td>



                                                               

                                                                {/* <td className="flex items-center px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td> */}
                                                                 <td className="px-6 py-4">
                                                                {bill.paymentStatus === "pending" && (
                                                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                                        Pending
                                                                    </span>
                                                                )}
                                                                {bill.paymentStatus === "unpaid" && (
                                                                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                                                        Unpaid
                                                                    </span>
                                                                )}
                                                                {bill.paymentStatus === "paid" && (
                                                                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                                        Paid
                                                                    </span>
                                                                )}
                                                                </td>

                                                                <td className="px-6 py-4">
                                                                    <span className="text-xs">{bill.sponsor} | {bill.sponsor_plan}</span>
                                                                </td>

                                                                <td className="px-6 py-4 text-sm">
                                                                    <span className="text-sm">{bill.month} - {bill.year}</span>
                                                                </td>





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
                                                                        className={`z-10 ${visibleDropdownIndex === index ? "block" : "hidden"
                                                                            } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                                                    >
                                                                        <ul
                                                                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                                            aria-labelledby="dropdownDefaultButton"
                                                                        >
                                                                            <li>
                                                                                <Link
                                                                                    to=''
                                                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                >
                                                                                    Generate Receipt
                                                                                </Link>
                                                                            </li>
                                                                            

                                                                          


                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }








                                            </tbody>
                                        </table>
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

export default BillingRecords;
