import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../styles/theme'

interface TextInputProps {
  id?: string
  className?: string
  type?: string
  value: string
  error?: boolean
  errMsg?: string
  placeholder?: string
  required?: boolean
  dataTestId?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const TextInput = ({
  id,
  className,
  type,
  value,
  error,
  errMsg,
  placeholder,
  dataTestId,
  required,
  onChange,
}: TextInputProps) => {
  const [focus, setFocus] = useState(false)

  return (
    <Wrapper
      className={className}
      focus={focus}
      isValue={value?.length}
      error={error}
    >
      <div className='input-field'>
        <label htmlFor={id}>{placeholder}</label>
        <input
          id={id}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type ?? 'text'}
          value={value}
          onChange={onChange}
          data-testid={dataTestId}
        />
      </div>
      {error && (
        <ErrorMsgWrapper>
          <span>{errMsg}</span>
        </ErrorMsgWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  focus: boolean
  error: boolean | undefined
  isValue: boolean | number
}>`
  position: relative;
  min-height: 46px;
  margin: 10px 0;
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 8px;
    font-size: 16px;
    color: ${({ focus, error }) =>
      error
        ? theme.colors.red
        : focus
        ? theme.colors.green50
        : theme.colors.grey50};
    background-color: white;
    transform: ${({ focus, isValue, error }) =>
      error || focus || isValue
        ? 'translate(4px, -9px) scale(0.75)'
        : 'translate(6px, 11px)'};
    transform-origin: top-left;
    transition: transform 0.25s ease;
    pointer-events: none;
  }
  input {
    width: 100%;
    font-size: 16px;
    background-color: white;
    padding: 12px 15px;
    border: 1px solid
      ${({ error }) => (error ? theme.colors.red : theme.colors.grey30)};
    border-radius: 6px;
    &:focus {
      border: 2px solid;
      border-color: ${({ error }) =>
        error ? theme.colors.red : theme.colors.green50};
    }
  }
`
const ErrorMsgWrapper = styled.div`
  padding: 0 12px 4px 12px;
  span {
    font-size: 12px;
    color: ${theme.colors.red};
    font-weight: bold;
  }
`
