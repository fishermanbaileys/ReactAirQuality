import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
//I did not label this file correct it handles countries and states

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  gap:40px;
  z-index:999;
`;



const Countries = (props) => {
    
    
    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState([]);
    const [value, setValue] = useState("Countries ABV");


    const [citems, setcItems] = useState([]);
    const [cvalue, setcValue] = useState("");
    

    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://api.openaq.org/v1/countries?limit=9999"
        );
        const body = await response.json();
        if (!unmounted) {
          setItems(
            body.results.map(({ name, code }) => ({ label: code, value: code,  val: name}))
          );
          setLoading(false);
        }

        const responsec = await fetch(
         
          "https://docs.openaq.org/v2/cities?limit=9999&page=1&offset=0&sort=asc&country_id="+ value[0]+value[1] +"&order_by=city"
            
          );
          
          const bodyc = await responsec.json();
          if (!unmounted) {
            setcItems(
              bodyc.results.map(({ city }) => ({ label: city, value: city }))
            );
            
          }


      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [value[0]+value[1]]);

    const handleSubmit = () => {
      
      props.passCountryData(value);
      props.passCityData(cvalue)
      console.log(value)
      console.log(cvalue)
      
    };
  
    
    return (
    <Wrapper>
      
        <select on
          disabled={loading}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          <option selected> Select A Country</option>
          {items.map(({ label, value, val}) => (
            <option key={value} value={value}>
              {val + " - " + label}
            </option>
          ))}
        </select>
     
        <select
          
          value={cvalue}
          onChange={(e) => setcValue(e.currentTarget.value)}
          
        >
          <option disabled selected>Select A City</option>
          {citems.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
          
        </select> 

        <button onClick={handleSubmit}>Submit</button>
    </Wrapper>        
    );


}

  
  

export default Countries;

