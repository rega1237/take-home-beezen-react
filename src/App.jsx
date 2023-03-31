import { useState, useEffect, useContext } from "react";
import "./App.css";
import AlertList from "./components/alerts/AlertList";
import ComponentForm from "./components/form/ComponentForm";
import SignInUp from "./components/login/SignInUp";
import CurrentUserLogOut from "./components/login/CurrentUserLogOut";
import UserContext from "./components/store/UserContext";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const userCtx = useContext(UserContext);

  let userIsLogged = localStorage.getItem("isLogged");

  const changeFetching = () => {
    setFetching(!fetching);
  };

  const getAlerts = () => {
    fetch("http://localhost:3000/alerts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((response) => response.json()
      )
      .then((data) => {
        setAlerts(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userCtx.isLogged || userIsLogged === "true") {
      getAlerts();
    }
  }, [fetching, userCtx.isLogged]);

  return (
    <div className="App">
      {userIsLogged && <CurrentUserLogOut />}
      {!userIsLogged  && <SignInUp /> }
      {userIsLogged && <ComponentForm fetching={changeFetching} />}
      {userIsLogged && <AlertList alerts={alerts} />}
    </div>
  );
}

export default App;
