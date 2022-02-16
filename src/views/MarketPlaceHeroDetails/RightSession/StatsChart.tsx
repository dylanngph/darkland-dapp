import React from 'react'
import styled from 'styled-components'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

import { Radar } from "react-chartjs-2";
import {RadarOptions} from './RadarConfig'



Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);


const StatsChart = ({data}) => {
  const dataRadar = {
    labels: [
      'AD',
      'ASP',
      'AP',
      'HP',
      'MNR',
      'ARM',
    ],
    datasets: [{
      label: 'Stats',
      data: [data ? data[0] : 50, data ? data[1] : 50, data ? data[2] : 50, data ? data[3] : 50, data ? data[4] : 50, data ? data[5] : 50],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
      lineCap: 'round',
    }]
  };
  return (
    <Card className="w-full xl:w-3/6">
      <Radar data={dataRadar} options={RadarOptions} />
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
margin-right: 5px;
`

export default StatsChart;