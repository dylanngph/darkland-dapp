import {Button} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'

export default ({close}) => {
  // useEffect(() => {
  //   document.querySelector(".popup-overlay").addEventListener("click", close, true)
  // }, [close])
  return (
    <div className="modal bg-black z-10 p-5 rounded-xl shadow border border-gray-800 border-solid max-h-screen overflow-auto">
      <button type="button" className="close" onClick={close}>
        &times;
      </button>
      {/* <div className="text-xl text-white"> Modal Title </div> */}
      <div className="text-white text leading-5 whitespace-pre-line">
        {' '}
        HeroesTD Bounty will be divided into 3 phases:
        <br />
        Phase 1: First Drop
        <br />
        Time: 05/11 - 11/11
        <br />
        💎 Ruby: Top 10 Entry Scorers
        <br />
        🌟 Sapphire:: Next highest 30 Entry Scorers
        <br />
        ✨ Gold: Next highest 70 Entry Scorers
        <br />
        ⭐️ Silver: Higher than 20 Entries in Gleam.io
        <br />
        ⭐️ Bronze: Higher than 15 Entries in Gleam.io
        <br />
        <br />
        Phase 2: Second Drop
        <br />
        Time: 12/11 - 18/11
        <br />
        💎 Ruby: Top 30 Entry Scorers
        <br />
        🌟 Sapphire:: Next highest 70 Entry Scorers
        <br />
        ✨ Gold: Next highest 70 Entry Scorers
        <br />
        ⭐️ Silver: Higher than 70 Entries in Gleam.io
        <br />
        ⭐️ Bronze: Higher than 50 Entries in Gleam.io
        <br />
        <br />
        Phase 3: Third Drop
        <br />
        Time: 19/11 - 25/11
        <br />
        💎 Ruby: Top 100 Entry Scorers
        <br />
        🌟 Sapphire:: Next highest 510 Entry Scorers
        <br />
        ✨ Gold: Next highest 2500 Entry Scorers
        <br />
        ⭐️ Silver: Higher than 70 Entries in Gleam.io
        <br />
        ⭐️ Bronze: Higher than 50 Entries in Gleam.io
        <br />
        <br />
        Note: the winner will be announced up to 48 hours after phase ended! Or you can check{' '}
        <span className="text-red-400">dapp.dotarcade.io/bounty</span> and login with your wallet
        <br />
        Check your current rank at:{' '}
        <a className="text-red-400" target="_blank" rel="noreferrer" href="https://heroestd.io/bounty-leaderboard">
          heroestd.io/bounty-leaderboard
        </a>{' '}
        (Update daily at 11 AM UTC)
        <br />
        For FAQ, check this link for details:{' '}
        <a href="https://bit.ly/31H3qkG" target="_blank" rel="noreferrer" className="text-red-400">
          bit.ly/31H3qkG
        </a>
        <br /> ---------- OFFICIAL NFT CONTRACT ADDRESS--------------
        <br />
        BRONZE NFT:{' '}
        <a
          href="https://bscscan.com/address/0xc2eb593efa0a79e0ca620a11eb24eb5a43261ee8"
          target="_blank"
          rel="noreferrer"
        >
          0xc2EB593eFA0a79e0Ca620a11eb24EB5a43261EE8
        </a>
        <br />
        SILVER NFT:{' '}
        <a
          href="https://bscscan.com/address/0x6EDD39b4Ba2fa53Db5f486908F19cB65905f04d9"
          target="_blank"
          rel="noreferrer"
        >
          0x6EDD39b4Ba2fa53Db5f486908F19cB65905f04d9
        </a>
        <br />
        GOLD NFT:{' '}
        <a
          href="https://bscscan.com/address/0xe3f637dB6b90cDc58894B0f8e74f657a9AB3a77c"
          target="_blank"
          rel="noreferrer"
        >
          0xe3f637dB6b90cDc58894B0f8e74f657a9AB3a77c
        </a>
        <br />
        SAPPHIRE NFT:{' '}
        <a
          href="https://bscscan.com/address/0x5660CDd00b1C27f9b297d56665Ec66dcdAD4D3E0"
          target="_blank"
          rel="noreferrer"
        >
          0x5660CDd00b1C27f9b297d56665Ec66dcdAD4D3E0
        </a>
        <br />
        RUBY NFT:{' '}
        <a
          href="https://bscscan.com/address/0xF70956b483D83258Ec012d098C4B92ed6c0056dF"
          target="_blank"
          rel="noreferrer"
        >
          0xF70956b483D83258Ec012d098C4B92ed6c0056dF
        </a>
      </div>
    </div>
  )
}
