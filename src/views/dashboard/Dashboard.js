import React from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { CCard, CCardBody, CImage } from '@coreui/react'
import { CLIENT_NAME } from 'src/common/const'
import DashImage from '../../assets/images/cf-pack.png'
import LOGO from '../../assets/images/new-logo.png'

const Dashboard = () => {
  return (
    <>
      {/* <Counts /> */}

      <CCard className="mb-4">
        <CCardBody>
        <div className="mt-1" style={{ textAlign: 'center' }}>
            <CImage src={LOGO} height={100} />
          </div>
          
          <h2 style={{ textAlign: 'center' }}>{CLIENT_NAME.toUpperCase()} ADMIN PORTAL</h2>
          <div className="mt-5" style={{ textAlign: 'center' }}>
            <CImage className='animate__animated animate__heartBeat' src={DashImage} height={300} />
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
