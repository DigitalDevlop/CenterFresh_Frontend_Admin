import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSwitch,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { CLIENT_NAME, COLORS, MODAL_MSGES } from 'src/common/const'
import logo from 'src/assets/images/logo.png'
import { AuthService } from 'src/services/auth.service'

import './switch.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [isAdmin, setIsAdmin] = useState(false)

  const loginUser = async () => {
    setLoading(true)
    
      AuthService.login(username, password)
        .then((res) => {
          console.log(res)
          window.location.reload(false)
        })
        .catch((err) => {
          setErrorMessage(MODAL_MSGES.LOGIN_INVALID)
          setLoading(false)
          console.log(err)
        })
   
  }

  console.log(isAdmin)

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ background: `linear-gradient(${COLORS.MAIN}, ${COLORS.MID_LIGHT})` }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{ borderRadius: '20px', boxShadow: '1px 1px 15px black' }}
              >
                <CCardBody style={{ alignSelf: 'center', textAlign: 'center' }}>
                  <div style={{ alignSelf: 'center', textAlign: 'center' }}>
                    <CImage
                      src={logo}
                      style={{ alignSelf: 'center', textAlign: 'center' }}
                      height={70}
                    />
                    <p style={{ color: COLORS.MID_LIGHT, fontWeight: 'bold' }}>
                      {CLIENT_NAME?.toLocaleUpperCase()}
                    </p>
                  </div>
                  <CForm>
                    <h1>Login</h1>

                    <p className="text-medium-emphasis">Sign In to your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => (e.key == 'Enter' ? loginUser() : null)}
                      />
                    </CInputGroup>
                    {/* <div style={{display: 'flex', justifyContent: 'center', gap: '20px', textAlign: 'center'}}>
                      <span>Admin</span>
                      <CFormSwitch id="formSwitchCheckDefault" />
                      <span>Organizer</span>
                    </div> */}

                    <span style={{ color: COLORS.DANGER_BTN, fontSize: '0.8em' }}>
                      {errorMessage}
                    </span>
                    <CRow>
                      <CCol>
                        <CButton
                          color="primary"
                          disabled={loading}
                          className="px-5 mt-4"
                          style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
                          onClick={loginUser}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard
                className="text-white bg-primary py-5"
                style={{ backgroundColor: COLORS.MAIN }}
              >
                <CImage
                  style={{ objectFit: 'cover', height: '100%' }}
                  src={LoginWallpaper}
                ></CImage>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
