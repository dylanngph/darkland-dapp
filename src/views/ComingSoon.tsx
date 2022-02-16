import React from 'react'
import styled from 'styled-components'
import {Button, Heading, Text, LogoIcon} from '@pancakeswap/uikit'
// import Page from 'components/Layout/Page'
import {useTranslation} from 'contexts/Localization'

const StyledComingSoon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const ComingSoon = () => {
  const {t} = useTranslation()

  return (
    <Page className="fixed w-full h-screen left-0 overflow-hidden">
      <video autoPlay loop muted className="object-cover h-full w-full">
        <source src="trailer_bg.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <LogoStyle>
        <img src="txt_logo.png" alt="Dot Arcade" />
        <div className="text-white text-lg md:text-2xl leading-7 mt-5">
          Dot Arcade is a Free-to-Play or Play-to-Earn 3D GameFi built with Heroes Metaverse. You can play with each
          other and trade items on the NFT Marketplace! Join Dot Arcade today and get your life-time investment!
        </div>
        {/* <Button className="mt-5">Play to earn, now !</Button> */}
        {/* <img src="heroestd.png" alt="HeroesTD" width="350px" className="pl-2" />
        <img src="cta.png" alt="HeroesTD" /> */}
      </LogoStyle>
      {/* <TextStyle className="text-white">Coming Soon</TextStyle> */}
    </Page>
  )
}

const Page = styled.div`
  background-image: url(/images/bg_adt.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(0px);
  }
`

const TextStyle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  z-index: 1;
  font-size: 30px;
  ${({theme}) => theme.mediaQueries.lg} {
    font-size: 72px;
  }
`

const LogoStyle = styled.div`
  position: absolute;
  top: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  ${({theme}) => theme.mediaQueries.lg} {
    margin: 0 auto;
    padding: 0 40%;
    padding-left: 340px;
  }
`

export default ComingSoon
