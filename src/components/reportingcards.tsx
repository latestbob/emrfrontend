import React from 'react';


const ReportingCards =():JSX.Element => {

    return (
        <>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* <!-- Card 1 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
                        <p className="mt-2 text-gray-600">1,245</p>
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
        </div>
        </>
    )
}

export default ReportingCards;