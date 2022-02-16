import React from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'

export const OpenTag = () => {
  return (
    <Box
      sx={{
        background: '#12D354',
        padding: '3px 10px',
        borderRadius: '5px',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '14px',
        width: 20,
      }}
    >
      <div>Open</div>
    </Box>
  )
}

export const UpComing = () => {
  return (
    <Box
      sx={{
        background: '#074FBB',
        padding: '3px 10px',
        borderRadius: '5px',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '14px',
        width: 20,
      }}
    >
      <div>UpComing</div>
    </Box>
  )
}

export const Closed = () => {
  return (
    <Box
      sx={{
        background: '#FD476A',
        padding: '3px 10px',
        borderRadius: '5px',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '14px',
        width: 20,
      }}
    >
      <div>Closed</div>
    </Box>
  )
}
