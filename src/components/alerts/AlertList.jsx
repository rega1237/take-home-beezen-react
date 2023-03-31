import { useState } from "react";

const AlertList = (props) => {
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  const optionsShowHandler = (alert) => {
    const alertIndex = selectedAlerts.indexOf(alert);
    if (alertIndex === -1) {
      setSelectedAlerts([...selectedAlerts, alert]);
    } else {
      setSelectedAlerts([
        ...selectedAlerts.slice(0, alertIndex),
        ...selectedAlerts.slice(alertIndex + 1)
      ]);
    }
  };

  return (
    <>
      <section className=" flex flex-col lg:flex-row flex-wrap gap-4 w-[80%] m-auto bg-orange-300 mt-7 rounded-lg p-5">
        {props.alerts.map((alert) => (
          <div
            key={alert.id}
            id={alert.id}
            className="flex flex-row p-3 border-2 shadow-lg gap-3"
            onClick={() => optionsShowHandler(alert.id)}
          >
                <div className="p-6 bg-gray-700 font-bold text-white w-[100px] text-center">
                  <p>{alert.type}</p>
                </div>
                <div>
                {!selectedAlerts.includes(alert.id) && (
                  <>
                  <p>{alert.description}</p>
                  <p>{alert.origin}</p>
                  {alert.tags.map((tag) => (
                    <span key={tag} className="bg-gray-700 text-white p-1 m-1">
                      {tag}
                    </span>
                  ))}
                  <p>{alert.created_at}</p>
                  </>
                )}
                {selectedAlerts.includes(alert.id) && (
                  <>
                  <p>ahora esto</p>
                  </>
                )}
                </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default AlertList;
