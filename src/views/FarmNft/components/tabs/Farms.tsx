import React, {useState, useMemo, useEffect, useRef} from 'react'
import partition from 'lodash/partition'
import {useWeb3React} from '@web3-react/core'
import {useFarmsNft} from 'state/farmsNft/hooks'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'
import {FarmNft} from 'state/types'
import Card from './Card'

const NUMBER_OF_POOLS_VISIBLE = 12

const Farms = () => {
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const {farmsNFT: poolsWithoutAutoVault, userDataLoaded} = useFarmsNft(account)
  const chosenPoolsLength = useRef(0)
  const pools = useMemo(() => {
    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
          if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
            return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
          }
          return poolsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])
  const chosenPools = pools.slice(0, numberOfPoolsVisible)

  return (
    <Container>
      {chosenPools.map((data: FarmNft, index: number) => (
        <Card data={data} key={data.nftId} userDataLoaded={userDataLoaded} account={account} />
      ))}
      <div ref={loadMoreRef} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(277px, 1fr));
  column-gap: 15px;
  row-gap: 15px;
`

export default Farms
