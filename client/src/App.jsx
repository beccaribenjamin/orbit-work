import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { Workers } from './pages/Workers';
import { UserProvider } from './context/UserContext';
import { Licencias } from './pages/Licencias';



export const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<h1>Hola mundo </h1>} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/workers' element={<Workers />} />
              <Route path='/licencias' element={<Licencias />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>

    </AuthProvider>
  )
}
