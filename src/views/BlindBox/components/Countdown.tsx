import React, {useState, useEffect} from 'react'
import styled, {DefaultTheme, ThemeProvider} from 'styled-components'
// import getThemeValue from "../Pancake-uikit/util/getThemeValue";

const TextDiv = styled.div`
  color: ${({theme}) => (theme.isDark ? 'white' : 'black')};
  display: flex;
  gap: 2px;
  font-size: 16px;
  align-items: center;
`
function CountDown({time}) {
  const [timerDays, setTimerDays] = useState(0)
  const [timerHours, setTimerHours] = useState(0)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)

  let interval

  const startTimer = () => {
    const countDownDate = new Date(time * 1000).getTime()

    interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now
      const days: any = Math.floor(distance / (24 * 60 * 60 * 1000))
      const hours: any = Math.floor((distance / (24 * 60 * 60 * 1000)) * 24)
      const minutes: any = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
      const seconds: any = Math.floor((distance % (60 * 1000)) / 1000)

      if (distance < 0) {
        // Stop Timer

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
  })
  return (
    <TextDiv>
      <BoxNumber>{timerHours < 10 ? `0${timerHours}` : timerHours}</BoxNumber> :{' '}
      <BoxNumber>{timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}</BoxNumber> :{' '}
      <BoxNumber>{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</BoxNumber>
    </TextDiv>
  )
}

const BoxNumber = styled.div`
  padding: 4px 7px;
  background-color: #e9e9e9;
  border-radius: 14px;
  color: #444444;
  font-size: 9.5px;
`

export default CountDown
