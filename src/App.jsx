
import './App.css';
import styled from 'styled-components';
import CardSelector from './pages/CardSelector';
import CardData from './pages/CardData';
import { Routes, Route } from "react-router-dom";
import Tiles from './components/Tiles';

const Container = styled.div`
  font-family: Arial, sans-serif;

 
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  
`;

//wouldnt it be could if we could display air quality like a dopler rader displays temp and precipitation

const App = () => {

  return (
    <Container>
      <Wrapper>
        <Routes>
            <Route path="/" element={<CardSelector/>}></Route>
            <Route path="location/:id" element={<CardData/>} ></Route>
        </Routes>
      </Wrapper>
    </Container>
  )
};

export default App;
