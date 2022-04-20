import React, {useEffect, useState, useCallback} from 'react'
import Page from 'components/Layout/Page'
import {NavLink} from 'react-router-dom'
import {useTranslation} from 'contexts/Localization'
import styled from '@emotion/styled'
import { styled as muiStyled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Skeleton, Text } from '@pancakeswap/uikit'
import { Box } from '@mui/material'
import { useMatchBreakpoints } from 'components/Pancake-uikit/hooks'
import { blindBoxConfig } from 'config/constants'
import BlindBoxItem from './BlindBoxItem'
import { useBlindBox } from './hooks/useBlindBox'



const steps = [
  {
    label: 'White List',
    description: `From: 03:00 PM 22 Mar 2022.
                  To: 03:00 PM 25 Mar 2022.`,
  }
];

const BlindBox = () => {
  const {t} = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab , setActiveTab] = useState('common') 
  const dataBlindBox = useBlindBox()

  const optionStyled = {
    maxWidth: isMobile ? '100%' : '300px',
    '.MuiStepIcon-root' : {
      width: '34px',
      height: '34px',
      color: '#747475',
      '&.Mui-completed': {
        color: '#00FB28'
      },
      '&.Mui-active': {
        color: '#00BFD5'
      }
    },
    '.MuiStepLabel-label': {
        color: 'rgba(255,255,255,.5)',
        '&.Mui-completed': {
          color: '#fff'
        },
        '&.Mui-active': {
          color: '#fff'
      }
    }
  }

  return (
    <Wrapper>
      <Flex sx={{
        flexDirection: isMobile ? 'column' : 'row',
        gap: '40px',
        alignItems: isMobile ? 'center' : 'start'
      }}>
      {
        !dataBlindBox
        ?
        <>
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
        </>
        :
        <>
        <Box style={{ backgroundColor: '#00000050', padding: 20, minWidth: 350 }}>
          <Flex gap={2}>
            <FormatListBulletedIcon style={{ background: 'linear-gradient(198.74deg, #09E02C 19.48%, #098D1E 94.69%)', borderRadius: 50, width: 40, height: 40, padding: 10 }} />
            <Flex flexDirection='column'>
              <Text color='lime' mb={3}>Whitelist</Text>
              <Text mb={2}>From: { new Date(dataBlindBox.startTimeWL * 1000).toLocaleString() }</Text>
              <Text>To: { new Date(dataBlindBox.endTimeWL * 1000).toLocaleString() }</Text>
            </Flex>
          </Flex>
        </Box>
        <Box sx={{
          width: '100%',
        }}>
          <Flex sx={{
            alignItems: 'center',
            background: '#181818',
            width: 'fit-content',
            '.active' : {
              background: '#2647CB'
            },
            '.disable' : {
              background: 'rgba(38, 71, 203, .4)',
            }
          }}>
            <Tab
              className={activeTab === 'common' ? 'active' : 'disable'}
              onClick={() => setActiveTab('common')}
            >
              <Box>
                <img src="images/common_box.png" alt="" width="30px" />
              </Box>
              <Box>Mystery Box</Box>
              
            </Tab>
            <Tab
              className={activeTab === 'premium' ? 'active' : 'disable'}
              onClick={() => setActiveTab('premium')}
            >
              <Box>
                <img src="images/premium_box.png" alt="" width="30px" />
              </Box>
              <Box>Premium Box</Box>
            </Tab>
          </Flex>
          <BlindBoxSection sx={{
              minWidth: isMobile ? '100%' : '900px',
              padding: isMobile? '30px' : '40px'
          }}>
            <BlindBoxItem 
              isMobile={isMobile} 
              type={activeTab}
              rate={blindBoxConfig.rate[activeTab]}
              typeBox={blindBoxConfig.type[activeTab]}
              dataBox={dataBlindBox[activeTab]}
              isDiscount={dataBlindBox.userWhitelistDiscount}
              percent={dataBlindBox.percentDiscount}
              isUserHadBuyBox={dataBlindBox.isUserHadBuyBox}
              isWhitelist={dataBlindBox.userWhitelist}
            />
          </BlindBoxSection>
        </Box>
        </>

      }
      </Flex>
    </Wrapper>
  )
}
const Wrapper = styled(Box)`
  min-height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url('images/blindbox/blindbox_page.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`
const Flex = styled(Box)`
  display: flex;
`
const Col = styled(Box)`
  display: flex;
  flex-direction: column;
`
const StepBox = styled(Box)`
  background: #091749;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
`
const ColorlibConnector = muiStyled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    // top: 17,
    color: '#747475'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#00FB28',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#00FB28',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    width: 2,
    border: 0,
    backgroundColor: '#747475',
  },
}));

const Tab = styled(Box)`
  display: flex;
  align-items: center;
  padding: 15px 40px;
  font-size: 18px;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: .1s ease-in;
`
const BlindBoxSection = styled(Box)`
  background-image: url('images/blindbox/blindbox_bg.png');
  min-height: 520px;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default BlindBox
