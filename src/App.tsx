import { Navigate, Route, Routes } from 'react-router-dom'
import { SignUpPage } from './pages/signUp'
import { SignInPage } from './pages/signIn'
import { TodoPage } from './pages/todo'
import { RequireAuth } from './components/auth/requireAuth'

function App() {
  const token = window.localStorage.getItem('access_token')
  
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='todo' />} />
        <Route path='signup' element={token ? <TodoPage /> : <SignUpPage />} />
        <Route path='signin' element={token ? <TodoPage /> : <SignInPage />} />
        <Route element={<RequireAuth />}>
          <Route path='todo' element={<TodoPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
