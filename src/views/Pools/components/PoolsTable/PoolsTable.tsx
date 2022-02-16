import React, {useRef} from 'react'
import styled from 'styled-components'
import {Button, ChevronUpIcon, Text} from '@pancakeswap/uikit'
import {useTranslation} from 'contexts/Localization'
import {Pool} from 'state/types'
import PoolRow from './PoolRow'

interface PoolsTableProps {
  pools: Pool[]
  userDataLoaded: boolean
  account: string
}

const StyledTable = styled.div`
  border-radius: ${({theme}) => theme.radii.card};
  border: 1px solid #747475;
  background-color: rgba(255,255,255, .05);
  > div:not(:last-child) {
    border-bottom: 2px solid ${({theme}) => theme.colors.disabled};
  }
`

const StyledTableBorder = styled.div`
  border-radius: ${({theme}) => theme.radii.card};
  background-color: transparent;
  background-size: 400% 400%;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const PoolsTable: React.FC<PoolsTableProps> = ({pools, userDataLoaded, account}) => {
  const {t} = useTranslation()
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <StyledTableBorder>
      <StyledTable role="table" ref={tableWrapperEl}>
        {pools.map((pool) => (
          <PoolRow key={pool.sousId} pool={pool} account={account} userDataLoaded={userDataLoaded} />
        ))}
        <ScrollButtonContainer>
          <Button color="textSubtle" variant="text" onClick={scrollToTop}>
            <Text color="textSubtle">{t('To Top')}</Text>
            <ChevronUpIcon color="textSubtle" />
          </Button>
        </ScrollButtonContainer>
      </StyledTable>
    </StyledTableBorder>
  )
}

export default PoolsTable
