import {useCallback, useEffect, useState} from 'react'
// import {claimBox} from 'views/BlindBox/Config/config'
import {blindBoxConfig} from 'config/constants/blindBox'
import {openBox, currentBoxes} from 'config/constants/boxes'
import {multicallv2} from 'utils/multicall'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import heroNftConfig from 'config/constants/heroNFT'
import openBoxConfig from 'config/constants/openBox'
import { marketplaceConfig } from 'config/constants'
import fetchAttributeHero from 'utils/getAttributeHero'
import { fetchListsNFT } from 'utils/fetchListNft'
import { IBox, IBoxDetail } from '../types'

export const useFetchClaimedBox = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<any>(null)
  const fetchData = useCallback(async () => {
    try {
      const callsBalance = [
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'balanceOf',
          params: [account],
        },
        {
          address: getAddress(blindBoxConfig.contractAddress),
          name: 'isApprovedForAll',
          params: [account, getAddress(openBox.contractAddress)],
        },
      ]

      const [balanceOfBig, [isApprovedForAll]] = await multicallv2(blindBoxConfig.abi, callsBalance)
      const balanceOf = Number(new BigNumber(balanceOfBig).toJSON())

      const calls = () => {
        const arr = []
        for (let i = 0; i < balanceOf; i++) {
          arr.push({
            address: getAddress(blindBoxConfig.contractAddress),
            name: 'tokenOfOwnerByIndex',
            params: [account, i],
          })
        }
        return arr
      }
      const tokenOfOwnerByIndex = await multicallv2(blindBoxConfig.abi, calls())
      const listBoxes = tokenOfOwnerByIndex.map((entry) => {
        return Number(new BigNumber(entry).toJSON())
      })

      const result = {
        balanceOf,
        isApprovedForAll,
        listBoxes,
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

export const useFetchBox = (id: number) => {
  const {account} = useWeb3React()
  const { fastRefresh } = useRefresh()
  const [data, setData] = useState<IBox>({
    listsNFT: [],
    isAllowance: true
  })
  const box = currentBoxes.find((d) => d.id === id)

  const fetchData = useCallback(async() => {
    try {
      const calls = [
        {
          address: getAddress(box.boxAddress),
          name: 'balanceOf',
          params: [account]
        },
        {
          address: getAddress(box.boxAddress),
          name: 'isApprovedForAll',
          params: [account, getAddress(marketplaceConfig.contractAddress.box)]
        }
      ]
      
        const [balanceOf, [isAllowance]] = await multicallv2(box.abi, calls)
        const balance = Number(new BigNumber(balanceOf).toJSON())
        const listsNFT = await fetchListsNFT(account, balance, getAddress(box.boxAddress), box.abi)
        setData({ listsNFT, isAllowance })
    } catch(err) {
      console.log(err)
    }
  }, [account, box])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}

export const useFetchOpenBox = (id: number) => {
  const {account} = useWeb3React()
  const { fastRefresh } = useRefresh()
  const [data, setData] = useState<IBox>({
    listsNFT: [],
    isAllowance: true
  })
  const box = currentBoxes.find((d) => d.id === id)
  const openBoxContract = openBoxConfig.find((d) => d.boxId === id)

  const fetchData = useCallback(async() => {
    try {
      const calls = [
        {
          address: getAddress(box.boxAddress),
          name: 'balanceOf',
          params: [account]
        },
        {
          address: getAddress(box.boxAddress),
          name: 'isApprovedForAll',
          params: [account, getAddress(openBoxContract.contractAddress)]
        }
      ]
      
        const [balanceOf, [isAllowance]] = await multicallv2(box.abi, calls)
        const balance = Number(new BigNumber(balanceOf).toJSON())
        const listsNFT = await fetchListsNFT(account, balance, getAddress(box.boxAddress), box.abi)
        setData({ listsNFT, isAllowance })
    } catch(err) {
      console.log(err)
    }
  }, [account, box, openBoxContract])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}

export const useFetchMyBox = () => {
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

      const result = currentBoxes.map((entry, i) => ({
        id: entry.id,
        label: entry.label,
        img: entry.img,
        title: entry.title,
        boxAddress: getAddress(entry.boxAddress),
        balanceOf: Number(new BigNumber(balanceOf[i]).toJSON()),
      }))

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

export const useFetchHero = () => {
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
      const heroesId = await fetchListsNFT(account, Number(new BigNumber(totalHeroes).toJSON()), getAddress(heroNftConfig.contractAddress), heroNftConfig.abi)

      const result = await Promise.all(heroesId.map(async(d) => {
        const heroesData = await fetchAttributeHero(d)
        return {...heroesData, dob: null, parent1: "0", parent2: "0" }
      }))
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

// export const fetchListsNFT = async(account: string, total: number, contractAddress: string, abi: any) => {
//   let result = []
//   if (total === 0) return result
//   const calls = []
//   for (let i = 0; i < total; i++) {
//     calls.push({
//       address: contractAddress,
//       name: 'tokenOfOwnerByIndex',
//       params: [account, i],
//     })
//   }
//   const tokenOfOwnerByIndex = await multicallv2(abi, calls)
//   result = tokenOfOwnerByIndex.map((entry) => {
//     return Number(new BigNumber(entry).toJSON())
//   }).sort((a, b) => a - b)

//   return result
// }


export const useFetchMysteryBox = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(blindBoxConfig.boxesAddress.mystery),
          name: 'balanceOf',
          params: [account]
        }
      ]
      const [balanceOf] = await multicallv2(blindBoxConfig.boxesAbi.mystery, calls)
      const result = Number(new BigNumber(balanceOf).toJSON())
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

export const useFetchMysteryBoxId = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const balanceOf = useFetchMysteryBox()
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = []
      if(balanceOf){
        for(let i = 0; i < balanceOf ; i++ ){
          calls.push(
            {
              address: getAddress(blindBoxConfig.boxesAddress.mystery),
              name: 'tokenOfOwnerByIndex',
              params: [account , i]
            }
          )
        }
      }
      const tokenOfOwnerByIndex = await multicallv2(blindBoxConfig.boxesAbi.mystery, calls)
      const result = tokenOfOwnerByIndex.flatMap(item => Number(new BigNumber(item).toJSON())) 
      setData(result)
    } catch (e) {
      console.log(e)
    }
  }, [account, balanceOf])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}



export const useFetchPremiumBox = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(blindBoxConfig.boxesAddress.premium),
          name: 'balanceOf',
          params: [account]
        }
      ]
      const [balanceOf] = await multicallv2(blindBoxConfig.boxesAbi.premium, calls)
      const result = Number(new BigNumber(balanceOf).toJSON())
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

export const useFetchPremiumBoxId = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const balanceOf = useFetchPremiumBox()
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    try {
      const calls = []
      if(balanceOf){
        for(let i = 0; i < balanceOf ; i++ ){
          calls.push(
            {
              address: getAddress(blindBoxConfig.boxesAddress.premium),
              name: 'tokenOfOwnerByIndex',
              params: [account , i]
            }
          )
        }
      }
      const tokenOfOwnerByIndex = await multicallv2(blindBoxConfig.boxesAbi.premium, calls)
      const result = tokenOfOwnerByIndex.flatMap(item => Number(new BigNumber(item).toJSON())) 
      setData(result)
    } catch (e) {
      console.log(e)
    }
  }, [account, balanceOf])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}