import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import { MODAL_MSGES } from 'src/common/const'
import LoadingFullscreen from 'src/components/LoadingFullscreen'
import NoDataArt from 'src/components/NoDataArt'
import { PlayerService } from 'src/services/player.service'

function PlayerCarousel() {
  const [loadingFull, setLoadingFull] = useState(false)
  const [players, setPlayers] = useState([])

  const [page, setPage] = useState(1)
  const pageSize = 15
  const [paginationData, setPaginationData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [searchNumber, setSearchNumber] = useState('')
  //   const [searchWeeklyWin, setSearchWeeklyWin] = useState(null)
  //   const [searchReloadWin, setSearchReloadWin] = useState(null)

  useEffect(() => {
    getPlayerList()
  }, [page])

  const getPlayerList = async () => {
    setLoadingFull(true)
    await PlayerService.getPlayers(searchNumber, page, pageSize, selectedDate)
      .then((res) => {
        setPlayers(res.data)
        setPaginationData(res.meta.pagination)
        setLoadingFull(false)
      })
      .catch((e) => {
        console.log(e)
        setLoadingFull(false)
      })
  }

  const exportData = async () => {
    setLoadingFull(true)
    await PlayerService.getPlayers(searchNumber, 1, 9999999999999, selectedDate)
      .then((res) => {
        setLoadingFull(false)

        exportToExcel(
          res.data.map((item) => {
            return {
              mobile: item.attributes.mobile,
              activeOTP: item.attributes.activeOTP ? 'Yes' : 'No',
              weeklyWin: item.attributes.weeklyWin,
              darazWin: item.attributes.darazWin,
              reloadWin: item.attributes.reloadWin,
              loginAttempt: item.attributes.loginAttempt,
              otp: item.attributes.otp,
              last_update: moment(new Date(item.attributes.updatedAt)).format('DD-MM-YYYY LT'),
            }
          }),
          `Full_Player_Report_${new Date().toLocaleString()}`,
        )
      })
      .catch((e) => {
        console.log(e)
        setLoadingFull(false)
      })
  }

  useEffect(() => {
    setPage(1)
    getPlayerList()
  }, [selectedDate])

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Player Managment</h5>
          {/* <CButton
          onClick={() => navigate('/campaign/add/0')}
          style={{ backgroundColor: COLORS.SECONDARY, border: '0px' }}
        >
          CREATE NEW
        </CButton> */}
        </CCardHeader>
        <LoadingFullscreen loading={loadingFull} />

        <CCardBody>
          <CRow>
            <CCol>
              <CFormLabel>Filter By mobile: </CFormLabel>
              <CFormInput
                style={{ width: '300px' }}
                type="text"
                placeholder="947********"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    setPage(1)
                    getPlayerList()
                  }
                }}
              />
            </CCol>
            <CCol>
              <CFormLabel>Filter By Date: </CFormLabel>
              <CFormInput
                style={{ width: '300px' }}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </CCol>

            <CCol md={2} style={{ textAlign: 'center' }}>
              <CButton
                className="mt-3"
                size="sm"
                color="success"
                style={{ color: 'white' }}
                onClick={exportData}
              >
                Export Data
              </CButton>
            </CCol>
            {/* <CCol>
              <CFormLabel>Weekly Win</CFormLabel>
              <CFormInput
                style={{ width: '100px' }}
                type="number"
                placeholder="Type"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    getPlayerList()
                  }
                }}
              />
            </CCol>
            <CCol>
              <CFormLabel>Reload Wins</CFormLabel>
              <CFormInput
                style={{ width: '100px' }}
                type="number"
                placeholder="Type"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    getPlayerList()
                  }
                }}
              />
            </CCol>
            <CCol>
              <CFormLabel>Daraz Wins</CFormLabel>
              <CFormInput
                style={{ width: '100px' }}
                type="number"
                placeholder="Type"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    getPlayerList()
                  }
                }}
              />
            </CCol>
            <CCol>
              <CFormLabel></CFormLabel>
              <br />
              <CButton className='mt-3' size='sm' onClick={getPlayerList}>Filter Now</CButton>
            </CCol> */}
          </CRow>
          <CRow className="mt-4">
            <CCol>
              {players.length == 0 ? (
                <NoDataArt visible={true} description={MODAL_MSGES.NO_DATA_FOUND} size={10} />
              ) : (
                <CTable hover responsive small>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                      <CTableHeaderCell scope="col">OTP</CTableHeaderCell>
                      <CTableHeaderCell scope="col">OTP Used?</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Weekly Wins</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Reload Wins</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Daraz Wins</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Login Attempts</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Last Update</CTableHeaderCell>
                      {/* <CTableHeaderCell scope="col" style={{ textAlign: 'end', paddingRight: 25 }}>
                      Action
                    </CTableHeaderCell> */}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {players?.map((player, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell width={50}>{index + 1}</CTableDataCell>
                        <CTableDataCell width={250}>{player?.attributes?.mobile}</CTableDataCell>
                        <CTableDataCell width={100}>{player?.attributes?.otp}</CTableDataCell>
                        <CTableDataCell width={100}>
                          {player?.attributes?.activeOTP ? 'No' : 'Yes'}
                        </CTableDataCell>
                        <CTableDataCell width={100}>
                          {player?.attributes?.weeklyWin || 0}
                        </CTableDataCell>
                        <CTableDataCell width={100}>
                          {player?.attributes?.reloadWin || 0}
                        </CTableDataCell>
                        <CTableDataCell width={100}>
                          {player?.attributes?.darazWin || 0}
                        </CTableDataCell>
                        <CTableDataCell width={100}>
                          {player?.attributes?.loginAttempt || 0}
                        </CTableDataCell>
                        <CTableDataCell width={250}>
                          {' '}
                          {moment(new Date(player?.attributes.updatedAt)).format('DD-MM-YYYY LT')}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <p style={{ textAlign: 'end' }}>
              Total Records: {paginationData?.total} | Page: {page} of {paginationData?.pageCount}{' '}
            </p>
            <CPagination align="end" aria-label="Page navigation example">
              <CPaginationItem
                disabled={page == 1}
                onClick={() => setPage(page - 1)}
                style={{ cursor: 'pointer' }}
              >
                Previous
              </CPaginationItem>
              <CPaginationItem
                disabled={page == paginationData?.pageCount}
                onClick={() => setPage(page + 1)}
                style={{ cursor: 'pointer' }}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PlayerCarousel
