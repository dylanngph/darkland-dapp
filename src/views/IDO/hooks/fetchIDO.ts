import {useCallback, useEffect, useState} from 'react'
import {bountiesConfig} from 'config/constants'
import {multicallv2} from 'utils/multicall'
import bountyABI from 'config/abi/farmNftBounty.json'
import idoABI from 'config/abi/ido.json'
import erc20ABI from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import {Address} from 'config/constants/types'
import idoConfig from 'config/constants/idos'
import useRefresh from 'hooks/useRefresh'
import _ from 'lodash'

interface PropsList {
  type: string
  name: string
  heroVideo: string
  framesImage: string
  tokenId: number
  icon: string
  nftAddress: Address
}

export const useNftUser = (idoId) => {
  const {account} = useWeb3React()
  const [data, setData] = useState<PropsList[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const idoInfo = idoConfig.find((ido) => ido.id === Number(idoId))
  const nftRequires = idoInfo.nftRequire

  const fetchAssetUser = useCallback(async () => {
    try {
      setIsLoaded(true)
      const arrNft: PropsList[] = []
      await Promise.all(
        nftRequires.map(async (nft) => {
          const bounty = bountiesConfig.find((s) => s.slug === nft.name)
          const total = await fetchBalanceNft(account, bounty)
          const nftLists = await fetchListNftUser(account, total, bounty)
          nftLists.map((d) => {
            const nftInfo = {
              type: bounty.slug,
              name: bounty.nameNFT,
              heroVideo: bounty.heroVideo,
              framesImage: bounty.framesImage,
              tokenId: d,
              icon: bounty.image,
              nftAddress: bounty.contractAddress,
            }
            arrNft.push(nftInfo)
            return null
          })
          return null
        }),
      )
      const sortData = _.orderBy(arrNft, ['type'], ['asc'])
      setData(sortData)
      // const result = bountiesConfig.map((d, i) => {
      //     return { ...d, totalNft: Number(new BigNumber(totalNfts[i]).toJSON()) }
      // })
      // .filter(d => nftRequires.filter(nft => d.slug === nft).length > 0)
      // .filter(d => d.totalNft > 0)

      // setData(result)
    } finally {
      setIsLoaded(false)
    }
  }, [account, nftRequires])

  useEffect(() => {
    if (account) fetchAssetUser()
  }, [account, fetchAssetUser])

  return {data, isLoaded}
}

export const fetchBalanceNft = async (account, bounty) => {
  if (!bounty) return 0
  const call = [
    {
      address: getAddress(bounty.contractAddress),
      name: 'balanceOf',
      params: [account],
    },
  ]
  const [total] = await multicallv2(bountyABI, call)
  return Number(new BigNumber(total).toJSON())
}

export const fetchListNftUser = async (account, total, bounty) => {
  if (!bounty) return []

  if (total === 0) return []
  const calls = []

  for (let i = 0; i < total; i++) {
    calls.push({
      address: getAddress(bounty.contractAddress),
      name: 'tokenOfOwnerByIndex',
      params: [account, i],
    })
  }

  try {
    const result = await multicallv2(bountyABI, calls)
    return result.map((d) => {
      return Number(new BigNumber(d).toJSON())
    })
  } catch (err) {
    console.log(err)
  }

  return []
}

// export const useAllowance = async(address: Address, idoAddress: Address) => {
//     const { account } = useWeb3React()
//     const [state, setState] = useState(false)

//     const fetchAllowance = useCallback(async() => {
//         try {
//             const call = [{
//                 address: getAddress(address),
//                 name: 'isApprovedForAll',
//                 params: [account, getAddress(idoAddress)]
//             }]
//             const [allowance] = await multicallv2(bountyABI, call)
//             console.log("allowance", allowance)
//             setState(allowance)
//         } catch(e) {
//             console.log(e)
//         }
//     }, [account, address, idoAddress])

//     useEffect(() => {
//         if (account) fetchAllowance()
//     }, [account, address, idoAddress, fetchAllowance])

//     return state
// }

export const fetchAllowance = async (account: string, address: Address, idoAddress: Address) => {
  let result = false
  try {
    const call = [
      {
        address: getAddress(address),
        name: 'isApprovedForAll',
        params: [account, getAddress(idoAddress)],
      },
    ]
    const [[allowance]] = await multicallv2(bountyABI, call)
    result = allowance
  } catch (e) {
    console.log(e)
  }
  return result
}

export const fetchUserIsLock = async (account: string, idoAddress: Address, idoId: number) => {
  const idoInfo = idoConfig.find((ido) => ido.id === idoId)
  let result
  try {
    const calls = [
      {
        address: getAddress(idoAddress),
        name: 'userIsLockNFT',
        params: [account],
      },
      {
        address: getAddress(idoAddress),
        name: 'timeLockNFT',
        params: [],
      },
      {
        address: getAddress(idoAddress),
        name: 'userWhitelistPaid',
        params: [account],
      },
      {
        address: getAddress(idoAddress),
        name: 'userIsClaimIDO',
        params: [account],
      },
      {
        address: getAddress(idoAddress),
        name: 'timeClaimIDO',
        params: [],
      },
      {
        address: getAddress(idoAddress),
        name: 'userWhitelist',
        params: [account],
      },
      {
        address: getAddress(idoAddress),
        name: 'endTimeStakeNFT',
        params: [],
      },
    ]

    const [allowance, balanceOf, balanceOfEarn] = await multicallv2(erc20ABI, [
      {
        address: getAddress(idoInfo.tokenPrice.address),
        name: 'allowance',
        params: [account, getAddress(idoAddress)],
      },
      {
        address: getAddress(idoInfo.tokenPrice.address),
        name: 'balanceOf',
        params: [account],
      },
      {
        address: getAddress(idoInfo.tokenEarn.address),
        name: 'balanceOf',
        params: [account],
      },
    ])

    const [[isLocked], timeLockNFT, [isPaid], [isClaim], timeClaimIDO, [userWhitelist], endTimeStakeNFT] =
      await multicallv2(idoABI, calls)
    result = {
      isLocked,
      timeLockNFT: Number(new BigNumber(timeLockNFT).toJSON()),
      isPaid,
      tokenAllowance: new BigNumber(allowance).isGreaterThan(0),
      isClaim,
      balanceOf: Number(new BigNumber(balanceOf).toJSON()) / 10 ** idoInfo.tokenPrice.decimals,
      timeClaimIDO: Number(new BigNumber(timeClaimIDO).toJSON()),
      userWhitelist,
      endTimeStakeNFT: Number(new BigNumber(endTimeStakeNFT).toJSON()),
      balanceOfEarn: Number(new BigNumber(balanceOfEarn).toJSON()) / 10 ** idoInfo.tokenEarn.decimals,
    }
  } catch (e) {
    console.log(e)
  }
  return result
}
