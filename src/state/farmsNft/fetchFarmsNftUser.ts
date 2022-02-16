import {getAddress} from 'utils/addressHelpers'
import farmNftConfig from 'config/constants/farmsNFT'
import erc20ABI from 'config/abi/erc20.json'
import kSharkNftFarmTokenAbi from 'config/abi/ksharkNftFarmToken.json'
import farmNftBountyAbi from 'config/abi/farmNftBounty.json'
import multicall from 'utils/multicall'
import {getMasterchefContract} from 'utils/contractHelpers'
import {simpleRpcProvider} from 'utils/providers'
import BigNumber from 'bignumber.js'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbFarms = farmNftConfig.filter((p) => p.stakingNft.symbol !== 'BNB')
const bnbFarms = farmNftConfig.filter((p) => p.stakingNft.symbol === 'BNB')
const nonMasterFarms = farmNftConfig.filter((p) => p.nftId !== 0)
const masterChefContract = getMasterchefContract()

export const fetchFarmsNftAllowance = async (account) => {
  const calls = nonBnbFarms.map((p) => ({
    address: getAddress(p.stakingNft.address),
    name: 'isApprovedForAll',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(farmNftBountyAbi, calls)
  return nonBnbFarms.reduce((acc, farm, index) => ({...acc, [farm.nftId]: allowances[index][0]}), {})
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbFarms.map((p) => ({
    address: getAddress(p.stakingNft.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbFarms.reduce(
    (acc, farm, index) => ({...acc, [farm.nftId]: new BigNumber(tokenBalancesRaw[index]).toJSON()}),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)
  const bnbBalances = bnbFarms.reduce(
    (acc, farm) => ({...acc, [farm.nftId]: new BigNumber(bnbBalance.toString()).toJSON()}),
    {},
  )

  return {...tokenBalances, ...bnbBalances}
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterFarms.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'users',
    params: [account],
  }))
  const userInfo = await multicall(kSharkNftFarmTokenAbi, calls)
  const stakedBalances = nonMasterFarms.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.nftId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const {amount: masterPoolAmount} = await masterChefContract.userInfo('0', account)

  return {...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON()}
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterFarms.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pointsBalance',
    params: [account],
  }))
  const res = await multicall(kSharkNftFarmTokenAbi, calls)
  const pendingRewards = nonMasterFarms.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.nftId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await masterChefContract.pendingRewards('0', account)

  return {...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON()}
}

export const fetchUserNftOfAccount = async (account: string, balances) => {
  const farmsNftNew = nonBnbFarms.map((p) => {
    return {
      ...p,
      balances: Number(balances[p.nftId]),
    }
  })
  const arrayNfts = farmsNftNew.map(async (p) => {
    if (p.balances === 0) return {...p, nftsList: []}
    const calls = []
    let res = []
    for (let i = 0; i < p.balances; i++) {
      const params = {
        address: getAddress(p.stakingNft.address),
        name: 'tokenOfOwnerByIndex',
        params: [account, i],
      }
      calls.push(params)
    }
    try {
      res = await multicall(farmNftBountyAbi, calls)
    } catch (err) {
      console.log(err)
    }
    const listsToken = res.map((d) => parseInt(d[0]._hex, 16))
    return {...p, nftsList: listsToken}
  })

  const listNfts = await Promise.all(arrayNfts)

  return listNfts.reduce(
    (acc, farm) => ({
      ...acc,
      [farm.nftId]: farm.nftsList,
    }),
    {},
  )
}
