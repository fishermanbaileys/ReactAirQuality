import React from 'react'
import styled from 'styled-components'
import Tile from './Tile'
import { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'

const Container = styled.div`
  
`



const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const ResWrapper = styled.div`
  padding:10px;
  display:flex;
  align-contents:center;
  justify-content:center;
`;
const Result = styled.div`
  display:flex;
  
  font-size:20px;
  padding:16px;

`;

const Bold = styled.div`
  font-size:20px;
  font-weight:600;
`;


const PaginationContainer = styled.div`
  display: flex;
  width:100vw;
  justify-content:center;
  visibility: ${({itemsTotal}) => (itemsTotal >= 51 ? 'visible' : 'hidden')};
`


const StyledPaginateContainer = styled.div`
      
.pagination {
    display:flex;
    flex-direction:row;
    align-items:center;
    background-color: #f6f1f1;
    border-radius:30px;
    box-shadow: rgba(50,50,93,0.25) 0px 13px 27px -5px,rgba(0,0,0,0.3) 0px 8px 16px -8px;
    height:80px;
    color: grey;
    width:40vw;
    justify-content:center;
    list-style-type: none;
    gap:30px;
    
  }
  .break-me {
    cursor: pointer;
  }
  .active {
    border-color: transparent;
    background-color: #236f8a;
    color: white;
    border:none;
  }

  .page-link{
    font-size:20px;
    
    
  }

  .page-item{
    padding:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    border-radius:100%;
    width:38px;
    height:38px;
    border: 1px solid #236f8a;
    cursor: pointer;
  }

  

  .normal{
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    font-size:20px;
    min-width:38px;
    min-height:38px;
    
  }
  
  .previous{
    background-color:#0e2c36;
    padding:10px;
    width:38px;
    height:38px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:100%;
    color:white;
    cursor: pointer;
  }
  .disabled{
    background-color:grey;
    
    
  }
`;



const Tiles = ({props}) => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [found, setFound] = useState([]);
  const [page , setPage] = useState('1')
  

    useEffect(() => {
      let unmounted = false;
      async function getCharacters() {


        const response2 = await fetch(
          "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=50&page="+ page +"&offset=0&sort=desc&radius=1000&country_id=" +  props[0] + "&city=" + props[1] + "&order_by=lastUpdated&dumpRaw=false"
          
        
        )
     
        const response = await fetch(
          
          "https://docs.openaq.org/v2/locations?limit=50&page="+ page +"&offset=0&sort=desc&radius=1000&country_id=" + props[0] +"&order_by=lastUpdated&dumpRaw=false"
        
        )
        
        const responsefinal = () => {
          if(props[1] === "Select A City"){
            return response;
          } else {
            return response2;
          }
        }
        
        const body = await responsefinal().json();
        
        if (!unmounted) {
          setItems(
            body.results.map(({ id, city,name,entity,country,sensorType,lastUpdated,firstUpdated,parameters,sources,measurements }) => ({ id: id, city: city, name: name, entity: entity, country: country, sensorType: sensorType, lastUpdated: lastUpdated,  firstUpdated: firstUpdated, parameters: parameters, sources: sources, measurements: measurements }))
          );
          
          setFound(body["meta"]);  
          
          setLoading(false);

          
        }
      }
      getCharacters();
      return () => {
        unmounted = true;
      };
    }, [props,page]);
  

  ///////HELPERS//////////////////////////////////////////////////

  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long',day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const separator = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
      
    });
  };
  
///////////////////////////////////////////////////////////////////


/////////////////////////////////Getting parameters//////////////////
  const Params = new Set();

  items.forEach(item => {
    for (let key in item) {
      if (key === 'parameters'){
        let obj = (item.parameters.find(e => e));
        Params.add(obj["displayName"]);
      }     
    }
  });

//////////////////////////PAGINATION////////////////////////////////
  
  const itemsTotal = found["found"];

  const pagination = useRef();
  
  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);

  }
  
  return (
    <Container>
      <ResWrapper>
      <Result><Bold>Results:</Bold>{props[1]}, {props[0]}</Result>
      </ResWrapper>
        <Wrapper>    
        {items.map(({id, city, name, entity, country, sensorType, lastUpdated, firstUpdated, sources, measurements}) => (
          <Tile params={Params} id={id}  city={city}  name={name} entity={entity} country={country} sensorType={sensorType} lastUpdated={formatDate(lastUpdated)} firstUpdated={formatDate(firstUpdated)} sources={sources.id} measurements={separator(measurements)}>
          </Tile>
        ))}
      </Wrapper>
        
      <PaginationContainer itemsTotal={itemsTotal}>
      <StyledPaginateContainer>
        <ReactPaginate
          ref={pagination}
          
          pageCount={Math.ceil(itemsTotal / 50)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          nextLabel=">"
          previousLabel="<"
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="normal"
          breakLinkClassName="page-link"
          pageClassName="page-item"
          disabledClassName="disabled"
          previousClassName="previous"
          nextClassName="previous"
          previousLinkClassName="normal"
          nextLinkClassName="normal"
          renderOnZeroPageCount={null}
          onClick={scrollToTop()}
        />
      </StyledPaginateContainer>
      </PaginationContainer>  
    </Container>
  );
  
}

export default Tiles