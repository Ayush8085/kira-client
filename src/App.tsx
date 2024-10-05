import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PageNotFound } from './pages/PageNotFound';
import { PrivateRoutes } from './utils/PrivateRoutes';
import axios from 'axios';
import AuthProvider from './context/AuthProvider';
import { Project } from './pages/Project';
import { Navbar } from './components/common/Navbar';
import { selectIsLoggedIn } from './features/auth/authSlice';
import { useSelector } from 'react-redux';
import { DragProvider } from './context/DragProvider';
import { Users } from './pages/Users';

export const BASE_URL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  const auth = useSelector(selectIsLoggedIn);

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider>
          <DragProvider>
            {auth && <Navbar />}
            <Routes>
              {/* PRIVATE ROUTES */}
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:projectId" element={<Project />} />
                <Route path="/users" element={<Users />} />
              </Route>

              {/* PUBLIC ROUTES */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* PAGE NOT FOUND */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </DragProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
