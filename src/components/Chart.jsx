import React from 'react'
import styled from 'styled-components'
import 'chartjs-adapter-moment';
import { Scatter, Line } from 'react-chartjs-2';
import moment from 'moment';

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const Container = styled.div`

`;

const Wrapper = styled.div`

`;

const Chart = ({props}) => {




  let datas = [];

  props[0].forEach(item => {
    for (let key in item) {
        if(key === 'parameter' && item[key] === props[1] ){
          datas.push(item);
        }
    }
  });

let test2 = datas.map((x, index) =>({x: x.date.local, y: x.value}));

  const data = {

    datasets: [
      {
        data: test2,
        backgroundColor: 'rgb(53,162,235)',
      },
 
      
    ],
  };
   const options = {
    responsive: true,
      scales: {
        yAxes: {
          title: {
              display: true,
              text: props[1],
              font: {
                  size: 15
              }
          },
          ticks: {
              precision: 0
          }
      },
        xAxes: {
          
          type: 'time',
                time: {
                    unit: 'week'
          },

          title: {
            display: true,
            text: "Dates",
            font: {
                size: 15
          }
        }
          
        }
    },
    plugins: {
        legend: {
            display: false,
        }
    }
    
  };
  return (
    <Container>
      <Wrapper>
        <Scatter options={options} data={data}/>
      </Wrapper>
    </Container>
  )
}

export default Chart