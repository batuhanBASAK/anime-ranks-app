import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from "./components/AuthContextProvider.jsx";
import PopupContextProvider from './components/PopupContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <PopupContextProvider>
        <App />
      </PopupContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </StrictMode>
  ,
)
