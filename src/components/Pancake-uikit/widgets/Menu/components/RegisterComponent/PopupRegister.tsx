import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import RegisterEmail from './RegisterEmail'
import SuccessComponent from './SuccessComponent'


export default ({ close }) => {
  const { t } = useTranslation()
  const [registerStep, setRegisterStep] = useState(1);



  const onClosePopup = () => {
    close()
  }



  const renderRegisterScreen = () =>{
    switch (registerStep) {
      case 1:
        return <RegisterEmail close={close} onChangeStep={setRegisterStep} />
      case 2:
        return <SuccessComponent close={close} tilte='Registration Complete!' content='Please check your e-mail to verify your account' link='/my-assets' />
      default:
        return <RegisterEmail close={close} onChangeStep={setRegisterStep} />;
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
      {renderRegisterScreen()}
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