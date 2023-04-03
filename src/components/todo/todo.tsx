import { useState } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'
import icEdit from '../../assets/icons/edit.svg'
import icDelete from '../../assets/icons/delete.svg'
import icCheck from '../../assets/icons/check.svg'
import icCheckWhite from '../../assets/icons/check-white.svg'
import icCancel from '../../assets/icons/cancel.svg'

interface TodoProps {
  id: number
  todo: string
  isCompleted: boolean
}

export const Todo = ({ id, todo, isCompleted }: TodoProps) => {
  const [checked, setChecked] = useState(isCompleted)
  const [editEnabled, setEditEnabled] = useState(false)
  const [content, setContent] = useState(todo)
  
  return (
    <Wrapper>
      <CheckboxLabel className='todo' htmlFor='todo' checked={checked}>
        <input
          id='todo'
          type='checkbox'
          onChange={() => setChecked(!checked)}
        />
        <div className='checkbox'>
            <img src={icCheckWhite} alt='check' />
        </div>
        {editEnabled ? (
          <div className='todo-edit-wrapper'>
            <input
              className='todo-edit-content'
              type='text'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        ) : (
          <span className='todo-content'>{todo}</span>
        )}
      </CheckboxLabel>
      <Action>
        {editEnabled ? (
          <>
            <button onClick={() => setEditEnabled(false)}>
              <img src={icCheck} alt='확인' />
            </button>
            <button>
              <img
                src={icCancel}
                alt='취소'
                onClick={() => setEditEnabled(false)}
              />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditEnabled(true)} data-testid="modify-button">
              <img src={icEdit} alt='수정' />
            </button>
            <button data-testid="delete-button">
              <img src={icDelete} alt='삭제' />
            </button>
          </>
        )}
      </Action>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.colors.grey30};
  border-radius: 6px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`
const CheckboxLabel = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  input[type="checkbox"] {
    display: none;
  }
  .checkbox {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
    ${({ checked }) => checked ?
    css`
      background-color: ${theme.colors.green50};
    ` :
    css`
      border: 1px solid ${theme.colors.grey40};
      background-color: white;
    `}
  }
  .todo-content {
    padding: 2px 0 2px 4px;
  }
  .todo-edit-wrapper {
    position: relative;
    min-height: 22px;
  }
  .todo-edit-content {
    padding: 2px 0 2px 4px;
    font-size: 16px;
    position: absolute;
    border-bottom: 1px solid ${theme.colors.grey40};
  }
`
const Action = styled.div`
  display: flex;
  gap: 10px;
`
