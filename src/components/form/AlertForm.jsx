import { useRef, useEffect, useState } from "react";
import TagInput from "./TagInput";

const AlertForm = (props) => {
  const typeRef = useRef("");
  const descriptionRef = useRef("");
  const [tags, setTags] = useState([]);
  const [userIp, setUserIp] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getIp = () => {
    fetch("https://api.bigdatacloud.net/data/client-ip")
      .then((response) => response.json())
      .then((ip) => {
        setUserIp(ip.ipString);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getIp();
  }, []);

  const setErrorToFalse = () => {
    setTimeout(() => {
      setError(false);
      setErrorMessage("");
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeRef.current.value === "select") {
      setError(true);
      setErrorMessage("Please select a type");

      setErrorToFalse();
      return;
    } else if (descriptionRef.current.value === "") {
      setError(true);
      setErrorMessage("Please write a description");

      setErrorToFalse();
      return;
    }

    const alertMessage = {
      alert: {
        type: typeRef.current.value,
        description: descriptionRef.current.value,
        origin: userIp,
        tag_names: tags,
      },
    };

    fetch("http://localhost:3000/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
      body: JSON.stringify(alertMessage),
    })
      .then((response) => {
        const accessToken = response.headers.get("access-token");
        localStorage.setItem("access-token", accessToken);

        return response.json();
      })
      .then((data) => {
        props.fetching();
        props.hide();
      })
      .catch((err) => console.log(err));

    typeRef.current.value = "select";
    descriptionRef.current.value = "";
  };

  return (
    <>
      <div className=" py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}
              <div className="flex items-center space-x-5 mt-3">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  A
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Create an Alert</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Fill this form to create an alert
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label htmlFor="type" className="leading-loose">
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      defaultValue={"select"}
                      ref={typeRef}
                    >
                      <option value="select" disabled>
                        Select an option
                      </option>
                      <option value="Open Portal">Open Portal</option>
                      <option value="Close Portal">Close Portal</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="leading-loose">
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Write a little description"
                      ref={descriptionRef}
                    />
                  </div>
                  <TagInput setTags={setTags} tags={tags} />
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={props.hide}
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertForm;
