import { cilArrowRight, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React from 'react'

function DisplayMsgModal({ message, mobile, open, onOpen }) {

  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={() => onOpen(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Message - {mobile}</CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <p style={{ textAlign: 'center' }}>{message}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DisplayMsgModal
