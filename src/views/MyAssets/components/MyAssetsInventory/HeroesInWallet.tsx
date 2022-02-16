import { Flex } from '@chakra-ui/react'
import { Button } from '@pancakeswap/uikit'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import HeroesCard from 'views/HeroesCard'
import EggCard from 'views/HeroesCard/EggCard'

const HeroesInWallet = ({ dataHeroes }) => {
  const history = useHistory()
  return (
    <>
      {dataHeroes &&
        dataHeroes.map((d) => {
          return (
            <RubyBlock
              key={d.tokenId}
              className="flex flex-row flex-wrap cursor-pointer"
              onClick={() =>
                history.push({ pathname: `/heroes-nft-details/${d.tokenId}`, state: '/my-assets' })
              }
            >
              <HeroesCard hero={d} />
            </RubyBlock>
          )
        })}
    </>
  )
}

const HeroesListWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px solid #424243;
  border-radius: 5px;

  width: 150px;
  height: 40px;
  font-size: 14px;
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffc247;
`

const RubyBlock = styled.div`
  position: relative;
  background-color: #000000;
  flex-direction: column;
  height: 100%;
  width: auto;
  border-radius: 10px;
  border: 1px solid #434344;
  padding-top: 10px;
  > div {
    ${({ theme }) => theme.mediaQueries.md} {
      transform: scale(0.7);
      width: 190px;
      height: 270px;
    }
    border: unset;
    padding: 0 10px;
  }
  ::-webkit-scrollbar-track {
    background: #e24042;
  }
  &:hover {
    border-color: #aaaaaa;
  }
`

export default HeroesInWallet
