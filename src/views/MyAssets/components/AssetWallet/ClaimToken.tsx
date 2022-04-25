import { Button } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import PopupSwap from 'views/IDO/packs/PopupSwap'
import { AppState } from 'state'
import './wallet.modules.scss'
import { useSelector } from 'react-redux'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {useWeb3React} from '@web3-react/core'

const ClaimToken = () => {
  const {account} = useWeb3React()
  const userData = useSelector((state: AppState) => state.user.userInfo)
  return (
    <Card className='w-full lg:w-2/3' >
      <CurrencyBox>
        <div>
          <img src='/images/coins/big.png' alt='htd' className="ml-5" height={42} width={42} />
        </div>
        <RightCurrency>
          <h2 className='text-xl' > {userData?.htd ?? 0}BIG </h2>
          <h2 style={{ color: "#00A3FF" }} className='mt-1 text-sm' >~2524 USD</h2>
        </RightCurrency>

        
      </CurrencyBox>

      <div className='w-full mt-5 px-5' >
        <ConnectWalletButton className="cn-wallet-btn" isCustom='true' scale="sm" />
      </div>
      {/* <Popup
        className='w-full'
        modal
        closeOnDocumentClick
        trigger={
          <Button style={{ width: "90%", marginLeft: "5%" }} size="lg" >
            Claim
          </Button>
        }>{(close) => <PopupSwap close={close} currencyType="HTD" />}
      </Popup> */}

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
`

const RightCurrency = styled.div`
  margin-left:15px
`
// const CardItem = styled.div`
//   margin-top:25px
// `

export default ClaimToken