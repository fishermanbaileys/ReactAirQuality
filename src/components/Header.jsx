import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width:100vw;
  padding-bottom:30px;
`;


const Wrapper = styled.div`
  display:flex;
  width:100vw;
  padding:40px;
  flex-direction:column;
  gap:10px;
  background: #e5e5e5;
  box-shadow: rgba(50,50,93,0.25) 0px 13px 27px -5px,rgba(0,0,0,0.3) 0px 8px 16px -8px;
`;

const H1 = styled.h1`
  margin:0;
`;

const H2 = styled.h2`
  margin:0;
`;
const SensorType = styled.div`
    
    color: #236f8a;
    border: .5px solid #236f8a;
    width: fit-content;
    border-radius:10px;
    padding:4px;
    
    font-weight:600;
`;

const Owned = styled.div`
    
    color: #faa204;
    border: .5px solid #faa204;
    width: fit-content;
    border-radius:10px;
    margin:.5px;
    padding:6px;
    line-height: 0.7;
    font-weight:600;
`;

const H4 = styled.p`
  margin:0px;
`;



const Header = ({props}) => {

 

  return (
    <Container>
        <Wrapper>
            <H4>Location:</H4>
           <H1>{props[0]}</H1>
           <H2>Located in: {props[2] || 'N/A' },{props[1]}</H2>
           <Owned>{props[3]}</Owned> 
           <SensorType>{props[4]}</SensorType>
        </Wrapper>
    </Container>
    
  )
}

export default Header