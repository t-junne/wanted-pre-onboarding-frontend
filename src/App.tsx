import { Navigate, Route, Routes } from 'react-router-dom'
import { SignUpPage } from './pages/signUp'
import { SignInPage } from './pages/signIn'
import { TodoPage } from './pages/todo'
import { RequireAuth } from './components/auth/requireAuth'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/todo' />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route element={<RequireAuth />}>
          <Route path='/todo' element={<TodoPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
