import {useEffect, useState, useCallback} from 'react'
import useRefresh from 'hooks/useRefresh'
import {multicallv2} from 'utils/multicall'
import {useWeb3React} from '@web3-react/core'
import {VestingTGE, VestingStage} from 'config/constants/vesting'
// import { BountyConfig } from 'config/constants/types'
import vestingStrategicAbi from 'config/abi/vestingStrategic.json'
import erc20Abi from 'config/abi/erc20.json'
import {getAddress} from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

export interface Address {
  97?: string
  56: string
}

interface listContract {
  privateSale: Address
  strategic: Address
}

export interface vestingPropsType {
  id?: number
  slug?: string
  contractAddress?: listContract
  totalTokenLock?: number
  userRemaining?: number
  getAllStage?: number
  balanceOf?: number
  releasedClaim?: number
  getAllocation?: any
  getReleased?: any
  vestable?: any
  getTGERelease?: any
  getCliffDuration?: any
  canUnlockAmount?:any
  infoWallet?:any
}

export const useFetchVestingTGE = (): vestingPropsType => {
  const vestingData = VestingTGE
  const {account} = useWeb3React()
  // const account = '0x40D2a4C05d863B5355Abe3C606100d6843C21041'

  const {fastRefresh} = useRefresh()
  const [state, setState] = useState(vestingData)

  const fetchVestingTGE = useCallback(async () => {
    const contractAddress = vestingData.contractAddress.privateSale
    try {
      const calls = [
        {
          address: getAddress(contractAddress),
          name: 'canUnlockAmount',
          params: [account],
        },
        {
          address: getAddress(contractAddress),
          name: 'infoWallet',
          params: [account],
        },
      ]
      const calls2 = [
        {
          address: getAddress(vestingData.token.address),
          name: 'balanceOf',
          params: [account],
        },
      ]
      const [canUnlockAmount , infoWallet] = await multicallv2(vestingStrategicAbi, calls)
      const [balanceOf] = await multicallv2(erc20Abi, calls2)


      const result = {
        ...vestingData,
        canUnlockAmount: Number(new BigNumber(canUnlockAmount).toJSON()),
        infoWallet: infoWallet.map(entry => Number(new BigNumber(entry._hex).toJSON())),
        balanceOf: Number(new BigNumber(balanceOf / 10 ** vestingData.token.decimals).toJSON()),
      }
      setState(result)
    } catch (err) {
      console.log(err)
    }
  }, [account, vestingData])

  useEffect(() => {
    if (account) fetchVestingTGE()
  }, [account, fastRefresh, fetchVestingTGE])
  return state
}

export const useFetchVestingStage = () => {
  const vestingData = VestingStage
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [state, setState] = useState(vestingData)
  const {getAllStage} = useFetchVestingTGE()

  const fetchBountyUserData = useCallback(async () => {
    const contractAddress = VestingTGE.contractAddress.strategic
    try {
      const calls = () => {
        const stages = []
        for (let i = 0; i < getAllStage; i++) {
          stages.push({
            address: getAddress(contractAddress),
            name: 'listStage',
            params: [i],
          })
        }
        return stages
      }
      const listStage = await multicallv2(vestingStrategicAbi, calls())

      const callsClaimed = () => {
        const claimed = []
        for (let i = 0; i < getAllStage; i++) {
          claimed.push({
            address: getAddress(contractAddress),
            name: 'userIsClaimStage',
            params: [account, i + 1],
          })
        }
        return claimed
      }
      const isClaimed = await multicallv2(vestingStrategicAbi, callsClaimed())

      const tempStage = listStage.map((entry) => {
        return {...entry}
      })

      const tempClaimed = isClaimed.map((entry) => {
        return entry[0]
      })

      const result = tempStage.map((entry, i) => {
        return {
          id: Number(new BigNumber(entry.id._hex).toJSON()),
          stageRelease: Number(new BigNumber(entry.stageRelease._hex).toJSON()),
          startTime: Number(new BigNumber(entry.startTime._hex).toJSON()),
          endTime: Number(new BigNumber(entry.endTime._hex).toJSON()),
          stageClaimed: tempClaimed[i],
        }
      })

      setState(result)
    } catch (err) {
      console.log(err)
    }
  }, [account, getAllStage])

  useEffect(() => {
    if (account) fetchBountyUserData()
  }, [account, fastRefresh, fetchBountyUserData])
  return state
}
