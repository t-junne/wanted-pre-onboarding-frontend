import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../../../styles/theme'

interface ContainedButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  children: ReactNode
  disabled?: boolean
  dataTestId?: string
  onClick?: () => void
}

export const ContainedButton = ({
  type,
  className,
  children,
  dataTestId,
  disabled,
  onClick,
}: ContainedButtonProps) => {
  return (
    <Wrapper className={className} disabled={disabled}>
      <button
        type={type ?? 'button'}
        data-testid={dataTestId}
        disabled={disabled}
        onClick={onClick}
      >
        <span>{children}</span>
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ disabled: boolean | undefined }>`
  ${({ disabled }) =>
    disabled
      ? css`
          background-color: ${theme.colors.grey30};
          button {
            cursor: default;
          }
        `
      : css`
          background-color: ${theme.colors.green50};
          &:hover {
            background-color: ${theme.colors.green70};
          }
          button {
            cursor: pointer;
          }
        `}
  border-radius: 6px;
  display: flex;
  flex-shrink: 0;
  button {
    width: 100%;
    padding: 12px 15px;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
`
