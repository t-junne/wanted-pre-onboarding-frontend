import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'

interface TooltipProps {
  children: ReactNode
  text: string
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <Wrapper>
      <div className='tooltip'>{text}</div>
      {children}
    </Wrapper>
  )
}

const tooltip = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  80% { opacity: 1; }
  100% { opacity: 1;}
`
const Wrapper = styled.div`
  position: relative;
  &:hover > .tooltip {
    display: block;
    animation: ${tooltip} 0.8s;
  }
  .tooltip {
    min-width: 48px;
    padding: 6px 4px;
    position: absolute;
    display: none;
    top: -40px;
    left: -10px;
    color: white;
    background-color: ${theme.colors.grey90};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;

    ::after {
      content: '';
      border-top: 6px solid ${theme.colors.grey90};
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 0px solid transparent;
      position: absolute;
      top: 30px;
      left: 15px;
    }
  }
`
