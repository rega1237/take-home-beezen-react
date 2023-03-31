import React from "react";



const UserContext = React.createContext({
  access_token: '',
  client: '',
  uid: '',
  isLogged: false,
  signIn: (email, password) => {},
  signUp: (email, password, confirm_password) => {},
  signOut: () => {},
  refreshData: () => {},
  changeLogged : () => {},
});

export default UserContext;
