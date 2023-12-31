import React, {useMemo, ReactNode} from 'react'
import ReactDOM from 'react-dom'
import {ChakraProvider} from '@chakra-ui/react'
import useActiveWeb3React from './hooks/useActiveWeb3React'
import {BLOCKED_ADDRESSES} from './config/constants'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import 'tailwindcss/tailwind.css'
import 'style/main.scss'
import 'swiper/swiper.scss'
import App from './App'
import Providers from './Providers'

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

function Blocklist({children}: {children: ReactNode}) {
  const {account} = useActiveWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}

ReactDOM.render(
  <React.StrictMode>
      <Blocklist>
        {/* <ChakraProvider> */}
          <Providers>
            <Updaters />
            <App />
          </Providers>
        {/* </ChakraProvider> */}
      </Blocklist>
  </React.StrictMode>,
  document.getElementById('root'),
)
