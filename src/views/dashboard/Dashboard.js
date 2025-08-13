import React, { useEffect, useState } from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { CCard, CCardBody, CCardHeader, CCol, CImage, CRow, CFormInput, CButton } from '@coreui/react'
import { CLIENT_NAME, COLORS } from 'src/common/const'
import DashImage from '../../assets/images/cf-pack.png'
import LOGO from '../../assets/images/new-logo.png'
import { PlayerService } from 'src/services/player.service'
import { CChart } from '@coreui/react-chartjs'
import moment from 'moment'
import Loading from 'src/components/Loading'

const dailyMaxQuota = {
  daraz: 2,
  reloadFifty: 950,
  reloadHundred: 150,
}

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
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]) // UI only
  const [totalPlayersForDate, setTotalPlayersForDate] = useState(0)

  const [winnersforDate, setWinnersforDate] = useState(null)
  const [darazWinnersForDate, setDarazWinnersForDate] = useState(null)
  const [fiftyWinnersForDate, setFiftyWinnersForDate] = useState(null)
  const [hundredWinnersForDate, setHundredWinnersForDate] = useState(null)

  // Loading states
  const [loadingPlayers, setLoadingPlayers] = useState(true)
  const [loadingWinners, setLoadingWinners] = useState(true)
  const [loadingDailyPlayers, setLoadingDailyPlayers] = useState(true)
  const [loadingDailyWinners, setLoadingDailyWinners] = useState(true)
  const [loadingChart, setLoadingChart] = useState(true)

  useEffect(() => {
    // initial load only (date not used for filtering)
    getPlayers()
    getWinners()
    getLogs()
    getVouchers()
    getConfigs()
  }, [])

  useEffect(() => {
    // Fetch data for the selected date
    if (selectedDate) {
      setLoadingDailyPlayers(true)
      setLoadingDailyWinners(true)
      getPlayersForDate()
      getWinnersForDate()
    }
  }, [selectedDate])

  const getPlayers = () => {
    setLoadingPlayers(true)
    PlayerService.getPlayers("", 1, 1)
      .then((res) => {
        console.log("players",res)
        setPlayers(res?.meta?.pagination)
        setLoadingPlayers(false)
      })
      .catch((e) => {
        console.log(e)
        setLoadingPlayers(false)
      })
  }

  const getPlayersForDate = () => {
    setLoadingDailyPlayers(true)
    PlayerService.getPlayers('', 1, 1, selectedDate)
      .then((res) => {
        setTotalPlayersForDate(res?.meta?.pagination)
        setLoadingDailyPlayers(false)
      })
      .catch((e) => {
        console.log(e)
        setLoadingDailyPlayers(false)
      })
  }

  const getWinners = () => {
    setLoadingWinners(true)
    Promise.all([
      PlayerService.getWinners('', 'all', 1, 1),
      PlayerService.getWinners('', 'daraz', 1, 1),
      PlayerService.getWinners('', 'reload-50', 1, 1),
      PlayerService.getWinners('', 'reload-100', 1, 1)
    ]).then(([allRes, darazRes, fiftyRes, hundredRes]) => {
      setWinners(allRes.meta?.pagination.total)
      setDarazWinners(darazRes.meta?.pagination.total)
      setFiftyWinners(fiftyRes.meta?.pagination.total)
      setHundredWinners(hundredRes.meta?.pagination.total)
      setLoadingWinners(false)
    }).catch((e) => {
      console.log(e)
      setLoadingWinners(false)
    })
  }

  const getWinnersForDate = () => {
    setLoadingDailyWinners(true)
    Promise.all([
      PlayerService.getWinners('', 'all', 1, 1, selectedDate),
      PlayerService.getWinners('', 'daraz', 1, 1, selectedDate),
      PlayerService.getWinners('', 'reload-50', 1, 1, selectedDate),
      PlayerService.getWinners('', 'reload-100', 1, 1, selectedDate)
    ]).then(([allRes, darazRes, fiftyRes, hundredRes]) => {
      setWinnersforDate(allRes.meta?.pagination.total)
      setDarazWinnersForDate(darazRes.meta?.pagination.total)
      setFiftyWinnersForDate(fiftyRes.meta?.pagination.total)
      setHundredWinnersForDate(hundredRes.meta?.pagination.total)
      setLoadingDailyWinners(false)
    }).catch((e) => {
      console.log(e)
      setLoadingDailyWinners(false)
    })
  }

  const getLogs = () => {
    PlayerService.getSmsLogs('', 'all', 1, 1)
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


  const [chartData, setChartData] = useState([[], []])

  useEffect(() => {
    setLoadingChart(true)
    PlayerService.getWinnerDataForChart()
      .then((res) => {
        let dateData = []
        let data = []
        res.forEach((item) => {
          dateData.push(item.Date)
          data.push(item.Winners)
        })

        setChartData([dateData, data])
        setLoadingChart(false)
      })
      .catch((e) => {
        console.log(e)
        setLoadingChart(false)
      })
  }, [])

  return (
    <>
      {/* <Counts /> */}

      <div style={{
        background: '#f8f9fa',
        minHeight: '100vh',
        padding: '20px 0'
      }}>
        <CCard className="mb-4" style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <CCardBody>
            {/* Header Section */}
            <div style={{
              textAlign: 'center',
              background: '#ffffff',
              margin: '0 0 40px 0',
              padding: '40px',
              borderBottom: '2px solid #e9ecef',
              color: '#495057'
            }}>
              <CImage src={LOGO} height={120} style={{
                marginBottom: '20px',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'
              }} />
              <h1 style={{
                margin: 0,
                fontSize: '2.5rem',
                fontWeight: '600',
                color: '#212529',
                letterSpacing: '0.5px'
              }}>
                {CLIENT_NAME.toUpperCase()} ADMIN PORTAL
              </h1>
              <p style={{
                margin: '10px 0 0 0',
                fontSize: '1.1rem',
                color: '#6c757d',
                fontWeight: '400'
              }}>
                Real-time Dashboard & Analytics
              </p>
            </div>

            {/* Overall Statistics Cards */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{
                color: '#495057',
                marginBottom: '30px',
                fontSize: '1.6rem',
                fontWeight: '500',
                textAlign: 'start'
              }}>
                Overall Statistics
              </h3>
              <CRow className="g-4">
                <CCol md={6}>
                  <CCard style={{
                    background: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderLeft: '4px solid #007bff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '230px'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}>
                    <CCardBody style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      {loadingPlayers ? (
                        <Loading loading={true} spinnerSize="2rem" desciption="Loading Players..." />
                      ) : (
                        <>
                          <div style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#007bff' }}>👥</div>
                          <h5 style={{ margin: '0 0 15px 0', fontWeight: '500', color: '#495057' }}>Total Players</h5>
                          <div style={{
                            fontSize: '2.2rem',
                            fontWeight: '600',
                            color: '#212529'
                          }}>
                            {players?.total || '0'}
                          </div>
                        </>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol md={6}>
                  <CCard style={{
                    background: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderLeft: '4px solid #28a745',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '230px'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}>
                    <CCardBody style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      {loadingWinners ? (
                        <Loading loading={true} spinnerSize="2rem" desciption="Loading Winners..." />
                      ) : (
                        <>
                          <div style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#28a745' }}>🏆</div>
                          <h5 style={{ margin: '0 0 10px 0', fontWeight: '500', color: '#495057' }}>Total Winners</h5>
                          <div style={{
                            fontSize: '1.8rem',
                            fontWeight: '600',
                            color: '#212529',
                            marginBottom: '10px'
                          }}>
                            {winners || '0'}
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            fontSize: '0.8rem',
                            color: '#6c757d'
                          }}>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#495057' }}>{fiftyWinners || '0'}</div>
                              <div style={{ fontSize: '0.7rem' }}>50 Reloads</div>
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#495057' }}>{darazWinners || '0'}</div>
                              <div style={{ fontSize: '0.7rem' }}>Daraz</div>
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#495057' }}>{hundredWinners || '0'}</div>
                              <div style={{ fontSize: '0.7rem' }}>100 Reloads</div>
                            </div>
                          </div>
                        </>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
            {/* Date Filter Section */}

            <h3 style={{
              color: '#495057',
              marginBottom: '20px',
              fontSize: '1.4rem',
              fontWeight: '500',
              textAlign: 'start'
            }}>
              Daily Statistics - {new Date(selectedDate).toLocaleDateString()}
            </h3>
            <CRow className="align-items-end justify-content-start">
              <CCol md={4} sm={6} className="mb-2">
                <label htmlFor="dateFilter" style={{
                  fontWeight: '500',
                  marginBottom: '10px',
                  display: 'block',
                  color: '#495057'
                }}>
                  Select Date
                </label>
                <CFormInput
                  id="dateFilter"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #ced4da',
                    fontSize: '1rem',
                    padding: '12px',
                    backgroundColor: '#ffffff',
                    color: '#495057'
                  }}
                />
              </CCol>
              <CCol md="auto" className="mb-2">
                <CButton
                  color="primary"
                  onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                  style={{
                    borderRadius: '6px',
                    padding: '12px 24px',
                    fontWeight: '500',
                    border: '1px solid #007bff',
                    backgroundColor: '#007bff',
                    color: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0056b3';
                    e.currentTarget.style.borderColor = '#0056b3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#007bff';
                    e.currentTarget.style.borderColor = '#007bff';
                  }}
                >
                  Reset To Today
                </CButton>
              </CCol>
            </CRow>


            {/* Daily Statistics */}
            <div className='mt-3' style={{ marginBottom: '40px' }}>

              <CRow className="g-4">
                <CCol md={4}>
                  <CCard style={{
                    background: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderLeft: '4px solid #dc3545',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '200px'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}>
                    <CCardBody style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      {loadingDailyPlayers ? (
                        <Loading loading={true} spinnerSize="2rem" desciption="Loading Daily Players..." />
                      ) : (
                        <>
                          <div style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#dc3545' }}>👥</div>
                          <h5 style={{ margin: '0 0 15px 0', fontWeight: '500', color: '#495057' }}>Daily Players</h5>
                          <div style={{
                            fontSize: '2.2rem',
                            fontWeight: '600',
                            color: '#212529'
                          }}>
                            {totalPlayersForDate?.total || '0'}
                          </div>
                        </>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol md={4}>
                  <CCard style={{
                    background: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderLeft: '4px solid #fd7e14',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '200px'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}>
                    <CCardBody style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      {loadingDailyWinners ? (
                        <Loading loading={true} spinnerSize="1.5rem" desciption="Loading Winners..." />
                      ) : (
                        <>
                          <div style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#fd7e14' }}>🏆</div>
                          <h5 style={{ margin: '0 0 10px 0', fontWeight: '500', color: '#495057' }}>Daily Winners</h5>
                          <div style={{
                            fontSize: '1.8rem',
                            fontWeight: '600',
                            color: '#212529',
                            marginBottom: '10px'
                          }}>
                            {winnersforDate || '0'}
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            fontSize: '0.8rem',
                            color: '#6c757d'
                          }}>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#495057' }}>{fiftyWinnersForDate || '0'}</div>
                              <div style={{ fontSize: '0.7rem' }}>50R</div>
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#495057' }}>{darazWinnersForDate || '0'}</div>
                              <div style={{ fontSize: '0.7rem' }}>Daraz</div>
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#495057' }}>{hundredWinnersForDate || '0'}</div>
                              <div style={{ fontSize: '0.7rem' }}>100R</div>
                            </div>
                          </div>
                        </>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol md={4}>
                  <CCard style={{
                    background: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderLeft: '4px solid #6f42c1',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '200px'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}>
                    <CCardBody style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      {loadingDailyWinners ? (
                        <Loading loading={true} spinnerSize="1.5rem" desciption="Loading Quota..." />
                      ) : (
                        <>
                          <div style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#6f42c1' }}>🎯</div>
                          <h5 style={{ margin: '0 0 10px 0', fontWeight: '500', color: '#495057' }}>Daily Quota Remaining</h5>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            fontSize: '0.8rem'
                          }}>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#212529'
                              }}>
                                {Math.max(0, Number(dailyMaxQuota.reloadFifty) - Number(fiftyWinnersForDate) || 0)}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>50 Reloads</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#212529'
                              }}>
                                {Math.max(0, Number(dailyMaxQuota.daraz) - (Number(darazWinnersForDate) || 0))}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>Daraz</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#212529'
                              }}>
                                {Math.max(0, Number(dailyMaxQuota.reloadHundred) - Number(hundredWinnersForDate) || 0)}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>100 Reloads</div>
                            </div>
                          </div>
                        </>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
            {/* Chart Section - Keep as requested */}
            <hr />
            <div style={{
    
            }}>
              <h3 style={{
                color: '#495057',
                marginBottom: '30px',
                fontSize: '1.6rem',
                fontWeight: '500',
                textAlign: 'start'
              }}>
                Winners Analytics Chart
              </h3>
              <CRow>
                <CCol md={2}></CCol>
                <CCol md={8}>
                  {loadingChart ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <Loading loading={true} spinnerSize="3rem" desciption="Loading Chart Data..." />
                    </div>
                  ) : (
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
                  )}
                </CCol>
                <CCol md={2}></CCol>
              </CRow>
            </div>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Dashboard
