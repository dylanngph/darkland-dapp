import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Hero } from 'components/KShark'
import { Text, Heading, Button } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import Nft from './tabs/Nft'
import Heroes from './tabs/Heroes'

const GroupMenu = () => {
  const { t } = useTranslation();

  const listTabs = [
    { label: 'Stake NFT', value: 0 },
    { label: 'Stake Heroes', value: 1 },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Hero>
        <Heading paddingLeft={15} paddingRight={15} as="h1" size="xl" color="#ffffff">
          {t('Pool NFT')}
        </Heading>
      </Hero>
      <Tabs variant="soft-rounded" mt={5}>
        <TabList
          className="bg-gray rounded-3xl border border-solid border-gray-400 m-auto"
          sx={{ maxWidth: 'fit-content', marginBottom: '20px' }}
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
            <Nft />
          </TabPanel>
          <TabPanel>
            <Heroes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

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

const styleActive = { background: '#4072D3', color: '#fff' }

const GroupButtom = styled.div`
  width: 600px;
  display: flex;
  margin: 0 auto;
  border: 1px solid #eaeaea;
  border-radius: 40px;
  background-color: #fff;
  overflow: hidden;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
  > .left-button {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }
  > .right-button {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }
  > .middle-button {
    border-radius: 40px;
  }
  > .left-button,
  .right-button,
  .middle-button {
    flex: 1;
    font-size: 15px;
    font-weight: 400;
    color: #4072d3;
    background-color: #fff;
  }
`

export default GroupMenu
