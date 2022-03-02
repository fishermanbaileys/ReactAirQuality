import React, { useState } from 'react';
import Cities from '../components/Cities';
import Countries from '../components/Countries';
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    gap:30px;
`;

const Form = () => {
  
//take in from Countries 
  const [childData, setChildData] = useState("");

  const passData = (data) => {
    setChildData(data);
  };
  

  return (
    <Wrapper>
    
    <Countries passData={passData}/>
    <Cities countrytoCity={childData}/>
    <button>Submit</button>
    
    </Wrapper>  
  )
};

export default Form;