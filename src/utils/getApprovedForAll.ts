import { useWeb3React } from "@web3-react/core"
import { Address } from "config/constants/types"
import { getAddress } from "./addressHelpers"
import { multicallv2 } from "./multicall"

const getApprovedForAll = async(account: string, sender: Address, operator: Address) => {
    if (!account) return false
    const calls = [{
        address: getAddress(sender),
        name: 'isApprovedForAll',
        params: [account, getAddress(operator)]
    }]

    const [[isAllowance]] = await multicallv2([{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }
    ],
    "name": "isApprovedForAll",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },], calls)
    return isAllowance
}

export default getApprovedForAll