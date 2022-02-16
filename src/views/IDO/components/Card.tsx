import React from 'react'
import {Box, Progress} from '@chakra-ui/react'
import styled from '@emotion/styled'
import {formatDate} from 'utils/formatBalance'
import {OpenTag, UpComing, Closed} from './Tags'

const Card = ({data}) => {
  const currentTime = Date.now()
  const startTime = data.startTime * 1000
  const endTime = data.endTime * 1000
  const isUpComing = startTime > currentTime
  const isStartTime = startTime < currentTime && currentTime < endTime
  const isClosed = currentTime > endTime

  const StatusIDO = () => {
    // if (isUpComing) {
    // 	return <UpComing/>
    // }
    // if (isStartTime) {
    // 	return <OpenTag/>
    // }
    // if (isClosed) {
    // 	return <Closed/>
    // }
    return <Closed />
  }

  return (
    <Wrapper className="shadow h-full flex flex-col justify-between">
      <TopBox>
        <div>
          <img src="/images/sample-ido.png" width="100%" alt="" />
        </div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Box
            sx={{
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            {data.title}
          </Box>
          <StatusIDO />
        </Box>
      </TopBox>
      <div className="px-5">
        <Box
          sx={{
            color: '#89898B',
            fontSize: '12px',
          }}
        >
          {data.description}
        </Box>
      </div>
      <BottomBox>
        <InfoBox>
          {/* <Row>
                        <div>Swap rate:</div>
                        <BoldText>TBA</BoldText>
                    </Row>
                    <Row>
                        <div>Cap:</div>
                        <BoldText>2.150.000</BoldText>
                    </Row> */}
          <Row>
            <div>Start time:</div>
            <BoldText>{formatDate(data.startTime * 1000)}</BoldText>
          </Row>
          <Row>
            <div>End time:</div>
            <BoldText>{formatDate(data.endTime * 1000)}</BoldText>
          </Row>
          {/* <Progress sx={{
                        background: '#3E3E3E',
                        borderRadius: '7px',
                        '> *' : {
                            borderRadius: '7px',
                            background: 'linear-gradient(127deg, rgba(253,71,106,1) 0%, rgba(224,61,68,1) 37%)'
                        }
                    }} size="sm" value={50} />
                    <Row>
                        <div>Total amount:</div>
                        <BoldText style={{color: '#F6D047'}}>1.860.000 HTD</BoldText>
                    </Row> */}
        </InfoBox>
      </BottomBox>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background: #0f0f0f;
  border: 1px solid #41414161;
  border-radius: 15px;
  min-height: 250px;
  transition: 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`
const TopBox = styled(Box)`
  padding: 15px;
  display: flex;
  width: 100%;
  gap: 20px;
  border-bottom: 1px solid #41414161;
`
const BottomBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 100%;
  gap: 15px;
`
const InfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #272727;
  border-radius: 5px;
  width: 100%;
  gap: 20px;
  font-size: 14px;
`
const Row = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
const BoldText = styled.div`
  font-weight: 700;
`
export default Card
