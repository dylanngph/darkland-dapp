import React, {useState, useMemo, useEffect, useRef} from 'react'
import partition from 'lodash/partition'
import {useWeb3React} from '@web3-react/core'
import {usePoolsNft} from 'state/poolsNft/hooks'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'
import {PoolNft} from 'state/types'
import Card from './Card'
import {GameCard} from '../games/GameCard'
import staticData from '../games/data'

const NUMBER_OF_POOLS_VISIBLE = 12

const Market = () => {
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const {poolsNft: poolsWithoutAutoVault, userDataLoaded} = usePoolsNft(account)
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
      {/* {
				chosenPools.map((data: PoolNft, index: number) => <Card data={data} key={data.nftId} userDataLoaded={userDataLoaded} account={account} />)
			} */}
      {staticData.map((data) => (
        <GameCard
          key={data.id}
          level={data.level}
          name={data.name}
          price={data.price}
          id={data.id}
          type={data.type}
          att={data.attribute}
        />
      ))}
      <div ref={loadMoreRef} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

export default Market
