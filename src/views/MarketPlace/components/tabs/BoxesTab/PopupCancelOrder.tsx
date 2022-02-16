import { Box, Flex, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { ReactComponent as CloseIcon } from 'assets/icons/CloseIcon.svg'
import { Button } from 'components/Pancake-uikit'
import React from 'react'

export default ({ close, pendingTx, box, onCancel }) => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Title>Cancel Your Order</Title>
        <Box cursor="pointer" onClick={close}>
          <CloseIcon />
        </Box>
      </HeaderContainer>

      <Container flexDirection="column" justifyContent="space-between" flex="1">
        <Text>You’re about to cancel <span className="text-yellow-400">{ box.config.name } - #{ box.tokenId }</span> order</Text>
        <Flex justifyContent="space-between" width="100%">
          <Button width="50%" scale="sm" margin="10px 0 5px" onClick={close} variant="text">
            Close
          </Button>
          <Button
            width="50%"
            scale="sm"
            margin="10px 0 5px"
            variant="primary"
            disabled={pendingTx}
            onClick={() => onCancel(Number(box.id))}
          >
            {pendingTx ? 'Processing...' : 'Confirm'}
          </Button>
        </Flex>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  border-radius: 10px;
  background: linear-gradient(232.96deg, #5e5d5d 1.65%, #3c393a 99.16%);
  opacity: 0.9;
  border: 1px solid;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.51) 0%,
    #686868 66.84%,
    rgba(104, 104, 104, 0) 100%
  );
`
const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 20px 30px 0;
  color: #fff;
`
const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`
const SubTitle = styled(Box)`
  margin-top: 10px;
  padding-left: 30px;
  color: #a6a6a6;
`

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 30px 20px;
  width: 400px;
  min-width: 300px;
  color: #fff;
`
