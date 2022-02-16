import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// import getThemeValue from "../Pancake-uikit/util/getThemeValue";

const TextDiv = styled.div`
  color: ${({theme}) => (theme.isDark ? 'white' : 'black')};
`
function Timer({time}) {
  const [timerDays, setTimerDays] = useState(0)
  const [timerHours, setTimerHours] = useState(0)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)

  let interval

  const startTimer = () => {
    const countDownDate = new Date(time).getTime()
    interval = setInterval(() => {
      const now = new Date().getTime()

      const distance = countDownDate - now

      const days: any = Math.floor(distance / (24 * 60 * 60 * 1000))
      const hours: any = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
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
    })
  }

  useEffect(() => {
    startTimer()
  })

  return (
    <TextDiv>
      {timerDays}d: {timerHours}h: {timerMinutes}m: {timerSeconds}s
    </TextDiv>
  )
}
export default Timer
