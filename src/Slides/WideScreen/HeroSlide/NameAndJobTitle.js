import React from 'react';
import styled from 'styled-components';
import NameReveal from './NameReveal';
import TitleReveal from './TitleReveal';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height:100vh;
    width:100%;
    background-color: white;
`;

const NameAndJobTitle = () => {
  return (
    <Container>
      <NameReveal text="Aditya Panda" fontFamily="Valencia" timeDelay={500} />
      <br />
      <TitleReveal text="Machine Learning Engineer" fontFamily="AvenirRoman" timeDelay={1300} />
    </Container>
  );
}

export default NameAndJobTitle;
