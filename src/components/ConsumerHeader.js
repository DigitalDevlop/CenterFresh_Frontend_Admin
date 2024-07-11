import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import logo from 'src/assets/images/logo.png'
import { COLORS } from 'src/common/const'

const ConsumerHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" style={{backgroundColor: COLORS.MAIN, border: 'none'}}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
 

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown consumer={true} />
        </CHeaderNav>
      </CContainer>
    
    </CHeader>
  )
}

export default ConsumerHeader
