import React, { useState, useRef } from 'react';
import Tiles from '../components/Tiles';
import Countries from '../components/Countries';
import SelectHeader from '../components/SelectHeader';
import styled from 'styled-components'; 


const Container = styled.div`
  
`;

const Wrapper = styled.div`
  align-contents:center;
  height:100vh;
`;

const CardSelector = () => {
  
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
        <SelectHeader/>
        <Countries passCountryData={passCountryData} passCityData={passCityData}/>
        <Tiles props={[countryData, cityData]}></Tiles>
      </Wrapper>
    </Container>  
  )
};

export default CardSelector