import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import './blindBoxDetails.modules.scss'
import { find, includes, filter } from 'lodash'
import useRefresh from 'hooks/useRefresh'
import HeroesCard from 'views/HeroesCard'
import { ThunkDispatch } from 'redux-thunk'
import { connect, useDispatch, useSelector } from 'react-redux'
import HeroesCardWrapper from 'views/HeroesCard/HeroesCardWrapper'
import LoadingComponent from 'views/LoadingComponent'
import { Button } from '@pancakeswap/uikit'
import { setCurrentBlindBoxPercentageList as setCurrentBlindBoxPercentageListStore } from 'state/blindbox/actions'
import { AppDispatch, AppState, useAppDispatch } from 'state'
import heroestdApi from 'api/heroestdApi'
import { fetchBoxData, fetchHeroConfig } from 'state/common/commonSlice'
import { fetchListHero, fetchListHeroForBlindBox } from 'views/MarketPlace/marketplaceSlice'
import * as indexDb from '../../utils/services'

export enum IBoxType {
  COMMON_BOX = 1,
  RARE_BOX = 2,
  SUPER_RARE_BOX = 3,
  SUPER_SUPER_RARE_BOX = 4,
}

export enum IGenType {
  COMMON_BOX = 0,
  RARE_BOX = 1,
  SUPER_RARE_BOX = 2,
  SUPER_SUPER_RARE_BOX = 3,
}

export enum ICurrentTab {
  COMMON_BOX = 1,
  RARE_BOX = 2,
  SUPER_RARE_BOX = 3,
  SUPER_SUPER_RARE_BOX = 4,
}

export enum IBoxId {
  COMMON_BOX = '1',
  RARE_BOX = '2',
  SUPER_RARE_BOX = '3',
  SUPER_SUPER_RARE_BOX = '4',
}

export const roundNumber = (value?: number, total?: number) => {
  if (!value) {
    return 0
  }
  return ((value * 100.0) / total).toFixed(2)
}

