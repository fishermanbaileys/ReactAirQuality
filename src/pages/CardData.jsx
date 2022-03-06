import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList
  } from "recharts";

const Container = styled.div`
 
`;

const Wrapper = styled.div`
    
`;

const Test = styled.div`

`;
const CardData = () => {
    let { id } = useParams();

    

    
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([{ label: "Loading ...", value: "" }]);
    const [value, setValue] = useState("");
    
    const object = items;
    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {
        const response = await fetch(
          "https://docs.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-03-06T07%3A09%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=" + id + "&order_by=datetime"
        );
        const body = await response.json();
        if (!unmounted) {
          setItems(
            body.results.map(({ location, parameter, value, date, unit, country, city, entity, sensorType  }) => ({ location: location , parameter: parameter, value: value, date: date , unit: unit, country: country, city: city, entity: entity, sensorType: sensorType }))
          );
          setLoading(false);
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [id]);


    var location = items.map(function(i) {
        return i.location;
      });
    
    var city = items.map(function(i) {
        return i.city;
    });
    var country = items.map(function(i) {
        return i.country;
    });

    var entity = items.map(function(i) {
        return i.entity;
    });

    var grade = items.map(function(i) {
        return i.sensorType;
    });

    var val = items.map(function(i){
        return i.value;
    })

    var dates = items.map(function(i){
        return i.date;
    })

    const data = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 }
      ];
      


    console.log(data)

  return (
      <Container>
          <Wrapper>
            

            <Header props={[location[0],country[0],city[0],entity[0],grade[0]]}></Header>
                <ScatterChart
                    width={400}
                    height={400}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20
                    }}
                    >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                    <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="A school" data={data} fill="#8884d8">
                        <LabelList dataKey="x" />
                    </Scatter>
                </ScatterChart>
          </Wrapper>
      </Container>
  )
}

export default CardData


