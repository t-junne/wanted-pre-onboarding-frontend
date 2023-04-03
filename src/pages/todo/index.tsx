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
  const [isSuccess, setIsSuccess] = useState(true)
  const fetchData = useCallback(async () => {
    try {
      (await getTodos()).json().then((res) => {
        setTodos(res)
        setIsSuccess(true)
      })
    } catch (e: any) {
      throw new Error(e)
    } finally {
    }
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (needUpdate) {
      fetchData()
      setNeedUpdate(false)
    }
  }, [needUpdate, fetchData])

  return (
    <Wrapper>
      <Header>
        <div>Todo List</div>
      </Header>
      <TodoWrapper>
        <CreateTodo update={setNeedUpdate} />
        <TodoList>
          {isSuccess &&
            [...todos].reverse().map((value) => (
              <li key={value.id}>
                <Todo
                  id={value.id}
                  todo={value.todo}
                  isCompleted={value.isCompleted}
                  update={setNeedUpdate}
                />
              </li>
            ))}
        </TodoList>
      </TodoWrapper>
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
const TodoWrapper = styled.div`
  max-height: calc(100vh - 90px);
  overflow-y: auto;
`
const TodoList = styled.ul`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
