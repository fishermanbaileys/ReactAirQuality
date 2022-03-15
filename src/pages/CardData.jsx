import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
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
import TopBar from '../components/TopBar';



const Container = styled.div`
 
`;

const Wrapper = styled.div`
    
`;

const CardData = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
// "https://docs.openaq.org/v2/measurements?date_from=2021-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-03-06T07%3A09%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=" + id + "&order_by=datetime"
    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-03-15T04%3A42%3A00%2B00%3A00&limit=200&page=1&offset=0&sort=desc&radius=1000&location_id=" + id + "&order_by=datetime"

        );
        const body = await response.json();

        if (!unmounted) {
          setItems(
            body.results.map(({ location, parameter, value, date, unit, country, city, entity, sensorType  }) => ({ location: location , parameter: parameter, value: value, date: date , unit: unit, country: country, city: city, entity: entity, sensorType: sensorType}))
          );
          setLoading(false);
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [id]);



  
    let location = items.map(function(i) {
        return i.location;
      });
    
    let city = items.map(function(i) {
        return i.city;
    });
    let country = items.map(function(i) {
        return i.country;
    });

    let entity = items.map(function(i) {
        return i.entity;
    });

    let grade = items.map(function(i) { 
        return i.sensorType;
    });
 
  return (
      <Container>
          <Wrapper>
            <Header props={[location[0],country[0],city[0],entity[0],grade[0]]}/>
            <TopBar props={id}/>
            <GraphTabs props={items}/>
          </Wrapper>
      </Container>
  )
}

export default CardData


