import React, { PropsWithChildren } from 'react'
import styled from "styled-components"
import { Box } from "@chakra-ui/react"

interface HeaderProps {
  children: any
}

const Wrapper: React.FC<PropsWithChildren<HeaderProps>> = ({ children }) => {
	return <Container>{ children }</Container>
}

const Container = styled(Box)`
  background: linear-gradient(270deg, #000000b3 0, #444444c7 0.01%, #424242d1 105.1%);
  border: 1px solid #52525270;
  border-radius: 12px;
  padding: 15px;
  color: #fff;
  width: 100%;
  max-width: 460px;
  min-height: 200px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 360px;
  };
`

export default Wrapper