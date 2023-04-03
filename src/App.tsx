import { Route, Routes } from 'react-router-dom'
import { SignUpPage } from './pages/signUp'
import { SignInPage } from './pages/signIn'
import { TodoPage } from './pages/todo'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/todo' element={<TodoPage />} />
      </Routes>
    </div>
  )
}

export default App
