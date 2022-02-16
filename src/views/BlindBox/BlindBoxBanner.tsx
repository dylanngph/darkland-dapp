import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Countdown from 'views/BlindBox/components/Countdown'
import {Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import CountdownIDO from 'components/CountdownIDO/CoundownIDO'

const BlindBoxBanner = () => {
  const remainingBoxes = 250.025
  const endTimes = 6776000.0
  const {t} = useTranslation()
  const [endCountDown, setEndCountDown] = useState(false)

  return (
    <NavLink to="/blind-box">
      <BoxCard>
        <BoxName bold>{t('HTD Box')}</BoxName>
        <Text lineHeight="30px" marginTop="20px" fontSize="14px" color="#fff" maxWidth="600px">
          {t(
            'HeroesTD members who stake $HTD in the limited pool will have a chance to be whitelisted for NFT BlindBox purchase. Each ticket allows members to purchase 01 NFT BlindBox with either BUSD or $HTD, depends on the Rarity of the BlindBox.',
          )}
        </Text>
        {endCountDown && (
          <Card>
            <CardItem>
              <Text marginRight="2px" fontSize="12px" color="#A7A7A7">
                {' '}
                {t('Remaining Boxes:')}{' '}
              </Text>
              <Text fontSize="12px" color="#FFC247">
                {remainingBoxes}
              </Text>
            </CardItem>
            <CardItem>
              <Text marginRight="10px" paddingTop="2px" fontSize="12px" color="#A7A7A7">
                {' '}
                {t('End Time:')}{' '}
              </Text>
              <Countdown time={endTimes} />
            </CardItem>
          </Card>
        )}
        <CountdownIDO fromDate={1637938800000} toDate={1638630000000} />
      </BoxCard>
    </NavLink>
  )
}

const CardItem = styled.div`
    display: flex;s
    flex-direction: row;
    margin-bottom: 15px
`

const Card = styled.div`
  width: 178px;
  height: 73px;
  background: linear-gradient(180deg, #333333 0%, #1c1c1c 100%);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`

const BoxCard = styled.div`
  height: 300px;
  width: 100%;
  padding: 30px 37px;
  background: url(/images/blindbox/blind-box-1.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 14px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 210px;
  }
  @media screen and (max-width: 991px) {
    padding: 20px;
  }
`

const BoxName = styled(Text)`
  font-size: 30px;
  color: #fff;
  line-height: 30px;
  margin-top: 5px;
  @media screen and (max-width: 991px) {
    font-size: 35px;
  }
`

export default BlindBoxBanner
