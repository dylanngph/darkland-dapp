import BigNumber from "bignumber.js"
import { Address } from "config/constants/types"
import erc20Abi from 'config/abi/erc20.json'
import { getAddress } from "./addressHelpers"
import { multicallv2 } from "./multicall"

const checkAllowance = async(account: string, sender: Address, opentor: Address) => {
  if (!account) return false
  const [allowance] = await multicallv2(erc20Abi, [{
    address: getAddress(sender),
    name: 'allowance',
    params: [account, getAddress(opentor)]
  }])

  return new BigNumber(allowance).gt(0)
}

export default checkAllowance