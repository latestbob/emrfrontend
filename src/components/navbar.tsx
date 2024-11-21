import React from 'react';


const NavBar = ():JSX.Element => {
    
    return (
        <>
            <div className="w-72 bg-blue-900 h-screen shadow-md relative">
                <div className="p-6 text-center">
                    <img className='w-[80%] text-center' src="https://famacare.com/img/famacare.png" alt="" />
                </div>
                <nav className="mt-6">
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                    Dashboard
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                    Users
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                    Reports
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-gray-400">
                    Settings
                    </a>
                </nav>
    </div>
        
        </>
    )
}

export default NavBar;