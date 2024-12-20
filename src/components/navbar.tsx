import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const NavBar = ():JSX.Element => {
    
    const location = useLocation();
    return (
        <>
            <div className="w-64 bg-cyan-900 min-h-screen shadow-md relative flex-shrink-0">
                <div className="p-6 text-center">
                    <img className='w-[80%] text-center' src="https://famacare.com/img/famacare.png" alt="" />
                </div>
                <nav className="mt-6">
                    <Link to="/dashboard" className={`block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  ${location.pathname == '/dashboard' ? 'bg-[#f36e25] text-white' : 'text-gray-400'}`}>
                   <span className='pr-3'><i className='fa fa-tachometer text-grey-400'></i></span> Dashboard
                    </Link>

                    {/* for frontdesk, admin, super admin */}
                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa fa-calendar text-grey-400'></i></span> Appointments
                    </Link>


                   
                    <Link to="/patients" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa-users text-grey-400'></i></span> Patients
                    </Link>

                    {/* for doctors */}
                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa-hospital text-grey-400'></i></span> Consultation
                    </Link>

                    {/* admin frontdesk */}
                    <Link to="/clinical-staff" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa-user-md text-grey-400'></i></span> Clinical Staff
                    </Link>

                    <Link to="/staff-member" className={`block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  ${location.pathname == '/staff-member' ? 'bg-[#f36e25] text-white' : 'text-gray-400'}`}>
                   <span className='pr-3'><i className='fa fa-users text-grey-400'></i></span> Admin Staff
                    </Link>


                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa-server text-grey-400'></i></span> Services
                    </Link>

                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa-database text-grey-400'></i></span> Inventory
                    </Link>

                    <Link to="" className="block text-[15px]  py-3 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                   <span className='pr-3'><i className='fa fa-credit-card text-grey-400'></i></span> Billing records
                    </Link>

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
        
        </>
    )
}

export default NavBar;