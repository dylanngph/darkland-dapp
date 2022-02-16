import {createGlobalStyle} from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import {PancakeTheme} from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'roboto', sans-serif;
  }
  body {
    background-color: ${({theme}) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  .sc-hoPuav .lcCkkQ:last-child {
    border-top: 1px solid #424243;
  }
`

export default GlobalStyle
