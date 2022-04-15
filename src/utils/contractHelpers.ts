import {ethers} from 'ethers'
import {simpleRpcProvider} from 'utils/providers'
import idoConfig from 'config/constants/idos'
import {
  poolsConfig,
  poolsNFTConfig,
  bountiesConfig,
  farmsNFTConfig,
  farmsConfig,
  lotteryConfig,
  blindBoxConfig,
  ticketBoxConfig,
  marketplaceConfig,
  openBox,
  currentBoxes,
  openBoxConfig,
  heroNftConfig,
  holdInGameConfig,
  boxDataConfig
} from 'config/constants'
import {VestingTGE} from 'config/constants/vesting'
import {claimBox} from 'views/BlindBox/Config/config'
import {PoolCategory} from 'config/constants/types'
// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getCakeAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getKscAddress,
  getAirdropAddress,
  getMemberOfKSharkAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import airDropAbi from 'config/abi/airdrop.json'
import poolNftAbi from 'config/abi/kSharkFarmingNFTs.json'
import farmNftAbi from 'config/abi/ksharkNftFarmToken.json'
import pancakeRouterAbi from 'config/abi/pancakeRouter.json'
import nftAbi from 'config/abi/farmNftBounty.json'
import vestingAbi from 'config/abi/vestingAbi.json'
import vestingStrategicAbi from 'config/abi/vestingStrategic.json'
import idoAbi from 'config/abi/ido.json'
import lotteryBlindBoxAbi from 'config/abi/lotteryBlindBox.json'
import blindBoxAbi from 'config/abi/blindBoxAbi.json'
import marketPlaceAbi from 'config/abi/marketplaceBox.json'
import boxAbi from 'config/abi/AssetBlindBox.json'
import openBoxAbi from 'config/abi/openBox.json'
import poolBoxNftAbi from 'config/abi/poolNft.json'

import {ROUTER_ADDRESS} from '../config/constants'
import {ChainLinkOracleContract, FarmAuctionContract, PredictionsContract} from './types'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getIfoV1Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV1Abi, address, signer)
}
export const getIfoV2Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV2Abi, address, signer)
}
export const getSouschefContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), signer)
}
export const getPoolNftContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsNFTConfig.find((pool) => pool.nftId === id)
  return getContract(poolNftAbi, getAddress(config.contractAddress), signer)
}
export const getFarmNftContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = farmsNFTConfig.find((farm) => farm.nftId === id)
  return getContract(farmNftAbi, getAddress(config.contractAddress), signer)
}
export const getSouschefV2Contract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), signer)
}
export const getPointCenterIfoContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer)
}
export const getCakeContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeAbi, getCakeAddress(), signer)
}
export const getPanCakeRouterContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeRouterAbi, ROUTER_ADDRESS, signer)
}
export const getKsharkContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeAbi, getKscAddress(), signer)
}
export const getProfileContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(), signer)
}
export const getPancakeRabbitContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), signer)
}
export const getBunnyFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), signer)
}
export const getBunnySpecialContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), signer)
}
export const getLotteryV2Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(), signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}
export const getClaimRefundContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), signer)
}
export const getTradingCompetitionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), signer)
}
export const getEasterNftContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(), signer)
}
export const getCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeVaultAbi, getCakeVaultAddress(), signer)
}

export const getPredictionsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(), signer) as PredictionsContract
}

export const getChainlinkOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer) as ChainLinkOracleContract
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}
export const getBunnySpecialCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialCakeVaultAbi, getBunnySpecialCakeVaultAddress(), signer)
}
export const getBunnySpecialPredictionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(), signer)
}
export const getBunnySpecialLotteryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), signer)
}
export const getFarmAuctionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), signer) as FarmAuctionContract
}
export const getAirdropContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(airDropAbi, getAirdropAddress(), signer)
}
export const getMemberOfKSharkContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(airDropAbi, getMemberOfKSharkAddress(), signer)
}
export const getBountyContract = (slug: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = bountiesConfig.find((bounty) => bounty.slug === slug)
  return getContract(nftAbi, getAddress(config.contractAddress), signer)
}

export const getBlindBoxContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(blindBoxAbi, getAddress(blindBoxConfig.contractAddress), signer)
}

export const getIdoContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = idoConfig.find((ido) => ido.id === id)
  return getContract(idoAbi, getAddress(config.contractAddress), signer)
}

export const getLotteryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lotteryBlindBoxAbi, getAddress(lotteryConfig.contractAddress), signer)
}

export const getVestingContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = VestingTGE.contractAddress.privateSale
  return getContract(vestingAbi, getAddress(config), signer)
}

export const getVestingStrategicContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = VestingTGE.contractAddress.strategic
  return getContract(vestingStrategicAbi, getAddress(config), signer)
}

export const getNftContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = farmsNFTConfig.find((farm) => farm.nftId === id)
  return getContract(nftAbi, getAddress(config.stakingNft.address), signer)
}

export const getMysteryBoxContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(claimBox.abi, getAddress(claimBox.contractAddress), signer)
}

export const openMysteryBoxContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(openBox.abi, getAddress(openBox.contractAddress), signer)
}

export const getMysteryBoxWhitelistContract = (type: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ticketBoxConfig.abi[type], getAddress(ticketBoxConfig.contractAddress[type]), signer)
}

export const getMarketplaceContract = (type: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(marketplaceConfig.abi[type], getAddress(marketplaceConfig.contractAddress[type]), signer)
}

export const getBoxContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = currentBoxes.find((d) => d.id === id)
  return getContract(boxAbi, getAddress(config.boxAddress), signer)
}

export const getOpenBoxContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = openBoxConfig.find((d) => d.boxId === id)
  return getContract(openBoxAbi, getAddress(config.contractAddress), signer)
}

export const getHeroContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(heroNftConfig.abi, getAddress(heroNftConfig.contractAddress), signer)
}

export const getHoldInGameContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(holdInGameConfig.abi, getAddress(holdInGameConfig.contractAddress), signer)
}

export const getStakeTokenEarnNFTContract = (type: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = boxDataConfig.find((d) => d.type === type)
  return getContract(poolBoxNftAbi, getAddress(config.contractAddress), signer)
}