import React from 'react'
import { CFooter } from '@coreui/react'
import { COLORS } from 'src/common/const'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://algorixmo.com" target="_blank" rel="noopener noreferrer" style={{color: COLORS.MAIN}}>
          Algorixmo
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
