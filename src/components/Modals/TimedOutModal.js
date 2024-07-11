import { cilArrowRight, cilSave, cilXCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from 'src/common/const'
import CorrectIconAnimation from 'src/assets/other/verified.gif'

function TimedOutModal({ open }) {
  const navigate = useNavigate()
  return (
    <CModal
      alignment="center"
      visible={open}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Action Unautharization!</CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <div
          style={{
            textAlign: 'center',
          }}
          className="mb-3"
        >
          {/* <CIcon icon={cilSave} size="3xl" /> */}
          <CIcon style={{ color: COLORS.DANGER_BTN }} icon={cilXCircle} width={80} />
        </div>
        <p style={{ textAlign: 'center', fontSize: "1.2em" }}>Timed Out</p>
      </CModalBody>
      <CModalFooter>
        {/* <CButton color="primary" onClick={() => onOpen(false)}>
          Sign Out
        </CButton> */}
       
     
      </CModalFooter>
    </CModal>
  )
}

export default TimedOutModal
