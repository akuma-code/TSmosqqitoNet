/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import TestContainer from './Components/Layout/TestContainer';
import styled from 'styled-components'
import StyledFlex from './Components/Layout/StyledFlex';
import NetCard from './Components/Cards/NetCard';
import InputForm from './Components/Forms/InputForm';
import { HomePage } from './Components/pages/HomePage';


const AppWrapper = styled.div`
display: flex;
width: 100%;
height: 80vh;
border: 5px solid #f8e3e3;
background: #08b1e4;
place-items: start;
flex-direction:"column";
`

const App = (): JSX.Element => {
  return (
    <HomePage >

    </HomePage>
  )
}

export default App;
