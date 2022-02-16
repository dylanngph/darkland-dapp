import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import HeroesListInDashboard from 'views/HeroesCard/HeroesListInDashboard'
import { tabDashboard } from 'views/MarketPlace/constant'

const ListOnSales = ({ listHeroes }) => {
  const { t } = useTranslation()
  const [tab, setTab] = useState(tabDashboard[0].label)
  const handleChangeTab = (label: string) => {
    setTab(label)
  }
  const renderTabHeader = () => (
    <Tabs
      sx={{
        color: '#9E9E9E',
        borderColor: '#686868',
      }}
    >
      <TabList>
        {tabDashboard.map((tabItem) => {
          return (
            <TabCustom
              aria-hidden="true"
              key={tabItem.label}
              onClick={() => {
                handleChangeTab(tabItem.label)
              }}
              sx={{
                width: '150px',
                paddingTop: '0px',
              }}
              style={tab === tabItem.label ? styleActive : {}}
              _focus={{ border: 'unset' }}
              _active={{ border: 'unset' }}
            >
              <img
                style={{ width: 23, height: 23, marginRight: 5 }}
                src={tabItem.icon}
                alt={tabItem.icon}
              />
              {tabItem.label}
            </TabCustom>
          )
        })}
      </TabList>
    </Tabs>
  )

  return (
    <div>
      <Block>
        <h1 className='text-xl font-bold' >Recently listed</h1>
      </Block>
      <Card>
      <CardHeader>{renderTabHeader()}</CardHeader>
        <CardItem>
        {tab === 'Heroes' ? (
            listHeroes &&
            listHeroes?.map((hero: any) => (
              <>
                <HeroesListInDashboard
                  hero={hero}
                  size="medium"
                  idHero={hero?.tokenId}
                  tokenPrice={{ htd: 12, usd: 25 }}
                />
              </>
            ))
          ) : (
            <div
              style={{
                fontSize: 30,
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              Coming soon
            </div>
          )}
        </CardItem>
      </Card>
    </div>
  );
};

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `

const Block = styled.div`
    margin-bottom: 33px;
    display: flex;
    flex-direction: column;
  `
const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #424243;
  border-radius: 8px;
`

const CardHeader = styled.div`
  padding: 20px 10px 0px 20px;
`

const CardItem = styled.div`
  border-bottom: 1px solid #424243;
`

const styleActive = {
  color: 'white',
  marginBottom: '-2px',
  borderBottom: '4px solid #FE335B',
}

const TabCustom = styled(Tab)`
  margin: 0 50px;
  @media screen and (max-width: 768px) {
    margin: 20px;
  }
  @media screen and (max-width: 440px) {
    margin: 0px;
  }
`

export default ListOnSales;