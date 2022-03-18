import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import GraphTabs from '../components/GraphTabs';
import TopBar from '../components/TopBar';
import ReactLoading from 'react-loading';


const Container = styled.div`
 
`;

const Wrapper = styled.div`
    
`;

const Loading = styled.div`
  padding:40px;
`;

const LoadingGraph = styled.div`
  display:flex;
  width:100vw;
  height:600px;
  align-items:center;
  justify-content:center;
`;

const CardData = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [found, setFound] = useState([]);
    

    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://docs.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-03-17T23%3A55%3A00%2B00%3A00&limit=1000&page=1&offset=0&sort=desc&radius=1000&location_id=" + id + "&order_by=datetime"
        );
        const body = await response.json();
    
        if (!unmounted) {
          
          setItems(
            body.results.map(({ location, parameter, value, date, unit, country, city, entity, sensorType  }) => ({ location: location , parameter: parameter, value: value, date: date , unit: unit, country: country, city: city, entity: entity, sensorType: sensorType}))
          );
          setFound(body["meta"]); 
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
    
    
  const itemsTotal = found["found"];
  
  

  return (
      <Container>
          <Wrapper>
          { loading ? (
            <Loading>
              <ReactLoading
                type={"spin"}
                color={"rgb(53,162,235)"}
                margin-left={100}
                height={50}
                width={50}
              /></Loading>
            ) :
            <Header props={[location[0],country[0],city[0],entity[0],grade[0]]}/>}
            <TopBar propsTop={[id,itemsTotal]}/>

            { loading ? (
            <LoadingGraph>
              <ReactLoading
                type={"spin"}
                color={"rgb(53,162,235)"}
                margin-left={100}
                height={50}
                width={50}
              /></LoadingGraph>
            ) :
            <GraphTabs props={items}/>}
          </Wrapper>
      </Container>
  )
}

export default CardData


