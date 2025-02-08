import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth';


const NavBar = (): JSX.Element => {

    const { user } = useAuth();

    const location = useLocation();

    const [showDrop, setShowDrop] = useState<boolean>(false);


    function toggleUtility(){

        setShowDrop(!showDrop);

    }

    return (
        <>

{
    user && 

            <div className="w-64 bg-cyan-900 min-h-screen shadow-md relative flex-shrink-0">
                <div className="p-6 text-center">
                    <img className='w-[80%] text-center' src="https://famacare.com/img/famacare.png" alt="" />
                </div>
                <nav className="mt-6">
                    <Link to="/dashboard" className={`block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  ${location.pathname == '/dashboard' ? 'bg-[#f36e25] text-white' : 'text-gray-400'}`}>
                        <span className='pr-3'><i className='fa fa-tachometer text-grey-400'></i></span> Dashboard
                    </Link>

                    {/* for frontdesk, admin, super admin */}

                    {(user.role === 'Administrator' || user.role === 'Super Admin' || user.role === 'Receptionist') && (
                        <Link to="/appointments" className={`block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  ${location.pathname == '/appointments' ? 'bg-[#f36e25] text-white' : 'text-gray-400'}`}>
                            <span className='pr-3'><i className='fa fa fa-calendar text-grey-400'></i></span> Appointments
                        </Link>
                    )}





                    <Link to="/patients" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-users text-grey-400'></i></span> Patients
                    </Link>

                    {/* for doctors */}


                    {(user.role === 'Doctor' || user.role === 'Nurse') && (
                        <Link to="/consultations" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                            <span className='pr-3'><i className='fa fa-hospital text-grey-400'></i></span> Consultation
                        </Link>
                    )}



                    {(user.role === 'Administrator' || user.role === 'Super Admin' || user.role === 'Receptionist') && (
                        <Link to="/encounters" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                            <span className='pr-3'><i className='fa fa-hospital text-grey-400'></i></span> Encounters
                        </Link>

                    )}





                    {/* admin frontdesk */}

                    {(user.role === 'Administrator' || user.role === 'Super Admin' || user.role === 'Receptionist') && (
                        <Link to="/clinical-staff" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                            <span className='pr-3'><i className='fa fa-user-md text-grey-400'></i></span> Clinical Staff
                        </Link>
                    )}

                    {(user.role === 'Administrator' || user.role === 'Super Admin') && (
                        <Link to="/staff-member" className={`block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  ${location.pathname == '/staff-member' ? 'bg-[#f36e25] text-white' : 'text-gray-400'}`}>
                            <span className='pr-3'><i className='fa fa-users text-grey-400'></i></span> Admin Staff
                        </Link>

                    )}




                    <Link to="/services" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-server text-grey-400'></i></span> Services
                    </Link>

                    {(user.role === 'Administrator' || user.role === 'Super Admin' || user.role === 'Receptionist' || user.role === 'Billing and Accounts Staff') && (
                        
                        <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-database text-grey-400'></i></span> Inventory
                    </Link>
                    

                    )}

                    


                    {(user.role === 'Administrator' || user.role === 'Super Admin' || user.role === 'Receptionist' || user.role === 'Billing and Accounts Staff') && (
                        
                        <Link to="/billing-records" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-credit-card text-grey-400'></i></span> Billing records
                    </Link>

                    )}



                    
                    {(user.role === 'Administrator' || user.role === 'Super Admin') && (
                        <div className="relative group">
                            <Link to="#" className="block text-[15px] py-3 px-4 rounded  hover:bg-gray-700 hover:text-white text-gray-400">
                                <span className='pr-3'><i className='fa fa-wrench text-grey-400'></i></span> Utilities <span onClick={toggleUtility} className={`fa ${showDrop ? 'fa-caret-down' : 'fa-caret-up'} ml-20`}></span>
                            </Link>
                            <div className={`absolute left-0 ${showDrop ? 'hidden': ''} mt-2 w-full bg-cyan-900 shadow-md`}>
                                <Link to="/sponsors" className="block text-sm py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-white font-bold">
                                    <span className='pr-3'><i className='fa fa-handshake-o text-grey-400'></i></span> Sponsors
                                </Link>
                            </div>
                        </div>
                    )}


                   
                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-bar-chart text-grey-400'></i></span> Reports
                    </Link>

                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-question-circle text-grey-400'></i></span> Get help
                    </Link>

                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                        <span className='pr-3'><i className='fa fa-cubes text-grey-400'></i></span> Request Features
                    </Link>



                </nav>
            </div>
}
        </>
    )
}

export default NavBar;