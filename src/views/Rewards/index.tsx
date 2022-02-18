import React from 'react'
import Page from 'components/Layout/Page'
import {ChevronRightIcon, ChevronLeftIcon} from '@pancakeswap/uikit'
import {Button} from 'components/Pancake-uikit'
import styled from 'styled-components'
import TableSection from './components/TableSection'


const RewardsSection = () => {

  return (
    <Page>
      {/* <div>
        <BackButton><ChevronLeftIcon />Back</BackButton>
      </div>
      <div style={{
        width: '100%',
        maxWidth: '676px',
        margin: '0 auto',
      }}>
        <TitlePage>Heroes: [Total heroes left]</TitlePage>
        <div className='p-6' style={{backgroundColor: '#091749'}}>
          <TblTitle><span>Legendary</span> (2534 heroes left)</TblTitle>
          <TblTitle><span>Claimed</span> (2534 heroes claimed)</TblTitle>
          <TableSection />
        </div>
      </div> */}
      <div className='mb-8'>
        <SectionTitle>Lands: [Total lands left]</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card className='grid grid-cols-2 gap-4'>
            <img src='/images/rewards/rewards-land.png' alt='rewards' />
            <div className='flex flex-col justify-between'>
              <CardTitle>Coming soon</CardTitle>
            </div>
          </Card>
        </div>
      </div>
      <div className='mb-8'>
        <SectionTitle>Heroes: [Total heroes left]</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card className='grid grid-cols-2 gap-4'>
            <img src='/images/rewards/rewards-heros-legendary.png' alt='rewards' />
            <div className='flex flex-col justify-between'>
              <div>
                <CardTitle>LEGENDARY</CardTitle>
                <CardSubTitle>[2563 Heroes left]</CardSubTitle>
              </div>
              <CardButton>History</CardButton>
            </div>
          </Card>
          <Card className='grid grid-cols-2 gap-4'>
            <img src='/images/rewards/rewards-heros-epic.png' alt='rewards' />
            <div className='flex flex-col justify-between'>
              <div>
                <CardTitle>EPIC</CardTitle>
                <CardSubTitle>[15474 Heroes left]</CardSubTitle>
              </div>
              <CardButton>History</CardButton>
            </div>
          </Card>
        </div>
      </div>
      <div className='mb-8'>
        <SectionTitle>Weapons: [Total weapons left]</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card className='grid grid-cols-2 gap-4'>
            <img src='/images/rewards/rewards-weapons-legendary.png' alt='rewards' />
            <div className='flex flex-col justify-between'>
              <div>
                <CardTitle>LEGENDARY</CardTitle>
                <CardSubTitle>[2563 Weapons left]</CardSubTitle>
              </div>
              <CardButton>History</CardButton>
            </div>
          </Card>
          <Card className='grid grid-cols-2 gap-4'>
            <img src='/images/rewards/rewards-weapons-epic.png' alt='rewards' />
            <div className='flex flex-col justify-between'>
              <div>
                <CardTitle>EPIC</CardTitle>
                <CardSubTitle>[15474 Weapons left]</CardSubTitle>
              </div>
              <CardButton>History</CardButton>
            </div>
          </Card>
        </div>
      </div>
      <div className='mb-8'>
        <SectionTitle>Relics: [Total relics left]</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card className='grid grid-cols-2 gap-4'>
            <img src='/images/rewards/rewards-relics.png' alt='rewards' />
            <div className='flex flex-col justify-between'>
              <div>
                <CardTitle>Coming soon</CardTitle>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  )
}
const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 24px;
`;

const Card = styled.div`
  background: #091749;
  border: 1px solid #00BFD5;
  padding: 16px;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
`;

const CardSubTitle = styled.div`
  color: #C0C0C0;
  font-size: 16px;
`;

const CardButton = styled(Button)`
  font-size: 12px;
  background: #FFA800;
  height: 30px;
  border-radius: 0;
  width: 100%;
  &:hover {
    background: rbga(255, 168, 0, 0.8);
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
  &:disabled {
    background: #1a202c;
  }
`

const TblTitle =  styled.div`
  color: #FFA800;
  margin-bottom: 12px;
  span {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const TitlePage = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const BackButton =  styled(Button)`
  background-color: transparent;
  border: 1px solid #00BFD5;
  padding: 6px 24px;
  border-radius: 0;
  width: 150px;
  height: 38px;
`;

export default RewardsSection
