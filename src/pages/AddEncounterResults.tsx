import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import NavBar from "../components/navbar";
import Header from "../components/header";
import { useAuth } from "../contexts/auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Investigation {
  _id: string;
  name: string;
  amount: number;
  billing_status: string;
}

const AddEncounterResults = (): JSX.Element => {
  const navigate = useNavigate();
  const { uuid = "" } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  const [investigations, setInvestigations] = useState<Investigation[]>(
    location.state?.investigations || []
  );

  const [type, setType] = useState<string>(location.state?.type || "");

//   const [expandedInvestigationId, setExpandedInvestigationId] = useState<string | null>(null);
//   const [results, setResults] = useState<{ [key: string]: string }>({});

//   const toggleResultSection = (id: string) => {
//     setExpandedInvestigationId((prev) => (prev === id ? null : id));
//   };

//   const handleQuillChange = (id: string, value: string) => {
//     setResults((prevResults) => ({
//       ...prevResults,
//       [id]: value,
//     }));
//   };


  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <div className="flex flex-no-wrap">
        <NavBar />
        <div className="w-full flex flex-col">
          <Header title={`Encounter Result - ${uuid}`} />
          <main className="p-6 bg-gray-100 flex-1">
            <div className="flex bg-cyan-900 px-10 py-5 justify-end items-center rounded">
              <Link
                to="/investigations"
                className="text-white bg-[#3b5998]/90 hover:bg-[#f36e25] font-medium rounded-lg text-xs px-5 py-2.5 inline-flex items-center me-2 mb-2"
              >
                <span className="pr-4">
                  <i className="fa fa-backward"></i>
                </span>
                Back
              </Link>
            </div>
            <br />
            <br />
            <div className="bg-white w-full rounded-lg min-h-[60vh] md:min-h-[50vh] m-auto py-16 md:py-8">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    {/* <p className="text-lg font-semibold">{type}</p> */}
                  </div>

               
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddEncounterResults;
