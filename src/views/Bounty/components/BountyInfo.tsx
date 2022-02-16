import React from 'react'

const BountyInfo = ({type}) => {
  return type === 'community' ? (
    <div className="flex gap-5">
      <div className="w-full md:w-2/3 bg-black rounded-xl mt-10 px-5 py-10 shadow">
        <div className="text-white text-2xl capitalize mb-5">Bounty Details</div>
        <div className="text-gray leading-6 whitespace-pre-line text-sm">
          When can I claim this FRIENDSTER Bounty? Wait 48 hours after the announcement (in Telegram Group related to
          your community) and Go to: dapp.heroestd.io/bounty (pick tab Community Bounty) to claim - email to:
          community@heroestd.io if you are eligible but can&#39;t claim the Bounty!
          <br />
          <br />
          What are the benefits of Community Bounty? All the Community Bounty can be claimed and staked later in our
          Dapp - you can share that Bounty and connect to your community when play our Game later - who can help you in
          so many Co-op mode and help your faster with Play-To-Earn
          <br />
          <br />
          Any concerns please email to: community@heroestd.io or DM to our support in Telegram Group:{' '}
          <a href="https://t.me/Heroes_TD" target="_blank" rel="noreferrer">
            https://t.me/Heroes_TD
          </a>
        </div>
      </div>
      <div className="hidden md:block w-full md:w-1/3" />
    </div>
  ) : (
    <div className="flex gap-5">
      <div className="w-full md:w-2/3 bg-black rounded-xl mt-10 px-5 py-10 shadow">
        <div className="text-white text-2xl capitalize mb-5">Bounty Details</div>
        <div className="text-gray leading-7">
        Dot Arcade is a defense strategy game by building fortresses, with a whole new style of play. You can collect
          and build your deck to win. You can not only relax while playing the game, but also make a lot of money from
          it.
        </div>
      </div>
      <div className="hidden md:block w-full md:w-1/3" />
    </div>
  )
}

export default BountyInfo
