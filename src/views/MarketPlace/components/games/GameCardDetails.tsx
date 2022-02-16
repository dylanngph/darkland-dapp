import React from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import {Text, Heading, Button} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {Hero} from 'components/KShark'
import AttributeBarDetail from './AttributeBarDetail'
import staticData from './data'
import OnChainData from './OnChainData'
import ChildrenDetail from './ChildrenDetail'

interface ParamsTypes {
  id: string
}
interface ObjectTypes {
  id: string
  name: string
  price: number
  level: number
  type: string
  attribute: {
    atk: number
    spd: number
    hp: number
  }
  img: string
}

const GameCardDetails = () => {
  const {t} = useTranslation()
  const {id} = useParams<ParamsTypes>()

  const dataFetch = () => {
    let temp: ObjectTypes = {
      id: '',
      name: '',
      price: 0,
      level: 0,
      type: '',
      attribute: {
        atk: 0,
        spd: 0,
        hp: 0,
      },
      img: '',
    }
    for (let i = 0; i < staticData.length; i++) {
      if (staticData[i].id === id) {
        temp = staticData[i]
      }
    }
    return temp
  }

  const chicken = dataFetch()

  return (
    <Container>
      <Hero>
        <Heading as="h1" size="xl" color="#171B3D">
          {t('NFT Marketplace')}
        </Heading>
      </Hero>
      <TopCard>
        <LeftBox>
          <FeatureImage style={{}}>
            <img src="/images/chicken/5327.png" alt="" width="312px" />
          </FeatureImage>
          <AttBox>
            <FlexCenterBox
              style={{
                width: '100%',
              }}
            >
              <StyleName>
                <Text color="#9E9FAD" fontSize="28px" bold>
                  #{chicken.id}
                </Text>
                <Text bold color="#3C3F5C" fontSize="28px">
                  {' '}
                  {chicken.name}{' '}
                </Text>
              </StyleName>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  padding: '5px 10px',
                  width: '30%',
                }}
              >
                <LevelBox>{chicken.level}</LevelBox>
                <div style={{marginLeft: '10px'}}>
                  <img src={`/images/chicken/types/${chicken.type}.png`} alt="" width="35px" />
                </div>
              </div>
            </FlexCenterBox>
            <AttPanel>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    marginRight: '10px',
                  }}
                >
                  <img src="/images/chicken/atk.png" alt="" width="23px" height="23px" />
                </div>
                <AttributeBarDetail point={chicken.attribute.atk} />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    marginRight: '10px',
                  }}
                >
                  <img src="/images/chicken/spd.png" alt="" width="23px" height="23px" />
                </div>
                <AttributeBarDetail point={chicken.attribute.spd} />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    marginRight: '10px',
                  }}
                >
                  <img src="/images/chicken/hp.png" alt="" width="23px" height="23px" />
                </div>
                <AttributeBarDetail point={chicken.attribute.hp} />
              </div>
              <CardBody>
                <StyledPrice>
                  <Text color="#9E9FAD" fontSize="15px">
                    Lastest Bid
                  </Text>
                  <Text color="#3C3F5C" fontSize="22px" bold>
                    {chicken.price}
                  </Text>
                </StyledPrice>
                <StyledCoin>
                  <TokenStyle>
                    <Text color="#66687B" fontSize="14px">
                      ~0,2
                    </Text>
                    <img src="/SAT.png" width="15px" alt="SAT" />
                    <Text fontWeight="600">SAT</Text>
                  </TokenStyle>
                  <TokenStyle>
                    <Text color="#66687B" fontSize="14px">
                      ~0,5
                    </Text>
                    <img src="/images/coins/0x8249bc1dea00660d2d38df126b53c6c9a733e942.png" width="15px" alt="BKS" />
                    <Text fontWeight="600">BAMI</Text>
                  </TokenStyle>
                </StyledCoin>
              </CardBody>
            </AttPanel>
            <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
          </AttBox>
        </LeftBox>
        <RightBox>
          <OnChainData id={chicken.id} />
        </RightBox>
      </TopCard>
      <BodyCard>
        <ChildrenDetail />
      </BodyCard>
      <AuctionBox>
        <Text marginBottom="20px" color="#3C3F5C" fontSize="22px" bold>
          Auction Rules
        </Text>
        <AuctionList>
          <ol type="1" style={{listStyle: 'auto', listStylePosition: 'inside'}}>
            <li>
              Each time you participate in the auction, you need to increase the price by 10%. After the countdown ends,
              the auction item will be obtained by the last bidder;
            </li>
            <li>20% of this increase is obtained by the previous bidder, and 80% by the seller;</li>
            <li>
              After the auction is successful, the market will charge 3% of the seller’s revenue as a service fee, of
              which 50% is burned, 40% enters the JOJO NFT Pool.
            </li>
            <li>
              When the auction countdown is less than 1 hour, the auction end time will be extended by 10 minutes for
              every successful bid;
            </li>
            <li>
              After the auction is over, the seller can go to the details page to claim the auction proceeds, and the
              buyer can claim the NFT.
            </li>
          </ol>
        </AuctionList>
      </AuctionBox>
    </Container>
  )
}

const Container = styled.div`
  padding: 48px;
  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`
const TopCard = styled.div`
  display: flex;
  border-radius: 24px;
  width: 100%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const LeftBox = styled.div`
  display: flex;
  border-radius: 24px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 65%;
  border-right: 1px dashed #e7e7eb;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 35%;
  padding: 40px;
  @media only screen and (max-width: 600px) {
    padding: 15px;
    flex-direction: column;
    width: 100%;
  }
`
const LevelBox = styled.div`
  background-image: url('/images/chicken/level-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 35px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #fff;
  & > div {
    margin-bottom: 10px;
  }
`
const FeatureImage = styled.div`
  background-color: #000;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  height: 100%;
  @media only screen and (max-width: 600px) {
    width: 100%;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    border-bottom-left-radius: 0;
  }
`
const FlexCenterBox = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const StyleName = styled.div`
  display: flex;
  gap: 10px;
  width: 70%;
  @media only screen and (max-width: 600px) {
    justify-content: center;
    width: 100%;
    gap: 0;
  }
`
const AttBox = styled.div`
  padding: 20px 40px;
  width: 65%;
  @media only screen and (max-width: 600px) {
    padding: 15px 10px;
    width: 100%;
  }
`
const AttPanel = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #e7e7eb;
  border-radius: 10px;
  margin-bottom: 20px;
`
const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`

const TokenStyle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const StyledPrice = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 10px;
  }
`
const StyledCoin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  & > * {
    margin-bottom: 10px;
  }
`
const ConnectWalletButton = styled(Button)`
  border-radius: 40px;
  background-color: #3849e0;
  width: 100%;
`
const BodyCard = styled.div`
  margin-top: 40px;
`
const AuctionBox = styled.div`
  margin-top: 40px;
`
const AuctionList = styled.div`
  ol li {
    margin-bottom: 10px;
    color: #66687b;
    line-height: 1.5;
  }
`
export default GameCardDetails
