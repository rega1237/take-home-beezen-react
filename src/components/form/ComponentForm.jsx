import { useState } from "react";
import AlertForm from "./AlertForm";
import ShowAlertForm from "./ShowAlertForm";
import Modal from "../UI/Modal";

const ComponentForm = (props) => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <>
    <section className="w-[80%] m-auto bg-orange-300 mt-7 rounded-lg">
      <ShowAlertForm show={handleShowForm} />
    </section>
      {showForm && <Modal hide={handleHideForm}>
        <AlertForm hide={handleHideForm} fetching={props.fetching} />
      </Modal>
      }
    </>
  );
};

export default ComponentForm;
