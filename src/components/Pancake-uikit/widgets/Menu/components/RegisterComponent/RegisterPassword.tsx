import { Box, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import validator from 'validator'

const RegisterPassword = ({ onChangeStep, isNewPass }) => {
  const { t } = useTranslation()
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setPassword(inputValue)
  }

  const handleChangeConfirmPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setConfirmPassword(inputValue)
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    // onChangeStep(3)
    if (!password) {
      setPasswordError("Please enter password")
    }
    else if (password.length < 8) {
      setPasswordError("Please enter at least 8 characters")
    }
    else if (validator.isAlpha(password)) {
      setPasswordError("Password must contain at least 1 digit")
    }
    else if (password !== confirmPassword) {
      setPasswordError('')
      setConfirmPasswordError("Password must match confirm password")
    }
    else {
      console.log("submit")
      onChangeStep(3)
    }
  }

  return (
    <div>
      <Header>
        <img className='h-10 w-15 mt-5' src="/images/my-assets/logoSmall.png" alt="copy" />
        <Title>{t(isNewPass ? 'Setup new password' :'Register with E-mail')}</Title>
      </Header>
      <form onSubmit={onSubmit} >
        <SwapField>
          <p className='text-sm' >{isNewPass ? 'New password' : 'Password'}</p>
          <InputField>
            <Input
              placeholder={isNewPass ? 'Enter new password' : 'Enter password'}
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
        </SwapField>

        <SwapField>
          <p className='text-sm' >Confirm {isNewPass && 'new'} password</p>
          <InputField>
            <Input
              placeholder={isNewPass ? 'Enter new password again' : 'Enter password again'} 
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
          <Button onClick={() => onChangeStep(1)}
            size="lg" variant="text" type='button' style={{ color: "#ffffff", width: "50%" }} >
            Back
          </Button>
          <Button size="lg" type='submit' style={{ width: "50%" }} >
            Register
          </Button>
        </WrapButton>
      </form>
    </div>
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

const InputField = styled(Box)`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-between;
 `
const Header = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
`

const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
`

export default RegisterPassword
