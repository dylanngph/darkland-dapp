/* eslint-disable react-hooks/exhaustive-deps */
import PaginationCustom from 'components/Pagination/Pagination'
import React, { useEffect, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { fetchHeroConfig } from 'state/common/commonSlice'
import styled from 'styled-components'
import HeroesCard from 'views/HeroesCard'
import heroestdApi from 'api/heroestdApi'
import { mapHeroData } from 'utils/mapHeroData'
import { useHistory } from 'react-router-dom'
import useRefresh from 'hooks/useRefresh'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Empty from 'components/Empty/Empty'
import EggCard from 'views/HeroesCard/EggCard'
import HeroesInWallet from './HeroesInWallet'

const Heroes = ({ currentLayout }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { fastRefresh } = useRefresh()
  const { heroData } = useSelector((state: AppState) => state.hero)
  const { heroConfig, isLogin } = useSelector((state: AppState) => state.common)
  const dataHeroMapping = mapHeroData(heroData, heroConfig)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  })
  const listTabs = [
    { label: 'In wallet', value: 0 },
    { label: 'Alpha Test Heroes', value: 1 },
  ]
  const [heroesList, setHeroesList] = useState([])

  useEffect(() => {
    if (!heroConfig.length) {
      dispatch(fetchHeroConfig())
    }
    fetchListHeroes()
  }, [dispatch, heroConfig, isLogin, fastRefresh])

  const fetchListHeroes = async (params: any = {}) => {
    const { page, limit } = pagination
    const customParams = {
      page: params.page || page,
      limit: params.limit || limit,
    }
    try {
      const { data } = await heroestdApi.getMyAssetListHeroes(customParams)
      const heroeslist = mapHeroData(data.docs, heroConfig)

      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.totalDocs,
      })
      setHeroesList(heroeslist)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChagePage = ({ page }) => {
    const param = {
      page,
    }
    fetchListHeroes(param)
  }

  // if (!isLogin) return null

  return (
    <Container>
      <Tabs variant="soft-rounded" mt={5}>
        <TabList
          className="bg-gray rounded-3xl border border-solid border-gray-400 m-auto"
          sx={{ maxWidth: 'fit-content' }}
        >
          {listTabs.map((item) => (
            <Tab
              key={item.value}
              sx={{ width: 48, color: 'rgba(255, 255, 255, 0.4)' }}
              _selected={{
                color: 'white',
                bg: 'linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%)',
              }}
              _focus={{ border: 'none' }}
            >
              {item.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>{dataHeroMapping?.length ?? 0} Heroes</Box>
            <HeroesListWrap>
              <HeroesInWallet dataHeroes={dataHeroMapping} />
            </HeroesListWrap>
          </TabPanel>
          <TabPanel>
            {isLogin ? (
              <>
                <Box>{pagination.total} Heroes</Box>
                <div className="flex flex-wrap justify-center">
                  <div id="heroes-id">
                    {currentLayout === 0 && (
                      <HeroesListWrap>
                        {heroesList?.map((hero: any) => (
                          <RubyBlock
                            key={hero?._id}
                            className="flex flex-row flex-wrap cursor-pointer"
                            onClick={() => {
                              history.push({
                                pathname: `/heroes-details/${hero._id}`,
                                state: '/my-assets',
                              })
                            }}
                          >
                            <HeroesCard hero={hero} />
                          </RubyBlock>
                        ))}
                      </HeroesListWrap>
                    )}

                    <PaginationCustom
                      current={pagination.page}
                      total={pagination.total}
                      onChange={handleChagePage}
                      pageSize={pagination.limit}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Empty message="Please login to see your data" />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 10px;
`

const HeroesListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`

const RubyBlock = styled.div`
  position: relative;
  background-color: #000000;
  flex-direction: column;
  height: 100%;
  width: auto;
  border-radius: 10px;
  border: 1px solid #434344;
  padding-top: 10px;
  > div {
    transform: ${({ theme }) => (theme.mediaQueries.lg ? 'scale(0.7)' : 'none')};
    border: unset;
    width: 190px;
    height: 270px;
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

// const MenuWrap = styled.div`
//   background: #272727;
//   border: 1px solid #464646;
//   box-sizing: border-box;
//   border-radius: 5px;
// `

// const LayoutMenu = styled.div`
//   height: 40px;
//   color: #fff;
//   border: 1px solid white;
//   position: relative;
//   top: 0;
//   border-radius: 0;
//   padding: 10px;
//   > img {
//     width: 18px;
//     height: 18px;
//   }
//   // &:hover {
//   //   background-color: #f08800;
//   // }
//   &.active {
//     background-color: #272727;
//     // &:hover {
//     //   background-color: #f08800;
//     // }
//   }
// `

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px solid #424243;
  border-radius: 5px;

  width: 150px;
  height: 40px;
  font-size: 14px;
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffc247;
`
export default memo(Heroes)
