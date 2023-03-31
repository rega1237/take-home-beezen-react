import UserContext from "./UserContext";
import { useReducer } from "react";

const url = "http://localhost:3000/auth";

const defaultUserState = {
  access_token: "",
  client: "",
  uid: "",
  isLogged: false,
  error: false,
  errorMessage: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        access_token: action.accessToken,
        client: action.client,
        uid: action.uid,
        isLogged: action.isLogged,
      };
    case "SIGN_UP":
      return {
        ...state,
        access_token: action.accessToken,
        client: action.client,
        uid: action.uid,
        isLogged: action.isLogged,
      };
    case "LOG_OUT":
      return {
        ...state,
        access_token: "",
        client: "",
        uid: "",
        isLogged: false,
      };
    case "ERROR":
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  const signInHandler = (email, password) => {
    fetch(`${url}/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(" Invalid credentials");
        } else if (response.status === 404) {
          throw new Error(" User not found");
        } else if (response.status === 500) {
          throw new Error(" Server error");
        } else if (!response.ok) {
          throw new Error(" Something went wrong");
        }

        const accessToken = response.headers.get("access-token");
        const client = response.headers.get("client");
        const uid = response.headers.get("uid");

        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        localStorage.setItem("isLogged", true);

        dispatchUserAction({
          type: "SIGN_IN",
          accessToken: accessToken,
          client: client,
          uid: uid,
          isLogged: true,
          error: false,
          errorMessage: "",
        });
      })
      .catch((error) => {
        dispatchUserAction({
          type: "ERROR",
          error: true,
          errorMessage: error.message,
        });
        console.error("Error:", error);
      });
  };

  const signUpHandler = (email, password, confirm_password) => {
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confirm_password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(" Something went wrong");
        }

        const accessToken = response.headers.get("access-token");
        const client = response.headers.get("client");
        const uid = response.headers.get("uid");

        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        localStorage.setItem("isLogged", true);

        dispatchUserAction({
          type: "SIGN_UP",
          accessToken: accessToken,
          client: client,
          uid: uid,
          isLogged: true,
        });
      })
      .catch((error) => {
        dispatchUserAction({
          type: "ERROR",
          error: true,
          errorMessage: error.message,
        });
        console.error("Error:", error);
      });
  };

  const logOutHandler = () => {
    fetch(`${url}/sign_out`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((response) => {
        localStorage.clear();

        dispatchUserAction({
          type: "LOG_OUT",
          accessToken: '',
          client: '',
          uid: '',
          isLogged: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const userContext = {
    access_token: userState.access_token,
    client: userState.client,
    uid: userState.uid,
    isLogged: userState.isLogged,
    error: userState.error,
    errorMessage: userState.errorMessage,
    signIn: signInHandler,
    signUp: signUpHandler,
    logOut: logOutHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
