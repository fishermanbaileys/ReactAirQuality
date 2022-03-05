import React from 'react'
import styled from 'styled-components';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(2px, 1fr));
    margin: 2em;
`;

const BoxContainer = styled.div`
    gap:3px;
    max-width: 320px;
    min-height: 380px;
    border-radius:10px;
    display: flex;
    align-items: center;
    flex-direction:column;
    justify-content: start;
    background-color: #DCE1E9;
    position: relative;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    &:hover ${Info}{
    opacity: 1;
    }
`;

const Updated = styled.p`
    font-weight:700;
    font-size:18px;
`;


const Tile = ({id, city, name, entity, country, sensorType, lastUpdated}) => {
    return (
    <Container>
        <BoxContainer>
            <Updated>Last Updated: {lastUpdated}</Updated>
            <h4>Location ID {id}</h4>
            <h2>{name}</h2>
            
            <p>Located in {city || "No City"}, {country}</p>
            <h4>{entity}</h4>
            <h4>{sensorType}</h4>
            <h2>{city}</h2>
    

        </BoxContainer>
    </Container>
    );
};

export default Tile