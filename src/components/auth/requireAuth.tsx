import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const RequireAuth = () => {
  const token = window.localStorage.getItem('access_token')
  const location = useLocation()

  return token ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  )
}
