import {useCallback, useEffect, useState} from 'react'
import {blindBoxConfig, ticketBoxConfig} from 'config/constants/blindBox'
import {multicallv2} from 'utils/multicall'
import blindBoxAbi from 'config/abi/blindBoxAbi.json'
import blindBoxWhitelistAbi from 'config/abi/blindBoxWhtielist.json'
import erc20ABI from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import {Address} from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import _ from 'lodash'
import {BIG_TEN} from 'utils/bigNumber'
import {PropsList, NFTDetails, TierDetails, BoxWhitelist, BasePropBox} from '../types'

export const useBlindBox = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<BasePropBox>(null)

  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "boxMysteryPrice"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "boxPremiumPrice"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "endTimeWL"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "isUserHadBuyBox",
          params: [account]
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "maxBoxMystery"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "maxBoxPremium"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "percentDiscount"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "startTimeWL"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "totalBoxMystery"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "totalBoxPremium"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "userWhitelist",
          params: [account]
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "userWhitelistDiscount",
          params: [account]
        },
      ]
      const [
        boxMysteryPrice, 
        boxPremiumPrice, 
        endTimeWL, 
        [isUserHadBuyBox], 
        maxBoxMystery, 
        maxBoxPremium,
        percentDiscount,
        startTimeWL, 
        totalBoxMystery,
        totalBoxPremium,
        [userWhitelist],
        [userWhitelistDiscount]
      ] = await multicallv2(blindBoxWhitelistAbi, calls)
      
      const result = {
        common: {
          price: new BigNumber(boxMysteryPrice).toNumber(),
          maxBox: new BigNumber(maxBoxMystery).toNumber(),
          totalBox: new BigNumber(totalBoxMystery).toNumber(),
        },
        premium: {
          price: new BigNumber(boxPremiumPrice).toNumber(),
          maxBox: new BigNumber(maxBoxPremium).toNumber(),
          totalBox: new BigNumber(totalBoxPremium).toNumber(),
        },
        endTimeWL: new BigNumber(endTimeWL).toNumber(),
        isUserHadBuyBox,
        percentDiscount: new BigNumber(percentDiscount).toNumber(),
        startTimeWL: new BigNumber(startTimeWL).toNumber(),
        userWhitelist,
        userWhitelistDiscount
      }
      setData(result)
    } catch(err) {
      console.log("Error", err)
    }
  }, [account])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}

export const useBlindBoxWhitelist = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<BoxWhitelist>(null)

  const fetchData = useCallback(async () => {
    const contractAddress = ticketBoxConfig.contractAddress.whitelist
    const abi = ticketBoxConfig.abi.whitelist
    const calls = [
      {
        address: getAddress(contractAddress),
        name: 'startTime',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'endTime',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'totalBoxCM',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'totalBoxR',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'totalBoxSR',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'totalBoxSSR',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'totalNFT',
        params: [],
      },
      {
        address: getAddress(contractAddress),
        name: 'userAmountTicket',
        params: [account],
      },
      {
        address: getAddress(contractAddress),
        name: 'userLastTimeBuy',
        params: [account],
      },
      {
        address: getAddress(contractAddress),
        name: 'userWhitelist',
        params: [account],
      },
    ]

    try {
      const [
        startTime,
        endTime,
        totalBoxCM,
        totalBoxR,
        totalBoxSR,
        totalBoxSSR,
        totalNFT,
        userAmountTicket,
        userLastTimeBuy,
        [userWhitelist],
      ] = await multicallv2(abi, calls)

      const result: any = {
        startTime: Number(new BigNumber(startTime).toJSON()),
        endTime: Number(new BigNumber(endTime).toJSON()),
        totalBoxCM: Number(new BigNumber(totalBoxCM).toJSON()),
        totalBoxR: Number(new BigNumber(totalBoxR).toJSON()),
        totalBoxSR: Number(new BigNumber(totalBoxSR).toJSON()),
        totalBoxSSR: Number(new BigNumber(totalBoxSSR).toJSON()),
        totalNFT: Number(new BigNumber(totalNFT).toJSON()),
        userAmountTicket: Number(new BigNumber(userAmountTicket).toJSON()),
        userLastTimeBuy: Number(new BigNumber(userLastTimeBuy).toJSON()),
        userWhitelist,
      }
    } catch (err) {
      console.log(err)
    }
  }, [account])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}

export const useBlindBoxFreeZone = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<BasePropBox>(null)

  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "boxMysteryPrice"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "boxMysteryPrice"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "endTimeWL"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "isUserHadBuyBox",
          params: [account]
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "maxBoxMystery"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "maxBoxPremium"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "percentDiscount"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "startTimeWL"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "totalBoxMystery"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "totalBoxPremium"
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "userWhitelist",
          params: [account]
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: "userWhitelistDiscount",
          params: [account]
        },
      ]
      const [
        boxMysteryPrice, 
        boxPremiumPrice, 
        endTimeWL, 
        startTimeWL, 
        [isUserHadBuyBox], 
        maxBoxMystery, 
        maxBoxPremium,
        percentDiscount,
        totalBoxMystery,
        totalBoxPremium,
        [userWhitelist],
        [userWhitelistDiscount]
      ] = await multicallv2(blindBoxWhitelistAbi, calls)
    } catch(err) {
      console.log("Error", err)
    }
  }, [account])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}

export const useBalanceOf = (contractToken, contractBox) => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState({
    balanceOf: 0,
    allowance: true,
  })

  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(contractToken.address),
          name: 'balanceOf',
          params: [account],
        },
        {
          address: getAddress(contractToken.address),
          name: 'allowance',
          params: [account, getAddress(contractBox)],
        },
      ]

      const [balanceOf, allowance] = await multicallv2(erc20ABI, calls)
      const result = {
        balanceOf: Number(new BigNumber(balanceOf).div(BIG_TEN.pow(contractToken.decimals))),
        allowance: new BigNumber(allowance).gt(0),
      }

      setData(result)
    } catch (err) {
      console.log(err)
    }
  }, [account, contractToken, contractBox])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}
