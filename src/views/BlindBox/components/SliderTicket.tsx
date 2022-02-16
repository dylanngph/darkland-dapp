import React, {useEffect, useState, useCallback, MouseEventHandler} from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styled from 'styled-components'
import './sliderTicket.modules.scss'
import Exclamation from 'assets/images/exclamation.svg'
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect'

const SliderTicket = ({currentTiming, setCurrentTiming}) => {
  const [currentValueSlider, setCurrentValueSlider] = useState(1)

  useEffect(() => {
    setCurrentValueSlider(currentTiming)
    setCurrentTiming(currentTiming)
  }, [currentTiming, setCurrentTiming])

  const marks = {
    1: <div style={{display: 'none'}}>a</div>,
    2: <div style={{display: 'none'}}>a</div>,
    3: <div style={{display: 'none'}}>a</div>,
  }

  const onGetMark = (event) => {
    setCurrentValueSlider(event)
    setCurrentTiming(event)
  }

  return (
    <div className="slider-component">
      <div className="margin-center">
        <div className="top-tier">
          <div
            className={currentValueSlider === 1 ? 'ticket-zone ticket-ui shadow' : 'ticket-ui'}
            onClick={() => onGetMark(1)}
            aria-hidden="true"
          >
            <div className="flex flex-row">
              <span className="slider-title text-xs md:text-sm lg:text-lg xl:text-2xl">TOP TIER</span>
            </div>
            <span className="text-xs md:text-sm text-white ">15:00 UTC, Dec 10th</span>
          </div>
          <div
            className={currentValueSlider === 2 ? 'ticket-zone ticket-ui shadow' : 'ticket-ui'}
            onClick={() => onGetMark(2)}
            aria-hidden="true"
          >
            <div className="flex flex-row">
              <span className="slider-title text-xs md:text-sm lg:text-lg xl:text-2xl">TICKET ZONE</span>
            </div>
            <span className="text-xs md:text-sm text-white">15:00 UTC, Dec 11th</span>
          </div>
          <div
            className={currentValueSlider === 3 ? 'ticket-zone ticket-ui shadow' : 'ticket-ui'}
            onClick={() => onGetMark(3)}
            aria-hidden="true"
          >
            <div className="flex flex-row">
              <span className="slider-title text-xs md:text-sm lg:text-lg xl:text-2xl">FREE ZONE</span>
            </div>
            <span className="text-xs md:text-sm text-white">15:00 UTC, Dec 12th</span>
          </div>
        </div>
      </div>

      <Slider
        className="margin-center slider-ticket slider-ui"
        value={currentValueSlider}
        marks={marks}
        step={1}
        min={1}
        max={3}
        onChange={onGetMark}
      />
    </div>
  )
}

const RowSelect = styled.div`
  height: 100px;
  backgourndcolor: #ffffff;
  margin-right: 200px;
  top: 10%;
  position: absolute;
`
const RowSelectRight = styled.div`
  display: flex;
  > img {
    display: inline;
    margin-left: 5px;
    // width: 12px;
  }
`

export default SliderTicket
