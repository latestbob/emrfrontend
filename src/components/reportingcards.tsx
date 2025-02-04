import React from 'react';


const ReportingCards =():JSX.Element => {

    return (
        <>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* <!-- Card 4 --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Active Patients</h2>
                    <p className="mt-2 text-gray-600">3,450</p>
                </div>
                {/* <!-- Card 5 --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Appointments Today</h2>
                    <p className="mt-2 text-gray-600">75</p>
                </div>
                {/* <!-- Card 6 --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Pending Lab Results</h2>
                    <p className="mt-2 text-gray-600">12</p>
                </div>
                    {/* <!-- Card 1 --> */}
                    {/* <!-- Card 7 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">Completed Appointments</h2>
                        <p className="mt-2 text-gray-600">1,230</p>
                    </div>
                    {/* <!-- Card 8 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">Cancelled Appointments</h2>
                        <p className="mt-2 text-gray-600">45</p>
                    </div>
                    {/* <!-- Card 9 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">New Patients</h2>
                        <p className="mt-2 text-gray-600">120</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {/* <!-- Card 10 --> */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800">Average Wait Time</h2>
                            <p className="mt-2 text-gray-600">15 mins</p>
                        </div>
                        {/* <!-- Card 11 --> */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800">Patient Satisfaction</h2>
                            <p className="mt-2 text-gray-600">92%</p>
                        </div>
                        {/* <!-- Card 12 --> */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800">Follow-up Appointments</h2>
                            <p className="mt-2 text-gray-600">30</p>
                        </div>
                        
                    </div>
                    {/* <!-- Card 2 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
                        <p className="mt-2 text-gray-600">$34,500</p>
                    </div>
                    {/* <!-- Card 3 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">New Orders</h2>
                        <p className="mt-2 text-gray-600">158</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">Total Prescriptions</h2>
                <p className="mt-2 text-gray-600">2,345</p>
            </div>
            {/* <!-- Card 14 --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">Referrals</h2>
                <p className="mt-2 text-gray-600">85</p>
            </div>
            {/* <!-- Card 15 --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">Lab Tests Conducted</h2>
                <p className="mt-2 text-gray-600">1,150</p>
            </div>
                {/* <!-- Card 4 --> */}
                {/* <!-- Card 16 --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Total Consultations</h2>
                    <p className="mt-2 text-gray-600">1,980</p>
                </div>
                {/* <!-- Card 17 --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Emergency Visits</h2>
                    <p className="mt-2 text-gray-600">45</p>
                </div>
                {/* <!-- Card 18 --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Telehealth Sessions</h2>
                    <p className="mt-2 text-gray-600">320</p>
                </div>
        </div>
        </>
    )
}

export default ReportingCards;