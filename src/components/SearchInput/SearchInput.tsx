import React, {useState, useMemo} from 'react'
import {Input} from 'components/Pancake-uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import {useTranslation} from 'contexts/Localization'

const StyledInput = styled(Input)`
  margin-left: auto;
  border-radius: 0px;
  background: #27262c;
  border: 1px solid rgba(151, 151, 151, 0.69);
  box-sizing: border-box;
  border-radius: 4px;
  // background-image: url('/images/search.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px;
  color: #fff;

  ::placeholder {
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */
    color: #fff;
    mix-blend-mode: normal;
    opacity: 0.5;
  }
`

const InputWrapper = styled.div`
  position: relative;
  ${({theme}) => theme.mediaQueries.sm} {
    width: 234px;
    display: block;
  }
`

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({onChange: onChangeCallback, placeholder = 'Search'}, props) => {
  const [searchText, setSearchText] = useState('')

  const {t} = useTranslation()

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <InputWrapper>
      <StyledInput value={searchText} onChange={onChange} {...props} placeholder={t(placeholder)} />
    </InputWrapper>
  )
}

export default SearchInput
