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

function UploadVoucherFileModal({ open, onOpen }) {
  const [fileInfo, setFileInfo] = useState(null)
  const [codeList, setCodeList] = useState([])

  const handleForce = (data, fileInfo, originalFile) => {
    setFileInfo(originalFile)
    setCodeList(data)
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }

  return (
    <CModal
      alignment="center"
      visible={open}
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
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Close
        </CButton>
        <CButton style={{ backgroundColor: COLORS.MAIN }} onClick={() => onOpen(false)}>
          Upload
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UploadVoucherFileModal
