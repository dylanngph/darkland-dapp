import React from 'react'
import {Box, ContainerProps} from 'components/Pancake-uikit'

const Container: React.FC<ContainerProps> = ({children, ...props}) => (
  <Box mx="auto" {...props}>
    {children}
  </Box>
)

export default Container
