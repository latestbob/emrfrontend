import React from 'react';
import { Router } from 'react-router-dom';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Dashboard from './pages/Dashboard';
import ResetPass from './pages/Reset';
import Profile from './pages/Profile';


const appName:string = process.env.REACT_APP_NAME;


const routes = [
    {
        id:1,
        path:'/',
        exact:true,
        auth:false,
        component:Login,
        pageTile:`${appName} - Login to Dashboard`
    },

      {
        id:2,
        path:'/forgot',
        exact:true,
        auth:false,
        component: Forgot,
        pageTile:`${appName} - Forgot Password`
    },



      {
        id:3,
        path:'/dashboard',
        exact:true,
        auth:true,
        component: Dashboard,
        pageTile:`${appName} - Dashboard`
    },

    {
      id:4,
      path:'/reset-password/:token',
      exact:true,
      auth:false,
      component: ResetPass,
      pageTile:`${appName} - Reset Password`
  },


  {
    id:5,
    path:'/profile',
    exact:true,
    auth:true,
    component: Profile,
    pageTile:`${appName} - My Profile`
},

  

    // {
    //     id:2,
    //     path:'/login',
    //     exact:true,
    //     auth:false,
    //     component:Login,
    //     pageTile:"Login to Dashboard"
    // },

    // {
    //     id:3,
    //     path:'/dashboard',
    //     exact:true,
    //     auth:true,
    //     component: Dashboard,
    //     pageTile:"Dashboard"
    // },


    // {
    //     id:4,
    //     path:'/forgot',
    //     exact:true,
    //     auth:false,
    //     component: Forgot,
    //     pageTile:"Forgot Password"
    // },

    // {
    //     id:5,
    //     path:'/links',
    //     exact:true,
    //     auth:true,
    //     component: MyLinks,
    //     pageTile:"My Links"
    // },

    // {
    //     id:5,
    //     path:'/analytics',
    //     exact:true,
    //     auth:true,
    //     component: Analytics,
    //     pageTile:"Analytics"
    // },

    // {
    //     id:6,
    //     path:'/pluto-review',
    //     exact:true,
    //     auth:false,
    //     component: Review,
    //     pageTile:"Pluto Beauty Supplies Review"
    // },

    // {
    //     id:7,
    //     path:'/pluto-review-next',
    //     exact:true,
    //     auth:false,
    //     component: ReviewTwo,
    //     pageTile:"Pluto Beauty Supplies Review"
    // },

    // {
    //     id:8,
    //     path:'/confirmation',
    //     exact:true,
    //     auth:false,
    //     component: Confirm,
    //     pageTile:"Pluto Beauty Supplies Review"
    // },
];

export default routes;