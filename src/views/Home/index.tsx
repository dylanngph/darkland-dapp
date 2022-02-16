import React, {useEffect} from 'react'
import styled from 'styled-components'
// import PageSection from 'components/PageSection'
import {useWeb3React} from '@web3-react/core'
import useTheme from 'hooks/useTheme'
// import Container from 'components/Layout/Container'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import Page from 'components/Layout/Page'
import {BaseLayout, Box, Heading, Text} from 'components/Pancake-uikit'
import UserWallet from './components/UserWallet/UserWallet'
import UserInsight from './components/UserInsight'
import SampleView from './sampleView'

// import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
// import MetricsSection from './components/MetricsSection'
// import SalesSection from './components/SalesSection'
// import WinSection from './components/WinSection'
// import FarmsPoolsRow from './components/FarmsPoolsRow'
// import Footer from './components/Footer'
// import CakeDataRow from './components/CakeDataRow'
// import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
// import UserBanner from './components/UserBanner'

const Home: React.FC = () => {
  // useEffect(() => {
  //   var ref = db.ref("box-claim");
  //   ref.once("value", function (snapshot) {
  //     console.log(snapshot.val());
  //   });
  // }, [])

  return (
    <Page>
      <div
        style={{
          marginTop: '-20px',
        }}
      >
        {/* <div className="text-xl text-center w-full">Coming Soon</div> */}
        {/* <Cards>
          <Box className="flex flex-col gap-6">
            <UserWallet />
            <FarmStakingCard />
          </Box>
          <CakeStats />
        </Cards> */}
        <SampleView/>
        {/* <CTACards>
          <UserInsight />
          <WinCard/>
          <EarnAssetCard />
        </CTACards> */}
      </div>
    </Page>
  )
}
const Container = styled.div`
  box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: start;
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
  video {
    width: 100%;
    max-height: 40vh;
    position: relative;
    top: 0;
    object-fit: cover;
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
const Hero = styled.div`
  margin-bottom: 22px;
  > h1 {
    font-weight: 900;
    font-size: 30px;
    line-height: 41px;
    /* identical to box height */
    letter-spacing: -0.114286px;
  }
  > div {
    line-height: 22px;
    font-weight: 600;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 14px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({theme}) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 14px;
  display: grid;
  grid-template-columns: auto auto auto;

  ${({theme}) => theme.mediaQueries.xs} {
    grid-template-columns: auto;
  }

  ${({theme}) => theme.mediaQueries.lg} {
    grid-template-columns: auto auto auto;
  }
`
export default Home
