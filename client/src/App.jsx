import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { Workers } from './pages/Workers';
import { UserProvider } from './context/UserContext';
import { Licencias } from './pages/Licencias';
import { Home } from './pages/Home';
import { Documents } from './pages/Documents';


export const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/documents' element={<Documents />} />
              <Route path='/workers' element={<Workers />} />
              <Route path='/licencias' element={<Licencias />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>

    </AuthProvider>
  )
}
