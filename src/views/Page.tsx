// import React from 'react'
// import styled from 'styled-components'
// import { Flex } from '@pancakeswap/uikit'
// import Footer from 'components/Menu/Footer'
// import SubNav from 'components/Menu/SubNav'

// const StyledPage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   padding: 16px;
//   padding-bottom: 0;
//   min-height: calc(100vh - 64px);
//   background: ${({ theme }) => theme.colors.gradients.bubblegum};

//   ${({ theme }) => theme.mediaQueries.xs} {
//     background-size: auto;
//   }

//   ${({ theme }) => theme.mediaQueries.sm} {
//     padding: 24px;
//     padding-bottom: 0;
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     padding-top: 32px;
//     min-height: calc(100vh - 64px);
//   }
// `

// const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
//   return (
//     <StyledPage {...props}>
//       <SubNav />
//       {children}
//       <Flex flexGrow={1} />
//       <Footer />
//     </StyledPage>
//   )
// }

// export default Page
import React from 'react'
import styled from 'styled-components'
import {Flex} from 'components/Pancake-uikit'
import SubNav from 'components/Menu/SubNav'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  ${({theme}) => theme.mediaQueries.xs} {
  }

  ${({theme}) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({theme}) => theme.mediaQueries.lg} {
    padding-top: 32px;
    min-height: 100vh;
  }
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <StyledPage {...props}>
      <SubNav />
      {children}
      <Flex flexGrow={1} />
      {/* <Footer /> */}
    </StyledPage>
  )
}

export default Page
