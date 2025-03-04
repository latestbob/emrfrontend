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

const EncounterResults = (): JSX.Element => {
  const navigate = useNavigate();
  const { uuid = "" } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  const [investigations, setInvestigations] = useState<Investigation[]>(
    location.state?.investigations || []
  );

  const [type, setType] = useState<string>(location.state?.type || "");

  const [expandedInvestigationId, setExpandedInvestigationId] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const toggleResultSection = (id: string) => {
    setExpandedInvestigationId((prev) => (prev === id ? null : id));
  };

  const handleQuillChange = (id: string, value: string) => {
    setResults((prevResults) => ({
      ...prevResults,
      [id]: value,
    }));
  };

  const saveResult = async (id: string) => {
    const result = results[id];
    if (!result) {
      alert("Please enter a result before saving.");
      return;
    }

    try {

        console.log(result + " " +  user?.email + id);
    //   const response = await fetch("/api/save-result", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       investigationId: id,
    //       userEmail: user?.email,
    //       result: result,
    //     }),
    //   });

    //   if (response.ok) {
    //     alert("Result saved successfully!");
    //     setResults((prevResults) => ({
    //       ...prevResults,
    //       [id]: "",
    //     }));
    //     setExpandedInvestigationId(null);
    //   } else {
    //     throw new Error("Failed to save result.");
    //   }
    } catch (error) {
      console.error("Error saving result:", error);
      alert("Failed to save result. Please try again.");
    }
  };

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
                    <p className="text-lg font-semibold">{type}</p>
                  </div>

                  {investigations.map((investigation) => (
                    <div
                      key={investigation._id}
                      className="flex flex-col justify-between items-start border p-3 rounded-md mb-3"
                    >
                      <div className="w-full flex justify-between items-center">
                        <p className="text-sm font-medium">{investigation.name} </p>

                       
                        {investigation.billing_status == "billed" && 
                        <button
                          type="button"
                          onClick={() => toggleResultSection(investigation._id)}
                          className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          {expandedInvestigationId === investigation._id ? "Collapse" : "Add Result"}
                        </button>

}
                      </div>

                      {expandedInvestigationId === investigation._id && (
                        <div className="w-full mt-3">
                          {/* ReactQuill for the specific investigation */}
                          <ReactQuill
                            theme="snow"
                            value={results[investigation._id] || ""}
                            onChange={(value) => handleQuillChange(investigation._id, value)}
                            modules={modules}
                            formats={formats}
                            style={{ height: "200px", overflowY: "auto" }}
                          />

                          <button
                            type="button"
                            onClick={() => saveResult(investigation._id)}
                            className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm"
                          >
                            Save Result
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EncounterResults;
