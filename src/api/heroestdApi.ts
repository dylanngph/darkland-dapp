import queryString from 'query-string'
import axios from 'axios'
import axiosClient from './axiosClient'

const baseURL = process.env.REACT_APP_URL_API
const baseURLProd = process.env.REACT_APP_URL_API_PROD
const baseURLAlpha = "https://alpha-dot-heroes-td-6fa95.as.r.appspot.com"
const baseURLBeta = "https://beta-dot-heroes-td-6fa95.as.r.appspot.com"

let cancelToken
class HeroestdApi {
  getHeroList = (params: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURLProd}/get-hero-market-list/${qs}`
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.')
    }
    cancelToken = axios.CancelToken.source()
    return axiosClient.get(url, { cancelToken: cancelToken.token })
  }

  getItemConfig = () => {
    const url = `${baseURLProd}/get-item-config`
    return axiosClient.get(url)
  }

  getRuneConfig = () => {
    const url = `${baseURLProd}/get-rune-config`
    return axiosClient.get(url)
  }

  getHeroListForBlindBox = (params: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURLProd}/get-origin-hero/${qs}`
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.')
    }
    cancelToken = axios.CancelToken.source()
    return axiosClient.get(url, { cancelToken: cancelToken.token })
  }

  getHeroConfig = () => {
    const url = `${baseURLProd}/get-hero-config`
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
    const url = `${baseURLBeta}/get-hero-inventory/${qs}`
    return axiosClient.get(url)
  }

  getListHeroMarketSold = (params?: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURLProd}/get-hero-market-list/${qs}`
    return axiosClient.get(url)
  }

  getListHeroSalesHistory = (params?: any) => {
    const qs = queryString.stringify(params)
    const url = `${baseURLProd}/get-sales-history/${qs}`
    return axiosClient.get(url)
  }

  getHeroDetails = (id: string) => {
    const url = `${baseURLBeta}/get-hero-info/${id}`
    return axiosClient.get(url)
  }

  getHeroDetailsInBlindBox = (id: string) => {
    const url = `${baseURLProd}/get-origin-hero-info/${id}`
    return axiosClient.get(url)
  }

  getHeroDetailsMarketPlace = (id: string) => {
    const url = `${baseURLProd}/get-market-hero-info/${id}`
    return axiosClient.get(url)
  }
  
  loginWithToken = (idToken: string) => {
    const url = `${baseURLBeta}/login`
    const config = {
      headers: { Authorization: `Bearer ${idToken}` },
    }
    return axiosClient.post(url, config)
  }

  getHeroInBlindBox = (id: string) => {
    const url = `${baseURLProd}/get-box-opened/${id}`
    return axiosClient.get(url)
  }

  getSaleHistory = (params: any) => {
    const qs = queryString.stringify(params)

    const url = `${baseURLProd}/get-sales-history/${qs}`
    return axiosClient.get(url)
  }

  setLinkWallet = (walletAddress: string, idToken: string) => {
    const url = `${baseURLBeta}/linkWallet`
    const config = {
      headers: { Authorization: `Bearer ${idToken}` }
    }
    const data = {
      walletAddress
    }
    return axiosClient.post(url, data, config)
  }
}

const heroestdApi = new HeroestdApi()
export default heroestdApi
