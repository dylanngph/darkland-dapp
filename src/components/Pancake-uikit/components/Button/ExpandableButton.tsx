import React from 'react'
import {ChevronDownIcon, ChevronUpIcon} from '../Svg'
import Button from './Button'
import IconButton from './IconButton'

interface Props {
  onClick?: () => void
  expanded?: boolean
}

export const ExpandableButton: React.FC<Props> = ({onClick, expanded, children}) => {
  return (
    <IconButton aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
      {expanded ? <ChevronUpIcon color="invertedContrast" /> : <ChevronDownIcon color="invertedContrast" />}
    </IconButton>
  )
}
ExpandableButton.defaultProps = {
  expanded: false,
}

export const ExpandableLabel: React.FC<Props> = ({onClick, expanded, children}) => {
  return (
    <Button
      color="textSubtle"
      variant="text"
      aria-label="Hide or show expandable content"
      onClick={onClick}
      endIcon={expanded ? <ChevronUpIcon color="textSubtle" /> : <ChevronDownIcon color="textSubtle" />}
    >
      {children}
    </Button>
  )
}
ExpandableLabel.defaultProps = {
  expanded: false,
}
