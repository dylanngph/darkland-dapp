import React from 'react'
import styled from 'styled-components'

const AttributeBarDetail = ({point}) => {
  const getPointContent = () => {
    const content = []
    for (let i = 0; i < point; i++) {
      content.push(<PointBar key={i} />)
    }
    for (let j = 0; j < 6 - point; j++) {
      content.push(<EmptyBar key={j} />)
    }
    return content
  }

  return <AttributeBarStyled>{getPointContent()}</AttributeBarStyled>
}
const AttributeBarStyled = styled.div`
  display: grid;
  background-color: #989898;
  border: 2px solid #d0d0d0;
  border-right: 1px;
  grid-template-columns: auto auto auto auto auto auto;
  width: 100%;
  height: 10px;
`
const PointBar = styled.div`
  border-right: 2px solid #d0d0d0;
  background-color: #0d832e;
`
const EmptyBar = styled.div`
  border-right: 2px solid #d0d0d0;
`

export default AttributeBarDetail
