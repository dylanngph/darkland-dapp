import React from 'react'
import styled from '@emotion/styled'
import { Input } from '@chakra-ui/react'
import { Button } from '@pancakeswap/uikit'
import Popup from 'reactjs-popup'
import PopupChangePass from './PopupChangePass'


const AccountSetting = () => {
  return (
    <div>
      <h1 className='h-10 mt-3' >General Settings</h1>
      <SwapField>
        <p className='text-sm' >Username</p>
        <InputField>
          <Input
            placeholder='Enter username'
            borderColor='#E9E9E9'
            backgroundColor="#222"
            autoComplete='false'
            textColor="#b5b5b5"
            width="50%"
            sx={{
              '&:focus, &:active': {
                borderColor: '#ddd',
                boxShadow: 'none'
              },
            }}
          />
          <Button
            size="lg" type='button' style={{ color: "#9E9E9E", height: "40px", background: "#2D2B2B", margin: "0px 8px" }} >
            Save change
          </Button>
          <Button
            size="lg" type='button' style={{ color: "#ffffff", height: "40px", background: "#FFC247", margin: "0px 8px" }} >
            Save change
          </Button>
        </InputField>
      </SwapField>
      <SwapField>
        <p className='text-sm' >Password</p>
        <Popup
          className='w-full'
          modal
          closeOnDocumentClick
          trigger={
            <InputField className='cursor-pointer' >
              <PasswordWrap>
                <img src="/images/my-assets/Key.png" alt="key" />
                <p>Change Password</p>
              </PasswordWrap>
            </InputField>
          }>{(close) => <PopupChangePass close={close} />}
        </Popup>
      </SwapField>
    </div>
  )
}

const SwapField = styled.div`
  color: #fff;
  padding: 15px;
  border-radius: 10px;
`

const InputField = styled.div`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
`

const PasswordWrap = styled.div`
display:flex;
flex-direction: row;
background: #2D2B2B;
color: #717171;
padding: 10px 15px;
border-radius: 10px;
width:50%;
`

export default AccountSetting