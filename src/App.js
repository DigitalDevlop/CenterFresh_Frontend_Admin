import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { AuthService } from './services/auth.service'
import TokenService from './services/TokenService'
import './App.css'
import 'animate.css';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ConsumerDashboard = React.lazy(() => import('./views/pages/consumer/Dashboard'))

function App() {
  const [userLogin, setUserLogin] = useState(true)

  useEffect(() => {
    const user = TokenService.getUser()

    if (user?.jwt) {
      setUserLogin(true)
    } else {
      logOut()
      // setUserLogin(true)
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setUserLogin(false)
    // change status
  }

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}

          <Route
            exact
            path="/register"
            name="Register Page"
            element={userLogin ? <Register /> : <Login />}
          />
      
          <Route
            exact
            path="/consumer/dash"
            name="Consumer Dashboard Page"
            element={userLogin ? <ConsumerDashboard /> : <Login />}
          />
        
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Dashboard"
            element={userLogin? <DefaultLayout /> : <Login />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
