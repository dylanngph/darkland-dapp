import { Button } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import PopupSwap from 'views/IDO/packs/PopupSwap'
import { AppState } from 'state'
import './wallet.modules.scss'
import { useSelector } from 'react-redux'

const ClaimToken = () => {
  const userData = useSelector((state: AppState) => state.user.userInfo)
  return (
    <div className='w-full' >
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full' >
        <div className='smart-chain'>
          <CurrencyBox>
            <img src='/images/coins/htd_token.png' alt='htd' className="ml-5" height={60} width={60} />
            <RightCurrency>
              <h1 className='text-xl' > {userData?.htd ?? 0} HTD </h1>
              {/* <h1 style={{ color: "#929292" }} className='mt-1 text-xl' >~2524 USD</h1> */}
            </RightCurrency>

          </CurrencyBox>
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

        </div>
        <div className='smart-chain mt-5 sm:mt-0'>
          <CurrencyBox >
            <img src='/images/coins/cgc_token.png' alt='cgc3' className="ml-5" height={60} width={60} />
            <RightCurrency>
              <h1 className='text-xl' > {userData?.cgc ?? 0} CGC </h1>
              {/* <h1 style={{ color: "#929292" }} className='mt-1 text-xl' >~2524 USD</h1> */}
            </RightCurrency>
          </CurrencyBox>
          {/* <Popup
            className='w-full'
            modal
            closeOnDocumentClick
            trigger={
              <Button style={{ width: "90%", marginLeft: "5%", marginBottom: "4%" }} size="lg" >
                Claim
              </Button>
            }>{(close) => <PopupSwap close={close} currencyType="CGC" />}
          </Popup> */}
        </div>

      </div>
    </div>
  )
}

const CurrencyBox = styled.div`
  flex-direction: row;
  display: flex;
  padding: 37px 0px;
  font-size: 14px;
`

const RightCurrency = styled.div`
  margin-left:15px
`
// const CardItem = styled.div`
//   margin-top:25px
// `

export default ClaimToken