import React from 'react'
import Text from '../../../components/Text/Text'
import Skeleton from '../../../components/Skeleton/Skeleton'
import {PriceCard, GirdCard, ImageToken} from './PriceCard'

interface Props {
  primaryPriceUsd?: number
}

const KSharkPrice: React.FC<Props> = ({primaryPriceUsd}) => {
  return primaryPriceUsd ? (
    <PriceCard>
      <ImageToken src="/images/prices/adt.png" alt="adt" height='30px' width='30px' />
      <GirdCard>
        <Text color="textSubtle" bold>
          ADT
        </Text>
        <Text color="textSubtle" fontSize="12px">{`$${primaryPriceUsd.toFixed(3)}`}</Text>
      </GirdCard>
    </PriceCard>
  ) : (
    <Skeleton marginBottom="5px" width={80} height={24} />
  )
}

export default React.memo(KSharkPrice)
