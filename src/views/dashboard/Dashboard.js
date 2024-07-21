import React, { useEffect, useState } from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { CCard, CCardBody, CCardHeader, CCol, CImage, CRow } from '@coreui/react'
import { CLIENT_NAME, COLORS } from 'src/common/const'
import DashImage from '../../assets/images/cf-pack.png'
import LOGO from '../../assets/images/new-logo.png'
import { PlayerService } from 'src/services/player.service'
import { CChart } from '@coreui/react-chartjs'
import moment from 'moment'

const Dashboard = () => {
  const [players, setPlayers] = useState(null)
  const [winners, setWinners] = useState(null)
  const [winnerList, setWinnerList] = useState([])
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
    PlayerService.getWinnersForChart('').then((res) => setWinners(res.meta?.pagination.total))
    PlayerService.getWinnersForChart('daraz').then((res) => setDarazWinners(res.meta?.pagination.total))
    PlayerService.getWinnersForChart('reload-50').then((res) => setFiftyWinners(res.meta?.pagination.total))
    PlayerService.getWinnersForChart('reload-100').then((res) => setHundredWinners(res.meta?.pagination.total))
    // PlayerService.getWinners('', 'all', 1, 999999999999999999)
    //   .then((res) => {
    //     setWinners(res.meta?.pagination)
    //     setWinnerList(res.data)
    //     console.log(res.data)
    //     setFiftyWinners(res.data.filter((v) => v.attributes.category == 'reload-50'))
    //     setHundredWinners(res.data.filter((v) => v.attributes.category == 'reload-100'))
    //     setDarazWinners(res.data.filter((v) => v.attributes.category == 'daraz'))
    //   })
    //   .catch((e) => console.log(e))
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

  const getPast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      days.push(formatDate(date)) // Returns the day of the month
    }
    return days
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const month = '' + (d.getMonth() + 1)
    const day = '' + d.getDate()
    const year = d.getFullYear()

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-')
  }

  const countDates = (array) => {
    const dateCounts = {}

    array.forEach((item) => {
      const dateStr = formatDate(item.attributes.updatedAt)
      if (dateCounts[dateStr]) {
        dateCounts[dateStr]++
      } else {
        dateCounts[dateStr] = 1
      }
    })

    return dateCounts
  }

  const past7Days = getPast7Days().map((daysAgo) => {
    return daysAgo
  })

  const dateCounts = countDates(winnerList)

  const totalWinners = past7Days.map((day) => dateCounts[day] || 0)

  console.log(past7Days, totalWinners)

  const [chartData, setChartData] = useState([[], []])

  useEffect(() => {
    PlayerService.getWinnerDataForChart()
      .then((res) => {
        let dateData = []
        let data = []
        res.forEach((item) => {
          dateData.push(item.Date)
          data.push(item.Winners)
        })

        setChartData([dateData, data])
      })
      .catch((e) => console.log(e))
  }, [])

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
                    {winners}

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <span style={{ fontSize: '14px' }}>50 Reloads :{fiftyWinners}</span>
                      <span style={{ fontSize: '14px' }}>Daraz :{darazWinners}</span>

                      <span style={{ fontSize: '14px' }}>
                        100 Reloads :{hundredWinners}
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
                        <span style={{ fontSize: '30px' }}>
                          {prizeConfigs?.attributes?.reloadFifty}
                        </span>
                        <br />
                        50 Reloads
                      </span>
                      <span style={{ fontSize: '20px' }}>
                        <span style={{ fontSize: '30px' }}>
                          {prizeConfigs?.attributes?.darazVoucher}
                        </span>
                        <br />
                        Daraz
                      </span>

                      <span style={{ fontSize: '20px' }}>
                        <span style={{ fontSize: '30px' }}>
                          {prizeConfigs?.attributes?.reloadHundred}
                        </span>{' '}
                        <br />
                        100 Reloads
                      </span>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            {/* <CImage className='animate__animated animate__heartBeat' src={DashImage} height={300} /> */}
            <CRow className="mt-5">
              <CCol md={2}></CCol>
              <CCol md={8}>
                <CChart
                  type="bar"
                  data={{
                    labels: chartData[0],
                    datasets: [
                      {
                        label: 'Total Winners',
                        backgroundColor: 'green',
                        data: chartData[1],
                      },
                    ],
                  }}
                  labels="Days"
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: COLORS.MAIN,
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: COLORS.LIGHT,
                        },
                        ticks: {
                          color: COLORS.MAIN,
                        },
                      },
                      y: {
                        grid: {
                          color: 'gray',
                        },
                        ticks: {
                          color: 'gray',
                        },
                      },
                    },
                  }}
                />
              </CCol>
              <CCol md={2}></CCol>
            </CRow>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
