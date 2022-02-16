import React from 'react'
import styled from 'styled-components'
import {SvgProps} from '../../../components/Svg/types'

const StyleDiv = styled.div`
  padding-right: 1px;
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.1241 20.0001C18.0244 20.0001 17.9291 19.9603 17.8586 19.8906L8.10871 10.1407C7.96246 9.9944 7.96246 9.75665 8.10871 9.61041L9.6087 8.11042C9.75495 7.96417 9.99269 7.96417 10.1389 8.11042L19.8889 17.8603C19.9594 17.9301 19.9991 18.0253 19.9991 18.1251C19.9991 19.1586 19.1576 20.0001 18.1241 20.0001ZM8.90445 9.87515L18.2696 19.2403C18.7736 19.1751 19.1741 18.7746 19.2394 18.2706L9.87419 8.90541L8.90445 9.87515Z"
          fill="black"
        />
        <path
          d="M2.375 14.7506C2.327 14.7506 2.27825 14.7416 2.23175 14.7221C2.0915 14.6636 2 14.5271 2 14.3756C2 11.5317 4.06773 9.15944 4.84097 8.37194L4.35948 7.89045C4.21323 7.7442 4.21323 7.50645 4.35948 7.3602L7.35945 4.36023C7.5057 4.21398 7.74345 4.21398 7.8897 4.36023L8.37119 4.84097C9.15869 4.06773 11.5302 2 14.3749 2C14.5264 2 14.6636 2.0915 14.7214 2.23175C14.7799 2.372 14.7476 2.53325 14.6404 2.64049L10.4059 6.87496L10.8904 7.35945C11.0367 7.5057 11.0367 7.74345 10.8904 7.8897L7.89045 10.8897C7.7442 11.0359 7.50645 11.0359 7.3602 10.8897L6.87496 10.4059L2.64049 14.6404C2.56849 14.7124 2.4725 14.7506 2.375 14.7506ZM5.15522 7.6257L5.63972 8.1102C5.71247 8.18294 5.75222 8.28269 5.74997 8.38469C5.74697 8.48819 5.70272 8.58494 5.62622 8.65394C5.60072 8.67719 3.34399 10.7449 2.84599 13.3736L6.60946 9.61018C6.75571 9.46393 6.99346 9.46393 7.1397 9.61018L7.62495 10.0954L10.0947 7.6257L9.61018 7.1412C9.46393 6.99496 9.46393 6.75721 9.61018 6.61096L13.3736 2.84749C10.7449 3.34549 8.67719 5.60147 8.65394 5.62772C8.58419 5.70272 8.48744 5.74772 8.38469 5.74997C8.28869 5.76872 8.18294 5.71322 8.10945 5.64047L7.62495 5.15597L5.15522 7.6257Z"
          fill="black"
        />
        <path
          d="M5.37454 7.25013C5.27855 7.25013 5.18255 7.21338 5.10905 7.14063L4.14006 6.17014C3.92706 5.95789 3.81006 5.67514 3.81006 5.37514C3.81006 5.07515 3.92706 4.79165 4.14006 4.5794L4.57955 4.13991C5.00405 3.71541 5.74579 3.71541 6.17029 4.13991L7.14003 5.10965C7.28628 5.2559 7.28628 5.49364 7.14003 5.63989L5.64004 7.13988C5.56654 7.21338 5.47054 7.25013 5.37454 7.25013ZM5.37454 4.56065C5.2748 4.56065 5.1803 4.59965 5.10905 4.67015L4.6703 5.10965C4.5998 5.1809 4.5608 5.27464 4.5608 5.37514C4.5608 5.47564 4.59905 5.56939 4.6703 5.63989L5.37454 6.34489L6.34429 5.37514L5.64004 4.67015C5.56879 4.59965 5.47429 4.56065 5.37454 4.56065Z"
          fill="black"
        />
      </svg>
    </StyleDiv>
  )
}

export default Icon
