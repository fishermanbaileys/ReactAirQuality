import React from 'react'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Chart from './Chart';

const Container = styled.div`
  overflow:hidden;
  width:100vw;

`;

const Wrapper = styled.div`
  padding:20px 300px 20px 300px;
  
`;


const GraphTabs = ({props}) => {
  
  const Parameters = new Set();
 
  props.forEach(item => {
    for (let key in item) {
      if (key === 'parameter'){
        Parameters.add(item.parameter);
      }
    }
  });

  //for graphs
  const params = Array.from(Parameters)
  //for tabs
  const correctParams = Array.from(Parameters)


  correctParams.forEach(item => {
    if(item === "um010"){
      let index = correctParams.findIndex((el) => el === item);
      correctParams.splice(index, 1, "PM1 Count");
    }
    else if (item === "um025"){
      let index = correctParams.findIndex((el) => el === item);
      correctParams.splice(index, 1, "PM2.5 Count");
    }
    else if(item === "um100"){
      let index = correctParams.findIndex((el) => el === item);
      correctParams.splice(index, 1, "PM10 Count");
    }
  });

  return (
    <Container>
        <Wrapper>
            <Tabs>             
              <TabList> 
                {correctParams.map((item) => (
                  <Tab>{item}</Tab>
                  ))}
              </TabList>

              {params.map((item) => (
                  <TabPanel><Chart props={[props,item]}/></TabPanel>
                  ))}
          </Tabs>
        </Wrapper>
      </Container>
  )
}

export default GraphTabs