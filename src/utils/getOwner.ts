import BigNumber from "bignumber.js"
import { Address } from "config/constants/types"
import erc20Abi from 'config/abi/erc20.json'
import { getAddress } from "./addressHelpers"
import { multicallv2 } from "./multicall"

const getOwner = async(sender: Address, tokenId: string) => {
  // if (!account) return null
  const [[owner]] = await multicallv2([{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}], [{
    address: getAddress(sender),
    name: 'ownerOf',
    params: [tokenId]
  }])

  return owner
}

export default getOwner