import React from "react"
import { Hero } from "components/KShark"
import Page from "components/Layout/Page"
import { useSelector } from 'react-redux'
import { AppState } from "state"
import { getCookie } from "utils/cookie"
import { TOKEN_ID } from "contants"
import PopupLogin from "components/Pancake-uikit/widgets/Menu/components/PopupLogin"
import Popup from "reactjs-popup"

const PlayGame = () => {
    const tokenAccess = getCookie(TOKEN_ID)
    const isLogin = !!tokenAccess
    return(
        <Page style={{ padding: 0, maxWidth: '100%' }}>
            {
                isLogin && <iframe src={`https://play.darkland.io?jwt_token=${tokenAccess}`} title="Play game" width="100%" style={{ height: '90vh ', overflow: 'hidden' }} />
            }
            <Popup className="w-full" open={!isLogin} modal>{(close) => <PopupLogin close={close} setToken={() => null} />}</Popup>
        </Page>
    )
}

export default PlayGame