import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './compononets/SignIn'
import PosSystem from './compononets/PosSystem'
import DashBoard from './compononets/DashBoard'
import { AuthProvider } from './context/AuthContext'
import SignUp from './compononets/SignUp'
import ProtectedRoute from './compononets/ProtectedRoute'

function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<SignIn />} />
          <Route path='/auth/SignUp' element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<PosSystem />} />
            <Route path='/POSDashBoard' element={< DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
