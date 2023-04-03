import { Navigate, Route, Routes } from 'react-router'
import { SignUpPage } from './pages/signUp'
import { SignInPage } from './pages/signIn'
import { TodoPage } from './pages/todo'
import { RequireAuth } from './components/auth/requireAuth'

function App() {
  const token = window.localStorage.getItem('access_token')
  
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/todo' />} />
        <Route path='/signup' element={token ? <Navigate to='/todo' /> : <SignUpPage />} />
        <Route path='/signin' element={token ? <Navigate to='/todo' /> : <SignInPage />} />
        <Route element={<RequireAuth />}>
          <Route path='/todo' element={<TodoPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
