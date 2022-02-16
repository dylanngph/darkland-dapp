import { Tooltip } from '@chakra-ui/react'
import heroestdApi from 'api/heroestdApi'
import { TOKEN_ID } from 'contants'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Popup from 'reactjs-popup'
import { AppDispatch } from 'state'
import { updateUserInGame } from 'state/user/actions'
import styled from 'styled-components'
import { getCookie } from 'utils/cookie'
import { formatNumber } from 'utils/formatBalance'
import PopupChangeAvatar from './PopupChangeAvatar'

const AccountInfo = () => {
  const { t } = useTranslation()
  const dispath = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    rankingPoint: 0,
    status: 0,
  })

  const splitAddress = () => {
    if (account) {
      const positionSubString = 20
      const result = account.substring(0, positionSubString)
      const result2 = account.substring(account.length - 4, account.length)

      return `${result}...${result2}`
    }
    return ''
  }



  useEffect(() => {
    const getUser = async () => {
      // try {
      //   const tokenID = getCookie(TOKEN_ID);
      //   const response = await fetch(`https://alpha-dot-heroes-td-6fa95.as.r.appspot.com/login`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${tokenID}` },
      //   })
      //   const dataUser = await response.json()
      //   localStorage.setItem('userInfo', JSON.stringify(dataUser.user))
      //   setUserInfo(dataUser.user)
      // } catch(err) {
      //   console.log(err)
      // }
      try {
        const idToken = getCookie(TOKEN_ID)
        const dataUser: any = await heroestdApi.loginWithToken(idToken)
        window.localStorage.setItem('userInfo', JSON.stringify(dataUser.user))
        setUserInfo(dataUser.user)
        dispath(updateUserInGame(dataUser))
      } catch(err) {
        console.log(err)
      }
    }
    getUser()
  }, [dispath])

  const avatar = localStorage.getItem('avatar')

  return (
    <div style={{ borderBottom: '1px solid #535353' }}>
      <div className="flex flex-row flex-wrap">
        <div className="margin-center w-2/5">
          <CardIcon className="flex justify-center">
            <img
              className="h-20 w-20"
              src={`../images/avatars/${avatar && avatar.length > 0 ? avatar : 'BigBoss.gif'}`}
              alt="account-info"
              style={{ borderRadius: '100%' }}
            />
            <Popup
              className="w-full"
              modal
              closeOnDocumentClick
              trigger={
                <ChangeAvatarIcon
                  className="cursor-pointer"
                  src="../images/blindbox/change-avatar-icon.svg"
                  alt="change-avatar-icon"
                />
              }
            >
              {(close) => (
                <PopupChangeAvatar
                  close={close}
                  currentAva={avatar && avatar.length > 0 ? avatar : 'BigBoss.gif'}
                />
              )}
            </Popup>
          </CardIcon>
        </div>
        <AccountDetails className="w-3/5">
          <Text className="text-xs lg:text-lg"> {userInfo?.email} </Text>
          <Text className="text-xs lg:text-lg">Ranking point: {formatNumber(userInfo?.rankingPoint)} </Text>
        </AccountDetails>
      </div>
      <TextAddress className="flex justify-center">
        {splitAddress()}
        <Tooltip placement="top-start" label="Copy">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              navigator.clipboard.writeText(account)
            }}
            onKeyDown={(e) => {
              navigator.clipboard.writeText(account)
            }}
          >
            <img
              className="h-4 w-4 mr-8"
              src="/images/my-assets/copy_btn.png"
              alt="copy"
              style={{ marginLeft: '10px' }}
            />
          </div>
        </Tooltip>
      </TextAddress>
    </div>
  )
}

const ChangeAvatarIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 10px;
`

const CardIcon = styled.div`
  position: relative;
  top: auto;
  left: auto;
  margin-top: 17px;
`

const AccountDetails = styled.div`
  margin-top: 20px;
  font-size: 14px;
`

// const Card = styled.div`
//   width: 239px;
//   height: 383px;
//   background: #0f0f0f;
//   border: 1px solid #535353;
//   box-sizing: border-box;
//   border-radius: 10px;
// `

// const Block = styled.div`
//   margin-top: 44px;
//   margin-bottom: 33px;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `

const Text = styled.div`
  color: #ffffff;
  margin-bottom: 10px;
`

const TextAddress = styled(Text)`
  margin-top: 20px;
  font-size: 12px;
  color: #a0a0a0;
  text-align: center;
`

export default AccountInfo
