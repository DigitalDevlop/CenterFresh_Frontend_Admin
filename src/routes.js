import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PlayerCarousel = React.lazy(() => import('./views/pages/players/PlayerCarousel'))
const WinnerCarousel = React.lazy(() => import('./views/pages/players/WinnerCarousel'))
const SmsLogsCarousel = React.lazy(() => import('./views/pages/players/SmsLogsCarousel'))
const VoucherCarousel = React.lazy(() => import('./views/pages/players/VoucherCarousel'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/players', exact: true, name: 'Players', element: PlayerCarousel },
  { path: '/winners', exact: true, name: 'Winners', element: WinnerCarousel },
  { path: '/sms-logs', exact: true, name: 'SMS Logs', element: SmsLogsCarousel },
  { path: '/vouchers', exact: true, name: 'Vouchers', element: VoucherCarousel },

]

export default routes
