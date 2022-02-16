import React, { useCallback } from "react"
import { useMasterchef } from "hooks/useContract"
import { getSouschefV2Contract } from "utils/contractHelpers"
import { harvestFarm, harvestPool } from 'utils/calls/farms'
import useActiveWeb3React from "hooks/useActiveWeb3React"



export const useAllHarvest = (farmPids) => {
  const masterChefContract = useMasterchef()
  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvestFarm(masterChefContract , pid)]
    }, [])
    return Promise.all(harvestPromises)
  }, [farmPids, masterChefContract])
    
  return { onReward: handleHarvest }
}

export const useHarvestPool = (sousId) => {
  const {library} = useActiveWeb3React()
  const handleHarvest = useCallback(async() => {
    const harvestPromises = sousId.reduce((accum, id) => {
      const poolContract = getSouschefV2Contract(id, library.getSigner())
      return [...accum, harvestPool(poolContract)]
    }, [])
    return Promise.all(harvestPromises)
  }, [sousId, library])
  return { onRewardPool: handleHarvest }
}