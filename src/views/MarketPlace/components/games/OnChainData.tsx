import React from 'react'
import {Text} from '@pancakeswap/uikit'
import styled from 'styled-components'

const OnChainData = ({id}) => {
  return (
    <div>
      <Text marginBottom="20px" color="#3C3F5C" fontSize="22px" bold>
        On-chain data
      </Text>
      <Row>
        <Col>
          <Text color="#3C3F5C" fontSize="15px">
            Owner
          </Text>
          <Text color="#3C3F5C" fontSize="15px">
            Contract address
          </Text>
          <Text color="#3C3F5C" fontSize="15px">
            Token ID
          </Text>
          <Text color="#3C3F5C" fontSize="15px">
            Mining HashRate
          </Text>
          <Text color="#3C3F5C" fontSize="15px">
            Asset Protocol
          </Text>
          <Text color="#3C3F5C" fontSize="15px">
            Asset public chain
          </Text>
        </Col>
        <Col>
          <Text color="#9E9FAD" fontSize="15px">
            OxDfB5...E8C8
          </Text>
          <Text color="#9E9FAD" fontSize="15px">
            OxDfB5...E8C8
          </Text>
          <Text color="#9E9FAD" fontSize="15px">
            {id}
          </Text>
          <Text color="#9E9FAD" fontSize="15px">
            5
          </Text>
          <Text color="#9E9FAD" fontSize="15px">
            ERC721
          </Text>
          <Text color="#9E9FAD" fontSize="15px">
            BSC
          </Text>
        </Col>
      </Row>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 20px;
  }
`
export default OnChainData
