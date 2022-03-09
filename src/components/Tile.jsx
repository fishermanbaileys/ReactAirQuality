import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Container = styled.div`

`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(2px, 1fr));
    margin: 2em;
`;

const BoxContainer = styled.div`
    width: 400px;
    height: 500px;
    border-radius:10px;
    background-color: #f6f1f1;
    position: relative;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;



`;

const BoxWrapper = styled.div`
    padding:18px;
    display:flex;
    flex-direction:column;

`;


const Location = styled.div`
    font-weight:600;
    font-size:16px;
    line-height: 1.6;
`;

const LocatedIn = styled.div`
    font-weight:600;
    font-size:16px;
    line-height: 1.6;
    padding-bottom:10px;
`;

const OwnedBy = styled.div`
    padding:3px;
    color:grey;
`;


const Owned = styled.div`
    color: #faa204;
    border: .5px solid #faa204;
    width: fit-content;
    border-radius:10px;
    margin:.5px;
    padding:6px;
    line-height: 0.7;
    font-weight:600;
`;

const Name = styled.div`    
    font-weight:800;
    font-size:28px;
`;

const Updated = styled.div`
    font-weight:600;
    font-size:14px;
    letter-spacing: -0.031em;
`;

const Bold = styled.div`
    font-weight:600;
    font-size:14px;
    letter-spacing: -0.031em;
`;


const SensorType = styled.div`
    color: #236f8a;
    border: .5px solid #236f8a;
    width: fit-content;
    border-radius:10px;
    padding:4px;
    
    font-weight:600;
`;

const TotalMeasure = styled.div`
    padding-top:20px;
    color: light-black;
    font-size:16px;
`;



const ButtonWrap = styled.div`
    display:flex;
    justify-content:center;
    text-align:center;
    padding-top:40px;
`;


const Button = styled.button`
    
    font-weight: 600;
    text-align:center;
    border:none;
    color:white;
    font-size:16px;
    display: flex;
    justify-content:center;
    margin-top: auto;
    padding: 8px 8px 8px 8px;
    background: #236f8a;
    box-shadow: 0 3px 8px grey;
    border-radius: 32px;
    text-decoration:none;
    
    &:hover{
    box-shadow: 0 3px 8px grey;
    transform: translate3d(0, 0, 0);
    background:grey;
    cursor: pointer;
    
    }

    &:active{
    top: 2px;
    left: 1px;
    box-shadow: none;

}
`;




const Tile = ({id, city, name, entity, country, sensorType, lastUpdated, firstUpdated, measurements, Param}) => {
    
    

    
    return (
    <Container>
        <Wrapper>
            <BoxContainer>
                <BoxWrapper>
                <Updated>Last Updated: {lastUpdated}</Updated>
                <Name>{name}</Name>
                <Location>Location ID {id}</Location>
                <LocatedIn>Located in {city || 'N/A'}, {country}</LocatedIn>
                <OwnedBy>Owned By:<Owned>{entity}</Owned></OwnedBy>
                <OwnedBy>Sensor Grade:<SensorType>{sensorType}</SensorType></OwnedBy>
                <TotalMeasure><Bold>Started Collecting Data:</Bold>{firstUpdated}</TotalMeasure>
                <TotalMeasure><Bold>Total Measurements:</Bold> {measurements}</TotalMeasure>
                <TotalMeasure><Bold>Types Of Data: </Bold> {Param}</TotalMeasure>
                <ButtonWrap>
                <Link to={`/location/${id}`}>
                <Button>View More Data</Button>
                </Link>
                </ButtonWrap>
                </BoxWrapper>
            </BoxContainer>
        </Wrapper>
    </Container>
    );
};

export default Tile