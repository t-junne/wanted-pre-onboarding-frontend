import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { TextInput } from '../../components/common/input/textInput'
import { ContainedButton } from '../../components/common/button/containedButton'
import { signIn } from '../../apis/auth'
import { Spinner } from '../../components/common/spinner/spinner'

const ERR_MSG = '유효한 이메일 또는 비밀번호가 아닙니다.'

export const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/todo'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email && password) {
      try {
        setIsLoading(true)
        const response = await signIn({ email, password })
        if (!response.ok) {
          setIsError(true)
          setErrMsg(ERR_MSG)
        }

        if (response.ok) {
          setEmail('')
          setPassword('')
          setIsError(false)
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
            error={isError}
          />
          <TextInput
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dataTestId='password-input'
            error={isError}
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
