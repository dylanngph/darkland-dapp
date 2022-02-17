import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
import { usePriceHtdBusd } from 'state/farms/hooks'
import { Button, Text,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem, } from 'components/Pancake-uikit'
import Popup from 'reactjs-popup'
import { AppState, useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
// import {
//   LogoutIcon,
//   useModal,
//   UserMenu as UIKitUserMenu,
//   UserMenuDivider,
//   UserMenuItem,
// } from 'components/Pancake-uikit'
import { updateUserInGame } from 'state/user/actions'
import { useTranslation } from 'contexts/Localization'
import { NavLink } from 'react-router-dom'
import firebase, { firebaseApp } from 'config/firebase/firebaseConfig'
import history from 'routerHistory'
import { removeCookie } from 'utils/cookie'
import { setLogin } from 'state/common/commonSlice'
import useToast from 'hooks/useToast'
import { TOKEN_ID, REFRESH_TOKEN } from 'contants'
import { KeyStore } from 'config/constants/types'
import Overlay from '../../components/Overlay/Overlay'
import Flex from '../../components/Box/Flex'
import { useMatchBreakpoints } from '../../hooks'
import Logo from './components/Logo'
import Panel from './components/Panel'
import { NavProps } from './types'
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from './config'
import PopupLogin from './components/PopupLogin'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  // top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  right: 0;
  // transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  // background-color: ${({ theme }) => theme.nav.background};
  // ${({ theme }) => theme.mediaQueries.md} {
  //   // width: calc(100% - 270px);
  //   // background-color: transparent;
  // }

  height: ${MENU_HEIGHT}px;
  background-color: #091749;
  // border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 100;
  transform: translate3d(0, 0, 0);
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  // margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#091749' : '#091749')};
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 100%;
    // padding-left: ${({ isPushed }) => (isPushed ? '240px' : 0)};
  };
  background-image: url('/bg-page.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  transition: padding-left 0.3s;
`

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`

const MobileLogo = styled.div`
  // ${({ theme }) => theme.mediaQueries.md} {
  //   visibility: hidden;
  // }
`

interface TokenProps {
  address: string
  price: number
}

const Menu: React.FC<NavProps> = ({
  userMenu,
  globalMenu,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  links,
  children,
}) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)
  const htdDisplay = usePriceHtdBusd().toNumber()
  const { isLogin } = useSelector((state: AppState) => state.common)
  const dispatch = useAppDispatch()
  const userData = useSelector((state: AppState) => state.user.userInfo)
  const { toastSuccess, toastError } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage =
        window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)
    window.addEventListener('scroll', throttledHandleScroll)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')
  const [token, setToken] = useState(undefined)
  // const getToken = useCallback(async () => {
  //   const tokenId = await window.localStorage.getItem('_ut')
  //   setToken(tokenId)
  // }, [])
  // useEffect(() => {
  //   getToken()
  // }, [getToken, token])

  const logout = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    
    firebase
      .auth()
      .signOut()
      .then(() => {
        removeCookie(TOKEN_ID);
        removeCookie(REFRESH_TOKEN);
        dispatch(setLogin(false))
        dispatch(updateUserInGame(null))
        history.push('/home')
        setToken(undefined)
        const toast = toastSuccess
        toast(`Logout succeed`)
      })
      .catch((error) => {
        // An error happened.
        const toast = toastError
        toast(`Logout failed: ${error}`)
      })
  }
  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <MobileLogo>
          <Logo
            isMobile={isMobile}
            pushNav={setIsPushed}
            isPushed={isPushed}
            togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
            isDark={isDark}
            href={homeLink?.href ?? '/'}
            links={links}
          />
        </MobileLogo>
        
        <Flex style={{alignItems: 'center'}}>
        {globalMenu}
          {/* {!isLogin ? (
            <Popup
              className="w-full"
              modal
              trigger={
                <Button
                  style={{ backgroundColor: '#202020', width: '136px', textOverflow: 'ellipsis' }}
                  variant="text"
                  scale="sm"
                  className="mr-2"
                >
                  <img
                    src="/logo.svg"
                    height="12px"
                    style={{
                      paddingLeft: '30px',
                      transform: 'translateX(-15px)',
                      height: '24px',
                      width: 'auto',
                    }}
                    alt="HeroesTD"
                  />
                  Login
                </Button>
              }
            >
              {(close) => <PopupLogin close={close} setToken={setToken} />}
            </Popup>
          ) : (
            <div className="mr-2">
            <UIKitUserMenu
              account={userData?.name ?? "Anonymous"}
              avatarSrc="/images/blindbox/account-info.png"
            >
              <NavLink to="/my-assets">
                <UserMenuItem as="button">
                  <Flex alignItems="center" justifyContent="space-between" width="100%">
                    {t('My Assets')}
                  </Flex>
                </UserMenuItem>
              </NavLink>
              <NavLink to="/home">
                <UserMenuItem as="button" onClick={() => logout()}>
                  <Flex alignItems="center" justifyContent="space-between" width="100%">
                    {t('Logout')}
                    <LogoutIcon />
                  </Flex>
                </UserMenuItem>
              </NavLink>
            </UIKitUserMenu>
            
            </div>
          )} */}
           {userMenu}
        </Flex>
      </StyledNav>
      <BodyWrapper>
        {
          isMobile ? 
            <Panel
              isPushed={isPushed}
              isMobile={isMobile}
              showMenu={showMenu}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              primaryPriceUsd={htdDisplay}
              pushNav={setIsPushed}
              links={links}
            />
          : null
        }
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
