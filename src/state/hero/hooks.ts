import {useCallback, useEffect, useState} from 'react'
import {claimBox} from 'views/BlindBox/Config/config'
import {openBox, currentBoxes} from 'config/constants/boxes'
import {multicallv2} from 'utils/multicall'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppDispatch } from 'state'
import heroNftConfig from 'config/constants/heroNFT'
import openBoxConfig from 'config/constants/openBox'
import { marketplaceConfig } from 'config/constants'
import { fetchListsNFT } from 'utils/fetchListNft'
import fetchAttributeHero from 'utils/getAttributeHero'
import { fetchHeroConfig } from 'state/common/commonSlice'
import { IBox, IBoxDetail, IBoxUser } from './types'
import { fetchPublicHeroData } from './actions'

export const useFetchHero = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(heroNftConfig.contractAddress),
          name: 'balanceOf',
          params: [account]
        }
      ]
      const [totalHeroes] = await multicallv2(heroNftConfig.abi, calls)
      const heroIds: any[] = await fetchListsNFT(account, Number(new BigNumber(totalHeroes).toJSON()), getAddress(heroNftConfig.contractAddress), heroNftConfig.abi)
      // const result: any = await Promise.all(heroesId.map(async(d) => {
      //   const heroesData = await fetchAttributeHero(d)
      //   return {...heroesData, dob: null, parent1: "0", parent2: "0" }
      // }))
      setData(heroIds)
      dispatch(fetchPublicHeroData({ heroIds }))
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

export const useGetHeroConfig = () => {
  const dispatch = useAppDispatch()
  const fetchData = useCallback(() => {
    dispatch(fetchHeroConfig())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])
}