import React from 'react'
import './wallet.modules.scss'
import styled from 'styled-components'
import {formatNumber} from 'utils/formatBalance'
import useGetYourBalance from 'views/Home/hooks/useGetYourBalance'
import { useFetchMyBox } from 'views/MyAssets/hooks/useFetchMysteryBox'
import {useAssetsUser} from 'views/MyAssets/hooks/fetchAssetsUser'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

const TotalAsset = () => {
  const {adt} = useGetYourBalance()
  const myBoxes = useFetchMyBox()
  const {data} = useAssetsUser()
  const totalNfts = () => {
    const result = data ? data.map(entry => entry.totalNft) : []
    return result.reduce((a,b) => a + b , 0)
  }
  const totalBoxes = () => {
    const result = myBoxes ? myBoxes.map((entry) => entry.balanceOf) : []
    return result.reduce((a,b) => a + b, 0)
  }

  const { heroData } = useSelector((state: AppState) => state.hero)
  
  return (
    <div className='w-full mt-3 lg:mt-0 lg:w-1/2' >
      <div className='grid grid-cols-2 gap-3 justify-content'>
        <CurrencyBox className='smart-chain'>
          <img src='/images/coins/adt.png' alt='adt' height={40} width={40} />
          <h1 className='text-sm'> {formatNumber(adt) ?? 0} HTD </h1>
        </CurrencyBox>
        <CurrencyBox className='smart-chain'>
          <img src='/images/coins/cgc.png' alt='cgc3' height={40} width={40} />
          <h1 className='text-sm'> --- CGC </h1>
        </CurrencyBox>
      </div>
      <div className='grid grid-cols-3 gap-3 mt-5 ' >
        <CurrencyBox className='smart-chain'>
          <img src='/images/blindbox/my-asset-tab-1.png' alt='adt' height={40} width={40} />
          <h1> {totalBoxes() ?? 0} Boxes </h1>
        </CurrencyBox>
        <CurrencyBox className='smart-chain'>
          <img src='/images/blindbox/my-asset-tab-2.png' alt='cgc3' height={40} width={40} />
          <h1> { heroData?.length ?? 0 } Heroes </h1>
        </CurrencyBox>
        <CurrencyBox className='smart-chain'>
          <img src='/images/blindbox/my-asset-tab-3.png' alt='cgc3' height={40} width={40} />
          <h1 className='text-sm'> {totalNfts() ?? 0} NFT </h1>
        </CurrencyBox>
      </div>
    </div>
  )
}

const CurrencyBox = styled.div`
  flex-direction: column;
  display: flex;
  align-items:center;
  padding: 24.5px 0px;
  font-size: 14px;
`

export default TotalAsset
