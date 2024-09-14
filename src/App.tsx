import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PageNotFound } from './pages/PageNotFound';
import { PrivateRoutes } from './utils/PrivateRoutes';

function App() {

  return (
    <div className="">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )
}

export default App
