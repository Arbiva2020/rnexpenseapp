import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  // A method to change the state:
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  // The token is the indicator regarding a successful log in or signup:
  const [authToken, setAuthToken] = useState({
    token: "",
    isAuthenticated: false,
  });
  function authenticate(token) {
    setAuthToken({
      token: token,
      isAuthenticated: !!token, // Convert to boolean
    });
  }

  function logout() {
    setAuthToken({
      token: "",
      isAuthenticated: false,
    });
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
