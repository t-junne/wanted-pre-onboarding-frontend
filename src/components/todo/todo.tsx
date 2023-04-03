import { Dispatch, SetStateAction, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'
import { deleteTodo, updateTodo } from '../../apis/todo'
import icEdit from '../../assets/icons/edit.svg'
import icDelete from '../../assets/icons/delete.svg'
import icCheck from '../../assets/icons/check.svg'
import icCheckWhite from '../../assets/icons/check-white.svg'
import icCancel from '../../assets/icons/cancel.svg'
import { Tooltip } from '../tooltip/tooltip'

interface TodoProps {
  id: string
  todo: string
  isCompleted: boolean
  update: Dispatch<SetStateAction<boolean>>
}

export const Todo = ({ id, todo, isCompleted, update }: TodoProps) => {
  const [checked, setChecked] = useState(isCompleted)
  const [editEnabled, setEditEnabled] = useState(false)
  const [content, setContent] = useState(todo)
  const [editContent, setEditContent] = useState(todo)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickDeleteTodo = async () => {
    try {
      const response = await deleteTodo(id)
      if (response.ok) {
        update(() => true)
      }
    } catch (e: any) {
      throw new Error(e)
    }
  }

  const handleClickUpdateTodo = async () => {
    try {
      const check = inputRef.current?.checked
      const response = await updateTodo({
        id,
        todo: editContent,
        isCompleted: check as boolean,
      })

      if (response.ok) {
        update(() => true)
      }
    } catch (e: any) {
      throw new Error(e)
    }
  }

  return (
    <Wrapper>
      <CheckboxLabel htmlFor={`${todo}-${id}`} checked={checked}>
        <input
          id={`${todo}-${id}`}
          type='checkbox'
          ref={inputRef}
          checked={checked}
          onChange={() => {
            setChecked(!checked)
            handleClickUpdateTodo()
          }}
        />
        <span className='checkbox'>
          <img src={icCheckWhite} alt='check' />
        </span>
        {editEnabled ? (
          <div className='todo-edit-wrapper'>
            <input
              className='todo-edit-content'
              type='text'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              data-testid='modify-input'
            />
          </div>
        ) : (
          <span className='todo-content'>{content}</span>
        )}
      </CheckboxLabel>
      <Action>
        {editEnabled ? (
          <>
            <Tooltip text='제출'>
              <button
                className='action-btn action-btn-submit'
                onClick={() => {
                  setContent(editContent)
                  handleClickUpdateTodo()
                  setEditEnabled(false)
                }}
                data-testid='submit-button'
              >
                <img src={icCheck} alt='제출' />
              </button>
            </Tooltip>
            <Tooltip text='취소'>
              <button
                className='action-btn action-btn-cancel'
                onClick={() => {
                  setEditContent(todo)
                  setEditEnabled(false)
                }}
                data-testid='cancel-button'
              >
                <img src={icCancel} alt='취소' />
              </button>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip text='수정'>
              <button
                className='action-btn action-btn-edit'
                onClick={() => setEditEnabled(true)}
                data-testid='modify-button'
              >
                <img src={icEdit} alt='수정' />
              </button>
            </Tooltip>
            <Tooltip text='삭제'>
              <button
                className='action-btn action-btn-delete'
                onClick={handleClickDeleteTodo}
                data-testid='delete-button'
              >
                <img src={icDelete} alt='삭제' />
              </button>
            </Tooltip>
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
  input[type='checkbox'] {
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
    ${({ checked }) =>
      checked
        ? css`
            background-color: ${theme.colors.green50};
          `
        : css`
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
    border-bottom: 1px solid ${theme.colors.green50};
  }
`
const Action = styled.div`
  display: flex;
  gap: 10px;
`
