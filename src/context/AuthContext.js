import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  
  const [authToken, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  
  const history = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let username = e.target.username.value; 
    let password = e.target.password.value; 
  
    let response = await fetch('https://lsfelipels.pythonanywhere.com/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'username': username, 'password': password })
    });
  
    let data = await response.json();
    if (response.status === 200){
      setAuthToken(data)
      setUser(data.user)
      localStorage.setItem('authTokens',JSON.stringify(data))
      history('/')
    }else {
      alert('Something went wrong!')
    }
  };

  let logoutUser = () => {
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    history('/login')
  }

  const contextData = {
    user:user,
    loginUser: loginUser,
    logoutUser:logoutUser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
