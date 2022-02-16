import React from 'react'
import styled from 'styled-components'

interface PropContainer {
  className: string
  children: any
}

const Container: React.FC<PropContainer> = ({children, className}) => {
  return <Wrapper className={className}>{children}</Wrapper>
}

const Wrapper = styled.div`
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  transition: background-image 2s;
  &:hover {
    background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
  }
`

export default Container
