import {CopyIcon, Text} from 'components/Pancake-uikit'
import React, {useState} from 'react'
import styled from 'styled-components'

interface Props {
  toCopy: string
}

const StyleButton = styled(Text).attrs({role: 'button'})`
  color: ${({theme}) => theme.colors.primary};
  align-items: center;
  color: #4880ff;
  padding: 12px 24px 14px;
  border: 1px solid rgb(210, 210, 214);
  border-radius: 20px;
  word-break: break-all;
`

const Tooltip = styled.div<{isTooltipDisplayed: boolean}>`
  display: ${({isTooltipDisplayed}) => (isTooltipDisplayed ? 'block' : 'none')};
  position: absolute;
  bottom: -22px;
  right: 0;
  left: 0;
  text-align: center;
  background-color: ${({theme}) => theme.colors.contrast};
  color: ${({theme}) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
`

const CopyToClipboard: React.FC<Props> = ({toCopy, children, ...props}) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  const copyToClipboardWithCommand = (content: string) => {
    const el = document.createElement('textarea')
    el.value = content
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  return (
    <StyleButton
      small
      bold
      onClick={() => {
        if (navigator.clipboard && navigator.permissions) {
          navigator.clipboard.writeText(toCopy).then(() => displayTooltip())
        } else if (document.queryCommandSupported('copy')) {
          copyToClipboardWithCommand(toCopy)
          displayTooltip()
        }
      }}
      {...props}
    >
      {children}
      <CopyIcon width="20px" color="primary" ml="4px" />
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </StyleButton>
  )
}

export default CopyToClipboard
