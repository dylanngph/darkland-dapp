import React from 'react'
import {
  Tag,
  VerifiedIcon,
  CommunityIcon,
  // RefreshIcon,
  AutoRenewIcon,
  TagProps,
  TimerIcon,
  BlockIcon,
  VoteIcon,
} from '@pancakeswap/uikit'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'
import {ReactComponent as RefreshIcon} from 'assets/icons/Refresh.svg'
import {ReactComponent as CoreCheck} from 'assets/icons/CoreCheck.svg'

const CoreTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <TagSquare variant="warning" outline startIcon={<CoreCheck />} {...props}>
      <span style={{marginLeft: '4px'}}>{t('Core')}</span>
    </TagSquare>
  )
}

const CommunityTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <TagSquare variant="failure" outline startIcon={<CommunityIcon width="18px" color="failure" mr="6px" />} {...props}>
      {t('Community')}
    </TagSquare>
  )
}

const DualTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <Tag variant="textSubtle" outline {...props}>
      {t('Dual')}
    </Tag>
  )
}

const ManualPoolTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <TagSquareBlue variant="warning" outline startIcon={<RefreshIcon />} {...props}>
      <span style={{marginLeft: '4px'}}>{t('Manual')}</span>
    </TagSquareBlue>
  )
}

const CompoundingPoolTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <TagSquare variant="success" outline startIcon={<AutoRenewIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Auto')}
    </TagSquare>
  )
}

const VoteNowTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <Tag variant="success" startIcon={<VoteIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Vote Now')}
    </Tag>
  )
}

const SoonTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <Tag variant="binance" startIcon={<TimerIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Soon')}
    </Tag>
  )
}

const ClosedTag: React.FC<TagProps> = (props) => {
  const {t} = useTranslation()
  return (
    <Tag variant="textDisabled" startIcon={<BlockIcon width="18px" color="textDisabled" mr="4px" />} {...props}>
      {t('Closed')}
    </Tag>
  )
}

const TagSquare = styled(Tag)`
  border-radius: 0px;
`

const TagSquareBlue = styled(Tag)`
  border-radius: 0px;
  color: #00A3FF;
  border-color: #686868;
  border-radius: 6px;
`

export {CoreTag, CommunityTag, DualTag, ManualPoolTag, CompoundingPoolTag, VoteNowTag, SoonTag, ClosedTag}
