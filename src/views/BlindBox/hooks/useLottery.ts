import {useCallback, useEffect, useState} from 'react'
import {lotteryConfig} from 'config/constants/blindBox'
import {multicallv2} from 'utils/multicall'
import lotteryBlindBoxABI from 'config/abi/lotteryBlindBox.json'
import erc20ABI from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import {Address} from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import _ from 'lodash'
import {BIG_TEN} from 'utils/bigNumber'

interface PropsList {
  amountHTDRequired: number
  endTime: number
  startTime: number
  timeLock: number
  totalTicket: number
  totalUser: number
  userAmountStakeHTD: number
  userIsCount: boolean
  isAllowance: boolean
  balanceOf: number
}

export const useLottery = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<PropsList>({
    amountHTDRequired: 200,
    endTime: 0,
    startTime: 0,
    timeLock: 0,
    totalTicket: 0,
    totalUser: 0,
    userAmountStakeHTD: 0,
    userIsCount: false,
    isAllowance: true,
    balanceOf: 0,
  })
  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'amountHTDRequired',
          params: [],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'endTime',
          params: [],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'startTime',
          params: [],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'timeLock',
          params: [],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'totalTicket',
          params: [],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'totalUser',
          params: [],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'userAmountStakeHTD',
          params: [account],
        },
        {
          address: getAddress(lotteryConfig.contractAddress),
          name: 'userIsCount',
          params: [account],
        },
      ]

      const [allowance, balanceOf] = await multicallv2(erc20ABI, [
        {
          address: getAddress(lotteryConfig.tokenRequire.address),
          name: 'allowance',
          params: [account, getAddress(lotteryConfig.contractAddress)],
        },
        {
          address: getAddress(lotteryConfig.tokenRequire.address),
          name: 'balanceOf',
          params: [account],
        },
      ])

      const [
        amountHTDRequired,
        endTime,
        startTime,
        timeLock,
        totalTicket,
        totalUser,
        userAmountStakeHTD,
        [userIsCount],
      ] = await multicallv2(lotteryBlindBoxABI, calls)

      const result = {
        amountHTDRequired: Number(new BigNumber(amountHTDRequired).toJSON()),
        endTime: Number(new BigNumber(endTime).toJSON()),
        startTime: Number(new BigNumber(startTime).toJSON()),
        timeLock: Number(new BigNumber(timeLock).toJSON()),
        totalTicket: Number(new BigNumber(totalTicket).toJSON()),
        totalUser: Number(new BigNumber(totalUser).toJSON()),
        userAmountStakeHTD: Number(
          new BigNumber(userAmountStakeHTD).div(BIG_TEN.pow(lotteryConfig.tokenRequire.decimals)).toJSON(),
        ),
        userIsCount,
        isAllowance: new BigNumber(allowance).gt(0),
        balanceOf: Number(new BigNumber(balanceOf).div(BIG_TEN.pow(lotteryConfig.tokenRequire.decimals)).toJSON()),
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
