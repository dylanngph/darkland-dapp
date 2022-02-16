import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Box, Input, Checkbox } from '@chakra-ui/react'
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import firebase, { firebaseApp } from 'config/firebase/firebaseConfig'
import validator from 'validator'

const RegisterEmail = ({close, onChangeStep }) => {
  const { t } = useTranslation()
  const [errMessage, setErrMessage] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeStatus, setCodeStatus] = useState(1);
  const [codeStatusText, setCodeStatusText] = useState('Send code');
  const [seconds, setSeconds] = React.useState(5);
  const [isAgree, setIsAgree] = useState(false)
  const [isAgreeError, setIsAgreeError] = useState('')
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');



  const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setEmail(inputValue)
  }

  const handleChangeCode = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setCode(inputValue)
  }
  const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setPassword(inputValue)
  }

  const handleChangeConfirmPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setConfirmPassword(inputValue)
  }


  const onCountDown = useCallback(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setCodeStatus(3);
      setCodeStatusText('Resend code')
    }
  }, [seconds]
  )

  const onSendVerifyCode = () => {
    if (validator.isEmail(email)) {
      setSeconds(5)
      setCodeStatus(2)
      setCodeStatusText('Check your e-mail')
      setEmailError('')
      onCountDown()
    } else {
      setEmailError("Invalid email")
    }

  }

  const onClosePopup = () => {
    close()
  }

  useEffect(() => {
    if (codeStatus === 2) {
      onCountDown()
    }
  }, [codeStatus, onCountDown])


  const onSubmit = (evt) => {
    evt.preventDefault();

    if (!email) {
      setEmailError('Please enter email')
    }
    else if (!validator.isEmail(email)) {
      setEmailError('Invalid email')
    }
    else if (!password) {
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
    else if (!isAgree) {
      setIsAgreeError('Please read terms of use')
      setCodeError('')
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
        if (result.additionalUserInfo.isNewUser) {
          if (result.additionalUserInfo.providerId === "password") {
            result.user.sendEmailVerification();
            onChangeStep(2)
          }
        }
      }).catch(error => {
        console.log("message error", error.message)
        setErrMessage(error.message)
      })
    }
  }
  return (
    <div>
      <Header>
        <img className='h-10 w-15 mt-5' src="/images/my-assets/logoSmall.png" alt="copy" />
        <Title>{t('Register with E-mail')}</Title>
      </Header>
      <form onSubmit={onSubmit} >
        {/* <SwapField>
          <p className='text-sm' >Username</p>
          <InputField>
            <Input
              placeholder='Enter username'
              borderColor='#E9E9E9'
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              value={userName}
              onChange={handleChangeUsername}
            />
          </InputField>
          {userNameError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{userNameError}</p>}
        </SwapField> */}

        <SwapField>
          <p className='text-sm' >E-mail</p>
          <InputField>
            <Input
              placeholder='Enter E-mail'
              borderColor='#E9E9E9'
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              value={email}
              onChange={handleChangeEmail}
            />
          </InputField>
          {emailError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{emailError}</p>}
        </SwapField>
        {/* <SwapField>
          <p className='text-sm' >Verification code</p>
          <InputField className='grid grid-cols-2' >
            <Input
              placeholder='Enter'
              borderColor='#E9E9E9'
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              width='50%'
              value={code}
              onChange={handleChangeCode}
            />
            <div className='w-1/2' >
              <Button type='button'
                style={codeStatus === 2 ? { color: "#9E9E9E", fontSize: "11px", backgroundColor: 'transparent', height: "12px" } :
                  { color: "#FFAB04", fontSize: "14px", height: "15px" }} disabled={codeStatus === 2}
                scale="sm" variant="text" onClick={onSendVerifyCode} >
                {codeStatusText} {codeStatus === 2 && `(${seconds})`}
              </Button>
              <p className='text-xs md:text-sm ml-4' style={{ color: "#9E9E9E" }} >{codeStatus === 3 && 'Can’t receive code ?'}</p>
            </div>
          </InputField>
          {codeError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{codeError}</p>}
        </SwapField> */}
        <SwapField>
          <p className='text-sm' >Password</p>
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
        </SwapField>

        <SwapField>
          <p className='text-sm' >Confirm password</p>
          <InputField>
            <Input
              placeholder='Enter password again'
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
        <SwapField>
          <Checkbox
            name="confirmed"
            type="checkbox"
            isChecked={isAgree}
            onChange={(e) => setIsAgree(!isAgree)}
            scale="sm"
          >
            <p className=' text-sm' style={{ color: "#A6A6A6" }} >I have read and agree 
            <a href='https://heroestd.io/terms-of-use' rel="noreferrer" target="_blank" style={{ color: "#ffffff" }} >(Terms of use)</a></p>
          </Checkbox>
          {isAgreeError && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{isAgreeError}</p>}
          {errMessage && <p style={{ color: "#DA3754", paddingTop: "5px" }} >{errMessage}</p>}
        </SwapField>
        <WrapButton className='flex-col' >
          <Button size="lg" type='submit' style={{ width: "100%", height: "40px" }} >
            Complete
          </Button>
          <div className="flex flex-col flex-wrap" style={{ width: "100%" }}>
            <p className='text-sm md:text-md' style={{ textAlign: "center" }} >Already has account?</p>
            <Button
            onClick={close}
              size="lg" variant="secondary" type='button' style={{ color: "#ffffff", width: "100%", height: "40px", marginTop:"10px" }} >
              Login
            </Button>
          </div>
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

const WrapCurrency = styled(Box)`
  background: #151419;
  border-radius: 8px;
  display:flex;
  flex-direction: row;
  padding: 5px 0px;
  width: 122px;
`

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

export default RegisterEmail
