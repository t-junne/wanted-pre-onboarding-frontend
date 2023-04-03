import styled from 'styled-components'
import icSpinner from '../../../assets/icons/spinner.svg'

export const Spinner = () => {
  return (
    <Wrapper>
      <img src={icSpinner} alt='spinner' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 24px;
`
