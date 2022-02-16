import { useWeb3React } from "@web3-react/core"
import BigNumber from "bignumber.js"
import { Address } from "config/constants/types"
import { getAddress } from "./addressHelpers"
import { BIG_TEN } from "./bigNumber"
import { multicallv2 } from "./multicall"

const getBalanceOf = async(account: string, tokenAddress: Address, decimals = 18) => {
    if (!account) return 0
    const calls = [{
        address: getAddress(tokenAddress),
        name: 'balanceOf',
        params: [account]
    }]

    const [balanceOf] = await multicallv2([  {
    "inputs": [
        {
        "internalType": "address",
        "name": "owner",
        "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },], calls)
    return Number(new BigNumber(balanceOf).div(BIG_TEN.pow(decimals)).toJSON()) ?? 0
}

export default getBalanceOf