/* eslint-disable */
import React, {useMemo, useState, useEffect} from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Heading, Button, Modal} from 'components/Pancake-uikit'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import Content from 'components/Popup/Content'
import {Tabs, TabList, Tab, InputGroup, InputLeftElement, Input, Stack} from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import Card from './components/Card'
import {useGetPublicBounty} from './hooks/useFetchBounty'

const Bounty = () => {
  const KEY_SEARCH_BOUNTY = localStorage.getItem('KEY_SEARCH_BOUNTY') ?? 'htd'
  const KEY_TAB_INDEX = Number(localStorage.getItem('KEY_TAB_INDEX') ?? 0)
  const {state: bountiesData, isLoading} = useGetPublicBounty()
  const [filter, setFilter] = useState(KEY_SEARCH_BOUNTY)
  const [search, setSearch] = useState('')
  const listBounty = [
    {label: 'HTD Bounty', value: 'htd'},
    {label: 'Community Bounty', value: 'community'},
  ]

  const bountiesDataMeno = useMemo(() => {
    return bountiesData.filter((bounty) => bounty.type === filter && bounty.title.toLowerCase().includes(search))
  }, [bountiesData, filter, search])

  const selectBounty = (v) => {
    setFilter(v ?? 'htd')
    switch (v) {
      case 'htd':
        setLocalStorage('KEY_TAB_INDEX', 0)
        break
      case 'community':
        setLocalStorage('KEY_TAB_INDEX', 1)
    }
    setLocalStorage('KEY_SEARCH_BOUNTY', v ?? 'htd')
  }

  const setLocalStorage = (key, index) => {
    localStorage.setItem(key, index)
  }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          Bounty NFT
        </Heading>
      </Hero>
      <Container>
        <h1>HeroesTD Bounty NFT</h1>
        <p>Complete missions and earn special rewards!</p>
        {/* <Button width="150px" mt="20px" onClick={onPresent}>Learn more</Button> */}
        <div className="flex gap-3 mt-5">
          <Popup
            modal
            trigger={
              <Button width="150px" border>
                Learn more
              </Button>
            }
          >
            {(close) => <Content close={close} />}
          </Popup>
          <a href="https://heroestd.io/bounty-leaderboard" target="_blank" rel="noreferrer">
            <Button width="150px" variant="warning" border>
              Leaderboard
            </Button>
          </a>
        </div>
      </Container>

      <div className="md:flex my-10">
        <div className="m-auto">
          <Tabs variant="soft-rounded" align="center" index={KEY_TAB_INDEX}>
            <TabList className="w-full bg-gray rounded-3xl border border-solid border-gray-400">
              {listBounty.map((d) => (
                <Tab
                  sx={{width: 48, color: 'rgba(255, 255, 255, 0.4)'}}
                  _selected={{color: 'white', bg: 'linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%)'}}
                  _focus={{border: 'none'}}
                  key={d.value}
                  value={d.value}
                  onClick={() => selectBounty(d.value)}
                >
                  {d.label}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
        <div className="mt-3 md:mt-0">
          <InputGroup sx={{margin: '0 auto'}}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
            <Input
              type="text"
              placeholder="Search bounty"
              sx={{borderColor: '#555'}}
              _hover={{border: '1px solid #333'}}
              _focus={{border: '1px solid #333'}}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-5">
        {bountiesDataMeno.map((bounty) => (
          <Card key={bounty.id} data={bounty} />
        ))}
      </div>
    </Page>
  )
}

interface CardProps {
  title: string
  onDismiss?: () => void
}

const CustomModal: React.FC<CardProps> = ({title, onDismiss, ...props}) => (
  <Modal title={title} onDismiss={onDismiss} {...props}>
    <Heading>{title}</Heading>
    <Button>This button Does nothing</Button>
  </Modal>
)

const Container = styled.div`
  box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg_bounty.png');
  background-size: cover;
  background-position: center;
  min-height: 280px;
  > h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 48px;
    color: #ffffff;
    margin-bottom: 10px;
  }
  > p {
    width: 36%;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 40px;
    color: #ffffff;
  }

  @media screen and (max-width: 768px) {
    box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-position: center;
    min-height: 150px;
    > h1 {
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 48px;
      color: #ffffff;
    }
    > p {
      width: 80%;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 28px;
      color: #ffffff;
    }
  }
`

export default Bounty
