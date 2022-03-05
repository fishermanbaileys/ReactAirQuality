import React from 'react'
import styled from 'styled-components'
import Tile from './Tile'
import { useState, useEffect } from 'react'

const Container = styled.div`
    padding:40px;
`
const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`


const Tiles = ({props}) => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  

  useEffect(() => {
    let unmounted = false;
    async function getCharacters() {
    
      const response = await fetch(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=9999&page=1&offset=0&sort=desc&radius=1000&country_id=" +  props[0] + "&city=" + props[1] + "&order_by=lastUpdated&dumpRaw=false"
      
        );
      const body = await response.json();
     
      if (!unmounted) {
        setItems(
          body.results.map(({ id, city, name, entity, country, sensorType, lastUpdated }) => ({ id: id, city: city, name: name, entity: entity, country: country, sensorType:sensorType, lastUpdated: lastUpdated}))
        );
        setLoading(true);
      }
    }
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, [props]);


  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long',day: 'numeric', hour: '2-digit', minute: '2-digit',  }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Container>
      <h2>{props[1]}</h2>
      <Wrapper>
      


      {items.map(({id, city, name, entity, country, sensorType, lastUpdated}) => (
        <Tile id={id}  city={city}  name={name} entity={entity} country={country} country={country} sensorType={sensorType} lastUpdated={formatDate(lastUpdated)}>
        </Tile>
      ))}
      </Wrapper>
    </Container>
  );
  
}

export default Tiles