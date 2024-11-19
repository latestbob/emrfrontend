import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './AppRoute';
//import { AuthContextProvider } from './context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { AuthContextProvider } from './contexts/auth';

function App() {
  return (
    <> 
        <Router>
            <AuthContextProvider>
               <AppRoute />
               <ToastContainer />
            </AuthContextProvider>
            
        </Router>
    </>
  );
}

export default App;
