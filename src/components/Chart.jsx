import React from 'react'
import styled from 'styled-components'
import GraphTabs from '../components/GraphTabs';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Scatter, Line } from 'react-chartjs-2';

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




let dates = datas.map(function(id){
  return id.date.utc;
});

let values = datas.map(function(id){
  return id.value;
});

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long',day: 'numeric', hour: '2-digit', minute: '2-digit',  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

dates.forEach((element, index) => {
  dates[index] = formatDate(element);
  });

  
  const labels = dates;

  const data = {
  
    labels,
    datasets: [
      {
        data: values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: '#faa204',
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
        <Line options={options} data={data}/>
      </Wrapper>
    </Container>
  )
}

export default Chart