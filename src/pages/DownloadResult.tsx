import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import famacarelogo from '../assets/famacarelogo.png';
import { downloadResultByTestName, getUniqueResultByTestName } from "../services/resultService";
import { Bounce, toast } from "react-toastify";
import moment from "moment";

const DownloadResult = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // To redirect user after download
  const[resultHtml, setResultHtml] = useState<string>("");

 const location = useLocation();
 
     const [patient, setPatient] = useState<any>(location.state?.patient || {});
     const[sampleType, setSampleType] = useState<string>("");
      const[testType, setTestType] = useState<string>("");

      const [uuid, setUuid] = useState<string>(location.state?.uuid || "");
      const [testname, setTestName] = useState<string>(location.state?.testname || "");


 useEffect(() => {
    // Load user data from localStorage if available on initial render
 
      fetchServices();
    
  }, [uuid]);

  useEffect(() => {
    const generatePDF = async () => {
      if (!reportRef.current) return;

      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Test_Result.pdf");

      // Redirect to another page after download (e.g., home or dashboard)
      navigate(-1); // Change to your desired route
    };

    if(uuid && testname && resultHtml){
        generatePDF();
    }
    
  }, [resultHtml]);

  async function fetchServices() {
    try {
      const result = await downloadResultByTestName(uuid,testname);
      setResultHtml(result.result.results.notes);
      setSampleType(result.result.testDetails.sampleType);
      setTestType(result.result.testType);

      
    } catch (err: any) {
      //setErroMessage(err.message);

      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  

  return (
    <div ref={reportRef} style={styles.reportContainer}>
      {/* Logo and Header */}
      <div style={styles.header}>
        <img
          src={famacarelogo}
          alt="Hospital Logo"
          style={styles.logo}
        />
        <div style={styles.addressdiv}>
            <p style={styles.addtext}>108 Akowonjo Road, by Vulcanizer <br /> bus stop, Egbeda.</p>
            <p style={styles.addtext}><b>Tel: </b>09070040301 , 09070040291.</p>
        </div>
      </div>

      {/* Patient & Hospital Details */}
      <div style={styles.detailsContainer}>
        <div style={styles.detailsBox}>
          <h3 style={{fontSize:"13px"}}>Patient Details</h3>
          <p style={styles.details}><strong>Name:</strong> {patient.firstname + " " + patient.lastname}</p>
          <p style={styles.details}><strong>Age/Sex:</strong> {patient.dob + "/" + patient.gender}</p>
          <p style={styles.details}><strong>UPI:</strong> {patient.upi}</p>
          <p style={styles.details}><strong>Sponsor:</strong> {patient.sponsor}</p>
          <p style={styles.details}><strong>Plan:</strong> {patient.sponsor_plan}</p>
        </div>
        <div style={styles.detailsBox}>
          
        <p style={styles.details}><strong>Payment type:</strong> Cash</p>
          <p style={styles.details}><strong>Referred by:</strong> Dr. Eze</p>
          <p style={styles.details}><strong>Result No:</strong> </p>
          <p style={styles.details}><strong>Collection Date & time:</strong> {moment().format("YYYY-MM-DD HH:mm:ss")}</p>
        </div>
      </div>

    <br />
      <div >
            <p style={styles.details}><i>Thank you for your request, Here are the result we are reporting:</i></p>

      </div>

      <br />

      {/* Test Results */}
      <div style={styles.testResults}>
        <h3>Test Conducted</h3>
        <br />

        <p style={styles.test}><strong>Test Name:</strong> {testname}</p>
        <p style={styles.test}><strong>Sample Type:</strong> {sampleType}</p>
        <p style={styles.test}><strong>Findings:</strong> </p>
        <br />

        <div style={styles.result}  dangerouslySetInnerHTML={{ __html:  resultHtml}} />
        
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  reportContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    width: "100%",
    maxWidth: "600px",
    margin: "auto",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid #109856",
    paddingBottom: "10px",
  },
  logo: {
    width: "130px",
    height: "auto",
  },

  addtext: {
    fontSize:"11px",
    fontWeight:"normal",
  },

  details: {
    fontSize:"12px",
  },

  test: {
    fontSize:"14px",
  },

  result :{
    fontSize:"14px",
  },

  detailsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  detailsBox: {
    width: "48%",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  },
  testResults: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#e6f7ff",
    borderRadius: "5px",
  },
};

export default DownloadResult;
