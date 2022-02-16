import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@chakra-ui/react'
import EmailVerification from './EmailVerification'
import SuccessComponent from '../RegisterComponent/SuccessComponent'
import RegisterPassword from '../RegisterComponent/RegisterPassword'

export default ({ close }) => {
  const [registerStep, setRegisterStep] = useState(1);

  const onClosePopup = () => {
    close()
  }

  const renderRetrievePassScreen = () =>{
    switch (registerStep) {
      case 1:
        return <EmailVerification onChangeStep={setRegisterStep} close={close} />
      case 2:
        return <RegisterPassword onChangeStep={setRegisterStep} isNewPass />
      case 3:
        return <SuccessComponent close={close} tilte='Change Password Complete!' content='' link='/home' />
      default:
        return <EmailVerification onChangeStep={setRegisterStep} close={close} />;
    }
  }

  return (
    <Wrapper>
      <Box
        onClick={close}
        style={{ top: '10px', right: '10px', position: 'absolute', cursor: 'pointer' }}
      >
        <img src="/close.svg" alt="close" />
      </Box>
      {renderRetrievePassScreen()}
    </Wrapper>
  )
}


const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
`
const ContainerPopupComplete = styled(Box)`
  padding: 40px 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const SwapField = styled(Box)`
  color: #fff;
  padding: 15px;
  border-radius: 10px;
`
const WrapButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 29px auto;
  width: 90%;
`

const InputField = styled(Box)`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-between;
`

const WrapCurrency = styled(Box)`
  background: #151419;
  border-radius: 8px;
  display:flex;
  flex-direction: row;
  padding: 5px 0px;
  width: 122px;
`

const Wrapper = styled(Box)`
  background: linear-gradient(270deg, #000000b3 0, #444444c7 0.01%, #424242d1 105.1%);
  border: 1px solid #52525270;
  border-radius: 12px;
  color: #fff;
  width: 500px;
  max-width: 360px;
  min-height: 300px;
  @media screen and (max-width: 668px) {
    width: 300px;
  }
`