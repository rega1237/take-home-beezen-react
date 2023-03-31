import { useContext, useRef, useState } from "react";
import UserContext from "../store/UserContext";

const SignUp = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userCtx = useContext(UserContext);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirm_passwordRef = useRef("");

  const handlerSigUp = (e) => {
    e.preventDefault();
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setError(true);
      setErrorMessage("Please fill all the fields");

      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
      return;
    } else if (passwordRef.current.value.length < 6) {
      setError(true);
      setErrorMessage("Password must be at least 6 characters");

      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
      return;
    } else if (
      passwordRef.current.value !== confirm_passwordRef.current.value
    ) {
      setError(true);
      setErrorMessage("Passwords do not match");

      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
      return;
    }

    userCtx.signUp(
      emailRef.current.value,
      passwordRef.current.value,
      confirm_passwordRef.current.value
    );
  };

  return (
    <div className="min-h-screen bg-[#5b5b5b] py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-[#f5993d] shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
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

            {userCtx.error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline">{userCtx.errorMessage}</span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-semibold mt-2">
                Create Account to see alerts
              </h1>
            </div>
            <form onSubmit={handlerSigUp} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    ref={emailRef}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password Confirmation"
                    ref={confirm_passwordRef}
                  />
                  <label
                    htmlFor="Re-enter Password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Re-enter Password
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-700"
                    onClick={props.changeForm}
                  >
                    {" "}
                    Have a account? Log In{" "}
                  </a>
                </div>
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
