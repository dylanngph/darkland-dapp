import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Skeleton, CopyIcon} from 'components/Pancake-uikit'
import {formatNumber} from 'utils/formatBalance'
import {BountyConfig} from 'config/constants/types'
import {getAddress} from 'utils/addressHelpers'
import {BASE_BSC_SCAN_URL} from 'config/index'
import _ from 'lodash'

interface CardProps {
  data: BountyConfig
  isBounty?: boolean
  pendingTx?: boolean
  handleClaim?: () => void
  isLoading?: boolean
}

const Detail: React.FC<CardProps> = ({data, isBounty = false, pendingTx, handleClaim, isLoading}) => {
  const {
    title,
    description,
    totalClaimed,
    nameNFT,
    image,
    isWhitelist,
    endTime,
    heroVideo,
    desciptionHero,
    framesImage,
    totalLimit,
    type,
    background,
    contractAddress,
    slug,
  } = data
  const splitDesciptionHero = desciptionHero.length > 80 ? desciptionHero.slice(0, 80).concat('...') : desciptionHero
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(`${getAddress(contractAddress)}`)
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  const whitelist = _.findIndex(['sapphire', 'ruby', 'gold'], (e) => e === slug)
  const totalClaimedMax = whitelist !== -1 && totalClaimed >= totalLimit ? totalLimit : totalClaimed
  return (
    <div className="flex flex-col justify-between bg-black rounded-xl shadow h-full">
      <div className="border-b border-gray-800 border-solid px-5 py-5">
        <div className="text-white text-2xl uppercase">{title}</div>
      </div>
      <div className="p-5">
        <p className="text-gray leading-5 whitespace-pre-line">{description}</p>
        <div className="bg-gray shadow rounded-xl my-8 p-3">
          <div className="flex justify-between text-gray mb-4">
            <span>End time:</span>
            <span>{endTime}</span>
          </div>
          <div className="mb-4 relative">
            {/* <div className="bg-red-500 absolute h-2 rounded-xl" style={{ width: `${50}%`}} /> */}
            <div className="w-full border-b-2 border-white opacity-25 border-solid" />
          </div>
          <div className="flex justify-between text-gray">
            <div>Claimed:</div>
            <div>
              {isLoading ? (
                <Skeleton width="100px" />
              ) : (
                <span className="text-yellow-400">
                  {formatNumber(totalClaimedMax, 0)}{' '}
                  <span className="text-white"> / {totalLimit < 0 ? '∞' : formatNumber(totalLimit, 0)}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-white mb-3">Rewards</p>
          <div
            className={`relative md:flex gap-3 border border-gray-800 border-solid rounded-xl p-3 ${
              isBounty ? 'flex-start' : 'items-center'
            }`}
          >
            {isBounty && (
              <Medal className="hidden md:block">
                <img
                  src={image}
                  alt={title}
                  className={`w-full h-full object-cover ${background ? 'bg-white rounded-2xl p-2' : null}`}
                />
              </Medal>
            )}
            {isBounty ? (
              <div className="w-full md:w-64 flex items-center relative justify-center m-auto" style={{maxWidth: 300}}>
                <video autoPlay loop muted className="absolute" style={{width: '87%'}}>
                  <source src={heroVideo} />
                </video>
                <img src={framesImage} alt={title} className="w-auto m-auto z-10" />
              </div>
            ) : (
              <div className="w-32 h-24 flex items-center">
                <img
                  src={image}
                  alt={title}
                  className={`w-auto h-full ${background ? `bg-white rounded-xl p-2` : null}`}
                />
              </div>
            )}
            <div className="w-full py-2 flex flex-col justify-start">
              <p className="text-gray font-bold uppercase">{nameNFT}</p>
              <div className="text-white mt-2 text-sm text-gray whitespace-pre-line leading-5">
                {isBounty ? desciptionHero : splitDesciptionHero}
              </div>
              <div className="bg-gray text-gray min-w-max rounded-md px-2 py-1 w-24 text-center mt-2">
                Amount: <span className="font-bold text-white">1</span>
              </div>
            </div>
          </div>
        </div>
        {isBounty && (
          <div className="mt-5">
            <div className="md:flex gap-3 p-2 border border-solid border-gray-800 w-full rounded-xl text-gray relative">
              Contract Address:{' '}
              <a target="_blank" rel="noreferrer" href={`${BASE_BSC_SCAN_URL}/address/${getAddress(contractAddress)}`}>
                {getAddress(contractAddress)}
              </a>
              <CopyIcon onClick={handleCopy} style={{cursor: 'pointer'}} />
              <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        {isLoading ? (
          <Skeleton width="100%" height="50px" />
        ) : isBounty ? (
          // userIsClaimed ?
          //     <Button disabled className="w-full">
          //         Claimed
          //     </Button>
          // :
          <Button className="w-full" onClick={handleClaim} disabled={pendingTx || !isWhitelist}>
            <span className="font-bold text-lg capitalize">
              {isWhitelist ? (pendingTx ? 'Claiming...' : 'Claim bounty') : 'Claim'}
            </span>
          </Button>
        ) : (
          <Button className="w-full">
            <span className="font-bold text-lg capitalize">Claim task</span>
          </Button>
        )}
      </div>
    </div>
  )
}

const Medal = styled.div`
  background: linear-gradient(180deg, #424242 0%, #000000 100%);
  width: 70px;
  height: 64px;
  position: absolute;
  top: 0;
  right: 25px;
  border-radius: 0 0 25px 25px;
  border: 1px solid #424243;
  padding: 5px;
`

const Tooltip = styled.div<{isTooltipDisplayed: boolean}>`
  display: ${({isTooltipDisplayed}) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -28px;
  right: 0;
  text-align: center;
  background-color: ${({theme}) => theme.colors.contrast};
  color: ${({theme}) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: 100px;
`

export default Detail
