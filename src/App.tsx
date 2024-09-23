import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PageNotFound } from './pages/PageNotFound';
import { PrivateRoutes } from './utils/PrivateRoutes';
import axios from 'axios';
import AuthProvider from './context/AuthProvider';

export const BASE_URL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* PAGE NOT FOUND */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
