import { BASE_URL } from '../baseURL'
import { CreateTodoDto } from './dtos'

export const createTodo = async (data: CreateTodoDto) => {
  const token = window.localStorage.getItem('access_token')
  try {
    const response = await fetch(`${BASE_URL}todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response
  } catch (e: any) {
    throw new Error(e)
  }
}

export const getTodos = async () => {
  const token = window.localStorage.getItem('access_token')
  const data = await fetch(`${BASE_URL}todos`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const deleteTodo = async (id: string) => {
  const token = window.localStorage.getItem('access_token')
  const response = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}
