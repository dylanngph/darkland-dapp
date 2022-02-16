import React, {useState} from 'react'
import {Button, Text} from 'components/Pancake-uikit'
import {variants} from './Pancake-uikit/components/Button/types'

const customStyleButton = {
  color: '#FD476A',
  borderRadius: '5px',
  border: '1px solid #424243',
  width: '53px',
  height: '22px',
  fontSize: '15px',
  background: 'linear-gradient(180deg, #292929 0%, #131313 100%)',
}

interface SelectQuantityProps {
  quantity: number
  onChangeQuantityNumber?: (quantity: number) => void
}

const SelectQuantityComponent = (props: SelectQuantityProps) => {
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const {onChangeQuantityNumber, quantity} = props
  const handleIncreaseQuantity = () => {
    setCurrentQuantity(currentQuantity + 1)

    if (onChangeQuantityNumber) {
      onChangeQuantityNumber(currentQuantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1)
      if (onChangeQuantityNumber) {
        onChangeQuantityNumber(currentQuantity - 1)
      }
    }
  }
  return (
    <div
      className="flex flex-row w-full justify-between items-center"
      style={{padding: '5px', border: '1px solid #424243', borderRadius: '5px'}}
    >
      <Button style={customStyleButton} scale="xs" onClick={handleDecreaseQuantity} disabled={currentQuantity === 1}>
        -
      </Button>
      {quantity || currentQuantity}
      <Button style={customStyleButton} scale="xs" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  )
}

export default SelectQuantityComponent
