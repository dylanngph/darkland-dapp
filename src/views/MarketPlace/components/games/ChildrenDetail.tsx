import React from 'react'
import {Text} from '@pancakeswap/uikit'
import styled from 'styled-components'
import {ReactComponent as Chicken1} from './childrenImg/chicken1.svg'
import {ReactComponent as Chicken2} from './childrenImg/Chicken_04.svg'

const ChildrenDetail = () => {
  return (
    <Container>
      <Text color="#3C3F5C" fontSize="22px" bold>
        Children
      </Text>
      <ChildrenBox>
        <div
          style={{
            textAlign: 'center',
            color: '#66687B',
          }}
        >
          <div
            style={{
              backgroundColor: '#000',
              padding: '20px',
              marginBottom: '20px',
              borderRadius: '16px',
            }}
          >
            <Chicken1 />
          </div>
          #1257 Squirtle
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#66687B',
          }}
        >
          <div
            style={{
              backgroundColor: '#000',
              padding: '20px',
              marginBottom: '20px',
              borderRadius: '16px',
            }}
          >
            <Chicken2 />
          </div>
          #7321 Charmander
        </div>
      </ChildrenBox>
    </Container>
  )
}
const Container = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`
const ChildrenBox = styled.div`
  display: flex;
  gap: 20px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0;
    & > * {
      margin-bottom: 20px;
    }
  }
`

export default ChildrenDetail
