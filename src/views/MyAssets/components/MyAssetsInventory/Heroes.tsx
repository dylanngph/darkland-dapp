/* eslint-disable react-hooks/exhaustive-deps */
import PaginationCustom from 'components/Pagination/Pagination'
import React, { useEffect, memo, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { fetchHeroConfig } from 'state/common/commonSlice'
import styled from 'styled-components'
import HeroesCard from 'views/HeroesCard'
import heroestdApi from 'api/heroestdApi'
import { mapHeroData } from 'utils/mapHeroData'
import { useHistory } from 'react-router-dom'
import useRefresh from 'hooks/useRefresh'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Select } from '@chakra-ui/react'
import Empty from 'components/Empty/Empty'
import EggCard from 'views/HeroesCard/EggCard'
import CardHero from 'components/CardHero/CardHero'
import HeroesInWallet from './HeroesInWallet'

const Heroes = ({ currentLayout }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { fastRefresh } = useRefresh()
  const { heroIds } = useSelector((state: AppState) => state.hero.heroIds)
  // const dataHeroMapping = mapHeroData(heroData, heroConfig)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  })
  const listTabs = [
    { label: 'All', value: 0 },
    { label: 'Alpha Test Heroes', value: 1 },
  ]
  const [heroesList, setHeroesList] = useState([])

  // const fetchListHeroes = async (params: any = {}) => {
  //   const { page, limit } = pagination
  //   const customParams = {
  //     page: params.page || page,
  //     limit: params.limit || limit,
  //   }
  //   try {
  //     const { data } = await heroestdApi.getMyAssetListHeroes(customParams)
  //     const heroeslist = mapHeroData(data.docs, [])

  //     setPagination({
  //       page: data.page,
  //       limit: data.limit,
  //       total: data.totalDocs,
  //     })
  //     setHeroesList(heroeslist)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleChagePage = ({ page }) => {
  //   const param = {
  //     page,
  //   }
  //   fetchListHeroes(param)
  // }

  const fetchHeroList = useCallback(async() => {
    try {
      const result: any = await heroestdApi.getHeroesList(heroIds)
      const newData = result.map((d) => {
        return {...d, tokenId: d.seq_id, heroName: d.name}
      })
      setHeroesList(newData)
    } catch(error) {
      console.log("error", error)
    }
  }, [heroIds])

  useEffect(() => {
    if (heroIds) {
      fetchHeroList()
    }
  }, [heroIds, fetchHeroList])

  // if (!isLogin) return null

  return (
    <Container>
      <div className='mt-4 flex justify-between'>
        <div style={{fontSize: '24px', fontWeight: 'bold'}}>{heroesList?.length ?? 0} Heroes</div>
        {/* <div style={{width: '200px'}}>
          <Select color='white' sx={{borderRadius: '0', borderColor: '#00BFD5', backgroundColor: '#091749'}}>
          {listTabs.map((item) => (
            <option style={{ color: 'black' }} key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Select>
        </div> */}
      </div>

      {/* <div>
        <HeroesListWrap>
          <HeroesInWallet dataHeroes={heroIds} />
        </HeroesListWrap>
      </div> */}

      <div className="flex flex-wrap justify-center">
        <div id="heroes-id">
          <HeroesListWrap>
          {
            heroesList?.map((hero: any) => (
              <RubyBlock
                onClick={() => {
                  history.push( {pathname: `/hero/${hero?.tokenId}`, state: '/my-assets'})
                }}
                key={hero?._id}
                className="flex flex-row flex-wrap cursor-pointer"
              >
                <CardHero data={hero} />
              </RubyBlock>
            ))
          }
          </HeroesListWrap>

          {/* <PaginationCustom
            current={pagination.page}
            total={pagination.total}
            onChange={handleChagePage}
            pageSize={pagination.limit}
          /> */}
        </div>
      </div>
      
      {/* <Tabs variant="soft-rounded" mt={5}>
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
      </Tabs> */}
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
  flex-direction: column;
  height: 100%;
  width: auto;
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
