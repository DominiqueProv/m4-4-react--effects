import React, {useRef, useEffect} from 'react';
import styled from 'styled-components'


//Function Item

const Item = ({listItem, numOwned, addItemOnCLick, index}) => {

//Declairing the useRef
  const ref = useRef(null);

  useEffect(() => {
    if( index === 0)
    ref.current.focus();
    //what happend if I put data in the brasses Answer: it will listen to the state every time there's render
    //otherwize it's only on mount and unmount
  }, []);

  return (

    <ListWrapper onClick={addItemOnCLick}>
       <>
        {/* linking my useRef to wrap with index of 0 " the first element of the .map method
        used in the Game component*/}
          <Wrap ref = {ref} >
            <div>
              <Name>{listItem.name}</Name>
              <Text>{listItem.text}</Text>
            </div>
            <div>
              { /*  */}
              <Cost>{numOwned}</Cost>
            </div>
          </Wrap>
        </>
    </ListWrapper>

  );
}


//Import props data, numOwned and function purshased Item




// Wrapper onClick purchased Item







//styling

const Wrap = styled.div`
display: flex;
align-items: center;
margin:40px;
border-bottom: 1px solid white;

`

const ListWrapper = styled.div`
cursor: pointer;
border-radius:5px;
  &:hover{
    background-color: #2b2b2b;
    
  }

`

const Name = styled.p`
font-size: 2em;
`

const Text = styled.p`
width:500px;
padding-bottom: 20px;
`

const Cost = styled.p`
font-size: 3em;
text-align:center;
`



export default Item