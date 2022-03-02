import React from 'react'
import { useState, useEffect } from 'react';
import Cities from './Cities';
import styled from 'styled-components';
import Form from '../pages/Form';


const Wrapper = styled.div`

`;


const Countries = (props) => {
    
    
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState("Countries");
    const [code, setCode ] = useState("Countries");
    

    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://api.openaq.org/v1/countries?limit=9999"
        );
        const body = await response.json();
        if (!unmounted) {
          setItems(
            body.results.map(({ name, code }) => ({ label: code, value: code, val: name}))
          );
          setLoading(false);
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, []);

    const handleData = () => {
      props.passData(value);
    }
    
    return (
    <Wrapper>
      <select on
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onClick={(e) => setCode(e.currentTarget.value)}
        onClick={handleData}
      >
        <option selected> Select A Country</option>
        {items.map(({ label, value, val}) => (
          <option key={value} value={value}>
            {val + " - " + label}
          </option>
        ))}
      </select>
      
    </Wrapper>        
    );
  }
  

export default Countries;

