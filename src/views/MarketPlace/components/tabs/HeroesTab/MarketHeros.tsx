import bnbIcon from 'assets/icons/bnb-usd-icon.svg'
import BigNumber from 'bignumber.js'
import PaginationCustom from 'components/Pagination/Pagination'
import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { fetchHeroConfig } from 'state/common/commonSlice'
import styled from 'styled-components'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import HeroesCard from 'views/HeroesCard'
import Empty from 'components/Empty/Empty'
import HeroesListColumnItem from 'views/HeroesCard/HeroesListColumnItem'
import useRefresh from 'hooks/useRefresh'
import { fetchListHero, setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import { useHistory } from 'react-router-dom'

const Market = ({ currentLayout }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { fastRefresh } = useRefresh()
  const { heroConfig } = useSelector((state: AppState) => state.common)
  const { heroList, pagination, paramFilterHero } = useSelector(
    (state: AppState) => state.marketplace,
  )

  // const { t } = useTranslation()
  // const { account } = useWeb3React()
  // const { poolsNft: poolsWithoutAutoVault, userDataLoaded } = usePoolsNft(account)

  useEffect(() => {
    if (!heroConfig.length) {
      dispatch(fetchHeroConfig())
    }
  }, [dispatch, heroConfig.length])

  useEffect(() => {
    dispatch(fetchListHero(paramFilterHero))
  }, [dispatch, paramFilterHero, heroConfig.length, fastRefresh])

  const handleChagePage = ({ page }) => {
    const filterParams = { ...paramFilterHero }
    filterParams.page = page
    dispatch(setParamSearchHero(filterParams))
  }

  // return <PageLoader/>

  if (!heroList.length) {
    return <Empty />
  }

  return (
    <Container>
      {currentLayout === 0 && (
        <MarketHerosWrap>
          {heroList?.map((hero: any) => (
            <RubyBlock
              onClick={() => {
                history.push( {pathname: `/heroes-order/${hero?.tokenId}`, state: '/marketplace'})
              }}
              key={hero?._id}
              className="flex flex-row flex-wrap cursor-pointer"
            >
              <HeroesCard hero={hero} />
              <PriceBlock>
                <PriceBUSD className="flex">
                  <img
                    style={{ display: 'inline', verticalAlign: 'middle' }}
                    src={bnbIcon}
                    alt={bnbIcon}
                  />
                  <span style={{ color: '#FFC247', margin: '0 5px', maxWidth: '95px' }} className='truncate md:text-20 md:leading-24'>
                    {formatNumber(hero.price)}
                  </span>
                  BUSD
                </PriceBUSD>
              </PriceBlock>
            </RubyBlock>
          ))}
        </MarketHerosWrap>
      )}

      {currentLayout === 1 &&
        heroList?.map((hero: any) => (
          <>
            <HeroesListColumnItem
              hero={hero}
              size="medium"
              idHero={hero?._id}
              tokenPrice={{ htd: 12, usd: 25 }}
            />
          </>
        ))}
      <PaginationCustom
        current={pagination.page}
        total={pagination.total}
        onChange={handleChagePage}
        pageSize={pagination.limit}
      />
    </Container>
  )
}

const Container = styled.div`
  // height: calc(100vh - 225px);
  // overflow-y: scroll;
  height: 100%;
  overflow: hidden;
`

const MarketHerosWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`

const RubyBlock = styled.div`
  position: relative;
  background-color: #000000;
  flex-direction: column;
  height: 100%;
  width: auto;
  border-radius: 10px;
  border: 2px solid #434344;
  padding-top: 10px;
  > div {
    transform: ${({ theme }) => theme.mediaQueries.lg ? 'scale(0.7)' : 'none'};
    border: unset;
    width: 190px;
    height: 255px;
    padding: 0 10px;
  }
  ::-webkit-scrollbar-track {
    background: #e24042;
  }
  &:hover {
    border-color: #aaaaaa;
  }
`

const IdHeroCard = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  width: fit-content;
  margin: 12px;
  padding: 1px 5px;
  background: #19b911;
  border-radius: 5px;
`

const PriceBlock = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px 10px 10px;
`
const SummonCount = styled.span`
  font-size: 10px;
  text-align: center;
  margin-top: 8px;
  color: #9e9e9e;
`
const PriceBUSD = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin-top:10px;
`

export default memo(Market)
