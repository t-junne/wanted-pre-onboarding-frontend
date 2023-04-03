import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { TextInput } from '../../components/common/input/textInput'
import { ContainedButton } from '../../components/common/button/containedButton'
import { signUp } from '../../apis/auth'
import { Spinner } from '../../components/common/spinner/spinner'

const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([-_.]?[0-9a-zA-Z])/i
const EMAIL_ERR_MSG = '올바른 이메일 주소가 아닙니다.'
const DUPLICATE_EMAIL = '이미 가입된 이메일 주소입니다.'
const PW_ERR_MSG = '비밀번호는 8자 이상이어야 합니다.'

export const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    if (email.length >= 1 && !emailRegEx.test(email)) {
      setIsValidEmail(false)
      setIsError(true)
      setErrMsg(EMAIL_ERR_MSG)
      return
    }
    setIsError(false)
    setErrMsg('')
    setIsValidEmail(true)
  }

  const validatePassword = (password: string) => {
    if (password.length >= 1 && password.length < 8) {
      setIsValidPassword(false)
      return
    }
    setIsValidPassword(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email && password && isValidEmail && isValidPassword) {
      try {
        setIsLoading(true)
        const response = await signUp({ email, password })
        if (!response.ok) {
          setIsError(true)
          setErrMsg(DUPLICATE_EMAIL)
        }

        if (response.ok) {
          setIsSuccess(true)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    validateEmail(email)
    validatePassword(password)
  }, [email, password])

  useEffect(() => {
    if (isSuccess) {
      navigate('/signin')
    }
  }, [isSuccess, navigate])

  return (
    <Wrapper className='signup'>
      <Header className='header-signup'>
        <div>회원가입 페이지입니다.</div>
      </Header>
      <FormWrapper>
        <form onSubmit={handleSubmit} className='form-signup'>
          <TextInput
            type='email'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dataTestId='email-input'
            error={isError}
            errMsg={errMsg}
          />
          <TextInput
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dataTestId='password-input'
            error={!isValidPassword}
            errMsg={PW_ERR_MSG}
          />
          <ContainedButton
            type='submit'
            dataTestId='signup-button'
            disabled={
              email.length === 0 ||
              password.length === 0 ||
              !isValidEmail ||
              !isValidPassword
            }
          >
            {isLoading ? <Spinner /> : '회원가입'}
          </ContainedButton>
        </form>
      </FormWrapper>
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
  position: relative;
  .form-signup {
    padding: 20px;
  }
`
