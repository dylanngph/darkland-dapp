import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'state'
import {simpleRpcProvider} from 'utils/providers'
import useRefresh from 'hooks/useRefresh'
import {fetchFarmsNftPublicDataAsync, fetchFarmsNftUserDataAsync, fetchFarmsNftStakingLimitsAsync} from '.'
import {State, FarmNft} from '../types'
import {transformFarmNft} from './helpers'
// eslint-disable-next-line import/named

export const useFetchPublicFarmsNftData = () => {
  const dispatch = useAppDispatch()
  const {slowRefresh} = useRefresh()

  useEffect(() => {
    const fetchFarmsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchFarmsNftPublicDataAsync(blockNumber))
    }

    fetchFarmsPublicData()
    dispatch(fetchFarmsNftStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const useFarmsNft = (account): {farmsNFT: FarmNft[]; userDataLoaded: boolean} => {
  const {fastRefresh} = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmsNftUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const {farmsNFT, userDataLoaded} = useSelector((state: State) => ({
    farmsNFT: state.farmsNft.data,
    userDataLoaded: state.farmsNft.userDataLoaded,
  }))

  return {farmsNFT: farmsNFT.map(transformFarmNft), userDataLoaded}
  // return { poolsNft: [], userDataLoaded: true }
}
