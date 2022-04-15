import BigNumber from "bignumber.js"
import { Address } from "config/constants/types"
import erc20Abi from 'config/abi/erc20.json'
import { getAddress } from "./addressHelpers"
import { multicallv2 } from "./multicall"
import { BIG_TEN } from "./bigNumber"

const checkBalance = async(account: string, sender: Address, decimals = 18) => {
  if (!account) return 0
  const [balance] = await multicallv2(erc20Abi, [{
    address: getAddress(sender),
    name: 'balanceOf',
    params: [account]
  }])

  return Number(new BigNumber(balance).div(BIG_TEN.pow(decimals)).toJSON())
}

export default checkBalance