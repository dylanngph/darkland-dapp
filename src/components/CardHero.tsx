import {Button} from 'components/Pancake-uikit'
import React, {useRef} from 'react'

const CardHero = ({data, close, ...props}) => {
  const videoRef = useRef(null)
  const playVideo = () => {
    videoRef.current.play()
  }

  const resetVideo = () => {
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <div
      onMouseEnter={playVideo}
      onMouseLeave={resetVideo}
      className="border border-gray-800 border-solid p-5 rounded-xl shadow"
      {...props}
    >
      <div className="w-full flex items-center relative justify-center m-auto" style={{maxWidth: 300}}>
        <video loop muted className="absolute h-full" style={{width: '87%'}} ref={videoRef}>
          <source src={data.heroVideo} type="video/mp4" />
        </video>
        <img src={data.framesImage} alt={data.name} className="w-auto m-auto z-10" />
      </div>
      <div className="my-3">
        <p className="text-yellow-400 text-center font-bold">
          #{data.tokenId} - {data.name}
        </p>
      </div>
    </div>
  )
}

export default CardHero
