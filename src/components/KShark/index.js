import styled from 'styled-components'
import {Text} from '../Pancake-uikit'

export const Hero = styled.div`
  margin-bottom: 22px;
  text-align: center;
  > h1 {
    font-weight: 900;
    font-size: 30px;
    line-height: 41px;
    /* identical to box height */
    letter-spacing: -0.114286px;
  }
  > div {
    line-height: 22px;
    font-weight: 600;
  }
`

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  // border: 0.6px solid #686868;
  box-sizing: border-box;
  border-radius: 10px;
  /* height: 70px; */
  justify-content: center;
  align-items: center;

  flex-direction: column;
  padding: 19px 0;
  gap: 20px;
  ${({theme}) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // align-items: center;
  }
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;

  ${Text} {
    margin-left: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.3px;
    color: #fff;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  > ${Text} {
    font-size: 12px;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({theme}) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
    justify-content: space-around;
  }
`

export const ViewControls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    justify-content: space-around;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

export const SortText = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #66686a;
  min-width: 50px;
  /* text-transform: uppercase; */
`
