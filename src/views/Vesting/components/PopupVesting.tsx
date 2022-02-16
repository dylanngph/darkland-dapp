import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Button} from 'components/Pancake-uikit'
import styled from 'styled-components'

interface PropPopupVesting {
  close?: () => void
  onDontShow?: (close) => void
}

const PopupVesting: React.FC<PropPopupVesting> = ({close, onDontShow}) => {
  return (
    <Container className="rounded-xl shadow">
      <div className="flex justify-between flex-col h-full gap-5 w-full">
        <Swiper resizeObserver className="w-full" navigation loop>
          <SwiperSlide>
            <img src="https://cdn.heroestd.io/Images/Intro1.png" className="h-full m-auto" alt="Vesting" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.heroestd.io/Images/Intro2.png" className="h-full m-auto" alt="Vesting" />
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube-nocookie.com/embed/AARM4NWeFv4?controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </SwiperSlide>
        </Swiper>
        <div className="flex md:justify-center gap-5 justify-between">
          <Button onClick={() => onDontShow(close)}>Don&apos;t show again</Button>
          <Button onClick={close}>Close</Button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.95);
  width: 100vw;
  height: 100vh;
  padding: 20px;
  max-width: 1400px;
  max-height: 100vh;
  ${({theme}) => theme.mediaQueries.md} {
    width: 50vw;
    height: 70vh;
  }
`

export default PopupVesting
