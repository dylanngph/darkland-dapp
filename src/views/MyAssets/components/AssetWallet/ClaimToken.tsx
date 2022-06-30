import { Button } from '@pancakeswap/uikit'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import PopupSwap from 'views/IDO/packs/PopupSwap'
import { AppState } from 'state'
import './wallet.modules.scss'
import { useSelector } from 'react-redux'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {useWeb3React} from '@web3-react/core'
import { getCookie } from 'utils/cookie'
import { TOKEN_ID } from 'contants'
import heroestdApi from 'api/heroestdApi'
import { Flex } from '@chakra-ui/react'
import { formatNumber } from 'utils/formatBalance'

const ClaimToken = () => {
  const {account} = useWeb3React()
  const tokenId = getCookie(TOKEN_ID)
  const [data, setData] = useState(0)

  const fetchData = useCallback(async() => {
    try {
      const res = await heroestdApi.getTokenReward(tokenId)
      setData(res.data.big_t)
    } catch(err) {
      console.log(err)
    }
  }, [tokenId])

  useEffect(() => {
    if (tokenId) fetchData()
  }, [tokenId, fetchData])

  // const userData = useSelector((state: AppState) => state.user.userInfo)
  return (
    <Card className='w-full lg:w-2/3' >
      <CurrencyBox>
        <Flex alignItems="center">
          <img src='/images/coins/big_token.png' alt='token' height={42} width={42} />
          <RightCurrency>
            <h2 className='text-xl' > {formatNumber(data, 0, 0)} BIGt </h2>
          </RightCurrency>
        </Flex>
        { data > 0 && <Popup
          className='w-full'
          modal
          closeOnDocumentClick
          onClose={fetchData}
          trigger={
            <Button>
              Claim reward
            </Button>
          }>{(close) => <PopupSwap close={close} currencyType="BIG" valueToken={data} />}
        </Popup> }
      </CurrencyBox>

      {
        !account && <div className='w-full mt-5 px-5' >
          <ConnectWalletButton className="cn-wallet-btn" isCustom='true' scale="sm" /> 
        </div>
      }
    </Card>
  )
}
const Card = styled.div`
  background: #1D2D71;
  border: 1px solid #00BFD5;
  padding: 24px 0px;
  .cn-wallet-btn {
    height: 40px;
    width: 100%;
  }
`

const CurrencyBox = styled.div`
  flex-direction: row;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
`

const RightCurrency = styled.div`
  margin-left:15px
`
// const CardItem = styled.div`
//   margin-top:25px
// `

export default ClaimToken