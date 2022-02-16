import axios from 'axios'
import BigNumber from 'bignumber.js'
import {PANCAKE_API_V2_URL} from 'config'

export const getTotalSupplyPrices = async (address: any) => {
  try {
    const {data} = await axios
      .get(`${PANCAKE_API_V2_URL}/tokens/${address}`)
      .then((resp) => resp.data)
      .catch((e) => e)
    const price = new BigNumber(data.price).toNumber()
    return price
  } catch {
    return 0
  }
}
