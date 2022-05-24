import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Button } from '@pancakeswap/uikit'
import React from 'react'
import { NavLink } from 'react-router-dom'

const SuccessComponent = ({close, tilte, content, link}) => {
  return (
    <div >
      <WrapImg>
        <img src="/images/Checkout.svg" alt="complete" />
      </WrapImg>
      <SwapField>
        <h1 className='text-2xl text-center' >{tilte}</h1>
        <h1 className='mt-3 text-sm text-center' style={{ color: "#A6A6A6" }} >{content}</h1>
      </SwapField>
      <WrapButton>
        <Button onClick={close} size="lg" type='button' style={{ width: "100%" }} >
          Close
        </Button>
      </WrapButton>
    </div>
  )
}

const SwapField = styled(Box)`
  color: #fff;
  border-radius: 10px;
`
const WrapImg = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 90%;
`

const WrapButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 0px;
  width: 90%;
`

const InputField = styled(Box)`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-between;
`

export default SuccessComponent
