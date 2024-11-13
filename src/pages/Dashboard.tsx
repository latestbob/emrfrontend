import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoutUser } from '../services/authSevice';
import { useAuth } from '../contexts/auth';

const Dashboard = ():JSX.Element => {



const navigate = useNavigate();

const {setToken, setUser} = useAuth();


async function handleLogOut(){
    await LogoutUser();

    setToken(null);
    setUser(null);

    navigate('/');
}

    return (
        <>
            <h1>This is the dasboard page</h1>

            <button onClick={handleLogOut} className="bg-red-500 btn rounded py-2 px-5">Log Out</button>
        </>
    )
}

export default Dashboard;