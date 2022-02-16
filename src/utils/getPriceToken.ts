import axios from 'axios'
import {PANCAKE_API_V2_URL} from 'config'

const getTokenPrice = async (tokenAddress: string) => {
  const tokenPrice = await axios
    .get(`${PANCAKE_API_V2_URL}/tokens/${tokenAddress}`)
    .then((resp) => resp.data)
    .catch((e) => e)

  return tokenPrice
}

export default getTokenPrice
