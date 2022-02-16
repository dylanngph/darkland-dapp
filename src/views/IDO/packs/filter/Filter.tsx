import React from 'react'
import {Box, Select} from '@chakra-ui/react'
import styled from '@emotion/styled'

const Filter = () => {
  return (
    <Wrapper>
      <Flex>
        <Box
          sx={{
            padding: '8px 40px 7px 10px',
            background: '#000',
            border: '1px solid #353535',
            borderRadius: '5px',
            display: 'inline-flex',
          }}
        >
          NFTs: <span style={{color: '#FFC247'}}>12</span>
        </Box>
        <SelectStyled placeholder="HTD">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </SelectStyled>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Flex = styled(Box)`
  display: flex;
  gap: 20px;
  align-items: center;
`
const SelectStyled = styled(Select)`
  border-radius: 5px;
  background-color: #272727;
  border: 1px solid #464646;
`

export default Filter
