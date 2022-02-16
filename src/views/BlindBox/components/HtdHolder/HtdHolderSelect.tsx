/* eslint-disable react-hooks/exhaustive-deps */
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import TicketIcon from 'assets/icons/TicketIcon.svg'

import useToast from 'hooks/useToast'
import './htdSelect.scss'
import {Text} from 'components/Pancake-uikit'

const HtdHolderSelect = (props) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [amountHTD, setAmountHTD] = useState<number | string>('Please select HTD to stake')
  const [ticket, setTicket] = useState<number>(0)
  const wrapperRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(0)
  const [currentHTDAmount, setCurrentHTDAmount] = useState(0)
  const [currentValueSlider, setCurrentValueSlider] = useState(0)
  const [warningMessage, setWarningMessage] = useState('')
  const {toastError, toastSuccess} = useToast()
  const {ticketClaimed} = props

  const toggleShowDropdown = () => {
    setOpenDropdown(!openDropdown)
  }

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    getCurrentValue(ticketClaimed)
    handleSelect(ticketClaimed)
    setCurrentValue(ticketClaimed)
    setCurrentValueSlider(ticketClaimed)
    setCurrentHTDAmount(props.htdStaked)
  }, [ticketClaimed])

  const handleSelect = (data: number) => {
    let newAmountHTD = ''
    let newTicket = 0
    let index = 1
    switch (data) {
      case 1:
        newAmountHTD = (500 - currentHTDAmount).toString()
        newTicket = 1
        index = 1
        break
      case 2:
        newAmountHTD = (1800 - currentHTDAmount).toString()
        newTicket = 4
        index = 2
        break
      case 3:
        newAmountHTD = (2700 - currentHTDAmount).toString()
        newTicket = 6
        index = 3
        break
      case 4:
        newAmountHTD = (3600 - currentHTDAmount).toString()
        newTicket = 8
        index = 4
        break
      case 5:
        newAmountHTD = (4500 - currentHTDAmount).toString()
        newTicket = 10
        index = 5
        break
      case 6:
        newAmountHTD = (5400 - currentHTDAmount).toString()
        newTicket = 12
        index = 6
        break

      default:
        newAmountHTD = 'Please select HTD to stake'
        newTicket = 0
        index = 0
    }

    if (index >= ticketClaimed) {
      setCurrentValueSlider(index)
      props.getValueSelectChange({newAmountHTD, newTicket, index})
      setAmountHTD(newAmountHTD)
      setTicket(newTicket)
    } else {
      const toast = toastError
      toast('Please choose a higher staked amount!')
    }
  }

  const getCurrentValue = (ticketAmount: number) => {
    // const currentTicketClaimed = ticketAmount
    const indexCurrentTicket = marksArray.findIndex((item) => {
      return item.ticket === ticketAmount
    })
    const currentChoice = marksArray[indexCurrentTicket]
    if (currentChoice) {
      setCurrentHTDAmount(currentChoice.htd)
    }
    setCurrentValue(ticketAmount)
    setCurrentValueSlider(ticketAmount)

    if (indexCurrentTicket === 6) {
      setWarningMessage('You’ve reached maximum HTD Staked')
    }
  }

  const marksArray = [
    {htd: 500, ticket: 1},
    {htd: 1800, ticket: 4},
    {htd: 2700, ticket: 6},
    {htd: 3600, ticket: 8},
    {htd: 4500, ticket: 10},
    {htd: 5400, ticket: 12},
  ]

  const marks = {
    1: (
      <RowSelect>
        <span>500 HTD</span>
        <RowSelectRight>
          1 <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt={TicketIcon} />
        </RowSelectRight>
      </RowSelect>
    ),
    2: (
      <RowSelect>
        <span>1800 HTD</span>
        <RowSelectRight>
          4 <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt={TicketIcon} />
        </RowSelectRight>
      </RowSelect>
    ),
    3: (
      <RowSelect>
        <span>2700 HTD</span>
        <RowSelectRight>
          6 <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt={TicketIcon} />
        </RowSelectRight>
      </RowSelect>
    ),
    4: (
      <RowSelect>
        <span>3600 HTD</span>
        <RowSelectRight>
          8 <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt={TicketIcon} />
        </RowSelectRight>
      </RowSelect>
    ),
    5: (
      <RowSelect>
        <span>4500 HTD</span>
        <RowSelectRight>
          10 <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt={TicketIcon} />
        </RowSelectRight>
      </RowSelect>
    ),
    6: (
      <RowSelect>
        <span>5400 HTD</span>
        <RowSelectRight>
          12 <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt={TicketIcon} />
        </RowSelectRight>
      </RowSelect>
    ),
  }

  return (
    <div ref={wrapperRef} className="custom-select-wrapper">
      <div className="custom-select-header" role="button" onClick={toggleShowDropdown} tabIndex={0} aria-hidden="true">
        <div className="custom-select-header__title">
          {amountHTD} {amountHTD > 0 ? 'HTD' : null}
        </div>
      </div>
      {openDropdown && (
        <div className="custom-select-list">
          <Slider
            style={{zIndex: 2}}
            vertical
            reverse
            value={currentValueSlider}
            marks={marks}
            step={1}
            min={1}
            max={6}
            onChange={handleSelect}
          />
          <Slider
            className="current-selected-slider"
            vertical
            reverse
            value={currentValue}
            step={1}
            min={1}
            max={6}
            onChange={handleSelect}
          />
          <StakeInfoContainer>
            <Text style={{color: '#FFAB04'}}>{warningMessage}</Text>
            <StakeItem>
              <span>HTD Required:</span>
              <span>{amountHTD}</span>
            </StakeItem>
            <StakeItem>
              <span>Claimable tickets:</span>
              <span>{ticket}</span>
            </StakeItem>
          </StakeInfoContainer>
        </div>
      )}
    </div>
  )
}

const StakeInfoContainer = styled.div`
  margin: 15px 0;
  padding: 5px;
  background: #111111;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
`
const StakeItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: #111111;
  border-radius: 5px;
  font-size: 12px;
`

const RowSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const RowSelectRight = styled.div`
  display: flex;
  > img {
    display: inline;
    margin-left: 5px;
    // width: 12px;
  }
`

export default HtdHolderSelect
