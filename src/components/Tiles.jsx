import React from 'react'
import styled from 'styled-components'
import Tile from './Tile'
import { useState, useEffect } from 'react'

const Container = styled.div`
  
`
const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const ResWrapper = styled.div`
  padding:10px;
  display:flex;
  align-contents:center;
  justify-content:center;
`;
const Result = styled.div`
  display:flex;
  
  font-size:20px;
  padding:16px;

`;

const Bold = styled.div`
 
  font-size:20px;
  font-weight:600;
`;


const Tiles = ({props}) => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  


    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {


        const response2 = await fetch(
          "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=9999&page=1&offset=0&sort=desc&radius=1000&country_id=" +  props[0] + "&city=" + props[1] + "&order_by=lastUpdated&dumpRaw=false"
          
        
        )
     
        const response = await fetch(
          
          "https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=" + props[0] +"&order_by=lastUpdated&dumpRaw=false"
        
        )
        
        const responsefinal = () => {
          if(props[1] === "Select A City"){
            return response;
          } else {
            return response2;
          }
        }

        const body = await responsefinal().json();
      
        if (!unmounted) {
          setItems(
            body.results.map(({ id, city, name, entity, country, sensorType, lastUpdated, firstUpdated, parameters, sources, measurements }) => ({ id: id, city: city, name: name, entity: entity, country: country, sensorType:sensorType, lastUpdated: lastUpdated,  firstUpdated: firstUpdated, parameters: parameters, sources: sources, measurements: measurements }))
          );
          setLoading(false);
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

  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }


  return (
    <Container>
      <ResWrapper>
      <Result><Bold>Results:</Bold>{props[1]}, {props[0]}</Result>
      </ResWrapper>
        <Wrapper>    
        {items.map(({id, city, name, entity, country, sensorType, lastUpdated, firstUpdated, parameters, sources, measurements}) => (
          <Tile  id={id}  city={city}  name={name} entity={entity} country={country} country={country} sensorType={sensorType} lastUpdated={formatDate(lastUpdated)} firstUpdated={formatDate(firstUpdated)} parameters={parameters} sources={sources.id} measurements={separator(measurements)}>
          </Tile>
        ))}

      
      </Wrapper>
    </Container>
  );
  
}

export default Tiles