import React from 'react'
import styled from 'styled-components'
import {Text} from 'components/Pancake-uikit'
import {connect, useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'

let blindBoxItemDropRate: any = {}

const BlindBoxDropRate = ({blindBoxItem}) => {
  const onGetBlindBox = (evt) => {
    // console.log("blindBoxItem", blindBoxItem)
  }
  return (
    <>
      <Text color="#858585" fontWeight="bold" marginTop="29px" marginBottom="11.23px">
        Drop rate
      </Text>
      <TableWrapper>
        <Table className="table table-borderless table-hover table-dark w-full">
          <THead>
            <tr>
              <THHead scope="col"> </THHead>
              <THHead scope="col" className="flex justify-center items-center">
                <BlindBoxDropRateHeader
                  onClick={onGetBlindBox}
                  style={{color: '#9E9E9E', fontSize: '10px', fontWeight: 'bold'}}
                  className="flex justify-center items-center"
                >
                  (C)
                </BlindBoxDropRateHeader>
              </THHead>
              <THHead scope="col">
                <BlindBoxDropRateHeader
                  style={{color: '#8DE1FF', fontSize: '10px', fontWeight: 'bold'}}
                  className="flex justify-center items-center"
                >
                  (R)
                </BlindBoxDropRateHeader>
              </THHead>
              <THHead scope="col">
                <BlindBoxDropRateHeader
                  style={{color: '#92EE97', fontSize: '10px', fontWeight: 'bold'}}
                  className="flex justify-center items-center"
                >
                  (SR)
                </BlindBoxDropRateHeader>
              </THHead>
              <THHead scope="col">
                <BlindBoxDropRateHeader
                  style={{color: '#FF7EE7', fontSize: '10px', fontWeight: 'bold'}}
                  className="flex justify-center items-center"
                >
                  (SSR)
                </BlindBoxDropRateHeader>
              </THHead>
            </tr>
          </THead>
          <TBody>
            <tr>
              <THBody
                scope="row"
                style={{width: '110px', padding: '10px', color: '#9E9E9E', fontSize: '10px', fontWeight: 'bold'}}
              >
                <img src={blindBoxItem && blindBoxItem.titleImageurl} alt={blindBoxItem.title} />
              </THBody>
              <TDBody className="text-center" style={{color: '#9E9E9E', fontSize: '10px', fontWeight: 'bold'}}>
                {blindBoxItemDropRate.commonRate}%
              </TDBody>
              <TDBody className="text-center" style={{color: '#8DE1FF', fontSize: '10px', fontWeight: 'bold'}}>
                {blindBoxItemDropRate.rareRate}%
              </TDBody>
              <TDBody className="text-center" style={{color: '#92EE97', fontSize: '10px', fontWeight: 'bold'}}>
                {blindBoxItemDropRate.superRareRate}%
              </TDBody>
              <TDBody className="text-center" style={{color: '#FF7EE7', fontSize: '10px', fontWeight: 'bold'}}>
                {blindBoxItemDropRate.supersuperRate}%
              </TDBody>
            </tr>
          </TBody>
        </Table>
      </TableWrapper>
    </>
  )
}

const TableWrapper = styled.div`
  border-radius: 11px;
  border: 1px solid #424243;
  overflow: hidden;
`
const Table = styled.table`
  border-radius: 11px;
  border: 1px solid #424243;
  margin: 0px !important;
`

const THead = styled.thead`
  background-color: #272626 !important;
`
const THHead = styled.th`
  background-color: #272626 !important;
  height: 25px;
`

const TBody = styled.tbody`
  background-color: #0f0f0f !important;
`

const THBody = styled.th`
  background-color: #0f0f0f !important;
`

const TDBody = styled.td`
  background-color: #0f0f0f !important;
`

const BlindBoxDropRateHeader = styled.div`
  height: 12px;
`
const mapStateToProps = (state) => {
  const {blindbox} = state
  blindBoxItemDropRate = state.blindbox.currentBlindBoxPercentageList
  return {
    blindbox,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BlindBoxDropRate)
