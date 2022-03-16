import React, { useState, useRef, useEffect } from 'react'

import styled from 'styled-components'
import LatestItem from './LatestItem';

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
    gap:40px;
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
    gap:30px;
`;

const Measurements = styled.div`
    display:flex;
    gap:50px;
    flex-wrap:wrap;
`;

const H2 = styled.h2`
  margin:0;
`;

const P = styled.p`
  color: #236f8a;
  font-size: 16px;
  font-weight: 700;
`;

const Nums = styled.p`
  color: rgb(53,162,235);
  font-weight: 700;
  font-size: 29px;
  margin:0;
`;

const Cords = styled.p`
  font-weight: 600;
  font-size: 14px;
`;

const Small = styled.p`
  letter-spacing: -0.008em;
  font-size: 12px
`;

const InnerBox = styled.div`

`;


const TopBar = ({props}) => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    

    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=" + props[0] + "&order_by=lastUpdated&dumpRaw=false"

        );
        const body = await response.json();

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
  
    let coords = items.map(function(i) {
        return i.coordinates;
    });
    
  
  //mapping measurements
  const measurementObjects = items.map(e => e.measurements).flat();
    
  return (
    <Container>
        <Wrapper>
            <Bar>
                <BoxOne>
                    <BoxOneWrap>
                        <InnerBox>
                          <H2>Details</H2>
                          <P>Total Measurements:</P>
                          <Nums>{new Intl.NumberFormat().format(props[1])}</Nums>
                        </InnerBox>
                        <InnerBox>
                        <P>Coordinates:</P>
                      
                        {coords.map(({longitude, latitude}) => (
                            <Cords>Longitude: {longitude}, Latitude: {latitude}</Cords>
                            ))}
                        </InnerBox>
                    </BoxOneWrap>
                </BoxOne>
                <BoxTwo>
                    <BoxTwoWrap>
                        
                        <H2>Latest Measurements</H2>
                        <Measurements>
                        {measurementObjects.map(({parameter, value, lastUpdated, unit}) => (
                            <LatestItem parameter={parameter} value={value} lastUpdated={lastUpdated} unit={unit}>
                    </LatestItem>
                ))}
                </Measurements>

                    </BoxTwoWrap>
                </BoxTwo>
            </Bar>
        </Wrapper>
    </Container>
  )
}

export default TopBar