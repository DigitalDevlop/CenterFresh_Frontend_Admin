import React, { useEffect, useState } from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { CCard, CCardBody, CCardHeader, CCol, CImage, CRow } from '@coreui/react'
import { CLIENT_NAME } from 'src/common/const'
import DashImage from '../../assets/images/cf-pack.png'
import LOGO from '../../assets/images/new-logo.png'
import { PlayerService } from 'src/services/player.service'

const Dashboard = () => {
  const [players, setPlayers] = useState(null)
  const [winners, setWinners] = useState(null)
  const [smslogs, setsmslogs] = useState(null)
  const [vouchers, setvouchers] = useState(null)

  useEffect(() => {
    getPlayers()
    getWinners()
    getLogs()
    getVouchers()
  }, [])

  const getPlayers = () => {
    PlayerService.getPlayers('', 1, 1000000000)
      .then((res) => {
        setPlayers(res?.meta?.pagination)
      })
      .catch((e) => console.log(e))
  }

  const getWinners = () => {
    PlayerService.getWinners('', 'all', 1, 1000000000)
      .then((res) => {
        setWinners(res.meta?.pagination)
      })
      .catch((e) => console.log(e))
  }

  const getLogs = () => {
    PlayerService.getSmsLogs('', 'all', 1, 1000000000)
      .then((res) => {
        setsmslogs(res.meta?.pagination)
      })
      .catch((e) => console.log(e))
  }

  const getVouchers = () => {
    PlayerService.getVoucherDetails('', 'all', 1, 1000000000)
      .then((res) => {
        setvouchers(res.meta?.pagination)
      })
      .catch((e) => console.log(e))
  }

  console.log(players)
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
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    Players
                  </CCardHeader>
                  <CCardBody style={{ fontSize: '50px', fontWeight: 'bold' }}>
                    {players?.total}
                    {/* <hr />
                    <CRow>
                      <CCol style={{ fontSize: '10px' }}>
                        OTP Used <br />
                        21
                      </CCol>
                    </CRow> */}
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    Winners
                  </CCardHeader>
                  <CCardBody style={{ fontSize: '50px', fontWeight: 'bold' }}>
                    {winners?.total}
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    SMS Logs
                  </CCardHeader>
                  <CCardBody style={{ fontSize: '50px', fontWeight: 'bold' }}>
                    {smslogs?.total}
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    Daraz Vouchers
                  </CCardHeader>
                  <CCardBody style={{ fontSize: '50px', fontWeight: 'bold' }}>
                    {vouchers?.total}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            {/* <CImage className='animate__animated animate__heartBeat' src={DashImage} height={300} /> */}
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
