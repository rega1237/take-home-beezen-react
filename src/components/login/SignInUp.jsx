import { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const SignInUp = (props) => {
  const [userHaveAccount, setUserHaveAccount] = useState(true)

  const trueUserHaveAccount = () => {
    setUserHaveAccount(false)
  }

  const falseUserHaveAccount = () => {
    setUserHaveAccount(true)
  }

  return(
    <>
      {userHaveAccount && <SignIn changeForm={trueUserHaveAccount} handleAuthentication={props.handleAuthentication} />}
      {!userHaveAccount && <SignUp changeForm={falseUserHaveAccount} handleAuthentication={props.handleAuthentication}/>}
    </>
  )
}

export default SignInUp
