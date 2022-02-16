import BigNumber from "bignumber.js"
import { multicallv2 } from "./multicall"

export const fetchListsNFT = async(account: string, total: number, contractAddress: string, abi: any) => {
    let result = []
    if (total === 0) return result
    const calls = []
    for (let i = 0; i < total; i++) {
      calls.push({
        address: contractAddress,
        name: 'tokenOfOwnerByIndex',
        params: [account, i],
      })
    }
    const tokenOfOwnerByIndex = await multicallv2(abi, calls)
    result = tokenOfOwnerByIndex.map((entry) => {
      return Number(new BigNumber(entry).toJSON())
    }).sort((a, b) => a - b)
  
    return result
  }