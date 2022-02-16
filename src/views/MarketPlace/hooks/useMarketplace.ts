import { useCallback, useEffect } from "react"
import BigNumber from "bignumber.js"
import erc20Abi from "config/abi/erc20.json"
import tokens from "config/constants/tokens"
import { Address } from "config/constants/types"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppDispatch } from "state"
import { getAddress } from "utils/addressHelpers"
import { BIG_TEN } from "utils/bigNumber"
import { multicallv2 } from "utils/multicall"
import { fetchMinPrice } from "../marketplaceSlice"

export const fetchAllowance  = async(account: string, sender: Address, contractAddress: Address) => {
    const calls = [{
        address: getAddress(contractAddress),
        name: 'allowance',
        params : [account, getAddress(sender)]
    },
    {
        address: getAddress(contractAddress),
        name: 'balanceOf',
        params : [account]
    }
    ]

    const [allowance, balanceOf] = await multicallv2(erc20Abi, calls)

    const result = {
        allowance: new BigNumber(allowance).gt(0),
        balanceOf: Number(new BigNumber(balanceOf).div(BIG_TEN.pow(tokens.busd.decimals)).toJSON())
    }

    return result
}

export const useMinPricesHero = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchMinPrice())
    }, [dispatch])
}