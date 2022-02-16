import React from 'react'
import styled from 'styled-components'
import {Flex, Text} from 'components/Pancake-uikit'
import {ReactComponent as LineRouteIcon} from '../../line.svg'

const Games = () => {
  return (
    <World>
      <Header>
        <div>
          <Text color="#fff" bold fontSize="48px" lineHeight="56px">
            Collect & Sell Your NFT
          </Text>
        </div>
        <div>
          <Text color="rgba(255,255,255, .7)" fontSize="18px" lineHeight="24px">
            The platform for legitimate crypto collectible assets and non-fungible tokens.
          </Text>
        </div>
      </Header>
      <Features>
        <div>
          <img src="/features-game.png" alt="Game Features" width="360px" height="360px" />
        </div>
        <div>
          <div className="right-features">
            <Text className="title" color="#171B3D" bold fontSize="48px" lineHeight="48px" marginBottom="30px">
              Features
            </Text>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LineRouteIcon height="237px" />
              <div>
                <div style={{marginBottom: '30px'}}>
                  <Text className="title2" color="#3C3F5C" bold fontSize="24px" marginBottom="15px">
                    Harvest at all costs
                  </Text>
                  <Text className="para" color="#3C3F5C" textAlign="justify" lineHeight="24px">
                    You have 30 minutes to find a relic, signal for extraction, and grab one of three spots on the
                    rescue chopper.
                  </Text>
                </div>
                <div className="title2" style={{marginBottom: '30px'}}>
                  <Text color="#3C3F5C" bold fontSize="24px" marginBottom="15px">
                    Creat new character
                  </Text>
                </div>
                <div>
                  <Text className="title2" color="#3C3F5C" bold fontSize="24px" marginBottom="15px">
                    Impress the audience
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Features>
      <Footer>
        <FooterLeft>
          <Text color="#171B3D" bold fontSize="40px" marginBottom="40px" lineHeight="48px">
            Bitback app
          </Text>
          <Text color="#3C3F5C" lineHeight="24px">
            Each round, you and 15 other contestants compete to escape a deadly island filled with monsters. The trick
            is: three people can survive. Will you run solo or form friendships with others to escape?
            <br />
            <br />
            Making the right decisions could be the difference between life and death.
          </Text>
        </FooterLeft>
        <div>
          <img src="/footer-img.png" alt="Footer Slider" width="458px" />
        </div>
      </Footer>
    </World>
  )
}
const World = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
  min-height: calc(100vh - 64px);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/bitbackgame-bg.png');
`
const Header = styled.div`
  border-radius: 20px;
  background-image: url('/game-head.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 40px;
  height: 290px;
  margin-bottom: 200px;
  @media only screen and (max-width: 600px) {
    margin-bottom: 40px;
  }
`
const Features = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;

  .right-features {
    margin-left: 40px;
    width: 335px;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 40px;
    .right-features .title {
      width: 100%;
      margin-left: 0;
    }
    .right-features .title {
      font-size: 28px;
    }
    .right-features .title2 {
      font-size: 24px;
    }
    .right-features .para {
      font-size: 18px;
    }
  }
`
const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`
const FooterLeft = styled.div`
  width: 359px;
  margin-right: 80px;
  @media only screen and (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`
export default Games