const BlindBoxFrame = (props) => {
  const { t } = useTranslation()
  const { fastRefresh } = useRefresh()
  const [currentTab, setCurrentTab] = useState(0)
  const [heroesAmount, setHeroesAmount] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [heroLists, setHeroLists] = useState([])
  const [currentBlindBox, setCurrentBlindBox] = useState([])

  const [commonBoxHeroes, setCommonBoxHeroes] = useState([])
  const [rareBoxHeroes, setRareBoxHeroes] = useState([])
  const [superRareBoxHeroes, setSuperRareBoxHeroes] = useState([])
  const [superSuperRareBoxHeroes, setSuperSuperRareBoxHeroes] = useState([])
  const [droprate, setDroprate] = useState({
    commonRate: 0,
    rareRate: 0,
    superRareRate: 0,
    supersuperRate: 0,
  })

  const [totalAmountLeft, setTotalAmountLeft] = useState({
    totalLeft: 0,
    commonLeft: 0,
    rareLeft: 0,
    superRareLeft: 0,
    supersuperLeft: 0,
  })

  const [amountLeft, setAmountLeft] = useState(0)

  const { boxId } = props
  const [currentBoxId, setCurrentBoxId] = useState(boxId)
  // const [commonRate, setCommonRate] = useState(0);

  const dispatch = useAppDispatch()
  const { heroConfig, boxData } = useSelector((state: AppState) => state.common)
  const { heroList, pagination, paramFilterHero } = useSelector(
    (state: AppState) => state.marketplace,
  )

  const [heroListState, setHeroListState] = useState(heroList)
  useEffect(() => {
    if (!heroConfig.length) {
      dispatch(fetchHeroConfig())
    }
  }, [dispatch, heroConfig])

  useEffect(() => {
    if (!boxData.length) {
      dispatch(fetchBoxData())
    }
  }, [dispatch, boxData])

  const fetchHeroFromIndexDb = useCallback(async () => {
    const indexDBHeroData = await indexDb.get('heroesMarketList')
    setHeroListState(indexDBHeroData)
    if (indexDBHeroData === undefined) {
      dispatch(fetchListHeroForBlindBox({ page: 1, limit: 14680 }))
    }
  }, [dispatch])

  useEffect(() => {
    fetchHeroFromIndexDb()
  }, [heroConfig, fetchHeroFromIndexDb])

  const getMappedHeroesInBox = (heroesListInMarket: any, heroesInListBox: any): any =>
    filter(heroesListInMarket, (item: any) => includes(heroesInListBox?.heroData, item._id))

  const getCurrentBlindBox = useCallback(() => {
    switch (currentBoxId) {
      case IBoxId.COMMON_BOX: {
        const heroesInListCommonBox = find(
          boxData,
          (item: any) => item.boxType === IBoxType.COMMON_BOX,
        )
        const commonBlindBoxHeroes = getMappedHeroesInBox(heroListState, heroesInListCommonBox)
        return commonBlindBoxHeroes
      }
      case IBoxId.RARE_BOX: {
        const heroesInListRareBox = find(boxData, (item: any) => item.boxType === IBoxType.RARE_BOX)
        const rareBlindBoxHeroes = getMappedHeroesInBox(heroListState, heroesInListRareBox)
        return rareBlindBoxHeroes
      }
      case IBoxId.SUPER_RARE_BOX: {
        const heroesInListSuperRareBox = find(
          boxData,
          (item: any) => item.boxType === IBoxType.SUPER_RARE_BOX,
        )
        const superRareBlindBoxHeroes = getMappedHeroesInBox(
          heroListState,
          heroesInListSuperRareBox,
        )
        return superRareBlindBoxHeroes
      }
      case IBoxId.SUPER_SUPER_RARE_BOX: {
        const heroesInListSuperSuperRareBox = find(
          boxData,
          (item: any) => item.boxType === IBoxType.SUPER_SUPER_RARE_BOX,
        )
        const superSuperRareBlindBoxHeroes = getMappedHeroesInBox(
          heroListState,
          heroesInListSuperSuperRareBox,
        )
        return superSuperRareBlindBoxHeroes
      }
      default:
        return heroListState
    }
  }, [currentBoxId, heroListState, boxData])

  const getCurrentTabListHero = useCallback((type: number) => {
    switch (type) {
      case ICurrentTab.COMMON_BOX:
        return commonBoxHeroes
      case ICurrentTab.RARE_BOX:
        return rareBoxHeroes
      case ICurrentTab.SUPER_RARE_BOX:
        return superRareBoxHeroes
      case ICurrentTab.SUPER_SUPER_RARE_BOX:
        return superSuperRareBoxHeroes
      default:
        return currentBlindBox
    }
  }, [commonBoxHeroes, rareBoxHeroes, superRareBoxHeroes, superSuperRareBoxHeroes, currentBlindBox])

  useEffect(() => {
    const currentBlindBoxList = getCurrentBlindBox()
    setCurrentBlindBox(currentBlindBoxList)
    const commonBoxHeroesList =
      filter(currentBlindBoxList, (item: any) => item.gen === IGenType.COMMON_BOX) || []
    const rareBoxHeroesList =
      filter(currentBlindBoxList, (item: any) => item.gen === IGenType.RARE_BOX) || []
    const superRareBoxHeroesList =
      filter(currentBlindBoxList, (item: any) => item.gen === IGenType.SUPER_RARE_BOX) || []
    const superSuperRareBoxHeroesList =
      filter(currentBlindBoxList, (item: any) => item.gen === IGenType.SUPER_SUPER_RARE_BOX) || []

    setCommonBoxHeroes(commonBoxHeroesList)
    setRareBoxHeroes(rareBoxHeroesList)
    setSuperRareBoxHeroes(superRareBoxHeroesList)
    setSuperSuperRareBoxHeroes(superSuperRareBoxHeroesList)

    // dispatch(setCurrentBlindBoxPercentageListStore(BlindboxPercentage))
  }, [getCurrentBlindBox])

  const fetchData = useCallback(async () => {
    try {
      const res: any = await heroestdApi.getHeroInBlindBox(boxId)
      const BlindboxPercentage:any = {
        commonRate: roundNumber(res.commonLeft, res.totalLeft),
        rareRate: roundNumber(res.rareLeft, res.totalLeft),
        superRareRate: roundNumber(res.srLeft, res.totalLeft),
        supersuperRate: roundNumber(res.ssrLeft, res.totalLeft),
      }
      const totalLeft:any = {
        totalLeft: res.totalLeft,
        commonLeft: res.commonLeft,
        rareLeft: res.rareLeft,
        superRareLeft: res.srLeft,
        supersuperLeft: res.ssrLeft,
      }
      setTotalAmountLeft(totalLeft)
      setDroprate(BlindboxPercentage)
    } catch (error) {
      console.log(error)
    }
  }, [boxId])

  // const fetchHeroLists = useCallback(async() => {
    
  // }, [currentTab, getCurrentTabListHero])

  useEffect(() => {
    fetchData()
    const heroes = getCurrentTabListHero(currentTab) || []
    setHeroLists(heroes)
  }, [fetchData, fastRefresh, currentTab, getCurrentTabListHero])

  const customActiveTab = {
    backgroundColor: '#505050',
    borderColor: '#505050',
  }

  useEffect(() => {
    switch (currentTab) {
      case ICurrentTab.COMMON_BOX:
        setHeroesAmount(commonBoxHeroes.length)
        setAmountLeft(totalAmountLeft.commonLeft)
        return
      case ICurrentTab.RARE_BOX:
        setHeroesAmount(rareBoxHeroes.length)
        setAmountLeft(totalAmountLeft.rareLeft)
        return
      case ICurrentTab.SUPER_RARE_BOX:
        setHeroesAmount(superRareBoxHeroes.length)
        setAmountLeft(totalAmountLeft.superRareLeft)
        return
      case ICurrentTab.SUPER_SUPER_RARE_BOX:
        setHeroesAmount(superSuperRareBoxHeroes.length)
        setAmountLeft(totalAmountLeft.supersuperLeft)
        return
      default:
        setHeroesAmount(currentBlindBox.length)
        setAmountLeft(totalAmountLeft.totalLeft)
    }
  }, [
    currentTab,
    currentBlindBox.length,
    commonBoxHeroes.length,
    rareBoxHeroes.length,
    superRareBoxHeroes.length,
    superSuperRareBoxHeroes.length,
    totalAmountLeft.commonLeft,
    totalAmountLeft.rareLeft,
    totalAmountLeft.superRareLeft,
    totalAmountLeft.supersuperLeft,
    totalAmountLeft.totalLeft
  ])

  const getCustomActiveTab = (index: number) => (currentTab === index ? customActiveTab : {})

  const onChangeCurrentTab = (index: number) => {
    setCurrentTab(index)
  }

  // const HeroList = () => {
  //   const heroes = getCurrentTabListHero(currentTab) || []
  //   return <HeroesCardWrapper heroes={heroes} />
  // }


  return (
    <>
      {/* <div className="w-full md:w-1/2 flex flex-row justify-between py-2 gap-3 mt-4">
        <Button
          // onClick={}
          variant="tertiary"
          style={{
            flex: 1,
            border: '2px solid #424243',
            paddingTop: '3px',
            paddingBottom: '3px',
            borderRadius: '10px',
          }}
          className="flex border border-solid border-gray-500"
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <img src="https://cdn.heroestd.io/Images/sell.png" alt="coin" className="w-7" />
            <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '18px' }}>Sell</Text>
          </div>
        </Button>

        <Button
          variant="tertiary"
          style={{
            flex: 1,
            border: '2px solid #424243',
            paddingTop: '3px',
            paddingBottom: '3px',
            borderRadius: '10px',
          }}
          className="flex border border-solid border-gray-500"
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <img src="https://cdn.heroestd.io/Images/transfer.png" alt="transfer" className="w-7" />
            <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '18px' }}>Transfer</Text>
          </div>
        </Button>
      </div> */}
      <p className="text-2xl mt-10"> Drop rate: % </p>
      <Card className="card text-center" style={{ marginTop: '32px' }}>
        <div className="card-header" style={{ backgroundColor: '#272626', fontSize: '10px' }}>
          <ul className="flex border-b">
            <li className="mr-1 list-none text-md md:text-xl w-1/5">
              <NavLink
                key={0}
                className="nav-link text-md md:text-xl"
                style={{ color: '#FFFFFF', fontWeight: 'bold', ...getCustomActiveTab(0) }}
                onClick={() => onChangeCurrentTab(0)}
              >
                All
              </NavLink>
            </li>
            <li className="mr-1 list-none text-md md:text-xl w-1/5">
              <NavLink
                key={4}
                className="inline-block"
                style={{ color: '#FF7EE7', fontWeight: 'bold', ...getCustomActiveTab(1) }}
                onClick={() => onChangeCurrentTab(1)}
              >
                <p style={{ color: '#9E9E9E', fontWeight: 'bold' }}>
                  {' '}
                  C:{droprate.commonRate}%
                </p>
              </NavLink>
            </li>
            <li className="mr-1 list-none text-md md:text-xl w-1/5">
              <NavLink
                key={4}
                className="inline-block"
                style={{ color: '#FF7EE7', fontWeight: 'bold', ...getCustomActiveTab(2) }}
                onClick={() => onChangeCurrentTab(2)}
              >
                <p style={{ color: '#8DE1FF', fontWeight: 'bold' }}>
                  {' '}
                  R:{droprate.rareRate}%
                </p>
              </NavLink>
            </li>
            <li className="mr-1 list-none text-md md:text-xl w-1/5">
              <NavLink
                key={4}
                className="inline-block"
                style={{ color: '#FF7EE7', fontWeight: 'bold', ...getCustomActiveTab(3) }}
                onClick={() => onChangeCurrentTab(3)}
              >
                <p style={{ color: '#92EE97', fontWeight: 'bold' }}>
                  {' '}
                  SR:{droprate.superRareRate}%
                </p>
              </NavLink>
            </li>
            <li className="mr-1 list-none text-md md:text-xl w-1/5">
              <NavLink
                key={4}
                className="inline-block"
                style={{ color: '#FF7EE7', fontWeight: 'bold', ...getCustomActiveTab(4) }}
                onClick={() => onChangeCurrentTab(4)}
              >
                <p style={{ color: '#FF7EE7', fontWeight: 'bold' }}>
                  {' '}
                  SSR:{droprate.supersuperRate}%
                </p>
              </NavLink>
            </li>
          </ul>
        </div>
        <CardBody className="card-body">
          <CardItem className="ml-4 md:ml-8 pt-2">
            <Text className="sm:text-xs md:text-md lg:text-md" color="#A7A7A7">
              {t('Total amount: ')}{' '}
            </Text>
            <Text className="ml-1 sm:text-xs md:text-md lg:text-md" color="#FFC247">
              {heroesAmount}
            </Text>

            <Text className="ml-3 sm:text-xs md:text-md lg:text-md" color="#A7A7A7">
              {t('Amount left: ')}{' '}
            </Text>
            <Text className="ml-1 sm:text-xs md:text-md lg:text-md" color="#FFC247">
              {amountLeft}
            </Text>
          </CardItem>
          <HeroesCardWrapper heroes={heroLists} />
        </CardBody>
      </Card>
    </>
  )
}

const RubyBlock = styled.div`
  height: 100%;
  width: 100%;

  ::-webkit-scrollbar-track {
    background: #e24042;
  }
`

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: start;
  font-weight: 800;
`

const CardBody = styled.div`
  background-color: #0f0f0f;
  height: 55vh;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 45vh;
  }
`

const NavLink = styled.div`
  padding: 8px;

  :hover {
    cursor: pointer;
    color: #0a58ca;
  }
`
const Card = styled.div`
  border-radius: 11px;
  border: 1px solid #424243;
  overflow: hidden;
`

const mapStateToProps = (state) => {
  const { blindbox } = state
  return {
    blindbox,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  // saveCurrentBlindBoxPercentageListToStore: (currentBlindBoxPercentageList: any) =>
  //   dispatch(setCurrentBlindBoxPercentageListStore(currentBlindBoxPercentageList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlindBoxFrame)
