import React from 'react'
import styled from 'styled-components'
import AccountInfo from './AccountInfo'
import MenuAsset from './MenuAsset'

const MyAssetMenu = ({setCurrentAssetMenuTab, currentAssetMenuTab}) => {
  return (
    <Card className='mr-0 md:mr-5' >
      <AccountInfo />
      <MenuAsset setCurrentAssetMenuTab={setCurrentAssetMenuTab} currentAssetMenuTab={currentAssetMenuTab} />
    </Card>
  )
}

const Card = styled.div`
  width: auto;
  height: auto;
  background: #091749;
  box-sizing: border-box;
`

// const Block = styled.div`
//   margin-top: 44px;
//   margin-bottom: 33px;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `

// const Text = styled.div`
//   font-size: 16px;
//   color: #ffffff;
// `

export default MyAssetMenu
