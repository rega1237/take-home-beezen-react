const ShowAlertForm = (props) => {
  return (
    <div className="text-center p-5">
      <button onClick={props.show} className="bg-gray-700 p-4 rounded-lg text-white font-bold">Show Form</button>
    </div>
  )
}

export default ShowAlertForm
