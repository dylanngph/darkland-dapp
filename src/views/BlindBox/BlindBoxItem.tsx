import React , {useState , useEffect} from 'react'
import styled from '@emotion/styled'
import {Box, Button, keyframes} from '@mui/material'
import {ReactComponent as PlusIcon} from 'assets/icons/plus.svg'
import {ReactComponent as MinusIcon} from 'assets/icons/minus.svg'


export type Prop = {
  isMobile?: boolean
  type?: string
}


const BlindBoxItem = ({isMobile , type}:Prop) => {
  const [quantity , setQuantity] = useState(1)

  useEffect(() => {
    if(quantity < 0) setQuantity(0)
  },[quantity])


  return (
    <>
      <Flex sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '20px'
      }}>
        <Col sx={{
          alignItems: 'center'
        }}>
          <BoxWrapper>
            <img src={`images/blindbox/${type}_box.png`} alt="" width="250px" />
          </BoxWrapper>
          <img src="images/blindbox/box_plate.png" alt="" width="300px" />
        </Col>
        <Col sx={{gap: '20px'}}>
          <Flex sx={{
            alignItems: 'center',
            gap: '10px'
          }}>
            <img src="images/blindbox/TitleDivider.png" alt='' width="8px" />
            <Col sx={{gap: '10px',textTransform: 'uppercase'}}>
              <Box sx={{fontSize: '20px'}}>
                Box
              </Box>
              <Box sx={{
                fontSize: '48px',
                fontWeight: '700',
              }}>
                {type === 'common' ? 'Mystery' : 'Premium'}
              </Box>
            </Col>
          </Flex>
          <Box sx={{color: '#C0C0C0', fontSize: '20px', fontWeight: '700'}}>
            Drop rate
          </Box>
          <Flex sx={{gap: '20px', flexWrap: 'wrap'}}>
              <RateBox sx={{background: '#006CBE'}}>
                  <div>Common</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >50%</Box>
              </RateBox>
              <RateBox sx={{background: '#7D44DB'}}>
                  <div>Rare</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >50%</Box>
              </RateBox>
              <RateBox sx={{background: '#E8A500'}}>
                  <div>Epic</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >50%</Box>
              </RateBox>
              <RateBox sx={{background: '#D40060'}}>
                  <div>Legendary</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >50%</Box>
              </RateBox>
          </Flex>
          <Flex sx={{alignItems: 'center',gap: '10px'}}>
              <img src="images/blindbox/arena_token.png" alt="" />
              <Box sx={{
                fontSize: '30px',
                fontWeight: '700'
              }}>
                1,000 BIG
              </Box>
              <Box>
                (10.25 USD)
              </Box>
          </Flex>
          <Flex sx={{
            background: '#1A2B6D',
            padding: '10px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <InputButton
              onClick={() => setQuantity(quantity - 1)}
            >
              <MinusIcon/>
            </InputButton>
            <Box sx={{
              fontSize: '25px',
              fontWeight: '900'
            }}>
              {quantity}
            </Box>
            <InputButton
              onClick={() => setQuantity(quantity + 1)}
            >
              <PlusIcon/>
            </InputButton>
          </Flex>
          <StyleButton variant='contained'>
            Purchase
          </StyleButton>
        </Col>
      </Flex>
    </>
  )
}

const Floating = keyframes`
  0% {
    transform: translateY(0)
  }
  50% {
    transform: translateY(-10px)
  }
  100% {
    transform: translateY(0)
  }
`

const Flex = styled(Box)`
  display: flex;
`
const Col = styled(Box)`
  display: flex;
  flex-direction: column;
`
const RateBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 25px;
  border-radius: 8px;
`
const InputButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: #00A3FF;
  min-width: 65px;
  min-height: 30px;
  cursor:  pointer;
  transition: .1s ease-in;
  :hover {
    opacity: .8
  }
`
const StyleButton = styled(Button)`
  display: flex;
  border-radius: 0;
  flex: 2;
  background-color: #FFA800;
  border-bottom: 7px solid #C16000;
  font-weight: 700;
  text-transform: none;
  :hover {
    background-color: rgba(255, 168, 0, .8);
  }
`
const BoxWrapper = styled(Box)`
  animation: ${Floating} 3s linear infinite;
`


export default BlindBoxItem