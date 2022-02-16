import React, {useRef} from 'react'
import styled from 'styled-components'
import {Button, MetamaskIcon} from 'components/Pancake-uikit'
import {registerTokenCustom} from 'utils/wallet'
import {getAddress} from 'utils/addressHelpers'

const CardNft = ({data}) => {
  const {nameNFT, totalNft = 0, heroVideo, framesImage, contractAddress, symbol, type} = data
  const isCOM = type === 'community'
  const videoRef = useRef(null)

  const playVideo = () => {
    videoRef.current.play()
  }

  const resetVideo = () => {
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <Card
      onMouseEnter={playVideo}
      onMouseLeave={resetVideo}
      className="bg-black shadow rounded-xl p-3 border border-gray-800 border-solid"
    >
      <CardHero>
        <div className="w-full flex items-center relative justify-center m-auto" style={{maxWidth: 300}}>
          <video loop muted className="absolute h-full" style={{width: '87%'}} ref={videoRef}>
            <source src={heroVideo} type="video/mp4" />
          </video>
          <img src={framesImage} alt={nameNFT} className="w-auto m-auto z-10" />
        </div>
      </CardHero>
      <div>
        <div className="text-yellow-400 font-bold text-lg md:text-xl my-3 uppercase">{nameNFT}</div>
        <div className="bg-gray p-3 rounded-lg">
          <p className="text-white">
            Amount: <span className="font-bold">{totalNft}</span>
          </p>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-center">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => registerTokenCustom(getAddress(contractAddress), symbol, 0, isCOM)}
            >
              <MetamaskIcon mr="10px" />
              <span className="text-red-400">Add to metamask</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

const Card = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`

const CardHero = styled.div`
  position: relative;
`

export default CardNft
