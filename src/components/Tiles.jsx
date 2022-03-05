import React from 'react'
import styled from 'styled-components'
import Tile from './Tile'
import { useState, useEffect } from 'react'

const Container = styled.div`

`


const Tiles = ({props}) => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  

  useEffect(() => {
    let unmounted = false;
    async function getCharacters() {
    
      const response = await fetch(
        //"https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=US&city=" + props + "&order_by=lastUpdated&dumpRaw=false"
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=US&city="+ props +"&order_by=lastUpdated&dumpRaw=false"
      
        );
      const body = await response.json();
     
      if (!unmounted) {
        setItems(
          body.results.map(({ locationId }) => ({ location: locationId}))
        );
        setLoading(true);
      }
    }
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, [props]);

  return (
    
    <ul>
      <h2>{props}</h2>

      


      {items.map(({locationId}) => (
        <Tile locationId={locationId}>
        </Tile>
      ))}
    </ul>
  );
}

export default Tiles