import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

`;

const Wrapper = styled.div`
    width:100vw;
    height:400px;
`;

const Bar = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
`;

const BoxOne = styled.div`
    order:1;
    width:400px;
    height:400px;
    background-color: #f6f1f1;
    border-radius:30px;
    box-shadow: rgba(50,50,93,0.25) 0px 13px 27px -5px,rgba(0,0,0,0.3) 0px 8px 16px -8px;
`;

const BoxTwo = styled.div`

    order:2;
    width:800px;
    height:400px;
    background-color: #f6f1f1;
    border-radius:30px;
    box-shadow: rgba(50,50,93,0.25) 0px 13px 27px -5px,rgba(0,0,0,0.3) 0px 8px 16px -8px;
`;


const TopBar = () => {
  return (
    <Container>
        <Wrapper>
            <Bar>
                <BoxOne>11111111</BoxOne>
                <BoxTwo>2</BoxTwo>
            </Bar>
        </Wrapper>
    </Container>
  )
}

export default TopBar