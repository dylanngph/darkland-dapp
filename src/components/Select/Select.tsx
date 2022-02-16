import React, {useState, useRef, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {ArrowDropDownIcon, Text} from 'components/Pancake-uikit'

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  // background: ${({theme}) => theme.colors.input};
  color: #fff;
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div`
  min-width: 100px;
  width: 100%;
  height: 0;
  position: absolute;
  overflow: hidden;
  // background: ${({theme}) => theme.colors.input};
  background: #fff;
  z-index: ${({theme}) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  margin-top: 5px;
  // border-radius: 5px;

  ${({theme}) => theme.mediaQueries.sm} {
    min-width: 100px;
  }
`

const DropDownContainer = styled.div<{isOpen: boolean; width: number; height: number}>`
  cursor: pointer;
  // width: ${({width}) => width}px;
  width: 100%;
  position: relative;
  height: 40px;
  min-width: 120px;
<<<<<<< HEAD
<<<<<<< HEAD
  // margin-left: 10px;
  // border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
=======
  margin-left: 10px;
  // border: 1px solid ${({theme}) => theme.colors.inputSecondary};
>>>>>>> dev
=======
  // margin-left: 10px;
  // border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
>>>>>>> 06ff9075c71ee6202d96b18d0982371328e0e675
  border: 1.5px solid #464646;
  background: #272727;
  border-radius: 4px;
  > div {
    > div {
      color: #fff;
    }
  }
  ${({theme}) => theme.mediaQueries.sm} {
    border: 1px solid rgba(151, 151, 151, 0.69);
  }

  ${({theme}) => theme.mediaQueries.sm} {
    min-width: 136px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        box-shadow: ${({theme}) => theme.tooltip.boxShadow};
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({theme}) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 14px;
        box-shadow: ${({theme}) => theme.tooltip.boxShadow};
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({theme}) => theme.zIndices.dropdown};
  background: #272727;
  border-radius: 4px;
  border: 1.5px solid #464646;
  width: 100%;
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  background: #272727;
  border-radius: 4px;
  &:hover {
    // background: ${({theme}) => theme.colors.inputSecondary};
    background: #000;
    > div {
      color: #fff;
    }
  }
`

export interface SelectProps {
  options: OptionProps[]
  onChange?: (option: OptionProps) => void
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<SelectProps> = ({options, onChange}, props) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [containerSize, setContainerSize] = useState({width: 0, height: 0})

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onChange) {
      onChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })

    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropDownContainer isOpen={isOpen} ref={containerRef} {...containerSize} {...props}>
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <Text>{options[selectedOptionIndex].label}</Text>
        </DropDownHeader>
      )}
      <ArrowDropDownIcon color="text" onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
