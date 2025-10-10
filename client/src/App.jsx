import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AnimePage from "./pages/AnimePage";
import UserProtectedRoute from './components/UserProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<UserProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/anime/:animeID" element={<AnimePage />} />
    </Routes>
  )
}

export default App