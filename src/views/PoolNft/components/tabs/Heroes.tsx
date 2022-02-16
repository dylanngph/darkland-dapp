import React, { useState } from 'react'
import { Text, Heading, Button } from 'components/Pancake-uikit'
import styled from 'styled-components'
import { ReactComponent as AddCardIcon } from '../../add-card.svg'

const Heroes = () => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7]

  return (
    <Container>
      <WrapPool>
        <div className='row'>
          <BoxItem className='mb-32'>
            <p className='main-title mb-8'>HTD Total Heroes</p>
            <p className='main-money mb-8'>100.000</p>
            <p className='second-title'>≈ $50,050.52</p>
          </BoxItem>
          <BoxItem>
            <div className='flex-box'>
              <div>
                <p className='main-title mb-8'>Heroes</p>
                <p className='main-money mb-8'>0</p>
                <p className='second-title'>≈ 0</p>
              </div>
              <div>
                <Button variant="primary" className="w-full stake-button">
                  Harvest all
                </Button>
              </div>
            </div>
          </BoxItem>
          <BoxItem />
          <BoxItem>
            <div className="wrap-box-item">
              <div className='mr-24'>
                <p className='second-money mb-8'>130,758.50</p>
                <p className='second-title'>Total Staked Amount</p>
              </div>
              <div>
                <p className='second-money mb-8'>0</p>
                <p className='second-title'>My Staked Amount</p>
              </div>
            </div>
          </BoxItem>
          <BoxItem>
            <div className="wrap-box-item">
              <div className='mr-24'>
                <p className='second-money mb-8'>30,551</p>
                <p className='second-title'>Total Mining Hashrate</p>
              </div>
              <div>
                <p className='second-money mb-8'>0</p>
                <p className='second-title'>My Mining Hashrate</p>
              </div>
            </div>
          </BoxItem>
          <BoxItem>
            <div className="wrap-box-item">
              <div className='flex-box mb-8'>
                <p className='second-money mr-16'>30,551</p>
                <p className='second-title'>≈ $87.20</p>
              </div>
              <p className='second-title w-full'>1000 Mining Hashrate/24H toget</p>
            </div>
          </BoxItem>
        </div>
      </WrapPool>

      <WrapCard>
        <div className='row'>
          {items.map((item, index) => (
            <ItemCard>
              <div className='card'>
                <AddCardIcon />
              </div>
              <p className='card-status'>No Heroes</p>
              <p className='card-name'>Hashrate</p>
              <Button variant="primary" className="w-full stake-button">
                Stake
              </Button>
              {/* <Button variant="primary" className="w-full upgrade-button">
                Upgrade Hashrate
              </Button> */}
            </ItemCard>
          ))}
        </div>
      </WrapCard>
    </Container>
  )
}

const Container = styled.div`

`

const WrapPool = styled.div`
  background: #000000;
  border: 2px solid #686868;
  border-radius: 16px;
  padding: 24px 8px;
  margin-bottom: 24px;

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .mb-8 {
    margin-bottom: 8px;
  }

  .mb-32 {
    margin-bottom: 32px;
  }

  .mr-24 {
    margin-right: 24px;
  }

  .mr-16 {
    margin-right: 16px;
  }

  .w-full {
    width: 100%
  }
`

const BoxItem = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  width: calc(100% / 3);

  .flex-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

.wrap-box-item {
  background: #151419;
  border-radius: 16px;
  padding: 16px;
  display: flex;
    flex-wrap: wrap;
}

.main-title {
  color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
}

.main-money {
  color: #FFC247;
  font-weight: bold;
  font-size: 30px;
  line-height: 40px;
}

.second-title {
  color: #9E9E9E;
  font-size: 16px;
  line-height: 21px;
}

.second-money {
  color: #FFFFFF;
  font-weight: bold;
font-size: 26px;
line-height: 35px;
}

@media only screen and (max-width: 1199px) {
  width: calc(100% / 2);

  &:last-child {
    width: 100%;
    margin-top: 32px;
  }

  &:nth-child(3) {
    display: none;
  }
}

@media only screen and (max-width: 400px) {
  width: calc(100% / 1);
  margin-bottom: 32px;

  &:last-child {
    margin-top: 0;
    margin-bottom: 0;
  }
}
`

const WrapCard = styled.div`
  margin-left: -12px;
  margin-right: -12px;

  .row {
    display: flex;
    flex-wrap: wrap;
  }
`

const ItemCard = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  width: calc(100% / 4);
  display: inline-block;
  margin-bottom: 24px;

  .card {
    width: 100%;
    background: #000000;
    border: 2px solid #686868;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    cursor: pointer;
    padding: 10px;
    aspect-ratio: 1 / 1.3;
  }

  .card-status {
    color: #FFFFFF;
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 12px;
    text-align: center;
  }

  .card-name {
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    line-height: 27px;
    color: #FFAB04;
    margin-bottom: 12px;
  }

  .stake-button {
    background: linear-gradient(270deg, #FD476A 0%, #FE335B 0.01%, #DF222B 105.1%);
    margin-bottom: 12px;
  }

  .upgrade-button {
    background: transparent;
    color: #9E9E9E;
    border: 1px solid #686868;
  }

  @media only screen and (max-width: 1199px) {
    width: calc(100% / 3);
  }

  @media only screen and (max-width: 991px) {
    width: calc(100% / 2);
  }

  @media only screen and (max-width: 400px) {
    width: calc(100% / 1);
  }
`

export default Heroes
