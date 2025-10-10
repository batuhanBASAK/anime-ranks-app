import React, { useEffect, useState } from 'react'
import { AuthContext } from "../context/authContext"
import axios from "axios";

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState(null);

  // Initially try to get an access token
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axios.post("http://localhost:3000/auth/refresh", {}, { withCredentials: true });
        setAccessToken(res.data.accessToken);
      } catch (err) {
        console.error("Failed to get access token:", err.response?.data?.message || err.message);
      }
    }
    getAccessToken();
  }, []);


  useEffect(() => {
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user data:", err.response?.data?.message || err.message);
      }
    };

    fetchUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider