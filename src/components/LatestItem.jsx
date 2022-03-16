import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

    
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  gap:2px;

`;

const Params = styled.div`
  color:#236f8a;
  font-size:16px;
  font-weight: 700;
    
`;
const Measurement = styled.div`
  color:rgb(53, 162, 235);
  font-weight: 700;
  font-size: 29px;
    
`;
const Units = styled.div`
  font-weight: 600;
  font-size: 14px;
`;
const Dates = styled.div`
  letter-spacing: -0.008em;
  font-size: 12px;
      
`;





const LatestItem = ({parameter, value, lastUpdated, unit }) => {

  const updatedParams = [parameter];

  updatedParams.forEach(item => {
    if(parameter === "um010"){
      let index = updatedParams.findIndex((el) => el === item);
      updatedParams.splice(index, 1, "PM1 Count");
    }
    else if (item === "um025"){
      let index = updatedParams.findIndex((el) => el === item);
      updatedParams.splice(index, 1, "PM2.5 Count");
    }
    else if(item === "um100"){
      let index = updatedParams.findIndex((el) => el === item);
      updatedParams.splice(index, 1, "PM10 Count");
    }
  });
  
  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long',day: 'numeric', hour: '2-digit', minute: '2-digit'}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  

  return (
    <Container>
        <Wrapper>
          <Params>{updatedParams}</Params>
          <Measurement>{value}</Measurement>
          <Units>{unit}</Units>
          <Dates>{formatDate(lastUpdated)}</Dates>

        </Wrapper>
    </Container>
  )
}

export default LatestItem