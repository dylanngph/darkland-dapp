import React from 'react'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {Box} from 'components/Pancake-uikit'
import styled from 'styled-components'

const TabsSection = () => {
  return (
    <Tabs isFitted>
      <TabList color="#343434">
        <Tab _selected={{color: 'white', boxShadow: 'none', borderColor: 'currentColor'}}>Vesting Description</Tab>
        <Tab _selected={{color: 'white', boxShadow: 'none', borderColor: 'currentColor'}}>Vesting Information</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="text-gray">
            Nothing !!!
          </div>
        </TabPanel>
        <TabPanel padding="40px 0">
          <Col>
            <Row>
              <div>Token per price</div>
              <BoldBox>0.075$ per DOT</BoldBox>
            </Row>
          </Col>
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
  gap: 20px;
`
const Row = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
export default TabsSection
