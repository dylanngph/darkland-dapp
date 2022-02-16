/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const TextDiv = styled.div`
  color: ${({theme}) => (theme.isDark ? 'white' : 'black')};
`
interface ICountDownIDOProps {
  toDate: number
  fromDate: number
  description?: string
  setStatusCoundown?: (status: boolean) => void
}
function CountdownIDO(props: ICountDownIDOProps) {
  const [timerDays, setTimerDays] = useState(0)
  const [timerHours, setTimerHours] = useState(0)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [showCountDownIDO, setShowCountDownIDO] = useState(true)
  const [blindBoxCountdown, setBlindBoxCountdown] = useState(true)
  const [title, setTitle] = useState('IDO STARTS IN')

  let interval

  const startTimer = () => {
    const from = new Date(props.fromDate).getTime()
    const to = new Date(props.toDate).getTime()

    const {setStatusCoundown} = props

    interval = setInterval(() => {
      const now = new Date().getTime()
      const startCountDown = from <= now

      let distance
      if (!startCountDown) {
        distance = from - now
      } else {
        distance = to - now
      }

      const days: any = Math.floor(distance / (24 * 60 * 60 * 1000))
      const hours: any = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
      const minutes: any = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
      const seconds: any = Math.floor((distance % (60 * 1000)) / 1000)

      if (startCountDown && title !== 'IDO END IN') {
        setTitle('IDO WHITELIST END IN')
      }

      if (distance <= 0) {
        // Stop Timer

        setShowCountDownIDO(false)
        if (setStatusCoundown) {
          setStatusCoundown(false)
        }
        clearInterval(interval.current)
      } else {
        // Update Timer
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
  }

  useEffect(() => {
    startTimer()
  }, [startTimer])

  if (showCountDownIDO && !window.location.href.includes('blind-box')) {
    return (
      <WrapCountdown>
        <h1>{title}</h1>
        {/* {showTimer && ( */}
        <TextDiv>
          <BlockTime>
            <TimeDiv>{timerDays < 10 ? `0${timerDays}` : timerDays}</TimeDiv>
            <Text>Days</Text>
          </BlockTime>
          <Colon>:</Colon>
          <BlockTime>
            <TimeDiv>{timerHours < 10 ? `0${timerHours}` : timerHours}</TimeDiv>
            <Text>Hours</Text>
          </BlockTime>{' '}
          <Colon>:</Colon>
          <BlockTime>
            <TimeDiv>{timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}</TimeDiv>
            <Text>Minutes</Text>
          </BlockTime>{' '}
          <Colon>:</Colon>
          <BlockTime>
            <TimeDiv>{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</TimeDiv>
            <Text>Seconds</Text>
          </BlockTime>
        </TextDiv>
        {/* )} */}
      </WrapCountdown>
    )
  }
  if (showCountDownIDO && window.location.href.includes('blind-box')) {
    return (
      <WrapBlindBoxCountdown>
        <h1>{props.description || 'Blindbox ticket campaign starts in.'}</h1>
        {/* {showTimer && ( */}
        <TextDiv>
          <BlockTime>
            <TimeDiv>{timerDays < 10 ? `0${timerDays}` : timerDays}</TimeDiv>
            <Text>Days</Text>
          </BlockTime>
          <Colon>:</Colon>
          <BlockTime>
            <TimeDiv>{timerHours < 10 ? `0${timerHours}` : timerHours}</TimeDiv>
            <Text>Hours</Text>
          </BlockTime>{' '}
          <Colon>:</Colon>
          <BlockTime>
            <TimeDiv>{timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}</TimeDiv>
            <Text>Minutes</Text>
          </BlockTime>{' '}
          <Colon>:</Colon>
          <BlockTime>
            <TimeDiv>{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</TimeDiv>
            <Text>Seconds</Text>
          </BlockTime>
        </TextDiv>
        {/* )} */}
      </WrapBlindBoxCountdown>
    )
  }
  return null
}

const WrapCountdown = styled.div`
  width: 100%;
  height: 162px;
  margin: 20px 0;
  border: 1px solid #424243;
  background-color: #0f0f0f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 10px;
  > h1 {
    text-transform: uppercase;
    color: #ffc247;
    font-size: 22px;
  }
  > div {
    display: flex;
  }
`
const WrapBlindBoxCountdown = styled.div`
  width: 100%;
  height: 162px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 10px;
  > h1 {
    text-transform: uppercase;
    color: #ffc247;
    font-size: 22px;
  }
  > div {
    display: flex;
  }
`

const BlockTime = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #e9e9e9;
`
const TimeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #2d2d2d;
  // width: 65px;
  // height: 40px;
  padding: 6px 18px;
  background: linear-gradient(180deg, #262626 0%, #1a1919 100%);
  border-radius: 13px;
  font-weight: bold;
  font-size: 20px;
`
const Colon = styled.div`
  padding: 6px 0;
  font-weight: bold;
  font-size: 20px;
  color: #e9e9e9;
`
export default CountdownIDO
