import { Button, Skeleton } from 'components/Pancake-uikit'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Flex,
  Text,
  Select,
  Input,
  InputGroup,
  InputRightAddon,
  Checkbox,
} from '@chakra-ui/react'
import { formatNumber } from 'utils/formatBalance'
import { setCookie } from 'utils/cookie'
import { useWeb3React } from '@web3-react/core'
import firebase, { firebaseApp } from 'config/firebase/firebaseConfig'
import useToast from 'hooks/useToast'
import history from 'routerHistory'
import events from 'utils/events'
import Popup from 'reactjs-popup'
import PopupRegister from 'components/Pancake-uikit/widgets/Menu/components/RegisterComponent/PopupRegister'
import { AppState, useAppDispatch } from 'state'
import { setLogin } from 'state/common/commonSlice'
import { REFRESH_TOKEN, TOKEN_ID } from 'contants'
import heroestdApi from 'api/heroestdApi'
import { updateUserInGame } from 'state/user/actions'
import PopupRetrieve from './RetrievePassword/PopupRetrieve'

const PopupLogin = ({ close, setToken }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const onClosePopup = () => {
    close()
  }

  const onLoginSocialNetWork = (type: string) => {
    let provider
    switch (type) {
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider()
        break
      case 'apple':
        provider = new firebase.auth.OAuthProvider('apple.com')
        break
      default:
        provider = new firebase.auth.GoogleAuthProvider()
        break
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const idToken = await result.user.getIdToken(true)
        const { refreshToken } = result.user
        setCookie(TOKEN_ID, idToken)
        setCookie(REFRESH_TOKEN, refreshToken)
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credentialMapped = Object.fromEntries(Object.entries(credential));
        // const tokenFromGG = credentialMapped.idToken
        // const tokenFromGGAccess = credentialMapped.accessToken
        
        const loginInfo: any = await heroestdApi.loginWithToken(idToken)
        dispatch(updateUserInGame(loginInfo.user))
        dispatch(setLogin(!!idToken))
        setLoginSuccess(true)
        const toast = toastSuccess
        toast(`Login succeed`)
        history.push('/my-assets')
        setToken(idToken)
        // close()
        events.emit('LOGIN_SUCCESS')
      })
      .catch((error) => {
        console.log("error", error)
        console.log(`Login with ${type} Error`, error.message)
        const toast = toastError
        toast(`Login with ${type} Error `, error.message)
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
      })
  }

  const onLoginWithEmailPassword = ( username, password ) => {
    firebase.auth().signInWithEmailAndPassword(username, password).then(async (result) => {
      const idToken = await result.user.getIdToken(true)
      const { refreshToken } = result.user
      const loginInfo: any = await heroestdApi.loginWithToken(idToken)
      setCookie(TOKEN_ID, idToken)
      setCookie(REFRESH_TOKEN, refreshToken)
      dispatch(updateUserInGame(loginInfo.user))
      dispatch(setLogin(!!idToken))
      setLoginSuccess(true)
      const toast = toastSuccess
      toast(`Login succeed`)
      history.push('/my-assets')
      setToken(idToken)
      // close()
      events.emit('LOGIN_SUCCESS')
    })
    .catch((error) => {
      console.log(`Login Error`, error.message)
      const toast = toastError
      toast('Login fail ', error.message)
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
    })
  }

  const onLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const { credential } = result
        const tokenID = await result.user.getIdToken(true)
        const { refreshToken } = result.user
        setCookie(TOKEN_ID, tokenID)
        setCookie(REFRESH_TOKEN, refreshToken)
        dispatch(setLogin(!!tokenID))
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credentialMapped = Object.fromEntries(Object.entries(credential));
        // const tokenFromGG = credentialMapped.idToken
        // const tokenFromGGAccess = credentialMapped.accessToken
        const response = await fetch(`https://beta-dot-heroes-td-6fa95.as.r.appspot.com/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenID}` },
        })
        const dataUser = await response.json()

        // const data = await response.json()
        // await window.localStorage.setItem('_ut', tokenID)
        setLoginSuccess(true)
        const toast = toastSuccess
        toast(`Login succeed`)
        history.push('/my-assets')
        setToken(tokenID)
        // close()
        events.emit('LOGIN_SUCCESS')
      })
      .catch((error) => {
        console.log('Login with google Error', error.message)
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
      })
  }

  const onLoginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const credential = result.credential
        // This gives you a Google Access Token. You can use it to access the Google API.
        const tokenFromGG = Object.fromEntries(Object.entries(credential)).idToken
        const { refreshToken } = result.user

        // const response = await fetch(`https://beta-dot-heroes-td-6fa95.as.r.appspot.com/login`, {
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${tokenFromGG}`},
        // })

        // const data = await response.json()
        // await window.localStorage.setItem('_ut', tokenFromGG)
        setCookie(TOKEN_ID, tokenFromGG)
        setCookie(REFRESH_TOKEN, refreshToken)
        dispatch(setLogin(!!tokenFromGG))

        setLoginSuccess(true)
        const toast = toastSuccess
        toast(`Login succeed`)
        history.push('/my-assets')
        setToken(tokenFromGG)
        // close()
        events.emit('LOGIN_SUCCESS')
      })
      .catch((error) => {
        console.log('Login with Facebook Error', error.message)
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
      })
  }

  const onLoginWithApple = () => {
    const provider = new firebase.auth.OAuthProvider('apple.com')
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const credential = result.credential
        // This gives you a Google Access Token. You can use it to access the Google API.
        const tokenFromGG = Object.fromEntries(Object.entries(credential)).idToken
        const { refreshToken } = result.user

        // const response = await fetch(`https://beta-dot-heroes-td-6fa95.as.r.appspot.com/login`, {
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${tokenFromGG}`},
        // })

        // const data = await response.json()
        // await window.localStorage.setItem('_ut', tokenFromGG)
        setCookie(TOKEN_ID, tokenFromGG)
        setCookie(REFRESH_TOKEN, refreshToken)
        dispatch(setLogin(!!tokenFromGG))

        setLoginSuccess(true)
        const toast = toastSuccess
        toast(`Login succeed`)
        history.push('/my-assets')
        setToken(tokenFromGG)
        // close()
        events.emit('LOGIN_SUCCESS')
      })
      .catch((error) => {
        console.log('Login with Apple Error', error.message)
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
      })
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accountName, setAccountName] = useState('')

  const handleChangeUsername = (e) => {
    const { value } = e.target
    setUsername(value)
  }

  const handleChangePassword = (e) => {
    const { value } = e.target
    setPassword(value)
  }

  const handleChangeAccountName = (e) => {
    const { value } = e.target
    setAccountName(value)
  }
  return (
    <Wrapper>
      <Box
        onClick={() => onClosePopup()}
        style={{ top: '10px', right: '10px', position: 'absolute', cursor: 'pointer' }}
      >
        <img src="/close.svg" alt="close" />
      </Box>
      {!loginSuccess ? (
        <>
          <ContainerPopup>
            <CardIcon>
              <img src="/logo.svg" alt="logo" style={{ height: '44px', width: 'auto' }} />
            </CardIcon>
            <Title>Login</Title>
            <div className="w-full flex flex-row justify-center mt-2">
              <Text className="text-gray mr-2">New user ?</Text>{' '}
              <Popup
                className="w-full"
                modal
                closeOnDocumentClick
                trigger={
                  <Text
                    onClick={() => onClosePopup()}
                    style={{ color: '#FFC247', cursor: 'pointer' }}
                  >
                    Register now
                  </Text>
                }
              >
                {(closeReg) => <PopupRegister close={closeReg} />}
              </Popup>
            </div>
          </ContainerPopup>
          <ContainerPopup style={{ alignItems: 'center', padding: '0' }} flexDirection="column">
            <div className="text-gray text-sm flex flex-col items-center">
              <Flex flexDirection="column" gridGap={1}>
                <Text fontWeight="bolder">E-mail or username</Text>
                <Input
                  value={username}
                  placeholder="Enter E-mail or username"
                  type="text"
                  borderColor="#555"
                  backgroundColor="#222"
                  onChange={handleChangeUsername}
                  _focus={{
                    borderColor: 'none',
                  }}
                  style={{ width: '304px' }}
                />
              </Flex>
              <Flex flexDirection="column" gridGap={1}>
                <Text fontWeight="bolder">Password</Text>
                <Input
                  width="304px"
                  value={password}
                  placeholder="Enter Password"
                  type="password"
                  borderColor="#555"
                  backgroundColor="#222"
                  onChange={handleChangePassword}
                  _focus={{
                    borderColor: 'none',
                  }}
                />
              </Flex>
              <div className="w-full flex flex-row justify-between mt-2">
                <Checkbox>Remember Me</Checkbox>
                <Popup
                  className="w-full"
                  modal
                  closeOnDocumentClick
                  trigger={
                    <Text
                      onClick={() => onClosePopup()}
                      style={{ color: '#FFC247', cursor: 'pointer' }}
                    >
                      Forgot password?
                    </Text>
                  }
                >
                  <PopupRetrieve close={close} />
                </Popup>
              </div>
              <div className="w-full flex flex-col items-center">
                <Button
                  onClick={() => onLoginWithEmailPassword(username, password)}
                  variant="primary"
                  className="w-full"
                  style={{ marginTop: '10px', width: '304px', padding: '0px' }}
                  scale="sm"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    onLoginSocialNetWork('google')
                  }}
                  variant="text"
                  className="w-full"
                  style={{
                    marginTop: '10px',
                    border: '1px solid #969696',
                    backgroundColor: '#454344',
                    color: 'white',
                    fontWeight: 'normal',
                    width: '304px',
                    padding: '0px',
                  }}
                  scale="sm"
                >
                  <img
                    src="/google.svg"
                    alt="logo"
                    style={{ height: '22px', width: 'auto', marginRight: ' 12px' }}
                  />
                  Login with Google
                </Button>
                {/* <Button
                  onClick={() => {
                    onLoginSocialNetWork('facebook')
                  }}
                  variant="text"
                  className="w-full"
                  style={{
                    marginTop: '10px',
                    border: '1px solid #969696',
                    backgroundColor: '#454344',
                    color: 'white',
                    fontWeight: 'normal',
                    width: '304px',
                    padding: '0px',
                  }}
                  scale="sm"
                >
                  <img
                    src="/facebook.svg"
                    alt="logo"
                    style={{
                      height: '22px',
                      width: 'auto',
                      marginLeft: '20px',
                      marginRight: ' 12px',
                    }}
                  />
                  Login with Facebook
                </Button> */}
                <Button
                  onClick={() => {
                    onLoginSocialNetWork('apple')
                  }}
                  variant="text"
                  className="w-full"
                  style={{
                    marginTop: '10px',
                    border: '1px solid #969696',
                    backgroundColor: '#454344',
                    color: 'white',
                    fontWeight: 'normal',
                    width: '304px',
                    padding: '0px',
                    marginBottom: '30px',
                  }}
                  scale="sm"
                >
                  <img
                    src="/apple.svg"
                    alt="logo"
                    style={{ height: '22px', width: 'auto', marginRight: ' 12px' }}
                  />
                  Login with Apple
                </Button>
              </div>
            </div>
          </ContainerPopup>
        </>
      ) : (
        <>
          <ContainerPopup>
            <CardIcon>
              <img src="/logo.svg" alt="logo" style={{ height: '44px', width: 'auto' }} />
            </CardIcon>
            <Title>Welcome to DarkLand!</Title>
            <div className="w-full flex flex-col justify-center mt-2">
              <Text className="text-gray text-center">What should we call you?</Text>{' '}
              <Text className="text-gray text-center">This can be changed later.</Text>
            </div>
          </ContainerPopup>
          <ContainerPopup style={{ alignItems: 'center', padding: '0' }} flexDirection="column">
            <div className="text-gray text-sm flex flex-col items-center">
              <Flex flexDirection="column" gridGap={1}>
                <Text fontWeight="bolder">Name</Text>
                <Input
                  value={accountName}
                  placeholder="Lucas..."
                  type="text"
                  borderColor="#555"
                  backgroundColor="#222"
                  onChange={handleChangeAccountName}
                  _focus={{
                    borderColor: 'none',
                  }}
                  width="304px"
                />
              </Flex>
              <div className="w-full flex flex-col items-center">
                <Button
                  onClick={onClosePopup}
                  variant="primary"
                  className="w-full"
                  style={{ marginTop: '50px', width: '304px', padding: '0px' }}
                  scale="sm"
                >
                  Save
                </Button>
              </div>
            </div>
          </ContainerPopup>
        </>
      )}
    </Wrapper>
  )
}
const CardIcon = styled.div`
  position: relative;
  top: auto;
  left: auto;
`

const Wrapper = styled(Box)`
  background: linear-gradient(270deg, #000000b3 0, #444444c7 0.01%, #424242d1 105.1%);
  border: 1px solid #52525270;
  border-radius: 12px;
  color: #fff;
  width: 360px;
  height: auto;
  min-height: 360px;
  @media screen and (max-width: 668px) {
    width: 330px;
  }
`
const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`
const ContainerPopup = styled(Box)`
  padding: 40px 30px 10px 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export default PopupLogin
