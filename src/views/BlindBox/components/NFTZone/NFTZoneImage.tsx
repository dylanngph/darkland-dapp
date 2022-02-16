import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import '../../blindBox.modules.scss'

const NFTZoneImage = () => {
  return (
    <Card className="w-full md:w-2/5">
      <img className="rounded-xl w-full h-full object-cover" src="/images/blindbox/nft_zone.png" alt="htd" />
    </Card>
  )
}

export default NFTZoneImage

const Card = styled.div`
  background: #000000;
  border-radius: 5px;
`

const CardImg = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  background-position: center;
`
