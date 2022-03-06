import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
 
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;  
`;

const Test = styled.div`

`;



const Header = ({props}) => {

 

  return (
    <Container>
        <Wrapper>
            <div>Location</div>
            <div>{props[0]}</div>
            <div>{props[1]}</div>
            <div>{props[2]}</div>
            <div>{props[3]} , {props[4]}</div>
        </Wrapper>
    </Container>
    
  )
}

export default Header