import React from 'react'
import {zeroPad} from 'react-countdown'

const CountDownRender = ({days, hours, minutes, seconds, completed}) => {
  return (
    <div className="flex text-xs">
      <div color="primary">{zeroPad(days)} days, </div>
      <div color="primary"> &nbsp;{zeroPad(hours)}:</div>
      <div color="primary">{zeroPad(minutes)}:</div>
      <div color="primary">{zeroPad(seconds)}</div>
    </div>
  )
}

export default CountDownRender
