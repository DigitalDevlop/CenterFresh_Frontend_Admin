import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCardImageOverlay,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CImage,
  CRow,
} from '@coreui/react'
import React from 'react'
import { COLORS } from 'src/common/const'
import logo from 'src/assets/images/logo.png'
import ConsumerHeader from 'src/components/ConsumerHeader'
import { useNavigate } from 'react-router-dom'

function ConsumerDashboard() {

    const navigate = useNavigate()
  return (
    <>
      <ConsumerHeader />
      <div
        className="min-vh-100 d-flex flex-row align-items-center"
        style={{ background: `linear-gradient(${COLORS.MAIN}, ${COLORS.MID_LIGHT})` }}
      >
        <CContainer>
          <div>Consumer Dashboard</div>
        </CContainer>
      </div>
    </>
  )
}

export default ConsumerDashboard
