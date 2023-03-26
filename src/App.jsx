import { useState, useEffect } from "react";
import "./App.css";
import AlertList from "./components/alerts/AlertList";
import ComponentForm from "./components/form/ComponentForm";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [fetching, setFetching] = useState(true);

  const changeFetching = () => {
    setFetching(true);
  };

  const getAlerts = () => {
    fetch("http://localhost:3000/alerts")
      .then((response) => response.json())
      .then((data) => {
        setAlerts(data);
        setFetching(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAlerts();
  }, [fetching]);

  return (
    <div className="App">
      <ComponentForm fetching={changeFetching} />
      <AlertList alerts={alerts} />
    </div>
  );
}

export default App;
