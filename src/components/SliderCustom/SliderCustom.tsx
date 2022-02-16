import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import './sliderCustom.scss'

interface Props {
  filter: any
}

const SliderCustom = ({ filter }: Props) => {
  const dispatch = useAppDispatch()
  const { paramFilterHero } = useSelector((state: AppState) => state.marketplace)

  const handleChangeSlider = (name: string) => (value: number) => {
    const filterParams = { ...paramFilterHero }
    filterParams.page = 1
    filterParams[name] = value
    dispatch(setParamSearchHero(filterParams))
  }

  const renderContent = () => {
    return (
      <>
        {filter?.map((item) => {
          return (
            <WrapSliderCustom key={item.name}>
              <h1>{item.label}</h1>
              <div key={item.name}>
                <WrapSlider>
                  <Slider
                    {...item}
                    onChange={handleChangeSlider(item.name)}
                    aria-label="slider-ex-2"
                    colorScheme="red.600"
                    value={paramFilterHero[item.name]}
                  >
                    <SliderTrack bg="black">
                      <SliderFilledTrack bg="red.600" />
                    </SliderTrack>
                    <SliderThumb boxSize={3} bg="red.600" _focus={{ border: 'unset' }}>
                      <MyTooltip>{paramFilterHero[item.name]}</MyTooltip>
                    </SliderThumb>
                  </Slider>
                </WrapSlider>
              </div>
            </WrapSliderCustom>
          )
        })}
      </>
    )
  }

  return <>{renderContent()}</>
}
const WrapSliderCustom = styled.div`
  width: 100%;
  margin-bottom: 10px;
  > h1 {
    font-size: 16px;
    line-height: 20px;
    color: #9e9e9e;
    margin: 5px 0;
  }
`

const WrapSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 26px;
  background: linear-gradient(180deg, #2a2a2a 0%, #262424 100%);
  border-radius: 5px;
  > div {
    width: 95%;
  }
`
const MyTooltip = styled.div`
  position: relative;
  top: -20px;
  width: 30px;
  max-height: 12px;
  min-height: 12px;
  background: linear-gradient(270deg, #fd476a 0%, #fe335b 0.01%, #df222b 105.1%) !important;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 13px;
  z-index: 199;
  :before {
    content: '';
    left: 0;
    width: 10px;
  }
  :after {
    content: '';
    right: 0;
    width: 10px;
  }
`

export default SliderCustom
