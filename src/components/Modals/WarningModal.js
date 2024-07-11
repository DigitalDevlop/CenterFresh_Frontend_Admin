import { cilArrowRight, cilSave, cilWarning } from '@coreui/icons'
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

function WarningModal({ title, description, open, onOpen, okay, buttonTitle = 'Download' }) {
  const navigate = useNavigate()
  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={() => onOpen(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <div
          style={{
            textAlign: 'center',
          }}
          className="mb-3"
        >
          {/* <CIcon icon={cilSave} size="3xl" /> */}
          <CIcon style={{ color: COLORS.MAIN }} icon={cilWarning} width={80} />
        </div>
        <p style={{ textAlign: 'center', fontSize: "1em" }}>{description}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Cancel
        </CButton>
        <CButton
            color="primary"
            style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
            onClick={() => {
              okay(true)
              onOpen(false)
            }}
          >
            {buttonTitle}
          </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default WarningModal
