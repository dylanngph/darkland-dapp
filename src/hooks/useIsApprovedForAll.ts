import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { Address } from 'config/constants/types'
import useRefresh from './useRefresh'

function useIsApprovedForAll(sender: Address, operator: Address) {
  const { account } = useWeb3React()
  const [data, setData] = useState(false)
  const { fastRefresh } = useRefresh()
  const fetchData = useCallback(async() => {
    try {
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
    }], calls)
      setData(isAllowance)
    } catch(error) {
      console.log(error)
    }
  }, [account, operator, sender])

  useEffect(() => {
    if (account) fetchData()
  }, [fastRefresh, account, fetchData])

  return data
}

export default useIsApprovedForAll
