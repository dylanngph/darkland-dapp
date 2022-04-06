import React from 'react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import { Stepper , Step, StepLabel } from '@mui/material';
import { Button } from '@pancakeswap/uikit';



export type StepBoxProps = {
    isMobile?: boolean

}


const StepBox = ({isMobile }:StepBoxProps) => {


  return (
    <Box sx={{ 
        width: '100%',
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
    }}>
      <StyledBox>
        <Stepper
          activeStep={0}
          alternativeLabel
          connector={<ColorlibConnector/>}
        >
          <Step>
              <StepLabel>
                  <Box textAlign="center">
                      <div style={{fontWeight: '700', fontSize: '16px'}} >Stake</div>
                      <div style={{fontSize: '12px'}} >Deposite tokens</div>
                  </Box>
              </StepLabel>
          </Step>
          <Step>
              <StepLabel>
                <Box textAlign="center">
                    <div style={{fontWeight: '700', fontSize: '16px'}} >Wait</div>
                    <div style={{fontSize: '12px'}} >Waiting to receive</div>
                </Box>
              </StepLabel>
          </Step>
          <Step>
              <StepLabel>
                  <Box textAlign="center">
                    <div style={{fontWeight: '700', fontSize: '16px'}} >Claim</div>
                    <div style={{fontSize: '12px'}} >Claim your box</div>
                  </Box>
              </StepLabel>
          </Step>
        </Stepper>
      </StyledBox>
      <StyledBox sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
        gap: '20px'
      }}>
          <Box sx={{
            fontSize: '28px',
            textTransform: 'uppercase',
            fontWeight: '700'
          }}>
            Stake $BIG
          </Box>
          <Flex>
            <Box>
              $BIG Staking
            </Box>
            <Box color="#FFA800" >
              10000
            </Box>
          </Flex>
          <Flex>
            <Box>
              Locktime:
            </Box>
            <Box color="#FFA800" >
              30 day(s)
            </Box>
          </Flex>
          <Flex>
            <Box>
              Earn reward(s):
            </Box>
            <Box color="#FFA800" >
              1 Rare Box
            </Box>
          </Flex>
          <StyleButton>
            Stake
          </StyleButton>
      </StyledBox>
    </Box>
  )
}

const ColorlibConnector = muiStyled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
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
    height: 2,
    border: 0,
    backgroundColor: '#747475',
  },
}));

const StyledBox = styled(Box)`
  background: rgba(38, 71, 203, 0.5);
  border: 1px solid #00BFD5;
  padding: 20px;
`
const Flex = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`
const StyleButton = styled(Button)`
    background: #FFA800;
    height: 40px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding-left: 60px;
    padding-right: 60px;
    border-radius: 0;
    border-bottom: 7px solid #C16000;
    box-sizing: content-box;
`

export default StepBox