import axios from 'axios'
import { VERSION_API } from 'contants'
import axiosClient from './axiosClient'

class BlindBoxAPI {
  getBoxData = () => {
    const url = `/get-box-data`
    return axiosClient.get(url, { baseURL: process.env.REACT_APP_URL_API_PROD, headers: {
      "Version": VERSION_API
    } })
  }
}

const blindBoxAPI = new BlindBoxAPI()
export default blindBoxAPI
