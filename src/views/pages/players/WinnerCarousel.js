import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CNav,
  CNavItem,
  CNavLink,
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

function WinnerCarousel() {
  const [loadingFull, setLoadingFull] = useState(false)
  const [players, setPlayers] = useState([])

  const [page, setPage] = useState(1)
  const pageSize = 15
  const [paginationData, setPaginationData] = useState(null)

  const [searchNumber, setSearchNumber] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  //   const [searchWeeklyWin, setSearchWeeklyWin] = useState(null)
  //   const [searchReloadWin, setSearchReloadWin] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    getPlayerList()
  }, [page, selectedTab])

  const getPlayerList = async () => {
    setLoadingFull(true)
    await PlayerService.getWinners(searchNumber, selectedTab, page, pageSize, selectedDate)
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
    await PlayerService.getWinners(searchNumber, selectedTab, 1, 9999999999999, selectedDate)
      .then((res) => {
        setLoadingFull(false)

        exportToExcel(
          res.data.map((item) => {
            return {
              mobile: item.attributes.mobile,
              category: item.attributes.category,
              weeklyWin: item.attributes.player.data.attributes.weeklyWin,
              darazWin: item.attributes.player.data.attributes.darazWin,
              reloadWin: item.attributes.player.data.attributes.reloadWin,
              loginAttempt: item.attributes.player.data.attributes.loginAttempt,
              last_update: moment(new Date(item.attributes.updatedAt)).format('DD-MM-YYYY LT'),
            }
          }),
          `Full_Winner_Report_${new Date().toLocaleString()}`,
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
          <h5>Winner Managment</h5>
        </CCardHeader>
        <LoadingFullscreen loading={loadingFull} />

        <CCardBody>
          <CNav variant="tabs" className="mb-4" style={{ cursor: 'pointer' }}>
            <CNavItem>
              <CNavLink onClick={() => setSelectedTab('all')} active={selectedTab == 'all'}>
                All
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setSelectedTab('reload-50')}
                active={selectedTab == 'reload-50'}
              >
                RELOAD-50
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setSelectedTab('reload-100')}
                active={selectedTab == 'reload-100'}
              >
                RELOAD-100
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={() => setSelectedTab('daraz')} active={selectedTab == 'daraz'}>
                DARAZ
              </CNavLink>
            </CNavItem>
          </CNav>
          <CRow>
            <CCol>
              <CFormLabel>Filter By mobile: (type & Enter)</CFormLabel>
              <CFormInput
                style={{ width: '300px' }}
                type="text"
                placeholder="947******** "
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
                      <CTableHeaderCell scope="col">Prize</CTableHeaderCell>

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
                        <CTableDataCell width={100}>
                          {player?.attributes?.category?.toUpperCase()}
                        </CTableDataCell>

                        <CTableDataCell width={100}>
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

export default WinnerCarousel
