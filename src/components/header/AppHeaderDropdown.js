import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser, cilEnvelopeClosed, cilBadge } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import TokenService from 'src/services/TokenService'
import { COLORS } from 'src/common/const'
import { AuthService } from 'src/services/auth.service'

const AppHeaderDropdown = ({ consumer = false }) => {
  const logOut = () => {
    AuthService.logout()
    window.location.reload(false)
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        <>
          {' '}
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            {TokenService?.getUsername()}
          </CDropdownItem>
          <CDropdownItem>
            <CIcon icon={cilEnvelopeClosed} className="me-2" />
            {TokenService?.getUser()?.user?.email}
          </CDropdownItem>
          <CDropdownDivider />
        </>

        <CDropdownItem onClick={logOut} style={{ color: COLORS.DANGER_BTN, cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Sign Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
