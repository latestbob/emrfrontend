import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoutUser } from '../services/authService';
import { useAuth } from '../contexts/auth';
import NavBar from '../components/navbar';
import Header from '../components/header';
import ReportingCards from '../components/reportingcards';

const Dashboard = ():JSX.Element => {



const navigate = useNavigate();

const {setToken, setUser} = useAuth();




    return (
        <>
            <div className="flex flex-no-wrap">
    {/* <!-- Sidebar --> */}

        <NavBar />
    
    {/* <!-- Main Content --> */}
    <div className="w-full flex flex-col">
      {/* <!-- Header --> */}
            <Header title="Dashboard"/>
      {/* <!-- Content --> */}
      <main className="p-6 bg-gray-100 flex-1">

        {/* Reporting cards */}
       
            <ReportingCards />
        {/* Reporting Cards */}


        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-600">User John Doe updated their profile.</li>
            <li className="text-gray-600">Admin added a new report.</li>
            <li className="text-gray-600">User Jane Smith completed an order.</li>
          </ul>
        </div>
      </main>
    </div>
  </div>
           
        </>
    )
}

export default Dashboard;