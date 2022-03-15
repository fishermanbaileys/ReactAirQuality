import React, { useState, useRef, useEffect } from 'react'

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

const BoxOneWrap = styled.div`
    padding:40px;
    display:flex;
    flex-direction: column;
`;
const BoxTwo = styled.div`

    order:2;
    width:800px;
    height:400px;
    background-color: #f6f1f1;
    border-radius:30px;
    box-shadow: rgba(50,50,93,0.25) 0px 13px 27px -5px,rgba(0,0,0,0.3) 0px 8px 16px -8px;
`;


const BoxTwoWrap = styled.div`
    padding:40px;
    display:flex;
    flex-direction: column;
`;

const H2 = styled.h2`
  margin:0;
`;


const TopBar = ({props}) => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=" + props + "&order_by=lastUpdated&dumpRaw=false"

        );
        const body = await response.json();
        console.log(body)
        if (!unmounted) {
          setItems(
            body.results.map(recent => ({ coordinates: recent.coordinates, measurements: recent.measurements}))
          );
          setLoading(false);
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [props]);

  console.log(items["measurements"])

  return (
    <Container>
        <Wrapper>
            <Bar>
                <BoxOne>
                    <BoxOneWrap>
                        <H2>Details</H2>
                    </BoxOneWrap>
                </BoxOne>
                <BoxTwo>
                    <BoxTwoWrap>
                        <H2>Latest Measurements</H2>
                    </BoxTwoWrap>
                </BoxTwo>
            </Bar>
        </Wrapper>
    </Container>
  )
}

export default TopBar