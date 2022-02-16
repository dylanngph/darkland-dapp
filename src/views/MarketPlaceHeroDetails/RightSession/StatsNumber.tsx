import React from 'react'
import styled from 'styled-components'
import ProgressBar from "@ramonak/react-progress-bar";

const StatsNumber = ({ ad, ap, asp, hp, mr, arm}) => {
  return (
    <Card className="flex flex-row justify-between w-full xl:w-3/6">
      <div className="w-full mr-3 ml-3 sm:ml-0" >
        <div>
          <div className="flex flex-row justify-between " >
            <span className="text-white" >Attack Damage</span>
            <span style={{ color: "#FFAB04" }} > {ad}  </span>
          </div>
          <ProgressBar completed={Number(ad)} maxCompleted={150} bgColor="#F83052" baseBgColor="#656565"
            isLabelVisible={false} height="5px" />
        </div>

        <div>
          <div className="flex flex-row justify-between mt-8" >
            <span className="text-white" >Ability Power</span>
            <span style={{ color: "#FFAB04" }} > {ap} </span>
          </div>
          <ProgressBar completed={Number(ap)} maxCompleted={160} bgColor="#F83052" baseBgColor="#656565"
            isLabelVisible={false} height="5px" />
        </div>
        <div>
          <div className="flex flex-row justify-between mt-8" >
            <span className="text-white" >Health Point</span>
            <span style={{ color: "#FFAB04" }} >{hp}</span>
          </div>
          <ProgressBar completed={Number(hp)} maxCompleted={300} bgColor="#F83052" baseBgColor="#656565"
            isLabelVisible={false} height="5px" />
        </div>
        <div>
          <div className="flex flex-row justify-between mt-8" >
            <span className="text-white" >Attack Speed</span>
            <span style={{ color: "#FFAB04" }} >{Number(asp).toFixed(2)}</span>
          </div>
          <ProgressBar completed={Number(asp)} maxCompleted={2.5} bgColor="#F83052" baseBgColor="#656565"
            isLabelVisible={false} height="5px" />
        </div>
        <div>
          <div className="flex flex-row justify-between mt-8" >
            <span className="text-white" >Magic Resist</span>
            <span style={{ color: "#FFAB04" }} >{mr}</span>
          </div>
          <ProgressBar completed={Number(mr)} maxCompleted={150} bgColor="#F83052" baseBgColor="#656565"
            isLabelVisible={false} height="5px" />
        </div>
        <div>
          <div className="flex flex-row justify-between mt-8" >
            <span className="text-white" >Armor</span>
            <span style={{ color: "#FFAB04" }} >{arm}</span>
          </div>
          <ProgressBar completed={Number(arm)} maxCompleted={150} bgColor="#F83052" baseBgColor="#656565"
            isLabelVisible={false} height="5px" />
        </div>
      </div>


    </Card>
  );
};

// const CardBody = styled.div`
//   background-color: #242424;
//   position: relative;
//   border: 2px solid #414145;
//   padding: 15px 10px;
// `

const Card = styled.div`
  margin-top: 5px;
  margin-left: 5px;
`

export default StatsNumber;