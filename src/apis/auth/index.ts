import { BASE_URL } from '../baseURL'

interface AuthDto {
  email: string
  password: string
}

export const signUp = async (data: AuthDto) => {
  const response = await fetch(`${BASE_URL}auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response
}

export const signIn = async (data: AuthDto) => {
  const response = await fetch(`${BASE_URL}auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response
}
