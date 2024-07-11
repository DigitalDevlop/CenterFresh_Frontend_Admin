import { cilArrowRight, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { COLORS } from 'src/common/const'
import { PlayerService } from 'src/services/player.service'
import Swal from 'sweetalert2'

function UploadVoucherFileModal({ open, onOpen, completed }) {
  const [fileInfo, setFileInfo] = useState(null)
  const [codeList, setCodeList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleForce = (data, fileInfo, originalFile) => {
    setFileInfo(originalFile)
    setCodeList(data)
  }

  console.log(codeList)

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }

  const [dataSaved, setDataSaved] = useState(false)
  const [loadingPercentage, setLoadingPercentage] = useState(0)

  const saveResults = async () => {
    let index = 0
    setDataSaved(false)
    setLoading(true)
    let resultArray = []
    const interval = setInterval(async () => {
      if (index < codeList.length) {
        await createCode(codeList[index]?.coupon_code)
        index++
        const percentage = ((index / codeList.length) * 100).toFixed(2)
        setLoadingPercentage(percentage)
      } else {
        setDataSaved(true)
        Swal.fire('Success!', `Data Succefully Uploaded!!`, 'success')
        setLoading(false)
        setLoadingPercentage(0)
        completed(true)
        clearInterval(interval)
      }
    }, 500) // 0.5-second interval
    console.log('result', resultArray)
  }

  const createCode = async (code) => {
    const data = {
      data: {
        voucherNumber: code,
        status: true,
      },
    }
    await PlayerService.createVoucher(data)
      .then((res) => {})
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <CModal
      alignment="center"
      visible={open}
      backdrop='static'
      onClose={() => onOpen(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Upload</CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <CRow>
          <CCol>
            <CFormLabel>Please upload you CSV File</CFormLabel>
            <CSVReader
              cssClass="mt-1"
              onFileLoaded={(data, fileInfo, originalFile) =>
                handleForce(data, fileInfo, originalFile)
              }
              parserOptions={papaparseOptions}
            />
          </CCol>
          {loading && <p>Uploading {loadingPercentage}%.. Don&apos;t refresh the page.</p> }
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton disabled={loading} color="light" onClick={() => onOpen(false)}>
          Close 
        </CButton>
        <CButton disabled={loading} style={{ backgroundColor: COLORS.MAIN }} onClick={saveResults}>
          Upload
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UploadVoucherFileModal
