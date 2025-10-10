import React, { useEffect, useState } from 'react'
import { AuthContext } from "../context/authContext"
import axios from "axios";

function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({});
  const [refreshAccessToken, setRefreshAccessToken] = useState(true);

  useEffect(() => {
    if (!refreshAccessToken) {
      return;
    }

    const getAccessToken = async () => {
      try {
        const res = await axios.post("http://localhost:3000/auth/refresh", {}, { withCredentials: true });
        setAccessToken(() => res.data.accessToken);
        console.log(`accessToken: ${res.data.accessToken}`);
      } catch {
        setAccessToken(() => null);
      }
      setRefreshAccessToken(() => false);
    }
    getAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    // fetch user at each render
    const fetchUser = async () => {
      if (!accessToken) {
        setUser(() => { return {}; });
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(() => res?.data?.user);
      } catch {
        setUser(() => { return {}; });
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