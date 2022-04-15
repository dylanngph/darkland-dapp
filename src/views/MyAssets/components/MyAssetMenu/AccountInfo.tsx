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
      const positionSubString = 15
      const result = account.substring(0, positionSubString)
      const result2 = account.substring(account.length - 4, account.length)

      return `${result}...${result2}`
    }
    return ''
  }

  const avatar = localStorage.getItem('avatar')

  return (
    <div>
      <div className="flex flex-row flex-wrap">
        <div className="margin-center w-full">
          <CardIcon className="flex justify-center mr-auto ml-auto" style={{width: '100px'}}>
            <img
              className="h-20 w-20"
              style={{border: '3px solid #2647CB'}}
              src='images/avatars/avatar.png'
              alt="account-info"
            />
          </CardIcon>
        </div>
        {/* <AccountDetails className="w-3/5">
          <Text className="text-xs lg:text-lg"> {userInfo?.email} </Text>
          <Text className="text-xs lg:text-lg">Ranking point: {formatNumber(userInfo?.rankingPoint)} </Text>
        </AccountDetails> */}
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
              className="h-4 w-4"
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
  bottom: 3px;
  right: 5px;
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
  padding: 0 5px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: baseline;
`

export default AccountInfo
