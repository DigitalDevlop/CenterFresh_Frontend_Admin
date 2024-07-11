import { CCol, CImage, CRow, CSpinner } from '@coreui/react'
import React from 'react'
import { COLORS } from 'src/common/const'
import noDataAnimation from '../assets/other/no_data.json'
import Lottie from 'lottie-react'

function NoDataArt({visible, size = 100, description = "Fetching..."}) {
  return (
    visible && (
        <CRow >
            <CCol style={{textAlign: "center", padding: 20}}>
              
            <Lottie
                    loop={true}
                    autoplay={true}
                    size={10}
                    style={{height: "150px"}}
                    className="match-animation"
                    animationData={noDataAnimation}

                />
          
          <h6 className='mt-3' style={{width: "30%", textAlign: 'center', margin: '0 auto'}}>{description}</h6>
          </CCol>
        </CRow>
      )
  )
}

export default NoDataArt