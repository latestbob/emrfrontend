import React, { ReactElement, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import NavBar from "../components/navbar";
import Header from "../components/header";
import { useAuth } from "../contexts/auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddResults } from "../services/resultService";
import { Bounce, toast } from "react-toastify";

interface Investigation {
  _id: string;
  name: string;
  amount: number;
  billing_status: string;
  has_result: string | null;
}

const EncounterResults = (): JSX.Element => {
  const navigate = useNavigate();
  const { uuid = "" } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const [sampleType, setSampleType] = useState<string>("blood");
  const [loading, setLoading] = useState<boolean>(false);

  const [investigations, setInvestigations] = useState<Investigation[]>(
    location.state?.investigations || []
  );

  const [type, setType] = useState<string>(location.state?.type || "");

  const [expandedInvestigationId, setExpandedInvestigationId] = useState<
    string | null
  >(null);
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

  const saveResult = async (
    id: string,
    type: string,
    name: string,
    sampleType: string
  ) => {
    const result = results[id];
    if (!result) {
      
      toast.error(`Please enter a result before saving`, {
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
      return;
    }

    try {
      setLoading(true);
      // console.log(
      //   // result + " " + user?.email + " " + id + " " + type + " " + name + userType

      //   {
      //     "testDetails": {
      //         "testName": name,
      //         "description": "",
      //         "sampleType": sampleType
      //     },
      //     "results": {
      //         "resultFile": "",
      //         "notes": result
      //     },

      //     "encounterUuid": uuid,
      //     "userType": user.role,
      //     "testType": type,

      //     "uploadedBy": user.email,

      // }
      // );

      const results = await AddResults(
        uuid,
        user.role,
        type,
        {
          testName: name,
          description: "",
          sampleType,
        },
        {
          notes: result,
        },
        user.email
      );

      toast.success("Result added successfully", {
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

      

      window.location.reload();
    } catch (err: any) {
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
    finally {
      setExpandedInvestigationId(null);
      setLoading(false);
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

  function handleSampleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSampleType(e.target.value);
  }

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
            <div className="bg-white w-full rounded-lg min-h-[100vh] md:min-h-[50vh] m-auto py-16 md:py-8">
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
                        <p className="text-sm font-medium">
                          {investigation.name}{" "}
                        </p>

                        {investigation.has_result == null &&
                          investigation.billing_status == "billed" && (
                            <button
                              type="button"
                              onClick={() =>
                                toggleResultSection(investigation._id)
                              }
                              className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-blue-600 text-sm"
                            >
                              {expandedInvestigationId === investigation._id
                                ? "Collapse"
                                : "Add Result"}
                            </button>
                          )}

                        {investigation.has_result &&
                          investigation.billing_status == "billed" && (
                            <button
                              type="button"
                              className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-cyan-800 text-sm"
                            >
                              Edit Result
                            </button>
                          )}
                      </div>

                      {expandedInvestigationId === investigation._id && (
                        <div className="w-full mt-3">
                          {/* ReactQuill for the specific investigation */}

                          <div className="w-full flex justify-between">
                            <div className="w-1/2">
                              <label className="block text-sm font-medium text-gray-700">
                                Select Sample Type{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <select
                                onChange={handleSampleTypeChange}
                                value={sampleType}
                                className="w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                              >
                                <optgroup label="Lab Investigations">
                                  <option value="blood">Blood</option>
                                  <option value="urine">Urine</option>
                                  <option value="saliva">Saliva</option>
                                  <option value="stool">Stool</option>
                                  <option value="sputum">Sputum</option>
                                  <option value="csf">
                                    Cerebrospinal Fluid (CSF)
                                  </option>
                                  <option value="synovial_fluid">
                                    Synovial Fluid
                                  </option>
                                  <option value="tissue_biopsy">
                                    Tissue/Biopsy
                                  </option>
                                  <option value="semen">Semen</option>
                                </optgroup>
                                <optgroup label="Imaging Investigations">
                                  <option value="xray">X-ray</option>
                                  <option value="ultrasound">Ultrasound</option>
                                  <option value="ct_scan">CT Scan</option>
                                  <option value="mri">MRI</option>
                                  <option value="mammogram">Mammogram</option>
                                  <option value="pet_scan">PET Scan</option>
                                  <option value="echocardiogram">
                                    Echocardiogram
                                  </option>
                                  <option value="angiography">
                                    Angiography
                                  </option>
                                </optgroup>
                              </select>
                            </div>

                            <div className="w-1/2">
                              {/* <label className="block text-sm font-medium text-gray-700">Upload File</label>
                            <input
                              type="file"
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            
                            /> */}
                            </div>
                          </div>

                          <br />
                          <br />

                          <ReactQuill
                            theme="snow"
                            value={results[investigation._id] || ""}
                            onChange={(value) =>
                              handleQuillChange(investigation._id, value)
                            }
                            modules={modules}
                            formats={formats}
                            style={{ height: "200px", overflowY: "auto" }}
                          />

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              saveResult(
                                investigation._id,
                                type,
                                investigation.name,
                                sampleType
                              )
                            }
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
