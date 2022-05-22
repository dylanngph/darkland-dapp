import React, {lazy} from 'react'
import {Router, Redirect, Route, Switch} from 'react-router-dom'
import {RedirectBoxInfoWithId} from 'views/BlindBox/redirects'
import {ResetCSS} from 'components/Pancake-uikit'
import BigNumber from 'bignumber.js'
import IdoDetails from 'views/IDO/IdoDetails'
import useEagerConnect from 'hooks/useEagerConnect'
import {usePollBlockNumber} from 'state/block/hooks'
import {usePollCoreFarmData} from 'state/farms/hooks'
import {useFetchProfile} from 'state/profile/hooks'
import { useFetchUserContract } from 'state/user/hooks'
import { useFetchClaimedBox, useFetchMyBox } from 'state/box/hooks'
import { useFetchHero, useGetHeroConfig } from 'state/hero/hooks'
import { useFetchUserNftBounty } from 'state/nftBounty/hooks'
import { useMinPricesHero } from 'views/MarketPlace/hooks/useMarketplace'
import {DatePickerPortal} from 'components/DatePicker'
import Games from 'views/Games/Games'
import GameCardDetails from 'views/MarketPlace/components/games/GameCardDetails'
import FirebaseListener from 'config/firebase/firebaseListener'
import PrivateZone from 'views/Vesting/components/PrivateZone/PrivateZone'
import AirdropZone from 'views/Vesting/components/AirdropZone/Airdrop'
import NFTStaking from 'views/NFTStaking/NFTStaking'

import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import {ToastListener} from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import Swap from './views/Swap'
import ComingSoon from './views/ComingSoon'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import {RedirectPathToSwapOnly, RedirectToSwap} from './views/Swap/redirects'
import GlobalCheckClaimStatus from './views/Collectibles/components/GlobalCheckClaimStatus'
import {RedirectBountyWithId} from './views/Bounty/redirects'
import StrategicZone from './views/Vesting/components/StrategicZone/VestingStrategic'
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const MiniFarms = lazy(() => import('./views/MiniFarms'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
const NotFound = lazy(() => import('./views/NotFound'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const FarmNft = lazy(() => import('./views/FarmNft'))
const Referrals = lazy(() => import('./views/Referrals'))
const Bounty = lazy(() => import('./views/Bounty'))
const BlindBox = lazy(() => import('./views/BlindBox'))
const BlindBoxDetails = lazy(() => import('./views/BlindBoxDetails'))
const MarketPlace = lazy(() => import('./views/MarketPlace'))
const InfoScreen = lazy(() => import('./views/Info'))
const Vesting = lazy(() => import('./views/Vesting'))
const VestingStrategic = lazy(() => import('./views/Vesting/components/StrategicZone/VestingStrategic'))
const IDO = lazy(() => import('./views/IDO/Ido'))
const MyAssets = lazy(() => import('./views/MyAssets'))
const LeaderBoardStaking = lazy(() => import('./views/LeaderboardStaking'))
const LeaderboardPooling = lazy(() => import('./views/LeaderboardPooling'))
const LeaderBoardAlphaTest = lazy(() => import('./views/LeaderBoardAlphaTest'))
const MarketPlaceHeroDetails = lazy(() => import('./views/MarketPlaceHeroDetails'))
const HeroInGameDetails = lazy(() => import('./views/MarketPlaceHeroDetails/HeroInGame'))
const HeroNftDetails = lazy(() => import('./views/HeroNftDetails'))
const DashboardMarket = lazy(() => import('./views/DashboardMarket'))
const TransactionHistory = lazy(() => import('./views/TransactionHistory'))
const PoolNft = lazy(() => import('./views/PoolNft'))
const Rewards = lazy(() => import('./views/Rewards'))
const PlayGame = lazy(() => import('./views/PlayGame'))
// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  // useFetchClaimedBox()
  useFetchHero()
  // useFetchMyBox()
  // useMinPricesHero()
  // useGetHeroConfig()
  // useFetchUserNftBounty()
  // useFetchUserContract()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <GlobalCheckClaimStatus excludeLocations={['/collectibles']} />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route exact path="/farms/auction">
              <FarmAuction />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route exact path="/vesting">
              <Vesting />
            </Route>
            <Route exact path="/vesting/strategic-round">
              <PrivateZone />
            </Route>
            <Route exact path="/vesting/seed-round">
              <StrategicZone/>
            </Route>
            <Route exact path="/vesting/airdrop">
              <AirdropZone />
            </Route>
            <Route exact path="/nft-staking">
              <NFTStaking />
            </Route>
            <Route exact path="/market-place">
              <MarketPlace />
            </Route>
            <Route exact path="/blind-box">
              <BlindBox/>
            </Route>
            <Route exact strict path="/hero/:id" component={HeroNftDetails} />
            <Route exact strict path="/rewards" component={Rewards} />

            <Route exact strict path="/my-assets" component={MyAssets} />

            <Route exact strict path="/bounty-detail/:bountyId" component={RedirectBountyWithId} />
            <Route exact strict path="/ido/:idoId" component={IdoDetails} />
            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
            <Route exact strict path="/play-game" component={PlayGame} />
            <Route exact strict path="/blind-box/:boxId" component={BlindBoxDetails} />
            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <FirebaseListener/>
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
