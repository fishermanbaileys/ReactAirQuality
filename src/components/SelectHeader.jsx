import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    
`;


const Header = styled.div`
  min-width:99vw;
  background: url('https://res.cloudinary.com/dmdbdfucv/image/upload/v1601557540/clockweb/hero-clouds_uilhwh.png') repeat-x center bottom #236f8a;
  background-color: rgb(35, 111, 138);
  padding-top: 180px;
  padding-bottom: 120px; 
  z-index:999;
`;

const SubContainer = styled.div`

 
`;

const H2 = styled.h1`
  text-align:center;
  font-size: 50px;
  color:white;
`;

const CloudOne = styled.div`
  position: absolute;
  opacity: .5;
  left: -3%;
  top: 90px;
  overflow: hidden; 
`
const CloudTwo = styled.div`
  position: absolute;
  opacity: .5;
  right: 0;
  top: 120px;
  overflow: hidden;
`

const Headerthin = styled.span`
  font-weight: 200;
`;

const SelectHeader = () => {
  return (
    <Container>
        <Header>
          <SubContainer> 
           <H2>Air Quality <Headerthin>Around The World</Headerthin></H2> 
          </SubContainer>
          <CloudOne><img src="https://res.cloudinary.com/dmdbdfucv/image/upload/v1601557540/clockweb/hero-cloud1_kn2bmb.png"/></CloudOne>
          <CloudTwo><img src="https://res.cloudinary.com/dmdbdfucv/image/upload/v1601557539/clockweb/hero-cloud2_s12xup.png"/></CloudTwo>
        </Header>
    </Container>
  )
}

export default SelectHeader