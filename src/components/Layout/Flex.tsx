import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
