import { useContext } from "react"
import UserContext from "../store/UserContext"

const CurrentUserLogOut = () => {
  const UserCtx = useContext(UserContext)

  const logOut = () => {
    UserCtx.logOut()
  }

  const currentUser = localStorage.getItem("uid")

  return (
    <div className="flex flex-col justify-center items-center gap-1 w-[80%] m-auto bg-orange-300 mt-7 rounded-lg p-3">
      <p><strong>Current User: </strong> {currentUser}</p>
      <button onClick={logOut} className="bg-gray-700 p-2 rounded-lg text-white font-bold">Log Out</button>
    </div>
  )
}

export default CurrentUserLogOut
