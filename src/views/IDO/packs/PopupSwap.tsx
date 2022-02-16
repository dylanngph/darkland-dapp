import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Input } from '@chakra-ui/react'
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Column, { AutoColumn } from '../../../components/Layout/Column'
import { ArrowWrapper, SwapCallbackError, Wrapper } from '../../Swap/components/styleds'
import { AppHeader, AppBody } from '../../../components/App'
import { AutoRow, RowBetween } from '../../../components/Layout/Row'

const ArrowDownIcon = () => (
  <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-3.22223e-05 39C-3.31638e-05 60.5391 17.4609 78 39 78C60.5391 78 78 60.5391 78 39C78 17.4609 60.5391 -7.6324e-07 39 -1.70474e-06C17.4609 -2.64625e-06 -3.12808e-05 17.4609 -3.22223e-05 39Z"
      fill="#022900"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 39C11 54.464 23.536 67 39 67C54.464 67 67 54.464 67 39C67 23.536 54.464 11 39 11C23.536 11 11 23.536 11 39Z"
      fill="#44C63E"
    />
    <g clipPath="url(#clip0_1504_23654)">
      <path
        d="M49.3998 39.3012L38.9998 49.7012"
        stroke="white"
        strokeWidth="3.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.9996 49.7012L28.5996 39.3012"
        stroke="white"
        strokeWidth="3.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <g opacity="0.5">
      <path
        d="M46 30.9998L38.9998 38"
        stroke="white"
        strokeWidth="2.18757"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.9996 38L31.9994 30.9998"
        stroke="white"
        strokeWidth="2.18757"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1504_23654">
        <rect width="13" height="23.4" fill="white" transform="translate(50.7 38) rotate(90)" />
      </clipPath>
    </defs>
  </svg>
)

export default ({ close, currencyType }) => {
  const { t } = useTranslation()
  const [isReverseCurrency, setIsReverseCurrency] = useState(false);
  const [amount, setAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState(1000000)
  const [exchangeAmount, setExchangeAmount] = useState('0')
  const MAX_VALUE = 1000000
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    const price = Number(value) > maxAmount ? maxAmount : Number(value)
    setAmount(price.toString())
    if (isReverseCurrency) {
      const tokenResult = price * 10
      setExchangeAmount(tokenResult.toString())
    }
    else {
      const exchangeResult = price / 10
      setExchangeAmount(exchangeResult.toString())
    }
  }

  const onSetMax = () => {
    setAmount(maxAmount.toString());
    if (isReverseCurrency) {
      const tokenResult = maxAmount * 10
      setExchangeAmount(tokenResult.toString())
    }
    else {
      const exchangeResult = maxAmount / 10
      setExchangeAmount(exchangeResult.toString())
    }
  }

  const onChangeCurrency = () => {
    setIsReverseCurrency(!isReverseCurrency)
    setAmount('')
    setExchangeAmount('0')
  }

  const onClosePopup = () => {
    close()
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    console.log("submit")
  }

  return (
    <AppBody>
      <Box
        onClick={() => onClosePopup()}
        style={{ top: '10px', right: '10px', position: 'absolute', cursor: 'pointer' }}
      >
        <img src="/close.svg" alt="close" />
      </Box>

      <Title>{t('Claim Token')}</Title>
      <p style={{ color: "#CBCBCB" }} >{t(`You are about to conver ${!isReverseCurrency ? 'e' : ''}${currencyType} to ${isReverseCurrency ? 'e' : ''}${currencyType}`)}</p>
      <form onSubmit={onSubmit} >
        <SwapField>
          <p className='text-sm' >From</p>
          <InputField>
            <Input
              type="number"
              style={{
                border: 'none', backgroundColor: 'transparent', fontWeight: "bold",
                marginTop: '12px', color: "#fff", height: "30px", padding: "0px"
              }}
              placeholder="0"
              pattern="[0-9]"
              onChange={handleChange}
              value={Number(amount) > 0 ? Number(amount) : ''}
              sx={{
                '&:focus, &:active': {
                  borderColor: 'none',
                  boxShadow: 'none'
                },
              }}
            />
            <div className='flex flex-row' >
              <Button style={{ marginTop: "8px" }} onClick={onSetMax} type='button'
                scale="sm" variant="text">
                MAX
              </Button>
              <WrapCurrency>
                <img src={`/images/coins/${currencyType}${!isReverseCurrency ? '_token' : ''}.png`} alt='ADT' className="ml-5" height={30} width={30} />
                <p className='px-4 pt-1' > {t(`${!isReverseCurrency ? 'e' : ''}${currencyType}`)} </p>
              </WrapCurrency>
            </div>
          </InputField>
        </SwapField>
        <div>
          <AutoColumn justify="center">
            <AutoRow justify="center" style={{ padding: '0 1rem' }}>
              <ArrowWrapper
                clickable
                onClick={onChangeCurrency}
              >
                <ArrowDownIcon />
              </ArrowWrapper>
            </AutoRow>
          </AutoColumn>
        </div>
        <SwapField>
          <p className='text-sm' >To</p>
          <InputField>
            <p className='mt-3 font-bold' >{exchangeAmount}</p>
            <div className='flex flex-row' >
              <WrapCurrency>
                <img src={`/images/coins/${currencyType}${isReverseCurrency ? '_token' : ''}.png`} alt='ADT' className="ml-5" height={30} width={30} />
                <p className='px-4 pt-1' > {t(`${isReverseCurrency ? 'e' : ''}${currencyType}`)} </p>
              </WrapCurrency>
            </div>
          </InputField>
        </SwapField>
      <Button style={{ width: "100%" }} size="lg" type='submit' >
        Claim
      </Button>
      </form>
    </AppBody>
  )
}


const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
`
const ContainerPopupComplete = styled(Box)`
  padding: 40px 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const CardIcon = styled.div`
  position: relative;
  top: auto;
  left: auto;
`
const SwapField = styled(Box)`
  background: #272727;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin: 29px 0px;
`

const InputField = styled(Box)`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-between;
`

const WrapCurrency = styled(Box)`
  background: #151419;
  border-radius: 8px;
  display:flex;
  flex-direction: row;
  padding: 5px 0px;
  width: 122px;
`