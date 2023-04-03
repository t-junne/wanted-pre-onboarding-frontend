import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { TextInput } from '../../components/common/input/textInput'
import { ContainedButton } from '../../components/common/button/containedButton'
import { signIn } from '../../apis/auth'
import { Spinner } from '../../components/common/spinner/spinner'
import { useValidation } from '../../hooks/useValidation'

const EMAIL_ERR_MSG = '올바른 이메일 주소가 아닙니다.'
const PW_ERR_MSG = '비밀번호는 8자 이상이어야 합니다.'
const ERR_MSG = '유효한 이메일 또는 비밀번호가 아닙니다.'

export const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [notAuthenticated, setNotAuthenticated] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/todo'
  const { validateEmail, validatePassword } = useValidation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isValidEmail && isValidPassword && email && password) {
      try {
        setIsLoading(true)
        const response = await signIn({ email, password })
        if (!response.ok) {
          setNotAuthenticated(true)
          setErrMsg(ERR_MSG)
        }

        if (response.ok) {
          setEmail('')
          setPassword('')
          setNotAuthenticated(false)
          setErrMsg('')
          const accessToken = await response
            .json()
            .then((res) => res.access_token)
          window.localStorage.setItem('access_token', accessToken)
          setIsSuccess(true)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const isValid = validateEmail(email)
    if (!isValid) {
      setIsValidEmail(false)
    } else {
      setErrMsg('')
      setIsValidEmail(true)
    }
  }, [email])

  useEffect(() => {
    const isValid = validatePassword(password)
    if (!isValid) {
      setIsError(true)
      setIsValidPassword(false)
      setErrMsg(PW_ERR_MSG)
    } else {
      setIsError(false)
      setIsValidPassword(true)
      setErrMsg('')
    }
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      navigate(from, { replace: true })
    }
  }, [isSuccess, navigate, from])

  return (
    <Wrapper className='signin'>
      <Header className='signin-header'>
        <div>로그인 페이지입니다.</div>
      </Header>
      <FormWrapper>
        <form className='signin-form' onSubmit={handleSubmit}>
          <TextInput
            type='email'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dataTestId='email-input'
            error={!isValidEmail || notAuthenticated}
            errMsg={!isValidEmail ? EMAIL_ERR_MSG : ''}
          />
          <TextInput
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dataTestId='password-input'
            error={isError || notAuthenticated}
            errMsg={errMsg}
          />
          <ContainedButton
            type='submit'
            dataTestId='signin-button'
            disabled={!email || !password}
          >
            {isLoading ? <Spinner /> : '로그인'}
          </ContainedButton>
        </form>
      </FormWrapper>
      <ToSignUp>
        아직 계정이 없으신가요?{' '}
        <button onClick={() => navigate('/signup')}>
          <span>회원가입</span>
        </button>
      </ToSignUp>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${theme.colors.grey30};
  border-radius: 6px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`
const Header = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.grey30};
  div {
    font-weight: bold;
    font-size: 18px;
    margin: auto;
  }
`
const FormWrapper = styled.div`
  .signin-form {
    padding: 20px;
  }
`
const ToSignUp = styled.div`
  padding: 10px 20px;
  text-align: center;
  span {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }
`
