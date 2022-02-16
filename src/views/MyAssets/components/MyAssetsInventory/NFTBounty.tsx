import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import {useAssetsUser} from 'views/MyAssets/hooks/fetchAssetsUser'
import CardNft from '../CardNft'

const NFTBounty = () => {
  const data = useSelector((state: AppState) => state.nftBounty.bountyData)
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data && data?.map((d) => (
          <CardNft data={d} key={d.id} />
        ))}
      </div>
    </div>
  )
}

export default NFTBounty
