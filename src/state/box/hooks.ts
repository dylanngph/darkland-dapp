import {useCallback, useEffect, useState} from 'react'
import {claimBox} from 'views/BlindBox/Config/config'
import {openBox, currentBoxes} from 'config/constants/boxes'
import {multicallv2} from 'utils/multicall'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import heroNftConfig from 'config/constants/heroNFT'
import openBoxConfig from 'config/constants/openBox'
import { marketplaceConfig } from 'config/constants'
import fetchAttributeHero from 'utils/getAttributeHero'
import { IBox, IBoxDetail, IBoxUser } from './types'
import { fetchPublicMysteryBoxData, fetchPublicBoxData } from './actions'

export const useFetchClaimedBox = () => {
	const dispatch = useDispatch<AppDispatch>()
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<IBoxUser>(null)
  const fetchData = useCallback(async () => {
    try {
      const callsBalance = [
        {
          address: getAddress(claimBox.contractAddress),
          name: 'balanceOf',
          params: [account],
        },
        {
          address: getAddress(claimBox.contractAddress),
          name: 'isApprovedForAll',
          params: [account, getAddress(openBox.contractAddress)],
        },
      ]

      const [balanceOfBig, [isApprovedForAll]] = await multicallv2(claimBox.abi, callsBalance)
      const balanceOf = Number(new BigNumber(balanceOfBig).toJSON())

      const calls = () => {
        const arr = []
        for (let i = 0; i < balanceOf; i++) {
          arr.push({
            address: getAddress(claimBox.contractAddress),
            name: 'tokenOfOwnerByIndex',
            params: [account, i],
          })
        }
        return arr
      }
      const tokenOfOwnerByIndex = await multicallv2(claimBox.abi, calls())
      const listBoxes = tokenOfOwnerByIndex.map((entry) => {
        return Number(new BigNumber(entry).toJSON())
      })

      const result: any = {
        balanceOf,
        isApprovedForAll,
        listBoxes,
      }

      setData(result)
			dispatch(fetchPublicMysteryBoxData(result))
    } catch (e) {
      console.log(e)
    }
  }, [account, dispatch])

  useEffect(() => {
    if (account) {
			fetchData()
		}
  }, [account, fetchData, fastRefresh])

  return data
}

export const useFetchMyBox = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<IBoxDetail[]>(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = currentBoxes.map((entry) => ({
        address: getAddress(entry.boxAddress),
        name: 'balanceOf',
        params: [account],
      }))

      const balanceOf = await multicallv2(currentBoxes[0].abi, calls)

      const result: any = currentBoxes.map((entry, i) => ({
        id: entry.id,
        label: entry.label,
        img: entry.img,
        title: entry.title,
        boxAddress: getAddress(entry.boxAddress),
        balanceOf: Number(new BigNumber(balanceOf[i]).toJSON()),
      }))

      setData(result)
      dispatch(fetchPublicBoxData(result))
    } catch (e) {
      console.log(e)
    }
  }, [account, dispatch])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}