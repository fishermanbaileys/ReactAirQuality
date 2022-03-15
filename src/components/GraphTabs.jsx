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


  const params = Array.from(Parameters)
  //console.log(params);
  return (
    <Container>
        <Wrapper>
            <Tabs>             
              <TabList> 
                {params.map((item) => (
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