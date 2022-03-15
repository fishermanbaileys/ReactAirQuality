import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
//I did not label this file correct it handles countries and states

const Wrapper = styled.div`

`;

const ButtonBar = styled.div`
  padding-top:40px;
  display:flex;
  justify-content:center;
  gap:30px;
`;



const Title = styled.h2`
  
  font-size:20px;
  margin: 0;
`

const Select = styled.select`
  font-size:12px;
  padding: 3px;
  cursor: pointer;
  border-radius:5px;
  border: 2px solid #236f8a;
  background-color:white;
  font-weight:600px;
`;

const Option = styled.option`

`;


const Countries = (props) => {
    
    
    const [loading, setLoading] = useState(true);
    //countries states
    const [items, setItems] = useState([{ label: "Loading ...", value: "" }]);
    const [value, setValue] = useState("US");

    //cities states
    const [citems, setcItems] = useState([]);
    const [cvalue, setcValue] = useState("AMADOR");
    



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
            setLoading(false);
          }


      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [value[0]+value[1]]);

    const handleSubmit = () => {
      props.passCountryData(value);
      props.passCityData(cvalue);
    };

    return (
    <Wrapper>
      <ButtonBar>
        <Title>Countries:</Title>
          <Select on
            disabled={loading}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onClick={(e) => setcValue("Select A City")}
            
          >
            <option disabled selected> Select A Country</option>
            {items.map(({ label, value, val}) => (
              <option key={value} value={value} >
                {val + " - " + label}
              </option>
            ))}
          </Select>
          <Title>Cities:</Title>
          <Select
            menuPlacement="top"
            disabled={Object.keys(citems).length === 0}
            value={cvalue}
            onChange={(e) => setcValue(e.currentTarget.value)}
            
          >
            <option disabled selected>Select A City</option>
            
            {citems.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
            
          </Select> 
          <button onClick={handleSubmit}>Submit</button>
        </ButtonBar>
    </Wrapper>        
    );


}

  
  

export default Countries;

