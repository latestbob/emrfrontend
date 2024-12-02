import React from "react";
import { useAuth } from "../contexts/auth";
import { useState } from "react";
import { LogoutUser } from "../services/authService";
import { useNavigate, Link} from "react-router-dom";

interface HeaderProps {
    title: string;
    
  }

const Header = ({title}: HeaderProps): JSX.Element => {
  const { user } = useAuth();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const {setToken, setUser} = useAuth();
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const navigate = useNavigate();

  async function handleLogOut(){

    
    await LogoutUser();

    setToken(null);
    setUser(null);

    navigate('/');
}

  return (
    <>
      {user ? (
        <header className="bg-white shadow-md py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

            <p className="font-normal text-sm">
              Current Facility:{user.office}
            </p>

            <div className="relative">
              {/* Dropdown Button */}
              <button
                id="dropdownDefaultButton"
                className="text-blue-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={toggleDropdown} // Add onClick handler
              >
                {user.firstname} {user.lastname}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
                <br />
               
              </button>
              <p className="text-xs text-center">{user.role}</p>
              

              {/* Dropdown Menu */}
              <div
                id="dropdown"
                className={`z-10 ${
                  isDropdownVisible ? "block" : "hidden"
                    } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      to='/profile'
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                     to='/change-password'
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                     Settings
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-red-600 cursor-pointer"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Header;
