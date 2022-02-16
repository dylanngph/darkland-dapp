import React from 'react'

import EggGen1 from 'assets/images/Egg_Gen_1.png'
import EggGen2 from 'assets/images/Egg_Gen_2.png'
import EggGen3 from 'assets/images/Egg_Gen_3.png'
import EggGen4 from 'assets/images/Egg_Gen_4.png'
import EggGen5 from 'assets/images/Egg_Gen_5.png'
import EggGen6 from 'assets/images/Egg_Gen_6.png'
import EggGen7 from 'assets/images/Egg_Gen_7.png'
import EggGen8 from 'assets/images/Egg_Gen_8.png'
import EggGen9 from 'assets/images/Egg_Gen_9.png'
import EggGen10 from 'assets/images/Egg_Gen_10.png'
import styled from 'styled-components'
import { Button } from '@pancakeswap/uikit'
import { useHistory } from 'react-router'

const getEggImg = (heroDetails) => {
  switch (heroDetails.eggGen) {
    case 1:
      return EggGen1
    case 2:
      return EggGen2
    case 3:
      return EggGen3
    case 4:
      return EggGen4
    case 5:
      return EggGen5
    case 6:
      return EggGen6
    case 7:
      return EggGen7
    case 8:
      return EggGen8
    case 9:
      return EggGen9
    default:
      return EggGen10
  }
}

const EggCard = ({heroDetails}) => {
  const history = useHistory()
  return (
    <EggWrapper className="cursor-pointer" onClick={()=> history.push({ pathname: `/heroes-nft-details/${heroDetails.tokenId}`, state: '/my-assets' })}>
      <img src={getEggImg(heroDetails)} alt="egg-gen" />
    </EggWrapper>
  )
}

const EggWrapper = styled.div`
  width: 192px;
  height: 286px;
  // background-color: rgb(0, 0, 0);
  // border: 1px solid rgb(67, 67, 68);
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 10px
`

export default EggCard
