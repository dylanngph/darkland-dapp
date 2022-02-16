import React from 'react'
import {Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Button} from '@chakra-ui/react'
import {Box, Skeleton} from 'components/Pancake-uikit'
import styled from 'styled-components'
import {formatDate, formatNumber} from 'utils/formatBalance'

const TabsSection = ({data, dataIDO}) => {
  const {isPaid, tokenAllowance, isClaim, balanceOf, timeClaimIDO, maxHardCap, nowCap, nowTotalUser, idoDescription} =
    data
  const {startTime, endTime, priceSale, tokenPrice, nftRequire} = dataIDO
  const isFree = dataIDO.type === 'free'
  return (
    <Tabs isFitted>
      <TabList color="#343434">
        <Tab _selected={{color: 'white', boxShadow: 'none', borderColor: 'currentColor'}}>IDO Information</Tab>
        <Tab _selected={{color: 'white', boxShadow: 'none', borderColor: 'currentColor'}}>IDO Description</Tab>
      </TabList>
      <TabPanels>
        <TabPanel padding="20px 0">
          <Col>
            {isFree && (
              <Row>
                <div>Max Cap:</div>
                <BoldBox>
                  {formatNumber(maxHardCap)} {tokenPrice.symbol}
                </BoldBox>
              </Row>
            )}
            {nowTotalUser ? (
              <Row>
                <div>Total slots:</div>
                <BoldBox>{nowTotalUser}</BoldBox>
              </Row>
            ) : null}
            <Row>
              <div>Token per price</div>
              <BoldBox>
                {priceSale} {tokenPrice.symbol}
              </BoldBox>
            </Row>
            {startTime ? (
              <Row>
                <div>Start time:</div>
                <BoldBox>{formatDate(startTime * 1000)}</BoldBox>
              </Row>
            ) : null}
            {endTime ? (
              <Row>
                <div>End time:</div>
                <BoldBox>{formatDate(endTime * 1000)}</BoldBox>
              </Row>
            ) : null}
            <Divider />
            {!isFree && (
              <>
                <div>Whitelist selection</div>
                <div
                  style={{
                    padding: '15px',
                    background: '#272727',
                    borderRadius: '8px',
                    color: '#A5A5A5',
                    textTransform: 'uppercase',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {nftRequire.map((d) => (
                    <p>- {d.name} BOUNTY NFT</p>
                  ))}
                </div>
              </>
            )}
          </Col>
        </TabPanel>
        <TabPanel>
          <p>✨ In the IDO on https://heroestd.io, everyone must buy $HTD with $BUSD. </p>
          <p>- Max cap/whitelist person: $50.</p>
          <p>- Max cap/freezone person: $50/purchase, no limit on number of purchases</p>
          <p>- Max Freezone Pool: Depends on the remaining HTD pool after whitelist. Minimum 232 slots.</p>
          <p>Please prepare $BNB for gas fee in your metamask wallet.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
const BoldBox = styled(Box)`
  font-weight: 700;
`
const Col = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-weight: 400;
  font-size: 14px;
`
const Row = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
export default TabsSection
