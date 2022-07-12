import queryString from 'query-string'
import axios from 'axios'
import axiosClient from './axiosClient'

const baseURL = process.env.REACT_APP_URL_API
const baseMarketPlace = process.env.REACT_APP_MARKETPLACE_API

let cancelToken
class HeroestdApi {
  getHeroList = (params: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseMarketPlace}/marketplace/on-sale-list?${qs}`
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.')
    }
    cancelToken = axios.CancelToken.source()
    return axiosClient.get(url, { cancelToken: cancelToken.token })
  }

  getItemConfig = () => {
    const url = `${baseURL}/get-item-config`
    return axiosClient.get(url)
  }

  getRuneConfig = () => {
    const url = `${baseURL}/get-rune-config`
    return axiosClient.get(url)
  }

  getHeroListForBlindBox = (params: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURL}/get-origin-hero/${qs}`
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.')
    }
    cancelToken = axios.CancelToken.source()
    return axiosClient.get(url, { cancelToken: cancelToken.token })
  }

  getHeroConfig = () => {
    const url = `${baseURL}/get-hero-config`
    return axiosClient.get(url)
  }

  getBoxMarketData = (params: any) => {
    const qs = queryString.stringify(params)
    const url = `/get-box-market-data/${qs}`
    return axiosClient.get(url, { baseURL })
    // if (typeof cancelToken !== typeof undefined) {
    //   cancelToken.cancel('Operation canceled due to new request.')
    // }
    // cancelToken = axios.CancelToken.source()
    // return axiosClient.get(url, { cancelToken: cancelToken.token })
  }

  getMyAssetListHeroes = (params?: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURL}/get-hero-inventory/${qs}`
    return axiosClient.get(url)
  }

  getListHeroMarketSold = (params?: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURL}/get-hero-market-list/${qs}`
    return axiosClient.get(url)
  }

  getListHeroSalesHistory = (params?: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURL}/get-sales-history/${qs}`
    return axiosClient.get(url)
  }

  getHeroDetails = (id: string) => {
    const url = `${baseURL}/get-hero-info/${id}`
    return axiosClient.get(url)
  }

  getHeroDetailsInBlindBox = (id: string) => {
    const url = `${baseURL}/get-origin-hero-info/${id}`
    return axiosClient.get(url)
  }

  getHeroDetailsMarketPlace = (id: string) => {
    const url = `${baseURL}/get-market-hero-info/${id}`
    return axiosClient.get(url)
  }
  
  loginWithToken = (idToken: string) => {
    const url = `${baseURL}/login`
    const config = {
      headers: { Authorization: `Bearer ${idToken}` },
    }
    return axiosClient.post(url, config)
  }

  getHeroInBlindBox = (id: string) => {
    const url = `${baseURL}/get-box-opened/${id}`
    return axiosClient.get(url)
  }

  getSaleHistory = (params: any) => {
    const qs = queryString.stringify(params)

    const url = `${baseURL}/get-sales-history/${qs}`
    return axiosClient.get(url)
  }

  linkWallet = (walletAddress: string, idToken: string, email: string, signature: string) => {
    const url = `${baseURL}/linkWallet`
    const config = {
      headers: { 'x-access-token': `${idToken}` }
    }
    const data = {
      address: walletAddress,
      email,
      signature
    }
    return axiosClient.post(url, data, config)
  }

  register = (email: string, password: string, firstName: string, lastName: string) => {
    const url = `${baseURL}/register`

    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName
    }
    return axiosClient.post(url, data)
  }

  profile = (idToken: string) => {
    const url = `${baseURL}/profile`
    const config = {
      headers: { 'x-access-token': `${idToken}` }
    }

    return axiosClient.get(url, config)
  }

  login = (email: string, password: string) => {
    const url = `${baseURL}/login`
    const data = {
      email,
      password
    }

    return axiosClient.post(url, data)
  }

  loginFirebase = (idToken: string) => {
    const url = `${baseURL}/loginFirebase`
    const data = {
      firebase_token: idToken
    }

    return axiosClient.post(url, data)
  }

  getHeroAttribuse = (tokenId: string) => {
    const url = `${baseURL}/hero/${tokenId}`
    return axiosClient.get(url)
  }

  getHeroOnMarket = (tokenId: string) => {
    const url = `${baseMarketPlace}/marketplace/on-sale-hero?tokenId=${tokenId}`
    return axiosClient.get(url)
  }

  getHeroesList = (ids: string) => {
    const url = `${baseURL}/heroes`
    const params = {
      ids
    }
    return axiosClient.post(url, params)
  }

  getTokenReward = (tokenId: string) => {
    const url = `${baseURL}/bigt`
    const config = {
      headers: { 'x-access-token': `${tokenId}` }
    }

    return axiosClient.get(url, config) 
  }

  claimTokenReward = async(signature: string, data) => {
    const url = `${baseURL}/claimBigT`
    const config = {
      headers: { 'x-signature': `${signature}` }
    }

    return axiosClient.post(url, data, config) 
  }

  claimTokenInGame = async (data) => {
    const url = `${baseMarketPlace}/claim/issue`
    return axiosClient.post(url, data) 
  }
}

const heroestdApi = new HeroestdApi()
export default heroestdApi
