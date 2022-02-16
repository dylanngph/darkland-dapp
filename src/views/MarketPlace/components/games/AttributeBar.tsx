import React from 'react'
import styled from 'styled-components'

const AttributeBar = ({point}) => {
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
  display: flex;
  background-color: #989898;
  border: 1px solid #d0d0d0;
  border-right: 0.5px;
  width: 72px;
  height: 6px;
`
const PointBar = styled.div`
  width: 12px;
  border-right: 1px solid #d0d0d0;
  background-color: #0d832e;
`
const EmptyBar = styled.div`
  width: 12px;
  border-right: 1px solid #d0d0d0;
`
export default AttributeBar
