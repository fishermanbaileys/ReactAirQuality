import React, { useState, useRef } from 'react';
import Tiles from '../components/Tiles';
import Countries from '../components/Countries';
import styled from 'styled-components';


const Container = styled.div`
    text-align:center;
    
`;

const Wrapper = styled.div`
  text-align:center;
  align-contents:center;
  height:100vh;
  
`;

const Header = styled.h1`
  text-align:center;
  font-size: 50px;
  color:white;
  background-color:#0A2342;
  width:100vw;
`;

const Headerthin = styled.span`
  font-weight: 200;
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
        <Header>Air Quality <Headerthin>Around The World</Headerthin></Header>
        <Countries passCountryData={passCountryData} passCityData={passCityData}/>
        <Tiles props={[countryData, cityData]}></Tiles>
      </Wrapper>
    </Container>  
  )
};

export default CardSelector