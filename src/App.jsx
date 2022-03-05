
import './App.css';
import styled from 'styled-components';
import Form from './pages/Form';

const Container = styled.div`
  font-family: Arial, sans-serif;

 
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  
`;

const Header = styled.h1`
  text-align:center;
  font-size: 50px;
  width:100%;
  height:100px;
  color:white;
  background-color:#0A2342;
`;

const Headerthin = styled.span`
  font-weight: 200;
`;

const App = (props) => {


  
  

  return (
    <Container>
      <Wrapper>
        <Header>Air Quality <Headerthin>In United States</Headerthin></Header>
        <Form/>
        
      </Wrapper>
    </Container>
  )
};

export default App;
