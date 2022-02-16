import React from 'react'
import styled from 'styled-components'
import {Button, Heading, Skeleton, Text} from 'components/Pancake-uikit'

const LotteryCard = ({dataBlindbox}) => {
  if (!dataBlindbox) {
    return (
      <div className="w-full flex flex-col gap-3">
        <Skeleton width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="100%" />
      </div>
    )
  }

  const {userTickets} = dataBlindbox

  return (
    <PreSaleTicketComponent>
      <PreSaleTicketBanner
        src="https://cdn.heroestd.io/Images/preSaleTicket.svg"
        alt="PresaleTicket"
        className="w-full h-90 object-cover"
      />
      <div className="mt-3 flex flex-col gap-2">
        <PreSaleTicketBannerTitle>Get tickets to buy pre-sale boxes !</PreSaleTicketBannerTitle>
        <Text
          style={{
            color: 'white',
            fontWeight: 'normal',
            fontSize: '12px',
          }}
        >
          Join one of three events to claim tickets !
        </Text>
        {/* <YourTicketComponent className="flex flex-row flex-wrap justify-between">
          <Text
            style={{
              margin: '5px',
              color: 'white',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            Your tickets:
          </Text>
          <Text
            style={{
              margin: '5px',
              color: '#ffab04',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            {userTickets}
          </Text>
        </YourTicketComponent> */}
      </div>
    </PreSaleTicketComponent>
  )
}

const YourTicketComponent = styled.div`
  background-color: #272727;
  border-radius: 5px;
`
const PreSaleTicketBannerTitle = styled(Text)`
  color: #ffab04;
  font-weight: bold;
`

const PreSaleTicketBanner = styled.img`
  margin: 0 auto;
  border-radius: 10px;
`

const PreSaleTicketComponent = styled.div`
  width: 100%;
  background: #000000;
  border: 0.971041px solid #272727;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 18px;
  height: 100%;
`

export default LotteryCard
