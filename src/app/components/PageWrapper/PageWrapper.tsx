import { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

export const PageWrapper: FC = ({ children }) => {
  return <Wrapper data-testid="page-wrapper">{children}</Wrapper>
}
