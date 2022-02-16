import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import NFTZoneForm from './NFTZoneForm'
import NFTZoneImage from './NFTZoneImage'
import '../../blindBox.modules.scss'

const NFTZone = ({dataBlindbox}) => {
  return (
    <Card className="flex flex-col md:flex-row w-full p-3 gap-4">
      <NFTZoneImage />
      <NFTZoneForm dataBlindbox={dataBlindbox} />
    </Card>
  )
}

const Card = styled.div`
  background: #000000;
  height: 100%;
  border-radius: 5px;
  position: relative;
  flex: 1;
`

export default NFTZone
