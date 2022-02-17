import {useWeb3React} from '@web3-react/core'
import Page from 'components/Layout/Page'
import React from 'react'
import { Box , useMediaQuery } from '@mui/material'
import NotFound from 'views/NotFound'
import { Hero } from 'components/KShark'
import {Heading, Text} from 'components/Pancake-uikit'
import styled from '@emotion/styled'
import Vesting from './Vesting'
import {useFetchVestingTGE as useFetchPrivate} from './hooks/useFetchVesting'
import {useFetchVestingTGE as useFetchStrategic} from './hooks/useFetchVestingStrategic'

const VestingSection = () => {
  const privateSale = useFetchPrivate()
  const strategic = useFetchStrategic()

  const isMobile = useMediaQuery('(max-width:1080px)')

  const {account} = useWeb3React()  

  // return <Vesting/>
  // if ((account && privateSale.getAllocation) || (account && strategic.getAllocation)) {
  // }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#fff">
          Vesting
        </Heading>
        <Text color="#fff">Wellcome, Investors!</Text>
      </Hero>
      <Vesting/>
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
