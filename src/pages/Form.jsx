import React, { useState, useRef } from 'react';
import Tiles from '../components/Tiles';
import Header from '../components/Header'
import Countries from '../components/Countries';
import styled from 'styled-components';


const Container = styled.div`
    text-align:center;
    
`;

const Wrapper = styled.div`
  text-align:center;
  align-contents:center
`;



const Form = () => {
  
//take in from Countries 
  const [countryData, setCountryData] = useState();
  const [cityData, setCityData] = useState();
  //moving country data into parent
  const passCountryData = (data) => {
    setCountryData(data);
  };

  const passCityData = (data) => {
    setCityData(data);
  };



  
  return (
    <Container>
      <Wrapper>
      <Countries passCountryData={passCountryData} passCityData={passCityData}/>
      <h2>{countryData}</h2>
      <h2>{cityData}</h2>
      <Tiles props={cityData}></Tiles>
      </Wrapper>
    </Container>  
  )
};

export default Form;