import React, { useEffect, useState } from 'react'
import { AuthContext } from "../context/authContext"
import axios from "axios";

function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({});
  const [refreshAccessToken, setRefreshAccessToken] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    if (!refreshAccessToken) {
      setLoading(() => false);
      return;
    }

    const getAccessToken = async () => {
      try {
        const res = await axios.post("http://localhost:3000/auth/refresh", {}, { withCredentials: true });
        setAccessToken(() => res.data.accessToken);
      } catch {
        setAccessToken(() => null);
      } finally {
        setRefreshAccessToken(() => false);
        setLoading(() => false);
      }
    }
    getAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    setLoading(() => true);
    // fetch user at each render
    const fetchUser = async () => {
      if (!accessToken) {
        setUser(() => { return {}; });
        setLoading(() => false);
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
      } finally {
        setLoading(() => false);
      }
    };
    fetchUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider