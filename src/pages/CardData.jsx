import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
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

const Test = styled.div`
  width:80vw;
  hieght:40vh;
`;
const CardData = () => {
    let { id } = useParams();

    
    const [chartData, setChartData] = useState({})
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({});

    const object = items;
    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://docs.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-03-06T07%3A09%3A00%2B00%3A00&limit=50&page=1&offset=0&sort=desc&radius=1000&location_id=" + id + "&order_by=datetime"
        );
        const body = await response.json();
        if (!unmounted) {
          setItems(
            body.results.map(({ location, parameter, value, date, unit, country, city, entity, sensorType  }) => ({ location: location , parameter: parameter, value: value, date: date , unit: unit, country: country, city: city, entity: entity, sensorType: sensorType }))
          );
          setLoading(false);
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [id]);


  
    var location = items.map(function(i) {
        return i.location;
      });
    
    var city = items.map(function(i) {
        return i.city;
    });
    var country = items.map(function(i) {
        return i.country;
    });

    var entity = items.map(function(i) {
        return i.entity;
    });

    var grade = items.map(function(i) {
        return i.sensorType;
    });

    var val = items.map(function(i){
        return i.value;
    });

    var dates = items.map(function(id){
        return id.date.utc;
    });

    var param = items.map(function(id){
      return id.parameter;
  });

  var vals = items.map(function(id){
    return id.value;
  });

  let combine = param.map((e, i) => [e, vals[i]]);

  let sorted = combine.sort();
 
  console.log(sorted);

    const formatDate = (dateString) => {
      const options = {year: 'numeric', month: 'long',day: 'numeric', hour: '2-digit', minute: '2-digit',  }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
    dates.forEach((element, index) => {
      dates[index] = formatDate(element);
    });

    const labels = dates;
    const datass = {
    
      labels,
      datasets: [
        {
          label: param[1],
          data: val,
          backgroundColor: '#236f8a',
        }
      ],
    };

  
  return (
      <Container>
          <Wrapper>
            <Header props={[location[0],country[0],city[0],entity[0],grade[0]]}></Header>
            <Test></Test>
            <Line data={datass} />
          </Wrapper>
      </Container>
  )
}

export default CardData


