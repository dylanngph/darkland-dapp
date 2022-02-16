import {useCallback, useEffect, useState} from 'react'
import {blindBoxConfig, ticketBoxConfig} from 'config/constants/blindBox'
import {multicallv2} from 'utils/multicall'
import blindBoxAbi from 'config/abi/blindBoxAbi.json'
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
  const [data, setData] = useState<PropsList>(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'countTicketHTD',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'countTicketNFT',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'maxTicketHTD',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'maxTicketNFT',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'startTimeStakeNFTAndStakeHTD',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'timeEndStakeNFTAndStakeHTD',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'timeLockNFTAndHTD',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'totalUser',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'totalUserStakeNFT',
          params: [],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'userIsCount',
          params: [account],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'userIsLockNFT',
          params: [account],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'userNFTDetails',
          params: [account],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'userTickets',
          params: [account],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'userTierDetails',
          params: [account],
        },
      ]

      const [allowance, balanceOf] = await multicallv2(erc20ABI, [
        {
          address: getAddress(blindBoxConfig.tokenRequire.address),
          name: 'allowance',
          params: [account, getAddress(blindBoxConfig.contractAddress)],
        },
        {
          address: getAddress(blindBoxConfig.tokenRequire.address),
          name: 'balanceOf',
          params: [account],
        },
      ])

      const [
        countTicketNFT,
        countTicketHTD,
        maxTicketNFT,
        maxTicketHTD,
        startTimeStakeNFTAndStakeHTD,
        timeEndStakeNFTAndStakeHTD,
        timeLockNFTAndHTD,
        totalUser,
        totalUserStakeNFT,
        [userIsCount],
        [userIsLockNFT],
        userNFTDetails,
        userTickets,
        userTierDetails,
      ] = await multicallv2(blindBoxAbi, calls)

      const userNFTDetailsMapping: NFTDetails = {
        nft: userNFTDetails.nft,
        user: userNFTDetails.user,
        tokenId: Number(new BigNumber(userNFTDetails.tokenId._hex).toJSON()),
        isStake: userNFTDetails.isStake,
      }

      const userTierDetailsMapping: TierDetails = {
        tierId: Number(new BigNumber(userTierDetails.tierID._hex).toJSON()),
        htdAmount: Number(
          new BigNumber(userTierDetails.htdAmount._hex).div(BIG_TEN.pow(blindBoxConfig.tokenRequire.decimals)).toJSON(),
        ),
      }

      const result: PropsList = {
        countTicketNFT: Number(new BigNumber(countTicketNFT).toJSON()),
        countTicketHTD: Number(new BigNumber(countTicketHTD).toJSON()),
        maxTicketHTD: Number(new BigNumber(maxTicketHTD).toJSON()),
        maxTicketNFT: Number(new BigNumber(maxTicketNFT).toJSON()),
        startTimeStakeNFTAndStakeHTD: Number(new BigNumber(startTimeStakeNFTAndStakeHTD).toJSON()),
        timeEndStakeNFTAndStakeHTD: Number(new BigNumber(timeEndStakeNFTAndStakeHTD).toJSON()),
        timeLockNFTAndHTD: Number(new BigNumber(timeLockNFTAndHTD).toJSON()),
        totalUser: Number(new BigNumber(totalUser).toJSON()),
        totalUserStakeNFT: Number(new BigNumber(totalUserStakeNFT).toJSON()),
        userIsCount,
        userIsLockNFT,
        userNFTDetails: userNFTDetailsMapping,
        userTickets: Number(new BigNumber(userTickets).toJSON()),
        userTierDetails: userTierDetailsMapping,
        isAllowance: new BigNumber(allowance).gt(0),
        balanceOf: Number(new BigNumber(balanceOf).div(BIG_TEN.pow(blindBoxConfig.tokenRequire.decimals))),
      }

      setData(result)
    } catch (e) {
      console.log(e)
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

      const result = {
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

      setData(result)
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
    const contractAddress = ticketBoxConfig.contractAddress.free
    const abi = ticketBoxConfig.abi.free
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
        name: 'userLastTimeBuy',
        params: [account],
      },
    ]

    try {
      const [startTime, endTime, totalBoxCM, totalBoxR, totalBoxSR, totalBoxSSR, totalNFT, userLastTimeBuy] =
        await multicallv2(abi, calls)

      const result = {
        startTime: Number(new BigNumber(startTime).toJSON()),
        endTime: Number(new BigNumber(endTime).toJSON()),
        totalBoxCM: Number(new BigNumber(totalBoxCM).toJSON()),
        totalBoxR: Number(new BigNumber(totalBoxR).toJSON()),
        totalBoxSR: Number(new BigNumber(totalBoxSR).toJSON()),
        totalBoxSSR: Number(new BigNumber(totalBoxSSR).toJSON()),
        totalNFT: Number(new BigNumber(totalNFT).toJSON()),
        userLastTimeBuy: Number(new BigNumber(userLastTimeBuy).toJSON()),
      }

      setData(result)
    } catch (err) {
      console.log(err)
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
