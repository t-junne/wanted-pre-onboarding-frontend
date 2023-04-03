import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Todo } from '../../components/todo/todo'
import { CreateTodo } from '../../components/todo/createTodo'
import { getTodos } from '../../apis/todo'
import { GetTodoDto } from '../../apis/todo/dtos'

export const TodoPage = () => {
  const [needUpdate, setNeedUpdate] = useState(false)
  const [todos, setTodos] = useState<GetTodoDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isError, setIsError] = useState(false)
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      (await getTodos())
        .json()
        .then((res) => {
          setTodos((prev) => [...prev, res])
          setIsSuccess(true)
      })
    } catch(e: any) {
      setIsError(true)
      throw new Error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    needUpdate && fetchData()
  }, [needUpdate, fetchData])

  useEffect(() => {
    console.log(todos)
  })

  return (
    <Wrapper>
      <Header>
        <div>Todo List</div>
      </Header>
      <CreateTodo update={setNeedUpdate} />
      <TodoList>
        <ul>
          {isSuccess && 
            todos.map((value) => (
              <li key={value.id}>
                <Todo id={value.id} todo={value.todo} isCompleted={value.isCompleted} />
              </li>
            ))}
        </ul>
        
      </TodoList>
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
    font-size: 18px;
    font-weight: bold;
    margin: auto;
  }
`
const TodoList = styled.div`
  padding: 20px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`
