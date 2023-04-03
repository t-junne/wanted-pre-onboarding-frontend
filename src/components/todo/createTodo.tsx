import { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { ContainedButton } from '../common/button/containedButton'
import { TextInput } from '../common/input/textInput'
import { theme } from '../../styles/theme'
import { createTodo } from '../../apis/todo'

interface CreateTodoProps {
  update: Dispatch<SetStateAction<boolean>>
}

export const CreateTodo = ({ update }: CreateTodoProps) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleClickAddTodo = async () => {
    try {
      if (content.length > 0) {
        setIsLoading(true)
        const response = await createTodo({ todo: content })

        if (response.ok) {
          setContent('')
          update(() => true)
        }
      }
    } catch (e: any) {
      throw new Error(e)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Wrapper>
      <StyledTextInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        dataTestId='new-todo-input'
      />
      <StyledContainedButton
        className='add-todo-btn'
        dataTestId='new-todo-add-button'
        onClick={handleClickAddTodo}
        disabled={!content.length}
      >
        추가
      </StyledContainedButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 82px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`
const StyledTextInput = styled(TextInput)`
  flex: 1 0 auto;
  margin: 0;
  min-height: 40px;
  div {
    input {
      padding: 10px 15px;
      border: 1px solid ${theme.colors.grey40};
      &:focus {
        border: 2px solid ${theme.colors.green50};
      }
    }
  }
`
const StyledContainedButton = styled(ContainedButton)`
  max-height: 40px;
  button {
    padding: 8px 16px;
    font-size: 17px;
    font-weight: normal;
  }
`
