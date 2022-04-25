import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import './wallet.modules.scss'
import { Tooltip } from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import useGetYourBalance from 'views/Home/hooks/useGetYourBalance'

const BinanceSmartChain = () => {
  const {busd} = useGetYourBalance()

  const { account } = useWeb3React();
  const [copy, setCopy] = useState('Copy');
  const splitAddress = () => {
    if (account) {
      const positionSubString = 20
      const result = account.substring(0, positionSubString)
      const result2 = account.substring(account.length - 4, account.length)

      return `${result}...${result2}`
    }
    return ''
  }

  return (
    <div className='flex flex-col justify-between w-full mt-3 lg:mt-0 lg:w-2/3 mr-5'
      style={{ 
        // backgroundImage: "url('/images/my-assets/bg-binance-1.png')", 
        // backgroundRepeat: "no-repeat", 
        // backgroundPosition: "center", 
        // backgroundSize: "cover", 
        // objectFit: 'cover',
        backgroundColor: '#1D2D71',
        border: '1px solid #00BFD5',
        }}
      >
      <div className='mt-5 ml-5' >
        {/* <h1 className='h-5' style={{ color: "#FFC247" , fontWeight: '700' }} >Binance Smart Chain</h1> */}
        <div className='flex items-center' >
          <div className='mr-3'>
            <img className="h-15 w-15" src="/images/coins/busd.png" alt="BUSD" width={42} height={42} />
          </div>
          <div>
            <p className='text-white text-xl' > {formatNumber(busd) ?? 0} BUSD</p>
            {/* <p style={{ color: "#929292" }} className='mt-1' > {formatNumber(busd) ?? 0} USD</p> */}
            <p className='text-sm mt-1' style={{ color: "#00FB28" }} >Buy BUSD</p>
          </div>
        </div>
      </div>
      <div className='mt-5 ml-5 mb-5' >
        {/* <h1 className='h-5' style={{ color: "#FFC247" , fontWeight: '700' }} >Binance Smart Chain</h1> */}
        <div className='flex items-center' >
          <div className='mr-3'>
            <img className="h-15 w-15" src="/images/coins/big.png" alt="BUSD" width={42} height={42} />
          </div>
          <div>
            <p className='text-white text-xl' > {formatNumber(busd) ?? 0} BIG</p>
            {/* <p style={{ color: "#929292" }} className='mt-1' > {formatNumber(busd) ?? 0} USD</p> */}
            <p className='text-sm mt-1' style={{ color: "#00FB28" }} >Buy BIG</p>
          </div>
        </div>
      </div>
      <div className='address-bottom flex flex-row justify-between' style={{borderTopColor: '#00BFD5'}} >
        <h1 className='ml-8 text-xs' style={{ color: "#FFFFFF" }} >Address: {splitAddress()}</h1>
        <Tooltip placement="top-start" 
        label={copy} >
          <div role="button" tabIndex={0}
            onClick={() => { navigator.clipboard.writeText(account) }}
            onKeyDown={(e) => { navigator.clipboard.writeText(account) }}>
            <img className="h-4 w-4 mr-8" src="/images/my-assets/copy_btn.png" alt="copy"/>
          </div>
        </Tooltip>


      </div>
    </div>
  )
}

export default BinanceSmartChain