import React from 'react'
import countries from './Countries';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`

`;

const Cities = ({countrytoCity}) => { 

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState("Cities");
  
    useEffect(() => {
      setLoading(true);
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://docs.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country_id="+ countrytoCity +"&order_by=city"
       
          
        );
          
        const body = await response.json();
        if (!unmounted) {
          setItems(
            body.results.map(({ city }) => ({ label: city, value: city }))
          );
          setLoading(true);
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, []);

    
    

    return (
      <Wrapper>
  
      <select
        
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        
      >
        <option defaultValue>Select A City</option>
        {items.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
        
      </select>
      
          
      
      </Wrapper>
    );
}


export default Cities