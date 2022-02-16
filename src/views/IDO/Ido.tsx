import Page from 'components/Layout/Page'
import React from 'react'
import styled from '@emotion/styled'
import {NavLink} from 'react-router-dom'
import {Box} from '@chakra-ui/react'
import {Button, useMatchBreakpoints} from 'components/Pancake-uikit'
import Popup from 'reactjs-popup'
import Content from 'components/Popup/Content'
import idoConfig from 'config/constants/idos'
import CoundownIDO from 'components/CountdownIDO/CoundownIDO'
import Card from './components/Card'

const Ido = () => {
  const {isXl} = useMatchBreakpoints()
  const isMobile = isXl === false

  const CardLayout = styled(Box)`
    display: grid;
    grid-template-columns: ${isMobile ? 'auto' : '33% 33% 33%'};
    gap: 20px;
    margin-top: 40px;
  `

  return (
    <Page>
      <Container>
        <h1>IDO</h1>
        <p>
          The first IDO Launchpad is here. Be the first to join HeroesTD IDO Launchpad, a Protocol built for cross-chain
          token pools and auctions.
        </p>
        {/* <Button width="150px" mt="20px" onClick={onPresent}>Learn more</Button> */}
        {/* <Popup modal trigger={<Button  width="150px" mt="20px" border>Learn more</Button>}>
                { close => <Content close={close} />}
                </Popup> */}
      </Container>
      <CoundownIDO fromDate={1637938800000} toDate={1638086400000} />
      <CardLayout>
        {idoConfig.map((ido) => (
          <NavLink to={`/ido/${ido.id}`} key={ido.id}>
            <Card data={ido} />
          </NavLink>
        ))}
      </CardLayout>
    </Page>
  )
}

const Container = styled.div`
  box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 25px 40px;
  display: flex;
  flex-direction: column;
  background-image: url('/images/ido-bg.png');
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

export default Ido
