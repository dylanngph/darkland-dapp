import React from 'react'
import styled from 'styled-components'

const Activities = () => {
  const activities = [
    {
      id: 1,
      date: 'Oct 15, 2021',
      content: [
        {
          id: 1,
          time: '00:15',
          image: '/images/my-assets/Hero.png',
          content: 'You attempted to breed',
          hero: 'CARROT PRINTED',
          heroId: 'THD#15665',
          price: '1000',
          currencyType: 'CGC',
          status: 'View Transaction Status here'
        },
        {
          id: 2,
          time: '00:20',
          image: '/images/my-assets/Hero.png',
          content: 'You attempted to breed',
          hero: 'CARROT PRINTED',
          heroId: 'THD#15665',
          price: '500',
          currencyType: 'HTD',
          status: 'View Transaction Status here'
        }
      ]
    },
    {
      id: 2,
      date: 'Oct 14, 2021',
      content: [
        {
          id: 1,
          time: '00:15',
          image: '/images/my-assets/Hero.png',
          content: 'You attempted to breed',
          hero: 'CARROT PRINTED',
          heroId: 'THD#15665',
          price: '1000',
          currencyType: 'HTD',
          status: 'View Transaction Status here'
        },
        {
          id: 2,
          time: '00:20',
          image: '/images/my-assets/Hero.png',
          content: 'You attempted to breed',
          hero: 'CARROT PRINTED',
          heroId: 'THD#15665',
          price: '800',
          currencyType: 'HTD',
          status: 'View Transaction Status here'
        },
        {
          id: 3,
          time: '00:20',
          image: '/images/my-assets/Hero.png',
          content: 'You attempted to breed',
          hero: 'CARROT PRINTED',
          heroId: 'THD#15665',
          price: '1200',
          currencyType: 'CGC',
          status: 'View Transaction Status here'
        }
      ]
    }
  ]
  return (
    <div>
      <h1 className='h-10 mt-3' >Activities</h1>
      <Card>
        {activities.map((activity) => (
          <CardItem key={activity.id} >
            <p>{activity.date}</p>
            <ActivityContent>
              {activity.content.map((item) => (
                <ContentItem key={item.id} >
                  <p className='text-xl mt-1 justify-center items-center' style={{ color: "#686868" }} > {item.time} </p>
                  <img className='mx-3 mb-1 pb-10 sm:pb-5 lg:pb-0' src={item.image} alt='icon' height={25} width={40} />
                  <ContentText>
                    <p className='text-xs sm:text-sm' > {item.content} 
                    <span style={{color: "#FFC247"}} > {item.hero}</span> with 
                    <span style={{color: "#FFC247"}}> {item.heroId}</span> for {item.price} {item.currencyType} </p>
                    <ContentItem>
                      <p className='text-sm flex flex-row' style={{ color: "#686868" }} > 
                      {item.status} <img className='mx-1' src='/images/blindbox/change-avatar-icon.svg' alt='icon' /> </p>
                      
                    </ContentItem>
                  </ContentText>
                </ContentItem>
              ))}
            </ActivityContent>
          </CardItem>
        ))}
      </Card>
    </div>
  )
}

const Card = styled.div`
  background: #0F0F0F;
  padding: 30px;
  @media screen and (max-width: 668px) {
    padding: 10px;
  }
`
const CardItem = styled.div`
  border-bottom: 1px solid #424243;
  margin-bottom: 25px;
`
const ActivityContent = styled.div`
  margin: 15px 0px;
`
const ContentItem = styled.div`
  display:flex;
  flex-direction: row;
`

const ContentText = styled.div`
display:flex;
flex-direction: column;
`

export default Activities
