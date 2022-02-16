import React from 'react'
import BinanceSmartChain from './BinanceSmartChain'
import ClaimToken from './ClaimToken'
import TotalAsset from './TotalAsset'

const AssetWallet = () => {
  return (
    <div>
      <h1 className='h-10 mt-3' style={{fontWeight: '700' , fontSize: '24px'}} >Wallet</h1>
      <div className='flex flex-col lg:flex-row' >
        <BinanceSmartChain />

        <TotalAsset />
      </div>
      <h1 className='h-10 mt-8' style={{fontWeight: '700' , fontSize: '24px'}}>Ingame Curency</h1>
      <ClaimToken />
    </div>
  )
}

export default AssetWallet