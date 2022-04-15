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
import { useModal } from '@pancakeswap/uikit'
import LinkWallet from 'components/LinkWallet'
import PopupRegister from 'components/Pancake-uikit/widgets/Menu/components/RegisterComponent/PopupRegister'
import { AppState, useAppDispatch } from 'state'
import { setLogin } from 'state/common/commonSlice'
import { REFRESH_TOKEN, TOKEN_ID } from 'contants'
import heroestdApi from 'api/heroestdApi'
import { updateUserInGame } from 'state/user/actions'
import { useSelector } from 'react-redux'
import PopupRetrieve from './RetrievePassword/PopupRetrieve'

const PopupLogin = ({ close, setToken }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { toastError, toastSuccess } = useToast()
  const [openLinkWallet] = useModal(<LinkWallet />, false)
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
        
        const loginInfo: any = await heroestdApi.loginFirebase(idToken)
        const jwtToken = loginInfo.data.jwt_token
        setCookie(TOKEN_ID, jwtToken)
        dispatch(updateUserInGame(loginInfo.data))
        dispatch(setLogin(!!jwtToken))
        setLoginSuccess(true)
        
        toastSuccess(`Login succeed`)
        // history.push('/my-assets')
        setToken(jwtToken)
        // close()
        events.emit('LOGIN_SUCCESS')
        if (!loginInfo.data.address) {
          openLinkWallet()
        }
      })
      .catch((error) => {
        toastError(`Login with ${type} Error `, error.message)
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
    <Wrapper width={{ lg: '45rem', sm: '90%' }}>
      <Box
        onClick={() => onClosePopup()}
        style={{ top: '10px', right: '10px', position: 'absolute', cursor: 'pointer' }}
      >
        <img src="/close.svg" alt="close" />
      </Box>
      {!loginSuccess ? (
        <Box display="flex" height='100%'>
          <Box backgroundImage='/images/bg_login.png' style={{ backgroundSize: 'cover', backgroundPosition: 'top' }} flex={{ lg: '1 27%' }} />
          <Box flex={{ lg: '1 50%' }} padding='2.6rem'>
            <Box textAlign='left'>
              <TextTitle fontSize={26}>
                <Title>Login to</Title>
                <Title>DARKLAND SURVIVAL</Title>
              </TextTitle>
              <Text color="#D6D1D1" paddingY='1rem'>
                Please login your game account to link with your wallet address.
              </Text>
            </Box>
            <ContainerPopup style={{ alignItems: 'center', padding: '0' }} flexDirection="column">
              <Box width='100%'>
                <div className="w-full flex flex-col items-center">
                  <ButtonLogin
                    onClick={() => {
                      onLoginSocialNetWork('google')
                    }}
                    variant="text"
                    className="w-full"
                    scale="sm"
                  >
                    <IconSocial src="/google.svg" alt="logo" />
                    Login with Google
                  </ButtonLogin>
                  <ButtonLogin
                    onClick={() => {
                      onLoginSocialNetWork('apple')
                    }}
                    variant="text"
                    className="w-full"
                    scale="sm"
                  >
                    <IconSocial src="/apple.svg" alt="logo" />
                    Login with Apple
                  </ButtonLogin>
                </div>
              </Box>
            </ContainerPopup>
          </Box>
        </Box>
      ) : (
        <>
          <ContainerPopup>
            <CardIcon>
              <img src="/logo.png" alt="logo" style={{ height: '60px', width: 'auto' }} />
            </CardIcon>
            <Title>Welcome to DarkLand!</Title>
            <div className="w-full flex flex-col justify-center mt-2">
              <Text className="text-gray text-center">What should we call you?</Text>{' '}
              <Text className="text-gray text-center">This can be changed later.</Text>
            </div>
          </ContainerPopup>
          <ContainerPopup style={{ alignItems: 'center', padding: '0' }} flexDirection="column">
            <Box width='100%'>
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
            </Box>
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
  position: relative;
  background-image: url('images/bg_login_right.png');
  background-color: rgb(9 23 73 / 60%);
  border-radius: 12px;
  color: #fff;
  overflow: hidden;
  border: 1px solid #415cc7;
  margin: 0 auto;
  width: 90%;
`
const Title = styled(Box)`
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

const ButtonLogin = styled(Button)`
  margin-top: 10px;
  background-color: #2647CB;
  color: white;
  font-weight: normal;
  min-width: 250px;
  padding: 0px;
  height: 2.8rem;
  border-radius: 0;
  border-bottom: 0.2rem solid #1A2B6D;
`

const TextTitle = styled(Text)`
  background: linear-gradient(89.77deg, rgba(0, 34, 213, 0.44) 0.2%, rgba(0, 72, 213, 0) 83.63%);
  padding: 0.5em;
  border-left: 0.5rem solid #2647CB;
`

const IconSocial = styled.img`
  background-color: white;
  border-radius: 50%;
  padding: 0.2rem;
  height: 22px;
  width: auto;
  margin-right: 12px;
`

export default PopupLogin
