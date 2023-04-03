import { useState } from 'react'
import styled from 'styled-components'
import icEdit from '../../assets/icons/edit.svg'
import icDelete from '../../assets/icons/delete.svg'
interface TodoProps {
  todo: string
  isCompleted: boolean
}

export const Todo = ({ todo, isCompleted }: TodoProps) => {
  const [checked, setChecked] = useState(isCompleted)

  return (
    <Wrapper>
      <label className='todo' htmlFor='todo'>
        <input
          id='todo'
          type='checkbox'
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span>{todo}</span>
      </label>
      <Action>
        <button>
          <img src={icEdit} alt='수정' />
        </button>
        <button>
          <img src={icDelete} alt='삭제' />
        </button>
      </Action>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Action = styled.div``
