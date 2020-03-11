
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Item from './Item';
import {Link} from 'react-router-dom';
import cookieSrc from '../cookie.svg';
import useInterval from '../hooks/use-interval.hook';
import useKeydown from '../hooks/use-keydown.hook';
// import useDocumentTitle from '../hooks/use-document-title.hook';





const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1, text: 'Cost 10 cookie(s) Produces 1 coockies/second.' },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10, text: 'Cost 100 cookie(s) Produces 10 coockies/second.' },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80, text: 'Cost 1000 cookie(s) Produces 80 coockies/second.' },
];


// I need to go over that tomorrow 
const calculateCookiesPerSecond = purchasedItem => {
  return Object.keys(purchasedItem).reduce((acc, itemId) => {
    const numOwned = purchasedItem[itemId];
    const item = items.find(item => item.id === itemId)
    const value = item.value
    return acc + value * numOwned;
  }, 0);
};



const Game = () => {


  //set State numCookie, the [variableName, updater] = hooks useState (default value)
  const [numCookies, setNumCookie] = useState(0);
  const [purchasedItem, setPurshasedItem] = useState({
    cursor : 0,
    grandma : 0,
    farm: 0
  })

  useKeydown('Space', () => setNumCookie(numCookies + 1));

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItem);
    setNumCookie(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    document.title = `${numCookies} cookies - Cookies Clicker Workshop`;  
    return () => {
      document.title = `Cookie Clicker Workshop`;
    }
  },[numCookies]);


  return (
    <Wrapper>
      <GameArea>
        <Indicator>
           <Total>{numCookies} cookies</Total> 
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerSecond(purchasedItem)}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookie(numCookies + 1)}>
          <Cookie className="rotating" src={cookieSrc} />
        </Button>
      </GameArea>
      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* Everything function / interation between data must be inside the .map to acces the same data  */}
        {items.map((item, index) =>{
          return (
            <Item listItem={item}
                  index = {index}
                  numOwned = {purchasedItem[item.id]}
                  addItemOnCLick = { () => {
                    if ( numCookies < item.cost ) {
                      alert('Go da hell, broke ass punk');
                    return
                  }

                  setNumCookie(numCookies - item.cost)
                  setPurshasedItem({...purchasedItem, [item.id]: purchasedItem[item.id] + 1 })
              }}  
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
}


const HomeLink = styled(Link)`

`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  
`;

const Cookie = styled.img`
  width: 300px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
