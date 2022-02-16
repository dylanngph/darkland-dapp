import { Box, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import validator from 'validator'



export default ({ close }) => {
  const { t } = useTranslation()
  // const [registerStep, setRegisterStep] = useState(1);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setPassword(inputValue)
  }

  const handleChangeNewPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setNewPassword(inputValue)
  }

  const handleChangeConfirmPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setConfirmPassword(inputValue)
  }

  const onClosePopup = () => {
    close()
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!password) {
      setPasswordError("Please enter password")
    }
    else if (!newPassword) {
      setNewPasswordError("Please enter new password")
      setPasswordError('')
    }
    else if (newPassword.length < 8) {
      setNewPasswordError("Please enter at least 8 characters")
      setPasswordError('')
    }
    else if (validator.isAlpha(newPassword)) {
      setNewPasswordError("Password must contain at least 1 digit")
      setPasswordError('')
    }
    else if (newPassword === password) {
      setNewPasswordError("New password must not be the same as old password")
      setPasswordError('')
    }
    else if (newPassword !== confirmPassword) {
      setPasswordError('')
      setNewPasswordError('')
      setConfirmPasswordError("Password must match confirm password")
    }
    else {
      console.log("submit")
      setConfirmPasswordError('')
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
      <Header>
        <img className='h-10 w-15 mt-5' src="/images/my-assets/logoSmall.png" alt="copy" />
        <Title>{t('Change password')}</Title>
      </Header>
      <form onSubmit={onSubmit} >
        <SwapField>
          <p className='text-sm' >Current password</p>
          <InputField>
            <Input
              placeholder='Enter password'
              borderColor='#E9E9E9'
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              type='password'
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              value={password}
              onChange={handleChangePassword}
            />
          </InputField>
          {passwordError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{passwordError}</p>}
          <p className='text-sm mt-5 cursor-pointer' style={{color:"#FFC247"}} >Forget your password ?</p>
        </SwapField>

        <SwapField>
          <p className='text-sm' >New password</p>
          <InputField>
            <Input
              placeholder='Enter new password'
              borderColor='#E9E9E9'
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              type='password'
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              value={newPassword}
              onChange={handleChangeNewPassword}
            />
          </InputField>
          {newPasswordError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{newPasswordError}</p>}
        </SwapField>

        <SwapField>
          <p className='text-sm' >Confirm password</p>
          <InputField>
            <Input
              placeholder='Enter new password again'
              borderColor='#E9E9E9'
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              type='password'
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
          </InputField>
          {confirmPasswordError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{confirmPasswordError}</p>}
        </SwapField>
        <WrapButton className='grid grid-cols-2 gap-1' >
          <Button onClick={() => onClosePopup()}
            size="lg" variant="text" type='button' style={{ color: "#ffffff", width: "50%" }} >
            Back
          </Button>
          <Button size="lg" type='submit' style={{ width: "50%" }} >
            Complete
          </Button>
        </WrapButton>
      </form>
    </Wrapper>
  )
}


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

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const InputField = styled(Box)`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-between;
`

// const WrapCurrency = styled(Box)`
//   background: #151419;
//   border-radius: 8px;
//   display:flex;
//   flex-direction: row;
//   padding: 5px 0px;
//   width: 122px;
// `

const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
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