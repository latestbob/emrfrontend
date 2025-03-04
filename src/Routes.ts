import React from 'react';
import { Router } from 'react-router-dom';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Dashboard from './pages/Dashboard';
import ResetPass from './pages/Reset';
import Profile from './pages/Profile';
import ChangePass from './pages/ChangePass';
import StaffMember from './pages/StaffMember';
import AddMember from './pages/AddMember';
import ViewMore from './pages/ViewMore';
import EditStaff from './pages/EditStaff';
import ChangeStaffPass from './pages/ChangeStaffPass';
import ClinicalStaff from './pages/ClinicalStaff';
import Patient from './pages/Patients';
import RegiserPatient from './pages/RegisterPatient';
import PatientViewMore from './pages/ViewPatient';
import EditPatient from './pages/EditPatient';
import Appointment from './pages/Appointment';
import ScheduleAppointment from './pages/ScheduleAppointment';
import BillingRecords from './pages/BillingRecord';
import ViewAppointment from './pages/ViewAppointment';
import EditAppointment from './pages/EditAppointment';
import Consultation from './pages/Consultation';
import ConsultView from './pages/ConsultView';
import Sponsors from './pages/Sponsor';
import AddSponsor from './pages/AddSponsor';
import AddSponsorPage from './pages/AddSponsor';
import EditSponsorPage from './pages/EditSponsor';
import Services from './pages/Services';
import Encounters from './pages/Encounter';
import EditConsultation from './pages/EditConsultation';
import Investigations from './pages/Investigations';
import EncounterBilling from './pages/EncounterBilling';
import EncounterResults from './pages/EncounterResults';
import AddEncounterResults from './pages/AddEncounterResults';


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

{
  id:6,
  path:'/change-password',
  exact:true,
  auth:true,
  component: ChangePass,
  pageTile:`${appName} - Change Password`
},

{
  id:7,
  path:'/staff-member',
  exact:true,
  auth:true,
  component: StaffMember,
  pageTile:`${appName} - Staff Members`
},

{
  id:8,
  path:'/add-new-member',
  exact:true,
  auth:true,
  component: AddMember,
  pageTile:`${appName} - Add New Members`
},


{
  id:9,
  path:'/view-more/:uuid',
  exact:false,
  auth:true,
  component: ViewMore,
  pageTile:`${appName} - View More`
},

{
  id:10,
  path:'/edit-staff/:uuid',
  exact:false,
  auth:true,
  component: EditStaff,
  pageTile:`${appName} -Edit Staff Details`
},


{
  id:11,
  path:'/change-pass/:uuid',
  exact:false,
  auth:true,
  component: ChangeStaffPass,
  pageTile:`${appName} - Change Staff Password`
},

{
  id:12,
  path:'/clinical-staff',
  exact:true,
  auth:true,
  component: ClinicalStaff,
  pageTile:`${appName} - Clinical Staff`
},


{
  id:13,
  path:'/patients',
  exact:true,
  auth:true,
  component: Patient,
  pageTile:`${appName} - Patient Management`
},


{
  id:14,
  path:'/register-patient',
  exact:true,
  auth:true,
  component: RegiserPatient,
  pageTile:`${appName} - Register New Patient`
},

{
  id:15,
  path:'/patient/:upi',
  exact:true,
  auth:true,
  component: PatientViewMore,
  pageTile:`${appName} - Patient Details`
},

{
  id:16,
  path:'/patient/edit/:upi',
  exact:true,
  auth:true,
  component: EditPatient,
  pageTile:`${appName} - Update Patient Details`
},

{
  id:17,
  path:'/appointments',
  exact:true,
  auth:true,
  component: Appointment,
  pageTile:`${appName} - Appointments`
},


{
  id:18,
  path:'/schedule-appointments',
  exact:true,
  auth:true,
  component: ScheduleAppointment,
  pageTile:`${appName} - Schedule Appointments`
},


{
  id:18,
  path:'/billing-records',
  exact:true,
  auth:true,
  component: BillingRecords,
  pageTile:`${appName} - Billing Records`
},

{
  id:19,
  path:'/appointment/:uuid',
  exact:true,
  auth:true,
  component: ViewAppointment,
  pageTile:`${appName} - Appointment Details`
},



{
  id:20,
  path:'/appointment/edit/:uuid',
  exact:true,
  auth:true,
  component: EditAppointment,
  pageTile:`${appName} - Update Appointment Details`
},


{
  id:21,
  path:'/consultations',
  exact:true,
  auth:true,
  component: Consultation,
  pageTile:`${appName} - Consultations`
},



{
  id:22,
  path:'/consultview/:uuid',
  exact:true,
  auth:true,
  component: ConsultView,
  pageTile:`${appName} - Consultation Details`
},


{
  id:23,
  path:'/sponsors',
  exact:true,
  auth:true,
  component: Sponsors,
  pageTile:`${appName} - Sponsors`
},


{
  id:24,
  path:'/add-sponsor',
  exact:true,
  auth:true,
  component: AddSponsorPage,
  pageTile:`${appName} - Add Sponsors`
},


{
  id:25,
  path:'/sponsor/:uuid',
  exact:true,
  auth:true,
  component: EditSponsorPage,
  pageTile:`${appName} - Edit Sponsor`
},

{
  id:25,
  path:'/services',
  exact:true,
  auth:true,
  component: Services,
  pageTile:`${appName} - Services`
},


{
  id:25,
  path:'/encounters',
  exact:true,
  auth:true,
  component: Encounters,
  pageTile:`${appName} - Encounters`
},


{
  id:26,
  path:'/edit-consultation/:uuid',
  exact:true,
  auth:true,
  component: EditConsultation,
  pageTile:`${appName} - Edit Consultation`
},

// {
//   id:27,
//   path:'/investigations',
//   exact:true,
//   auth:true,
//   component: EditConsultation,
//   pageTile:`${appName} - Edit Consultation`,
//   roles: ['lab_technician']
// }
{
  id:27,
  path:'/investigations',
  exact:true,
  auth:true,
  component: Investigations,
  pageTile:`${appName} - Investigation Request`
},

{
  id:28,
  path:'/encounter/billing/:uuid',
  exact:true,
  auth:true,
  component: EncounterBilling,
  pageTile:`${appName} - Encounter Billing`
},

{
  id:28,
  path:'/encounter/:uuid/result',
  exact:true,
  auth:true,
  component: EncounterResults,
  pageTile:`${appName} - Encounter Results`
},



{
  id:29,
  path:'/result/:type/:uuid',
  exact:true,
  auth:true,
  component: AddEncounterResults,
  pageTile:`${appName} - Add Encounter Results`
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