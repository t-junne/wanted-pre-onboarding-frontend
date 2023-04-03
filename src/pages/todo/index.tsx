import { useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Todo } from '../../components/todo/todo'

export const TodoPage = () => {
  useEffect(() => {})
  return (
    <Wrapper>
      <Header>
        <div>Todo List</div>
      </Header>
      <TodoList>
        <Todo todo='투두입니다' isCompleted={true} />
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
`
