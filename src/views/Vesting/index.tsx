import {useWeb3React} from '@web3-react/core'
import Page from 'components/Layout/Page'
import React from 'react'
import { Box , useMediaQuery } from '@mui/material'
import NotFound from 'views/NotFound'
import {  } from '@pancakeswap/uikit'
import styled from '@emotion/styled'
import Vesting from './Vesting'
import {useFetchVestingTGE as useFetchPrivate} from './hooks/useFetchVesting'
import {useFetchVestingTGE as useFetchStrategic} from './hooks/useFetchVestingStrategic'

const VestingSection = () => {
  const privateSale = useFetchPrivate()
  const strategic = useFetchStrategic()

  const isMobile = useMediaQuery('(max-width:1080px)')

  const {account} = useWeb3React()  

  return <Vesting/>
  // if ((account && privateSale.getAllocation) || (account && strategic.getAllocation)) {
  // }

  return (
    <Page>
      <div className="flex justify-center w-full" style={{alignItems: 'center', height: '600px', flexDirection: isMobile ? 'column' : null}}>
        <MessageBox>
          <span style={{fontSize: '21px', color: '#E6AB58'}}>
            Greetings, Commander!
          </span>
          <span>
            You have to be a private sale or stragegic investor to entrance this section.
          </span>
        </MessageBox>
        <img src="/images/vesting-greet.png" alt="" />
      </div>
    </Page>
  )
}

const MessageBox = styled(Box)`
  background: rgba(255,255,255, .05);
  border: 1.5px solid #747475;
  border-radius: 10px;
  padding: 20px 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  max-width: 400px
`
export default VestingSection
