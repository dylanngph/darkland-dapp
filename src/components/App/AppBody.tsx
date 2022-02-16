// import React from 'react'
// import styled from 'styled-components'
// import { Card } from '@pancakeswap/uikit'

// export const BodyWrapper = styled(Card)`
//   border-radius: 24px;
//   max-width: 436px;
//   width: 100%;
//   z-index: 1;
// `

// /**
//  * The styled container element that wraps the content of most pages and the tabs.
//  */
// export default function AppBody({ children }: { children: React.ReactNode }) {
//   return <BodyWrapper>{children}</BodyWrapper>
// }
import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 550px;
  width: 100%;
  z-index: 5;
  background: #181819;
  border: 1px solid #686868;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 40px 16px 28px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({children}: {children: React.ReactNode}) {
  return <BodyWrapper>{children}</BodyWrapper>
}
