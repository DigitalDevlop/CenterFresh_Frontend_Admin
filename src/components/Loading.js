import { CCol, CRow, CSpinner } from '@coreui/react'
import React from 'react'
import { COLORS } from 'src/common/const'

function Loading({loading, spinnerSize = "3.5rem", desciption = "Fetching..."}) {
  return (
    loading && (
        <CRow >
            <CCol style={{textAlign: "center", padding: 20}}>
          <CSpinner hidden={!loading} style={{ color: COLORS.MAIN, height: spinnerSize, width: spinnerSize}} />
          <h6 className='mt-3'>{desciption}</h6>
          </CCol>
        </CRow>
      )
  )
}

export default Loading