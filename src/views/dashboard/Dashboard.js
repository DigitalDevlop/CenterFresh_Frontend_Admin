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
  const [darazWinners, setDarazWinners] = useState(null)
  const [fiftyWinners, setFiftyWinners] = useState(null)
  const [hundredWinners, setHundredWinners] = useState(null)
  const [smslogs, setsmslogs] = useState(null)
  const [vouchers, setvouchers] = useState(null)
  const [avaVouchers, setAvaVouchers] = useState(null)
  const [prizeConfigs, setPrizeConfigs] = useState(null)

  useEffect(() => {
    getPlayers()
    getWinners()
    getLogs()
    getVouchers()
    getConfigs()
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
        setFiftyWinners(res.data.filter((v) => v.attributes.category == 'reload-50'))
        setHundredWinners(res.data.filter((v) => v.attributes.category == 'reload-100'))
        setDarazWinners(res.data.filter((v) => v.attributes.category == 'daraz'))
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
        setAvaVouchers(res.data.filter((v) => v.attributes.status !== false))
      })
      .catch((e) => console.log(e))
  }

  const getConfigs = () => {
    PlayerService.getPrizeConfig()
      .then((res) => {
        setPrizeConfigs(res?.data[0])
      })
      .catch((e) => console.log(e))
  }

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
              <CCol md={3}>
                <CCard>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    Total Players
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
                <CCard style={{ backgroundColor: '#E7F4EB' }}>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    Winners
                  </CCardHeader>
                  <CCardBody style={{ fontSize: '35px', fontWeight: 'bold', display: 'grid' }}>
                    {winners?.total}

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <span style={{ fontSize: '14px' }}>50 Reloads :{fiftyWinners?.length}</span>
                      <span style={{ fontSize: '14px' }}>Daraz :{darazWinners?.length}</span>

                      <span style={{ fontSize: '14px' }}>
                        100 Reloads :{hundredWinners?.length}
                      </span>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard style={{ height: '150px', backgroundColor: '#FEF7DA' }}>
                  <CCardHeader style={{ fontWeight: 'bold', backgroundColor: '#E4F3FD' }}>
                    Daily Quota
                  </CCardHeader>
                  <CCardBody style={{ fontSize: '35px', fontWeight: 'bold', display: 'grid' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <span style={{ fontSize: '20px' }}>
                        <span style={{ fontSize: '30px' }}>{prizeConfigs?.attributes?.reloadFifty}</span>
                        <br />
                        50 Reloads
                      </span>
                      <span style={{ fontSize: '20px' }}>
                        <span style={{ fontSize: '30px' }}>{prizeConfigs?.attributes?.darazVoucher}</span>
                        <br />
                        Daraz
                      </span>

                      <span style={{ fontSize: '20px' }}>
                        <span style={{ fontSize: '30px' }}>{prizeConfigs?.attributes?.reloadHundred}</span> <br />
                        100 Reloads
                      </span>
                    </div>
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
